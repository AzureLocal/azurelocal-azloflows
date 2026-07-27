import { isoQuad, type ViewportSize } from '@/lib/geometry/iso';
import { drawRoundedPolygon } from '@/lib/rendering/canvasPrimitives';
import { hexToRgba } from '@/lib/rendering/tokens';
import type { CameraState, NodeEntity } from '@/types/document';

/**
 * Renders Switch Embedded Teaming (SET) and LACP Bond visual overlays
 * as glowing blue enclosure boxes around physical host NIC ports.
 */
export function renderSetTeamOverlay(
  ctx: CanvasRenderingContext2D,
  node: NodeEntity,
  camera: CameraState,
  viewport: ViewportSize,
  time: number,
): void {
  if (!node.setTeams || node.setTeams.length === 0) return;

  const points = isoQuad(node.x, node.y, node.width, node.height, camera, viewport);
  const [, , rightBottom, leftBottom] = points;
  const pulse = 0.8 + Math.sin(time * 0.003) * 0.15;

  node.setTeams.forEach((team, index) => {
    const teamColor = '#00d2ff';
    const teamYOffset = (25 + index * 24) * camera.zoom;
    const teamH = 18 * camera.zoom;

    const quad = [
      { x: leftBottom.x + 8 * camera.zoom, y: leftBottom.y + teamYOffset },
      { x: rightBottom.x - 8 * camera.zoom, y: rightBottom.y + teamYOffset },
      { x: rightBottom.x - 8 * camera.zoom, y: rightBottom.y + teamYOffset + teamH },
      { x: leftBottom.x + 8 * camera.zoom, y: leftBottom.y + teamYOffset + teamH },
    ];

    ctx.save();
    // Glowing Team Fill
    drawRoundedPolygon(ctx, quad, 3 * camera.zoom);
    ctx.fillStyle = hexToRgba(teamColor, 0.12 * pulse);
    ctx.fill();

    // Border
    ctx.strokeStyle = hexToRgba(teamColor, 0.7 * pulse);
    ctx.lineWidth = 1.5 * camera.zoom;
    ctx.setLineDash([4 * camera.zoom, 2 * camera.zoom]);
    ctx.stroke();

    // Team Label
    const fontSz = Math.max(9, 10 * camera.zoom);
    ctx.font = `600 ${fontSz}px Inter, system-ui, sans-serif`;
    ctx.fillStyle = teamColor;
    ctx.fillText(`[SET] ${team.name}`, quad[0].x + 4 * camera.zoom, quad[0].y + fontSz * 0.95);
    ctx.restore();
  });
}
