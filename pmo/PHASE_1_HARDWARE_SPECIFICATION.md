# Phase 1 Deep-Dive Specification: Vendor-Specific Hardware Profiles & Out-of-Band (OOB) Architecture

## Executive Summary

Phase 1 establishes the **Physical Hardware Layer** for the Enterprise Infrastructure & Network Flow Architect. Rather than using generic, unbranded box shapes, Phase 1 will support **real-world vendor hardware profiles** (Dell, Arista, Cisco, Nvidia/Mellanox) and specialized **Out-of-Band (OOB) Management & Console Infrastructure** (Opengear, 1G Management Switches).

This specification details:
1. Vendor Switch & Router Profile Catalog (Dell, Arista, Cisco, Nvidia)
2. Out-of-Band (OOB) & Serial Console Management (Opengear, OOB 1G Switches)
3. Server & Storage Chassis Hardware Profiles (Dell PowerEdge, HPE ProLiant, Lenovo ThinkSystem, Azure Local HCI Nodes)
4. Granular Phase 1 Sub-Milestone Execution Breakdown (Phases 1.1 through 1.4)

---

## 1. Real-World Vendor Hardware Profile Catalog

Each hardware device in the palette will be driven by a structured **Hardware Profile Manifest** containing exact port counts, port groupings, media speeds, dimensions (1U/2U/4U), and vendor styling/iconography.

### A. Dell Technologies Networking Profiles
| Model | Form Factor | Port Configuration | Target Role |
|---|---|---|---|
| **Dell PowerSwitch S5248F-ON** | 1U ToR | 48x 25GbE SFP28 + 4x 100GbE QSFP28 + 2x 100GbE QSFPDD | Top-of-Rack (ToR) Cluster Switch / HCI Compute & Storage |
| **Dell PowerSwitch S5224F-ON** | 1U ToR | 24x 25GbE SFP28 + 4x 100GbE QSFP28 | Small-Scale / 2-Node HCI Cluster ToR Switch |
| **Dell PowerSwitch N3248TE-ON** | 1U OOB | 48x 1GbE RJ45 + 4x 10GbE SFP+ | Dedicated 1G Out-of-Band (OOB) Management Switch |

### B. Arista Networks Hardware Profiles
| Model | Form Factor | Port Configuration | Target Role |
|---|---|---|---|
| **Arista DCS-7050SX3-48YC8** | 1U ToR | 48x 25GbE SFP28 + 8x 100GbE QSFP28 | ToR Switch / High-Density Spine-Leaf Leaf |
| **Arista DCS-7020TR-48** | 1U OOB | 48x 1GbE RJ45 + 6x 10GbE SFP+ | OOB Management Switch & Management Aggregation |

### C. Cisco Systems Hardware Profiles
| Model | Form Factor | Port Configuration | Target Role |
|---|---|---|---|
| **Cisco Nexus N9K-C93180YC-FX3** | 1U ToR | 48x 10G/25G SFP28 + 6x 40G/100G QSFP28 | HCI ToR Switch / ACI Leaf Switch |
| **Cisco Catalyst C9300-48T** | 1U OOB | 48x 1GbE RJ45 + Modular Uplink Card (4x 10G) | Enterprise OOB / Management Switch |

### D. Nvidia / Mellanox Storage & RDMA Switches
| Model | Form Factor | Port Configuration | Target Role |
|---|---|---|---|
| **Nvidia Spectrum SN2100** | Half-Width 1U | 16x 100GbE QSFP28 (Side-by-side redundant 1U pair) | High-Performance Dedicated Storage / RoCEv2 RDMA |
| **Nvidia Spectrum-3 SN3700** | 1U Spine | 32x 200GbE/400GbE QSFP-DD | Spine Aggregation / Storage Fabric |

---

## 2. Out-of-Band (OOB) Management & Console Infrastructure

A production-grade enterprise network layout distinguishes between **In-Band Traffic** (Data/Storage/Compute) and **Out-of-Band Infrastructure** (Management & Emergency Recovery). Phase 1 explicitly models two primary OOB layers:

### A. Dedicated 1G OOB Management Switches
- **Purpose:** Connects to iDRAC (Dell), iLO (HPE), XCC (Lenovo), switch management ports (`mgmt0`), and PDU management cards.
- **Visual Callout:** Distinct isometric rendering style featuring RJ45 activity LEDs and dedicated yellow/blue OOB cable overlays.
- **Supported Profiles:** Dell N3248TE-ON, Cisco Catalyst 9300-48T, Arista 7020TR.

### B. Opengear Serial Console Managers / Terminal Servers
- **Purpose:** Provides out-of-band RS-232 serial console access to switches, firewalls, PDU console ports, and server serial ports for emergency recovery when network connectivity is down.
- **Opengear Hardware Profiles:**
  - **Opengear CM8148-2-DAC:** 1U 48-Port RJ45 Serial Console Server with Dual AC Power & Built-in Cellular Modem.
  - **Opengear Operations Manager OM2248-L:** 1U NetOps Console Server (48 Serial Ports + 8x 1G Ethernet Switch Ports + Cellular).
  - **Opengear Resilience Gateway ACM7004-5:** Compact 4-port Remote Site Console Gateway.
