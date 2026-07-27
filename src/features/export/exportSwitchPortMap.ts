import type { DiagramDocument } from '@/types/document';
import { getHardwareProfile } from '@/types/hardwareProfiles';

/**
 * Generates a Switch Port Provisioning Schedule TXT file detailing switch port allocations,
 * connected host devices, port speeds, and VLAN assignments for network switch configuration.
 */
export function exportSwitchPortMap(doc: DiagramDocument): void {
  const switches = doc.nodes.filter(
    (n) => n.shape === 'vendorSwitch' || n.shape === 'oobSwitch' || n.shape === 'opengearConsole'
  );

  const reportLines: string[] = [];
  reportLines.push(`================================================================================`);
  reportLines.push(`SWITCH PORT PROVISIONING & CABLING SCHEDULE`);
  reportLines.push(`Diagram: ${doc.name}`);
  reportLines.push(`Generated: ${new Date().toISOString()}`);
  reportLines.push(`================================================================================\n`);

  if (switches.length === 0) {
    reportLines.push(`No network switches or console managers found in diagram.\n`);
  } else {
    switches.forEach((sw) => {
      const profile = getHardwareProfile(sw.hardwareProfileId);
      reportLines.push(`--------------------------------------------------------------------------------`);
      reportLines.push(`SWITCH: ${sw.title}`);
      reportLines.push(`Model : ${profile?.model || 'Generic Switch'} (${profile?.formFactorU || 1}U)`);
      reportLines.push(`Role  : ${sw.subtitle || profile?.defaultRole || 'Switch Node'}`);
      reportLines.push(`--------------------------------------------------------------------------------`);

      const connectors = doc.connectors.filter(
        (c) => c.sourceId === sw.id || c.targetId === sw.id
      );

      if (connectors.length === 0) {
        reportLines.push(`  [No active port connections]\n`);
      } else {
        connectors.forEach((c) => {
          const isSource = c.sourceId === sw.id;
          const localPort = (isSource ? c.sourcePortId : c.targetPortId) || 'Front Port';
          const remoteNode = doc.nodes.find((n) => n.id === (isSource ? c.targetId : c.sourceId));
          const remotePort = (isSource ? c.targetPortId : c.sourcePortId) || 'Front Port';
          const vlan = c.vlanId ? `VLAN ${c.vlanId}` : 'Trunk/Native';

          reportLines.push(`  * Port [ ${localPort.padEnd(10)} ] -> Connected to ${remoteNode?.title || 'Unknown Device'} [ ${remotePort} ] (${vlan})`);
        });
        reportLines.push(``);
      }
    });
  }

  const content = reportLines.join('\n');
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${doc.name.toLowerCase().replace(/\s+/g, '_')}_switch_port_map.txt`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
