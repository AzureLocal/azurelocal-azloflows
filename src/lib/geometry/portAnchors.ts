import { isoQuad, type ViewportSize } from '@/lib/geometry/iso';
import type { CameraState, NodeEntity, Point } from '@/types/document';
import { getHardwareProfile } from '@/types/hardwareProfiles';

/**
 * Calculates the exact 2.5D screen point for a specific hardware port on a node.
 * If portId is not found, falls back to the center of the node face.
 */
export function getPortScreenPoint(
  node: NodeEntity,
  portId: string | undefined,
  camera: CameraState,
  viewport: ViewportSize,
): Point {
  const points = isoQuad(node.x, node.y, node.width, node.height, camera, viewport);
  const [leftTop, rightTop, rightBottom, leftBottom] = points;

  // If no port specified or no hardware profile, default to front face center
  if (!portId || !node.hardwareProfileId) {
    return {
      x: (leftBottom.x + rightBottom.x) * 0.5,
      y: (leftBottom.y + rightBottom.y) * 0.5,
    };
  }

  const profile = getHardwareProfile(node.hardwareProfileId);
  if (!profile) {
    return {
      x: (leftBottom.x + rightBottom.x) * 0.5,
      y: (leftBottom.y + rightBottom.y) * 0.5,
    };
  }

  // Calculate total ports across all port groups
  let targetIndex = 0;
  let totalPorts = 0;

  for (const group of profile.portGroups) {
    const groupStart = group.startIndex ?? 1;
    for (let i = 0; i < group.count; i++) {
      const currentPortId = `${group.labelPrefix || 'P'}${groupStart + i}`;
      if (currentPortId.toLowerCase() === portId.toLowerCase() || `${group.name}-${i}` === portId) {
        targetIndex = totalPorts;
      }
      totalPorts++;
    }
  }

  totalPorts = Math.max(1, totalPorts);
  const cols = Math.min(24, Math.ceil(totalPorts / 2));
  const colIndex = targetIndex % cols;
  const portGap = (rightBottom.x - leftBottom.x) / (cols + 1);

  const switchDepth = (profile.formFactorU * 16 + 6) * camera.zoom;
  const isRow2 = targetIndex >= cols;
  const rowOffset = isRow2 ? switchDepth * 0.7 : switchDepth * 0.35;

  return {
    x: leftBottom.x + (colIndex + 1) * portGap,
    y: leftBottom.y + rowOffset,
  };
}
