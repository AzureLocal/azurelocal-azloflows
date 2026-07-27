# Data Model & Schema Extensions Specifications

## Overview

To support advanced logical and physical network layout building, the core schema (`src/types/document.ts`) will be extended in a backward-compatible manner. 

This document defines the proposed data models for:
1. **Physical Ports & Interfaces**
2. **Switch & Host Node Extensions**
3. **Physical Cabling & Port-to-Port Links**
4. **Logical Networks, VLANs & vSwitches**
5. **Traffic Flow Specifications & Simulation Rules**

---

## 1. Physical Ports & Interfaces (`PortEntity`)

Physical nodes (Servers, Switches, Storage Arrays) carry discrete hardware network ports or interfaces.

```typescript
export type PortMediaType = '1G-RJ45' | '10G-RJ45' | '10G-SFP+' | '25G-SFP28' | '100G-QSFP28' | '400G-QSFP-DD';
export type PortRole = 'management' | 'storage' | 'compute' | 'uplink' | 'peer-link' | 'unused';

export interface PortEntity {
  id: string;                      // e.g. 'port-nic1-p1' or 'port-sw1-p24'
  nodeId: string;                  // Parent node ID
  name: string;                    // e.g. 'pNIC1', 'eth0', 'Ethernet1/1'
  slotOrIndex: number;             // Physical port index on chassis/card
  mediaType: PortMediaType;        // Hardware connection interface
  speedGbps: number;               // 1, 10, 25, 100, 400
  role: PortRole;                  // Intended traffic classification
  macAddress?: string;             // Optional MAC address
  pcieSlot?: string;               // e.g. 'Slot 1', 'LOM', 'Mezzanine'
  status: 'up' | 'down' | 'disabled';
}
```

---

## 2. Node Schema Extensions (`NodeEntity`)

Extending `NodeEntity` to support physical hardware attributes, host network configs, and embedded ports.

```typescript
export interface HostNetworkConfig {
  hypervisor?: 'Hyper-V' | 'Azure Local HCI' | 'ESXi' | 'BareMetal';
  setTeams?: {
    name: string;                  // e.g. 'SET-Team-01'
    memberPortIds: string[];      // Referenced Port IDs
    loadBalancing: 'HyperVPort' | 'Dynamic';
  }[];
  vSwitches?: {
    name: string;                  // e.g. 'vSwitch-External'
    setTeamName?: string;
    sriovEnabled: boolean;
    jumboFrames: boolean;         // MTU 9000
  }[];
}

export interface SwitchConfig {
  switchType: 'ToR-Leaf' | 'Spine' | 'Management-OOB' | 'SAN-FibreChannel';
  hostname: string;
  ipAddress?: string;
  mlagEnabled?: boolean;          // Multi-Chassis Link Aggregation
  mlagPeerNodeId?: string;
  totalPorts: number;             // 24, 48, 64
}

// Extension to NodeEntity in src/types/document.ts:
export interface NetworkNodeEntity extends NodeEntity {
  rackPositionU?: number;          // e.g. U12 in Rack 1
  rackId?: string;                 // Parent Rack Area ID
  ports?: PortEntity[];            // Embedded physical interfaces
  hostConfig?: HostNetworkConfig;  // Hyper-V / Azure Local node settings
  switchConfig?: SwitchConfig;     // Switch hardware parameters
}
```

---

## 3. Physical Cabling (`PhysicalLinkEntity`)

Extending connection links beyond point-to-point canvas paths to model physical cables connecting specific hardware ports.

```typescript
export type CableMediumType = 'DAC' | 'MMF-LC-LC' | 'SMF-LC-LC' | 'Cat6A-RJ45' | 'AOC';

export interface PhysicalLinkEntity extends ConnectorEntity {
  sourcePortId: string;           // Source physical Port ID
  targetPortId: string;           // Target physical Port ID
  cableType: CableMediumType;
  cableLengthMeters?: number;
  cableColorHex?: string;          // Visual cable identification
  cableTagLabel?: string;          // Physical cable tag identifier (e.g. 'CBL-TOR-A-017')
  negotiatedSpeedGbps?: number;
  redundantPairLinkId?: string;   // Paired link for dual-homing validation
}
```

---

## 4. Logical Networks & VLANs (`LogicalNetworkEntity`)

Logical boundaries overlaying physical links and ports to define network segmentation.

```typescript
export interface VlanDefinition {
  vlanId: number;                  // e.g. 711, 712, 713
  name: string;                    // e.g. 'Storage1-NVMe'
  purpose: 'Management' | 'Storage1' | 'Storage2' | 'Compute' | 'VM-Public' | 'Native';
  subnetCidr: string;              // e.g. '192.168.11.0/24'
  gatewayIp?: string;
  mtu: 1500 | 9000;                // 9000 for Jumbo Frames (Storage/RDMA)
  rdmaProtocol?: 'RoCEv2' | 'iWARP' | 'None';
  pfcPriority?: number;            // Priority Flow Control (e.g. Priority 3 & 4)
}

export interface LogicalNetworkEntity {
  id: string;
  name: string;                    // e.g. 'Azure Local HCI Cluster Network'
  vlans: VlanDefinition[];
  associatedAreaIds?: string[];   // Boundary areas representing subnets
  associatedNodeIds?: string[];   // Member nodes
}
```

---

## 5. Traffic Flow Specifications (`TrafficFlowSpec`)

Extending the tag filter engine to model granular traffic paths across logical and physical topology layers.

```typescript
export interface TrafficFlowSpec {
  id: string;
  name: string;                    // e.g. 'SMB Direct Storage Traffic (Node 1 -> Node 2)'
  sourceNodeId: string;
  sourcePortId?: string;
  targetNodeId: string;
  targetPortId?: string;
  vlanId?: number;
  protocol: 'TCP' | 'UDP' | 'ICMP' | 'RDMA-RoCEv2';
  portNumber?: number;             // e.g. 445 (SMB), 443 (HTTPS)
  bandwidthClass?: 'High-Priority-RDMA' | 'Standard-Compute' | 'Management';
  simulatedPath: {
    hopIndex: number;
    nodeId: string;
    portId?: string;
    vlanTagged: boolean;
  }[];
}
```

---

## Backward Compatibility & Document Schema Migration

All new properties will be marked optional (`?`) on existing schemas. When loading legacy `.json` files, a migration transformer (`migrateDocumentToLatest()`) will automatically populate default port and network metadata structures without breaking existing diagrams.
