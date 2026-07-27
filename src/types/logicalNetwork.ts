export type ViewMode = 'physical' | 'logical' | 'hybrid';

export interface VlanSubnetSpec {
  vlanId: number;
  name: string;
  cidr: string;
  purpose: 'management' | 'storage1' | 'storage2' | 'compute' | 'vm-public';
  colorHex: string;
  mtu: 1500 | 9000;
  description: string;
}

export const DEFAULT_HCI_VLANS: Record<number, VlanSubnetSpec> = {
  711: {
    vlanId: 711,
    name: 'VLAN 711 (Management)',
    cidr: '192.168.1.0/24',
    purpose: 'management',
    colorHex: '#00d2ff',
    mtu: 1500,
    description: 'Host Management, WAC, Azure Arc agents'
  },
  712: {
    vlanId: 712,
    name: 'VLAN 712 (Storage1 / SMB Direct)',
    cidr: '192.168.11.0/24',
    purpose: 'storage1',
    colorHex: '#00f5d4',
    mtu: 9000,
    description: 'SMB Direct RDMA (RoCEv2) Storage Fabric 1'
  },
  713: {
    vlanId: 713,
    name: 'VLAN 713 (Storage2 / SMB Direct)',
    cidr: '192.168.12.0/24',
    purpose: 'storage2',
    colorHex: '#3a86ff',
    mtu: 9000,
    description: 'SMB Direct RDMA (RoCEv2) Storage Fabric 2'
  },
  714: {
    vlanId: 714,
    name: 'VLAN 714 (Compute / Tenant VMs)',
    cidr: '10.0.0.0/16',
    purpose: 'compute',
    colorHex: '#ff006e',
    mtu: 1500,
    description: 'Virtual Networks & Tenant VM Traffic'
  }
};

export function getVlanSpec(vlanId?: number): VlanSubnetSpec | undefined {
  if (!vlanId) return undefined;
  return DEFAULT_HCI_VLANS[vlanId];
}
