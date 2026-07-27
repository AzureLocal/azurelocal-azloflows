import type { DiagramDocument } from '@/types/document';
import { getCableSpec } from '@/types/cabling';

/**
 * Exports a structured Cabling Schedule CSV file containing:
 * Cable Tag, Source Device, Source Port, Target Device, Target Port, Cable Medium, Speed, VLAN ID, Notes
 */
export function exportCableScheduleCsv(doc: DiagramDocument): void {
  const headers = [
    'Cable_Tag',
    'Source_Device',
    'Source_Port',
    'Target_Device',
    'Target_Port',
    'Cable_Medium',
    'Speed_Gbps',
    'VLAN_ID',
    'Notes'
  ];

  const rows = doc.connectors.map((c, index) => {
    const sourceNode = doc.nodes.find((n) => n.id === c.sourceId);
    const targetNode = doc.nodes.find((n) => n.id === c.targetId);
    const cableSpec = getCableSpec(c.cableType);

    const cableTag = c.cableTagLabel || `CBL-${String(index + 1).padStart(3, '0')}`;
    const sourceDevice = sourceNode ? sourceNode.title : 'Unknown Device';
    const sourcePort = c.sourcePortId || 'Front Face';
    const targetDevice = targetNode ? targetNode.title : 'Unknown Device';
    const targetPort = c.targetPortId || 'Front Face';
    const cableMedium = cableSpec.name;
    const speed = cableSpec.speedLabel;
    const vlan = c.vlanId ? `VLAN ${c.vlanId}` : 'Untagged';
    const notes = (c.notes || '').replace(/"/g, '""');

    return [
      `"${cableTag}"`,
      `"${sourceDevice}"`,
      `"${sourcePort}"`,
      `"${targetDevice}"`,
      `"${targetPort}"`,
      `"${cableMedium}"`,
      `"${speed}"`,
      `"${vlan}"`,
      `"${notes}"`
    ].join(',');
  });

  const csvContent = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${doc.name.toLowerCase().replace(/\s+/g, '_')}_cable_schedule.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
