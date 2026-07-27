import { isoQuad, type ViewportSize } from '@/lib/geometry/iso';
import type { CameraState, NodeEntity } from '@/types/document';
import type { ValidationIssue } from '@/types/validation';

/**
 * Renders pulsating compliance warning (🟡) and error (🔴) alert badges
 * directly over offending canvas nodes.
 */
export function renderValidationBadges(
  ctx: CanvasRenderingContext2D,
  nodes: NodeEntity[],
  issues: ValidationIssue[],
  camera: CameraState,
  viewport: ViewportSize,
  time: number,
): void {
  if (issues.length === 0) return;

  const pulse = 0.8 + Math.sin(time * 0.005) * 0.2;

  nodes.forEach((node) => {
    const nodeIssues = issues.filter((i) => i.targetNodeId === node.id);
    if (nodeIssues.length === 0) return;

    const hasError = nodeIssues.some((i) => i.severity === 'error');
    const hasWarning = nodeIssues.some((i) => i.severity === 'warning');

    const badgeColor = hasError ? '#ff0055' : hasWarning ? '#ffb300' : '#00d2ff';
    const points = isoQuad(node.x, node.y, node.width, node.height, camera, viewport);
    const topPoint = points[0];

    const badgeX = topPoint.x + 12 * camera.zoom;
    const badgeY = topPoint.y - 12 * camera.zoom;
    const radius = Math.max(8, 11 * camera.zoom);

    ctx.save();
    // Pulse outer ring
    ctx.beginPath();
    ctx.arc(badgeX, badgeY, radius * (1.2 + (1 - pulse) * 0.3), 0, Math.PI * 2);
    ctx.fillStyle = hasError ? 'rgba(255, 0, 85, 0.25)' : 'rgba(255, 179, 0, 0.25)';
    ctx.fill();

    // Solid badge body
    ctx.beginPath();
    ctx.arc(badgeX, badgeY, radius, 0, Math.PI * 2);
    ctx.fillStyle = badgeColor;
    ctx.shadowColor = badgeColor;
    ctx.shadowBlur = 10 * camera.zoom;
    ctx.fill();

    // Alert Icon Text
    ctx.shadowBlur = 0;
    ctx.font = `700 ${Math.max(9, 11 * camera.zoom)}px Inter, system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(hasError ? '!' : '⚠', badgeX, badgeY);

    ctx.restore();
  });
}
