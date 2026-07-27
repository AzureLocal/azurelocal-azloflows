import { isoQuad, type ViewportSize } from '@/lib/geometry/iso';
import { drawPolygon, drawRoundedPolygon, drawTransformedText } from '@/lib/rendering/canvasPrimitives';
import { hexToRgba, lightenHex, darkenHex } from '@/lib/rendering/tokens';
import type { CameraState, NodeEntity } from '@/types/document';
import { getHardwareProfile } from '@/types/hardwareProfiles';

/**
 * Renders an Opengear Serial Console Server (CM8148, OM2248, ACM7004) featuring
 * 48x RJ45 serial console port banks, purple accent indicators, and cellular antennas.
 */
export function renderOpengearConsole(
  ctx: CanvasRenderingContext2D,
  node: NodeEntity,
  selected: boolean,
  camera: CameraState,
  viewport: ViewportSize,
  time: number,
  theme: 'dark' | 'light' = 'dark',
): void {
  const profile = getHardwareProfile(node.hardwareProfileId) ?? getHardwareProfile('opengear-cm8148-2-dac')!;
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

  const consoleDepth = 22 * camera.zoom;
  const chassisColor = profile.primaryColor || '#151921';
  const purpleAccent = profile.accentColor || '#9c27b0';
  const magentaLed = profile.ledColor || '#e040fb';

  const leftFrontBottom = { x: leftBottom.x, y: leftBottom.y + consoleDepth };
  const rightFrontBottom = { x: rightBottom.x, y: rightBottom.y + consoleDepth };
  const rightBackBottom = { x: rightTop.x, y: rightTop.y + consoleDepth };

  // --- Front Faceplate ---
  ctx.save();
  drawPolygon(ctx, [leftBottom, rightBottom, rightFrontBottom, leftFrontBottom]);
  ctx.fillStyle = chassisColor;
  ctx.fill();

  // Purple Opengear Top Accent Line
  ctx.fillStyle = purpleAccent;
  const stripH = 3.5 * camera.zoom;
  drawPolygon(ctx, [
    leftBottom,
    rightBottom,
    { x: rightBottom.x, y: rightBottom.y + stripH },
    { x: leftBottom.x, y: leftBottom.y + stripH },
  ]);

  // Serial Console Port Indicators (48 ports in double rows)
  if (camera.zoom > 0.45) {
    const cols = 24;
    const portGap = (rightBottom.x - leftBottom.x) / (cols + 2);
    const startX = leftBottom.x + portGap;
    const midY = leftBottom.y + consoleDepth * 0.55;

    for (let c = 0; c < cols; c++) {
      const px = startX + c * portGap;
      ctx.fillStyle = (c % 4 === 0) ? magentaLed : hexToRgba(magentaLed, 0.4);
      ctx.fillRect(px, midY - 2 * camera.zoom, Math.max(2, 2.5 * camera.zoom), Math.max(2, 2.5 * camera.zoom));
      ctx.fillRect(px, midY + 2 * camera.zoom, Math.max(2, 2.5 * camera.zoom), Math.max(2, 2.5 * camera.zoom));
    }
  }

  // Cellular Antennas Callout at left edge
  const antX = leftBottom.x + 8 * camera.zoom;
  ctx.fillStyle = magentaLed;
  ctx.fillRect(antX, leftBottom.y - 8 * camera.zoom, 2 * camera.zoom, 8 * camera.zoom);
  ctx.fillRect(antX + 4 * camera.zoom, leftBottom.y - 8 * camera.zoom, 2 * camera.zoom, 8 * camera.zoom);
  ctx.restore();

  // --- Right Side ---
  ctx.save();
  ctx.fillStyle = darkenHex(chassisColor, 0.3);
  drawPolygon(ctx, [rightTop, rightBottom, rightFrontBottom, rightBackBottom]);
  ctx.restore();

  // --- Top Face ---
  ctx.save();
  const topGrad = ctx.createLinearGradient(leftTop.x, leftTop.y, rightBottom.x, rightBottom.y);
  topGrad.addColorStop(0, lightenHex(chassisColor, 0.18));
  topGrad.addColorStop(1, chassisColor);

  drawRoundedPolygon(ctx, points, Math.min(4, topEdgeLength * 0.04));
  ctx.fillStyle = topGrad;
  ctx.fill();

  ctx.strokeStyle = selected ? '#00e5ff' : purpleAccent;
  ctx.lineWidth = selected ? 2.5 : 1;
  ctx.stroke();

  // Text
  const titleText = node.title || profile.model;
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
  ctx.restore();
}