- **Visual Callout:** Serial console cabling runs (RJ45-to-DB9/RJ45 Rollover cables) rendered with distinct purple/magenta dashed lines.

---

## 3. Server & Storage Hardware Chassis Profiles

Phase 1 includes pre-configured server node profiles reflecting actual OEM HCI and Hyper-V hardware platforms:

| Vendor / Platform | Model | Form Factor | Default Interface Layout |
|---|---|---|---|
| **Azure Local HCI Node (Dell)** | **Dell AX-760** | 2U Rackmount | 1x iDRAC9 (1G), OCP 3.0 Slot (Dual 25G SFP28 / 100G), 2x PCIe Gen5 (Storage/Compute) |
| **Azure Local HCI Node (Dell)** | **Dell AX-660** | 1U Rackmount | 1x iDRAC9 (1G), OCP 3.0 Slot (Dual 25G SFP28), 1x PCIe Gen5 (Storage/Compute) |
| **Dell PowerEdge (17th Gen)** | **PowerEdge R770 / R770xs** | 2U Rackmount | Intel Xeon 6, 1x iDRAC9, OCP 3.0 (Dual 25G/100G), PCIe Gen5 slots |
| **Dell PowerEdge (17th Gen)** | **PowerEdge R670 / R670xs** | 1U Rackmount | Intel Xeon 6, 1x iDRAC9, OCP 3.0 (Dual 25G), PCIe Gen5 slots |
| **Dell PowerEdge (16th Gen)** | **PowerEdge R760 / R660** | 2U / 1U | 1x iDRAC9, OCP 3.0 Slot (Dual 25G), PCIe Slot 1 (Dual 25G/100G) |
| **HPE ProLiant** | ProLiant DL380 / DL360 Gen11 | 2U / 1U | 1x iLO6 (1G), OCP 3.0 Adapter (Dual 25G SFP28) |
| **Storage Enclosure** | Dell PowerVault ME5024 / JBOD | 2U / 4U | Dual SAS/Fibre Channel/iSCSI Controllers + Management Port |

---

## 4. Phase 1 Granular Sub-Milestone Execution Breakdown

Phase 1 is broken down into four rapid, sequential sub-phases:

```
Phase 1.1: Hardware Profile Engine & Schema Extensions
    │
    ├── Phase 1.2: Switch & Opengear Isometric Renderers
    │       │
    │       ├── Phase 1.3: Server Node & Chassis Renderers
    │       │       │
    │       │       └── Phase 1.4: Palette Categorization & Preset Library UI
```

### Phase 1.1: Hardware Profile Engine & Schema Extensions
- Implement `HardwareProfile` manifest interface in `src/types/hardwareProfiles.ts`.
- Create vendor catalog registry (`DELL_PROFILES`, `ARISTA_PROFILES`, `CISCO_PROFILES`, `OPENGEAR_PROFILES`, `NVIDIA_PROFILES`).
- Include modern Dell Azure Local HCI node profiles (**AX-760**, **AX-660**) and 17th Gen Dell PowerEdge profiles (**R770**, **R670**, **R760**, **R660**).
- Extend `NodeEntity` to hold `hardwareProfileId` and hardware state.

### Phase 1.2: Switch & Opengear Isometric Renderers
- Create `renderVendorSwitch.ts`: Dynamic isometric 1U/2U switch renderer drawing exact port clusters (SFP28, QSFP28, RJ45) based on profile parameters.
- Create `renderOpengearConsole.ts`: Specialized renderer for Opengear CM8148/OM2248 terminal servers with serial port bank indicators.
- Create `renderOobSwitch.ts`: Out-of-Band 1G management switch renderer.

### Phase 1.3: Server Node & Storage Enclosure Renderers
- Create `renderServerNode.ts`: Enhanced 1U/2U server renderer displaying drive bays, status LEDs, iDRAC/iLO management ports, OCP slots, and PCIe card port brackets.
- Create `renderStorageEnclosure.ts`: JBOD/SAN storage array renderer with dual controller module ports.

### Phase 1.4: Component Palette & Preset Hardware Library UI
- Update palette (`src/features/palette/PalettePanel.tsx`) with brand filter tabs (**All**, **Dell**, **Arista**, **Cisco**, **Opengear**, **Nvidia**).
- Add "Drop Preset Cluster" quick-start options:
  - *Dual Dell S5248F + Opengear CM8148 + Dell N3248TE OOB* (Standard Azure Local / Hyper-V HCI ToR Stack).
  - *Dual Arista 7050SX3 + Opengear OM2248 + Arista 7020TR OOB*.
