# Phase 2 Deep-Dive Specification: Port-Level Cabling & Interface-Level Anchors

## Executive Overview

Phase 2 introduces **Pinpoint Port-to-Port Cabling** and **Interface-Level Anchor Routing** to the Enterprise Infrastructure & Network Flow Architect. While Phase 1 provided hardware chassis shapes, Phase 2 enables precision physical cabling between specific network ports on switches, servers, Opengear console managers, and storage arrays.

This specification details:
1. Interactive Port Hotspot Anchoring (`PortAnchorId`)
2. Physical Cable Media Classification & Visual Styling System
3. Switch Embedded Teaming (SET) & LACP Bond Visualizers
4. Granular Phase 2 Sub-Milestone Execution Breakdown (Phases 2.1 through 2.4)

---

## 1. Interactive Port Hotspot Anchoring

Instead of snapping cables to generic box edges (Top/Right/Bottom/Left), Phase 2 introduces **exact port pin anchoring**:

```
[ Dell AX-760 HCI Node ]
  ├── Port: iDRAC9  ───────(Cat6A Yellow)───────> [ Dell N3248TE OOB: Port Mgmt-1 ]
  ├── Port: OCP-P1  ───────(DAC 25G Blue)───────> [ Dell S5248F ToR-A: Port P17 ]
  ├── Port: OCP-P2  ───────(DAC 25G Blue)───────> [ Dell S5248F ToR-B: Port P17 ]
  └── Serial Console ──────(RS232 Purple)───────> [ Opengear CM8148: Port Serial-1 ]
```

### Port Anchor ID Schema
Ports generate structured anchor identifiers formatted as:
`${nodeId}:${portGroupId}:${portIndex}` (e.g. `node-ax760-01:ocp-slot:1` or `sw-tor-a:sfp28-bank:17`).

When the user hovers over a hardware node in Cabling Mode, the canvas highlights active port hotspots along the front and rear faceplate of the device.

---

## 2. Cable Media Classification & Visual Styling

Physical cables are distinguished visually by color coding, line weight, connector boot styling, and animation patterns according to industry cabling standards:

| Cable Medium | Speed | Connector Type | Visual Color Hex | Canvas Style | Target Traffic Role |
|---|---|---|---|---|---|
| **DAC (Direct Attach Copper)** | 25G / 100G | SFP28 / QSFP28 | `#00d2ff` (Cyan Slate) | 3px Solid Line with Metallic Boots | ToR-to-Host Compute & Storage (Short-reach In-Rack) |
| **MMF (Multi-Mode Fiber)** | 25G / 100G | LC-LC / MPO (Aqua) | `#00f5d4` (Aqua Green) | 2.5px Glowing Solid Line | ToR-to-Spine / Inter-Rack Uplinks |
| **SMF (Single-Mode Fiber)** | 100G / 400G | LC-LC (Yellow) | `#ffea00` (Vibrant Yellow) | 2.5px High-Glow Line | Datacenter Interconnect / Campus Backbone |
| **Cat6A RJ45 Copper** | 1G / 10G | RJ45 | `#ff9100` (Orange/Amber) | 2px Solid Line | Out-of-Band (OOB) 1G Management / iDRAC / iLO |
| **RS-232 Serial Rollover** | 115.2 kbps | RJ45-to-RJ45/DB9 | `#e040fb` (Purple/Magenta) | 2px Dashed Line (`[6, 4]`) | Opengear Serial Console Emergency Recovery |

---

## 3. Switch Embedded Teaming (SET) & LACP Bond Visualizers

On Hyper-V and Azure Local HCI cluster nodes, physical host NICs (e.g. `OCP-P1` and `OCP-P2`) are bound into a **Switch Embedded Team (SET)** or **LACP Trunk**.

### Visual SET Team Container
- When two or more physical ports on a server node are assigned to a SET Team, the canvas renders a subtle blue glowing boundary enclosing the team member ports.
- Provides visual assurance that physical ports in a team are cross-cabled to separate ToR switches (**ToR-A** and **ToR-B**) for dual-homed redundancy.

---

## 4. Phase 2 Granular Sub-Milestone Execution Breakdown

Phase 2 is executed in four sequential sub-phases:

```
Phase 2.1: Port Anchor Schema & Hotspot Calculation
    │
    ├── Phase 2.2: Port-to-Port Connector Engine & Routing
    │       │
    │       ├── Phase 2.3: Cable Media Styling & Legend Panel
    │       │       │
    │       │       └── Phase 2.4: SET Team & LACP Bond Inspector UI
```

### Phase 2.1: Port Anchor Schema & Hotspot Calculation
- Extend `ConnectorEntity` to support `sourcePortId` and `targetPortId`.
- Implement port coordinate calculation utilities in `src/lib/geometry/portAnchors.ts` to map hardware profile ports to 2.5D screen coordinates.

### Phase 2.2: Port-to-Port Connector Engine & Routing
- Update `renderConnector.ts` to render precision cable runs terminating directly at hardware port pins.
- Implement intelligent cable routing offsets so overlapping cables between ToR switches and host nodes remain cleanly separated.

### Phase 2.3: Cable Media Styling & Legend Panel
- Add cable type selector (DAC, MMF, SMF, Cat6A, RS-232 Serial) to the inspector and top toolbar.
- Update `LegendPanel.tsx` to display an interactive Cabling Media Legend explaining cable colors and speeds.

### Phase 2.4: SET Team & LACP Bond Inspector UI
- Create `SetTeamInspector.tsx` property editor component in `src/features/inspector`.
- Allow engineers to select physical server ports and bind them into named SET Teams (e.g. `SET-Team-01`) or LACP bonds.
