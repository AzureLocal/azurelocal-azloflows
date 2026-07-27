import type { AreaEntity, ConnectorEntity, NodeEntity } from '@/types/document';

export interface HardwarePresetStack {
  id: string;
  name: string;
  vendor: 'dell' | 'arista' | 'cisco' | 'nvidia';
  description: string;
  nodes: Partial<NodeEntity>[];
  areas?: Partial<AreaEntity>[];
  connectors?: Partial<ConnectorEntity>[];
}

export const HARDWARE_PRESET_STACKS: HardwarePresetStack[] = [
  {
    id: 'preset-dell-azurelocal-hci',
    name: 'Dell Azure Local HCI ToR + OOB Stack',
    vendor: 'dell',
    description: 'Dual Dell S5248F ToR Switches + Opengear CM8148 Serial Console + Dell N3248TE 1G OOB Switch + 2x Dell AX-760 HCI Nodes',
    nodes: [
      {
        shape: 'vendorSwitch',
        hardwareProfileId: 'dell-s5248f-on',
        title: 'ToR-A (Dell S5248F)',
        subtitle: '48x 25G + 4x 100G ToR Primary',
        width: 320,
        height: 80,
        fill: '#1e2530',
        glowColor: '#007db8',
        tags: ['tor', 'dell', 'switch']
      },
      {
        shape: 'vendorSwitch',
        hardwareProfileId: 'dell-s5248f-on',
        title: 'ToR-B (Dell S5248F)',
        subtitle: '48x 25G + 4x 100G ToR Secondary',
        width: 320,
        height: 80,
        fill: '#1e2530',
        glowColor: '#007db8',
        tags: ['tor', 'dell', 'switch']
      },
      {
        shape: 'opengearConsole',
        hardwareProfileId: 'opengear-cm8148-2-DAC',
        title: 'Opengear CM8148',
        subtitle: '48-Port Serial Console Server',
        width: 320,
        height: 70,
        fill: '#151921',
        glowColor: '#9c27b0',
        tags: ['opengear', 'oob', 'console']
      },
      {
        shape: 'oobSwitch',
        hardwareProfileId: 'dell-n3248te-on',
        title: 'Mgmt-SW (Dell N3248TE)',
        subtitle: '48x 1G OOB Management Switch',
        width: 320,
        height: 70,
        fill: '#161c24',
        glowColor: '#ffc107',
        tags: ['dell', 'oob', 'switch']
      },
      {
        shape: 'serverNode',
        hardwareProfileId: 'dell-ax-760',
        title: 'Azure Local Node 01 (AX-760)',
        subtitle: '2U HCI Node (iDRAC9, OCP 25G, Dual PCIe)',
        width: 320,
        height: 110,
        fill: '#1a222d',
        glowColor: '#00e5ff',
        tags: ['node', 'dell', 'hci']
      },
      {
        shape: 'serverNode',
        hardwareProfileId: 'dell-ax-760',
        title: 'Azure Local Node 02 (AX-760)',
        subtitle: '2U HCI Node (iDRAC9, OCP 25G, Dual PCIe)',
        width: 320,
        height: 110,
        fill: '#1a222d',
        glowColor: '#00e5ff',
        tags: ['node', 'dell', 'hci']
      }
    ]
  },
  {
    id: 'preset-arista-hci-stack',
    name: 'Arista Enterprise HCI ToR + OOB Stack',
    vendor: 'arista',
    description: 'Dual Arista 7050SX3 ToR Switches + Opengear OM2248 NetOps + Arista 7020TR OOB + 2x PowerEdge R770 Nodes',
    nodes: [
      {
        shape: 'vendorSwitch',
        hardwareProfileId: 'arista-7050sx3-48yc8',
        title: 'ToR-A (Arista 7050SX3)',
        subtitle: '48x 25G + 8x 100G ToR Primary',
        width: 320,
        height: 80,
        fill: '#1c222c',
        glowColor: '#4f81bd',
        tags: ['tor', 'arista', 'switch']
      },
      {
        shape: 'vendorSwitch',
        hardwareProfileId: 'arista-7050sx3-48yc8',
        title: 'ToR-B (Arista 7050SX3)',
        subtitle: '48x 25G + 8x 100G ToR Secondary',
        width: 320,
        height: 80,
        fill: '#1c222c',
        glowColor: '#4f81bd',
        tags: ['tor', 'arista', 'switch']
      },
      {
        shape: 'opengearConsole',
        hardwareProfileId: 'opengear-om2248-l',
        title: 'Opengear OM2248',
        subtitle: '48 Serial Ports + 8x 1G NetOps Server',
        width: 320,
        height: 70,
        fill: '#151921',
        glowColor: '#9c27b0',
        tags: ['opengear', 'oob', 'console']
      },
      {
        shape: 'oobSwitch',
        hardwareProfileId: 'arista-7020tr-48',
        title: 'Mgmt-SW (Arista 7020TR)',
        subtitle: '48x 1G OOB Management Switch',
        width: 320,
        height: 70,
        fill: '#192028',
        glowColor: '#ffb300',
        tags: ['arista', 'oob', 'switch']
      },
      {
        shape: 'serverNode',
        hardwareProfileId: 'dell-poweredge-r770',
        title: 'Compute Node 01 (R770)',
        subtitle: '2U 17th Gen Intel Xeon 6 (iDRAC9, OCP 25G)',
        width: 320,
        height: 110,
        fill: '#18202b',
        glowColor: '#00d2ff',
        tags: ['node', 'dell', 'compute']
      },
      {
        shape: 'serverNode',
        hardwareProfileId: 'dell-poweredge-r770',
        title: 'Compute Node 02 (R770)',
        subtitle: '2U 17th Gen Intel Xeon 6 (iDRAC9, OCP 25G)',
        width: 320,
        height: 110,
        fill: '#18202b',
        glowColor: '#00d2ff',
        tags: ['node', 'dell', 'compute']
      }
    ]
  }
];
