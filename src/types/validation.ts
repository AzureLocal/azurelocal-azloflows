export type RuleSeverity = 'error' | 'warning' | 'info';

export interface ValidationIssue {
  id: string;
  ruleId: string;
  severity: RuleSeverity;
  title: string;
  message: string;
  targetNodeId?: string;
  targetConnectorId?: string;
  targetAreaId?: string;
  suggestedFix?: string;
}

export interface ComplianceRule {
  id: string;
  name: string;
  severity: RuleSeverity;
  description: string;
}

export const COMPLIANCE_RULES: ComplianceRule[] = [
  {
    id: 'RULE-TOR-REDUNDANCY',
    name: 'Dual-ToR Redundancy Check',
    severity: 'error',
    description: 'Verifies that every HCI host node has physical links connected to at least two distinct ToR switches'
  },
  {
    id: 'RULE-MTU-JUMBO',
    name: 'Storage MTU 9000 Consistency',
    severity: 'warning',
    description: 'Verifies that Storage/RDMA SMB Direct paths run on MTU 9000 Jumbo Frames'
  },
  {
    id: 'RULE-SET-PORT-BALANCE',
    name: 'SET Team Member Port Balance',
    severity: 'warning',
    description: 'Verifies that host ports in a SET team cross-connect to separate physical ToR switches'
  },
  {
    id: 'RULE-VLAN-ALIGNMENT',
    name: 'VLAN Tag Alignment Check',
    severity: 'error',
    description: 'Detects mismatched VLAN IDs between host interfaces and switch trunks'
  },
  {
    id: 'RULE-OOB-MANAGEMENT',
    name: 'OOB Management Connectivity',
    severity: 'info',
    description: 'Verifies that server nodes have iDRAC/iLO ports cabled to a 1G OOB switch or Opengear console'
  }
];
