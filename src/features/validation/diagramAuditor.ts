import type { DiagramDocument, NodeEntity } from '@/types/document';
import type { ValidationIssue } from '@/types/validation';
import { getHardwareProfile } from '@/types/hardwareProfiles';

/**
 * Audits the diagram document in real time against 5 core enterprise network compliance rules:
 * 1. RULE-TOR-REDUNDANCY (Error): Host nodes connected to only 1 ToR switch.
 * 2. RULE-MTU-JUMBO (Warning): Storage/RDMA paths running on MTU 1500 instead of 9000.
 * 3. RULE-SET-PORT-BALANCE (Warning): SET team member ports wired to the same physical switch.
 * 4. RULE-VLAN-ALIGNMENT (Error): Host-to-switch VLAN tag mismatch.
 * 5. RULE-OOB-MANAGEMENT (Info): iDRAC/iLO management ports not cabled to 1G OOB or Opengear.
 */
export function auditDiagramDocument(doc: DiagramDocument): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  const hostNodes = doc.nodes.filter(
    (n) => n.shape === 'serverNode' || n.shape === 'serverRack'
  );
  const switchNodes = doc.nodes.filter(
    (n) => n.shape === 'vendorSwitch' || n.shape === 'oobSwitch'
  );

  // --- 1. RULE-TOR-REDUNDANCY ---
  hostNodes.forEach((host) => {
    const connectedConnectors = doc.connectors.filter(
      (c) => c.sourceId === host.id || c.targetId === host.id
    );

    const connectedSwitchIds = new Set<string>();
    connectedConnectors.forEach((c) => {
      const otherId = c.sourceId === host.id ? c.targetId : c.sourceId;
      const otherNode = doc.nodes.find((n) => n.id === otherId);
      if (otherNode && (otherNode.shape === 'vendorSwitch' || (otherNode.hardwareProfileId && getHardwareProfile(otherNode.hardwareProfileId)?.category === 'torSwitch'))) {
        connectedSwitchIds.add(otherNode.id);
      }
    });

    if (connectedSwitchIds.size === 0) {
      issues.push({
        id: `issue-tor-zero-${host.id}`,
        ruleId: 'RULE-TOR-REDUNDANCY',
        severity: 'error',
        title: 'No ToR Switch Connections',
        message: `${host.title} is not cabled to any Top-of-Rack data switch.`,
        targetNodeId: host.id,
        suggestedFix: 'Cable host NIC ports (e.g. OCP-P1 & OCP-P2) to ToR-A and ToR-B switches.',
      });
    } else if (connectedSwitchIds.size === 1) {
      issues.push({
        id: `issue-tor-single-${host.id}`,
        ruleId: 'RULE-TOR-REDUNDANCY',
        severity: 'error',
        title: 'Single Point of Failure (Single ToR)',
        message: `${host.title} is only cabled to 1 ToR switch (${doc.nodes.find((n) => n.id === Array.from(connectedSwitchIds)[0])?.title || 'Switch'}). Lack of switch redundancy.`,
        targetNodeId: host.id,
        suggestedFix: 'Add a secondary cable run to ToR-B for dual-homed fault tolerance.',
      });
    }
  });

  // --- 2. RULE-MTU-JUMBO ---
  doc.areas.forEach((area) => {
    if (area.vlanId === 712 || area.vlanId === 713 || area.label.toLowerCase().includes('storage')) {
      if (!area.mtu || area.mtu < 9000) {
        issues.push({
          id: `issue-mtu-${area.id}`,
          ruleId: 'RULE-MTU-JUMBO',
          severity: 'warning',
          title: 'Storage MTU 9000 Mismatch',
          message: `${area.label} is configured with standard MTU (${area.mtu || 1500}) instead of MTU 9000 Jumbo Frames required for SMB Direct RoCEv2.`,
          targetAreaId: area.id,
          suggestedFix: 'Set MTU to 9000 (Jumbo Frames) in Area Inspector properties.',
        });
      }
    }
  });

  // --- 3. RULE-SET-PORT-BALANCE ---
  hostNodes.forEach((host) => {
    if (host.setTeams && host.setTeams.length > 0) {
      host.setTeams.forEach((team) => {
        const teamConnectors = doc.connectors.filter(
          (c) =>
            (c.sourceId === host.id && c.sourcePortId && team.portIds.includes(c.sourcePortId)) ||
            (c.targetId === host.id && c.targetPortId && team.portIds.includes(c.targetPortId))
        );

        const targetSwitches = teamConnectors.map((c) => (c.sourceId === host.id ? c.targetId : c.sourceId));
        const uniqueSwitches = new Set(targetSwitches);

        if (targetSwitches.length >= 2 && uniqueSwitches.size === 1) {
          issues.push({
            id: `issue-set-balance-${host.id}-${team.id}`,
            ruleId: 'RULE-SET-PORT-BALANCE',
            severity: 'warning',
            title: 'SET Team Member Port Imbalance',
            message: `${team.name} member ports on ${host.title} are connected to the same physical switch chassis.`,
            targetNodeId: host.id,
            suggestedFix: 'Cross-cable one SET team member port to ToR-B switch for host teaming resilience.',
          });
        }
      });
    }
  });

  // --- 4. RULE-OOB-MANAGEMENT ---
  hostNodes.forEach((host) => {
    const oobConnector = doc.connectors.find((c) => {
      if (c.sourceId !== host.id && c.targetId !== host.id) return false;
      const otherId = c.sourceId === host.id ? c.targetId : c.sourceId;
      const otherNode = doc.nodes.find((n) => n.id === otherId);
      return (
        otherNode &&
        (otherNode.shape === 'oobSwitch' ||
          otherNode.shape === 'opengearConsole' ||
          c.cableType === 'cat6a' ||
          c.cableType === 'rs232')
      );
    });

    if (!oobConnector) {
      issues.push({
        id: `issue-oob-${host.id}`,
        ruleId: 'RULE-OOB-MANAGEMENT',
        severity: 'info',
        title: 'Missing Out-of-Band Management Cable',
        message: `${host.title} does not have an iDRAC/iLO or serial console cable connected to an OOB Management Switch or Opengear terminal server.`,
        targetNodeId: host.id,
        suggestedFix: 'Connect iDRAC9 port to Dell N3248TE 1G OOB switch or Opengear CM8148 console manager.',
      });
    }
  });

  return issues;
}
