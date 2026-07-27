# Phase 5 Deep-Dive Specification: Enterprise Reporting, Cabling Schedule CSV & Switch Port Provisioning

## Executive Overview

Phase 5 delivers **Enterprise Reporting & Bill of Materials (BOM) Export** to the Enterprise Infrastructure & Network Flow Architect. Solution engineers and datacenter technicians can export client-ready documentation, cabling run matrices, and switch port provisioning schedules directly from their architecture diagrams.

This specification details:
1. Cabling Schedule CSV Exporter (`exportCableScheduleCsv.ts`)
2. Switch Port Provisioning Map Exporter (`exportSwitchPortMap.ts`)
3. Rack Elevation & Architecture Spec Reporting
4. Granular Phase 5 Sub-Milestone Execution Breakdown (Phases 5.1 through 5.4)

---

## 1. Cabling Schedule CSV Exporter

Generates a structured CSV file suitable for datacenter cabling technicians:

| Field Name | Description | Example Value |
|---|---|---|
| `Cable_Tag` | Physical cable tag identifier | `CBL-TOR-A-017` |
| `Source_Device` | Originating hardware device name | `Azure Local Node 01 (AX-760)` |
| `Source_Port` | Originating physical port | `OCP-P1` |
| `Target_Device` | Destination hardware device name | `ToR-A (Dell S5248F)` |
| `Target_Port` | Destination physical port | `P17` |
| `Cable_Medium` | Hardware media classification | `DAC (Direct Attach Copper)` |
| `Speed_Gbps` | Connection speed | `25G` |
| `VLAN_ID` | Assigned VLAN tag | `VLAN 712 (Storage1)` |

---

## 2. Switch Port Provisioning Map Exporter

Generates switch port provisioning schedules detailing untagged/tagged VLAN assignments for network switch configuration:

```
[ Switch Port Provisioning Schedule: ToR-A (Dell S5248F) ]
  ├── Port P1  - P16: Unused / Available
  ├── Port P17       : Connected to Node 01 (AX-760: OCP-P1) - Trunk VLANs 711, 712, 714
  ├── Port P18       : Connected to Node 02 (AX-760: OCP-P1) - Trunk VLANs 711, 712, 714
  ├── Port Q49 - Q52 : 100G Inter-Switch Uplinks (MLAG Peer-Link)
  └── Mgmt0          : Connected to Mgmt-SW (Dell N3248TE: Port 1) - Untagged VLAN 711
```

---

## 3. Phase 5 Granular Sub-Milestone Execution Breakdown

```
Phase 5.1: Cabling Schedule CSV Export Engine
    │
    ├── Phase 5.2: Switch Port Provisioning Map Generator
    │       │
    │       ├── Phase 5.3: Export Dialog & Toolbar UI Integration
    │       │       │
    │       └── Phase 5.4: End-to-End Build & Validation
```

### Phase 5.1: Cabling Schedule CSV Export Engine
- Implement `exportCableScheduleCsv(doc)` in `src/features/export/exportCableScheduleCsv.ts`.

### Phase 5.2: Switch Port Provisioning Map Generator
- Implement `exportSwitchPortMap(doc)` in `src/features/export/exportSwitchPortMap.ts`.

### Phase 5.3: Export Dialog & Toolbar UI Integration
- Update export dialog / menu (`src/features/export`) with **Export Cable Schedule (CSV)** and **Export Switch Port Map (TXT/CSV)** buttons.

### Phase 5.4: End-to-End Build & Validation
- Run TypeScript compiler check and confirm clean build.
