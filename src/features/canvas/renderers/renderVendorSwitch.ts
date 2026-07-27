import { isoQuad, type ViewportSize } from '@/lib/geometry/iso';
import { drawPolygon, drawRoundedPolygon, drawTransformedText } from '@/lib/rendering/canvasPrimitives';
import { hexToRgba, lightenHex, darkenHex } from '@/lib/rendering/tokens';
import type { CameraState, NodeEntity } from '@/types/document';
import { getHardwareProfile } from '@/types/hardwareProfiles';

/**
 * Renders an isometric ToR Data Switch (Dell, Arista, Cisco, Nvidia) with
 * high-density port faceplates, status LEDs, and vendor accent highlights.
 */
export function renderVendorSwitch(
  ctx: CanvasRenderingContext2D,
  node: NodeEntity,
  selected: boolean,
  camera: CameraState,
  viewport: ViewportSize,
  time: number,
  theme: 'dark' | 'light' = 'dark',
): void {
  const profile = getHardwareProfile(node.hardwareProfileId) ?? getHardwareProfile('dell-s5248f-on')!;
  const light = theme === 'light';
  const points = isoQuad(node.x, node.y, node.width, node.height, camera, viewport);
  const [leftTop, rightTop, rightBottom, leftBottom] = points;
  const pulse = 0.7 + Math.sin(time * 0.002 + node.zIndex) * 0.2;

  const topEdgeLength = Math.hypot(rightTop.x - leftTop.x, rightTop.y - leftTop.y) || 1;
  const leftEdgeLength = Math.hypot(leftBottom.x - leftTop.x, leftBottom.y - leftTop.y) || 1;

  const topFaceBasisX = {
    x: (rightTop.x - leftTop.x) / topEdgeLength,
    y: (rightTop.y - leftTop.y) / topEdgeLength,
  };
  const topFaceBasisY = {
    x: (leftBottom.x - leftTop.x) / leftEdgeLength,
    y: (leftBottom.y - leftTop.y) / leftEdgeLength,
  };

  const switchDepth = (profile.formFactorU * 16 + 6) * camera.zoom;
  const chassisBaseColor = profile.primaryColor || '#1e2530';
  const accentColor = profile.accentColor || '#007db8';
  const ledGlowColor = profile.ledColor || '#00d2ff';

  // Front extrusion points
  const leftFrontBottom = { x: leftBottom.x, y: leftBottom.y + switchDepth };
  const rightFrontBottom = { x: rightBottom.x, y: rightBottom.y + switchDepth };
  const rightBackBottom = { x: rightTop.x, y: rightTop.y + switchDepth };

  // --- 1. Base Shadow ---
  ctx.save();
  ctx.fillStyle = light ? 'rgba(0,0,0,0.12)' : 'rgba(0,0,0,0.35)';
  const shadowOffset = 6 * camera.zoom;
  drawPolygon(ctx, [
    leftBottom,
    rightBottom,
    { x: rightFrontBottom.x, y: rightFrontBottom.y + shadowOffset },
    { x: leftFrontBottom.x, y: leftFrontBottom.y + shadowOffset },
  ]);
  ctx.restore();

  // --- 2. Right Side Face ---
  ctx.save();
  ctx.fillStyle = darkenHex(chassisBaseColor, 0.25);
  drawPolygon(ctx, [rightTop, rightBottom, rightFrontBottom, rightBackBottom]);
  ctx.restore();

  // --- 3. Front Faceplate (Ports & LEDs) ---
  ctx.save();
  const frontGrad = ctx.createLinearGradient(leftBottom.x, leftBottom.y, rightBottom.x, rightBottom.y);
  frontGrad.addColorStop(0, darkenHex(chassisBaseColor, 0.1));
  frontGrad.addColorStop(0.5, chassisBaseColor);
  frontGrad.addColorStop(1, darkenHex(chassisBaseColor, 0.15));

  drawPolygon(ctx, [leftBottom, rightBottom, rightFrontBottom, leftFrontBottom]);
  ctx.fillStyle = frontGrad;
  ctx.fill();

  // Vendor Accent Strip at top of faceplate
  ctx.fillStyle = accentColor;
  const stripH = 3 * camera.zoom;
  drawPolygon(ctx, [
    leftBottom,
    rightBottom,
    { x: rightBottom.x, y: rightBottom.y + stripH },
    { x: leftBottom.x, y: leftBottom.y + stripH },
  ]);

  // Port Bank rendering on front face
  if (camera.zoom > 0.4) {
    const totalPorts = profile.portGroups.reduce((acc, g) => acc + g.count, 0);
    const cols = Math.min(24, Math.ceil(totalPorts / 2));
    const portGap = (rightBottom.x - leftBottom.x) / (cols + 2);
    const startX = leftBottom.x + portGap;
    const midY = leftBottom.y + switchDepth * 0.5;

    for (let c = 0; c < cols; c++) {
      const px = startX + c * portGap;
      const py1 = midY - 3 * camera.zoom;
      const py2 = midY + 3 * camera.zoom;

      // Port LED indicators
      ctx.fillStyle = (c % 3 === 0) ? ledGlowColor : hexToRgba(ledGlowColor, 0.4);
      ctx.fillRect(px, py1, Math.max(2, 2 * camera.zoom), Math.max(2, 2 * camera.zoom));
      ctx.fillRect(px, py2, Math.max(2, 2 * camera.zoom), Math.max(2, 2 * camera.zoom));
    }
  }

  // Front Border
  ctx.strokeStyle = selected ? '#00e5ff' : hexToRgba(accentColor, 0.6);
  ctx.lineWidth = selected ? 2 : 1;
  ctx.stroke();
  ctx.restore();

  // --- 4. Top Face ---
  ctx.save();
  const topGrad = ctx.createLinearGradient(leftTop.x, leftTop.y, rightBottom.x, rightBottom.y);
  topGrad.addColorStop(0, lightenHex(chassisBaseColor, 0.15));
  topGrad.addColorStop(1, chassisBaseColor);

  drawRoundedPolygon(ctx, points, Math.min(4, topEdgeLength * 0.04));
  ctx.fillStyle = topGrad;
  ctx.fill();

  ctx.strokeStyle = selected ? '#00e5ff' : (node.glowColor || accentColor);
  ctx.lineWidth = selected ? 2.5 : 1;
  ctx.stroke();

  // Glow bleed when selected
  if (selected) {
    ctx.shadowColor = node.glowColor || accentColor;
    ctx.shadowBlur = 12 * camera.zoom;
    ctx.stroke();
  }
  ctx.restore();

  // --- 5. Text Label Rendering ---
  ctx.save();
  const titleText = node.title || profile.model;
  const subtitleText = node.subtitle || profile.description;

  const fontSz = (node.fontSize || 12) * camera.zoom;
  ctx.font = `600 ${fontSz}px Inter, system-ui, sans-serif`;

  const textPos = {
    x: leftTop.x + topFaceBasisX.x * (topEdgeLength * 0.08) + topFaceBasisY.x * (leftEdgeLength * 0.15),
    y: leftTop.y + topFaceBasisX.y * (topEdgeLength * 0.08) + topFaceBasisY.y * (leftEdgeLength * 0.15),
  };

  drawTransformedText(
    ctx,
    titleText,
    textPos,
    topFaceBasisX,
    topFaceBasisY,
    light ? '#0f172a' : '#f8fafc',
    node.textRotated ?? true,
    fontSz,
  );

  if (subtitleText && camera.zoom > 0.5) {
    const subPos = {
      x: textPos.x + topFaceBasisY.x * (fontSz * 1.3),
      y: textPos.y + topFaceBasisY.y * (fontSz * 1.3),
    };
    const subFontSz = fontSz * 0.82;
    ctx.font = `400 ${subFontSz}px Inter, system-ui, sans-serif`;
    drawTransformedText(
      ctx,
      subtitleText,
      subPos,
      topFaceBasisX,
      topFaceBasisY,
      light ? '#475569' : hexToRgba('#94a3b8', 0.85),
      node.textRotated ?? true,
      subFontSz,
    );
  }
  ctx.restore();
}
