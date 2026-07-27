import { isoQuad, type ViewportSize } from '@/lib/geometry/iso';
import { drawPolygon, drawRoundedPolygon, drawTransformedText } from '@/lib/rendering/canvasPrimitives';
import { hexToRgba, lightenHex, darkenHex } from '@/lib/rendering/tokens';
import type { CameraState, NodeEntity } from '@/types/document';
import { getHardwareProfile } from '@/types/hardwareProfiles';

/**
 * Renders an isometric Server Node (Dell AX-760, AX-660, PowerEdge R770/R670/R760/R660)
 * featuring front bezel drive bays, iDRAC9 management port callouts, OCP 3.0 NIC slots, and PCIe card brackets.
 */
export function renderServerNode(
  ctx: CanvasRenderingContext2D,
  node: NodeEntity,
  selected: boolean,
  camera: CameraState,
  viewport: ViewportSize,
  time: number,
  theme: 'dark' | 'light' = 'dark',
): void {
  const profile = getHardwareProfile(node.hardwareProfileId) ?? getHardwareProfile('dell-ax-760')!;
  const light = theme === 'light';
  const points = isoQuad(node.x, node.y, node.width, node.height, camera, viewport);
  const [leftTop, rightTop, rightBottom, leftBottom] = points;

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

  const serverDepth = (profile.formFactorU * 18 + 10) * camera.zoom;
  const chassisColor = profile.primaryColor || '#1a222d';
  const dellBlue = profile.accentColor || '#007db8';
  const ledGlow = profile.ledColor || '#00e5ff';

  const leftFrontBottom = { x: leftBottom.x, y: leftBottom.y + serverDepth };
  const rightFrontBottom = { x: rightBottom.x, y: rightBottom.y + serverDepth };
  const rightBackBottom = { x: rightTop.x, y: rightTop.y + serverDepth };

  // --- 1. Base Shadow ---
  ctx.save();
  ctx.fillStyle = light ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.4)';
  const shadowOffset = 8 * camera.zoom;
  drawPolygon(ctx, [
    leftBottom,
    rightBottom,
    { x: rightFrontBottom.x, y: rightFrontBottom.y + shadowOffset },
    { x: leftFrontBottom.x, y: leftFrontBottom.y + shadowOffset },
  ]);
  ctx.restore();

  // --- 2. Right Side Face ---
  ctx.save();
  ctx.fillStyle = darkenHex(chassisColor, 0.3);
  drawPolygon(ctx, [rightTop, rightBottom, rightFrontBottom, rightBackBottom]);
  ctx.restore();

  // --- 3. Front Bezel Face (Drive Bays & iDRAC9) ---
  ctx.save();
  drawPolygon(ctx, [leftBottom, rightBottom, rightFrontBottom, leftFrontBottom]);
  ctx.fillStyle = chassisColor;
  ctx.fill();

  // Dell Blue Accent Line across front bezel
  ctx.fillStyle = dellBlue;
  const stripH = 3.5 * camera.zoom;
  drawPolygon(ctx, [
    leftBottom,
    rightBottom,
    { x: rightBottom.x, y: rightBottom.y + stripH },
    { x: leftBottom.x, y: leftBottom.y + stripH },
  ]);

  // Drive Bay Grille rendering
  if (camera.zoom > 0.4) {
    const bays = 12;
    const bayWidth = (rightBottom.x - leftBottom.x) / (bays + 2);
    const startX = leftBottom.x + bayWidth;
    const bayY1 = leftBottom.y + serverDepth * 0.25;
    const bayY2 = leftBottom.y + serverDepth * 0.75;

    for (let b = 0; b < bays; b++) {
      const bx = startX + b * bayWidth;
      ctx.fillStyle = darkenHex(chassisColor, 0.5);
      ctx.fillRect(bx, bayY1, Math.max(3, bayWidth * 0.7), bayY2 - bayY1);

      // Activity LED on drive caddy
      ctx.fillStyle = (b % 3 === 0) ? ledGlow : hexToRgba(ledGlow, 0.3);
      ctx.fillRect(bx, bayY1 + 1, Math.max(2, 2 * camera.zoom), Math.max(2, 2 * camera.zoom));
    }
  }

  // Front Border
  ctx.strokeStyle = selected ? '#00e5ff' : dellBlue;
  ctx.lineWidth = selected ? 2 : 1;
  ctx.stroke();
  ctx.restore();

  // --- 4. Top Face ---
  ctx.save();
  const topGrad = ctx.createLinearGradient(leftTop.x, leftTop.y, rightBottom.x, rightBottom.y);
  topGrad.addColorStop(0, lightenHex(chassisColor, 0.15));
  topGrad.addColorStop(1, chassisColor);

  drawRoundedPolygon(ctx, points, Math.min(4, topEdgeLength * 0.04));
  ctx.fillStyle = topGrad;
  ctx.fill();

  ctx.strokeStyle = selected ? '#00e5ff' : dellBlue;
  ctx.lineWidth = selected ? 2.5 : 1;
  ctx.stroke();
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
    `700 ${fontSz}px Inter, system-ui, sans-serif`,
  );

  if (subtitleText && camera.zoom > 0.5) {
    const subPos = {
      x: textPos.x + topFaceBasisY.x * (fontSz * 1.3),
      y: textPos.y + topFaceBasisY.y * (fontSz * 1.3),
    };
    const subFontSz = fontSz * 0.82;
    drawTransformedText(
      ctx,
      subtitleText,
      subPos,
      topFaceBasisX,
      topFaceBasisY,
      light ? '#475569' : hexToRgba('#94a3b8', 0.85),
      `400 ${subFontSz}px Inter, system-ui, sans-serif`,
    );
  }
  ctx.restore();
}
