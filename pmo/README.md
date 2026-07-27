# Enterprise Infrastructure & Network Flow Architect (EINFA) - PMO Workspace

Welcome to the **Project Management Office (PMO)** documentation repository for transforming **Azure Local Draftsman** into an enterprise-grade **Logical & Physical Network Infrastructure Layout Builder**.

---

## Executive Overview

**Azure Local Draftsman** began as an interactive isometric diagram builder for visualizing Azure Local network architectures and traffic flows. The objective of this transformation initiative is to extend the platform's core 2.5D isometric engine into a comprehensive, general-purpose solution architecture tool.

This platform will allow Solutions Architects, Systems Engineers, Datacenter Operations, and Network Engineers to model:
- **Physical Topologies:** Hyper-V and Azure Local HCI cluster nodes, Top-of-Rack (ToR) switch pairs, management switches, patch panels, Host NICs, SFP+/DAC/Fiber cabling, and SET (Switch Embedded Teaming) configurations.
- **Logical Topologies:** VLANs, Subnets/CIDRs, Virtual Switches (vSwitches), Management networks, Storage/SMB Direct RDMA (RoCEv2/iWARP) networks, Compute/Tenant networks, and Live Migration paths.
- **Dynamic Traffic Simulations:** Step-by-step interactive flow animations demonstrating traffic paths across physical ports, vSwitches, VLAN tags, firewalls, and proxies.
- **Compliance & Bill of Materials (BOM):** Automated cable run sheets, IP/VLAN schedule exports, and physical architecture validation (e.g. verifying dual-ToR redundancy, jumbo frame consistency, and NIC team port balance).

---

## PMO Documentation Index

| Document | Description | Status |
|---|---|---|
| 📄 [**ARCHITECTURE_AUDIT.md**](./ARCHITECTURE_AUDIT.md) | Technical audit of existing codebase, canvas engine, Zustand state, and extension points. | Complete |
| 📄 [**VISION_AND_STRATEGY.md**](./VISION_AND_STRATEGY.md) | Strategic vision, core use cases, target personas, and value proposition. | Complete |
| 📄 [**SCHEMA_EXTENSIONS.md**](./SCHEMA_EXTENSIONS.md) | Proposed TypeScript data model extensions for Physical Ports, Switches, Logical Networks, and Traffic Flows. | Complete |
| 📄 [**PRODUCT_ROADMAP.md**](./PRODUCT_ROADMAP.md) | Multi-phase development roadmap (Phases 1 through 5) for implementation. | Complete |
| 📄 [**PHASE_1_HARDWARE_SPECIFICATION.md**](./PHASE_1_HARDWARE_SPECIFICATION.md) | Deep-dive spec for Dell/Arista/Cisco/Nvidia vendor profiles, Opengear, and 1G OOB switches. | Complete |
| 📄 [**PHASE_2_CABLING_SPECIFICATION.md**](./PHASE_2_CABLING_SPECIFICATION.md) | Deep-dive spec for port-to-port cabling, cable media color styling, and SET teaming. | Complete |
| 📄 [**PHASE_3_MULTILAYER_SPECIFICATION.md**](./PHASE_3_MULTILAYER_SPECIFICATION.md) | Deep-dive spec for Multi-Layer toggling (Physical vs. Logical vs. Hybrid view modes). | Complete |
| 📄 [**PHASE_4_VALIDATION_SPECIFICATION.md**](./PHASE_4_VALIDATION_SPECIFICATION.md) | Deep-dive spec for Pre-Flight Compliance Audit rules engine & warning overlays. | Complete |

---

## Strategic Goals & Success Criteria

1. **Custom Infrastructure Palette:** Provide dedicated isometric shapes for ToR Switches (24/48-port), Rackmount Servers (1U/2U/4U), Storage Arrays (SAN/NAS/JBOD), Breakout Panels, and Network Adapters.
2. **Interface-Level Cabling:** Enable port-to-port wiring (e.g., Server `NIC1/Port1` -> Switch `ToR-A/Port17`) with cable type metadata (DAC, MMF, SMF, CAT6A).
3. **Multi-Layer Views:** Toggle seamlessly between **Physical View** (racks, switches, cables) and **Logical View** (vSwitches, VLANs, subnets, RDMA channels).
4. **Validation & Automated Auditing:** Detect misconfigurations automatically (e.g., single point of failure on a switch, VLAN mismatch between host and switch, or non-jumbo frame config on storage paths).
5. **Bill of Materials (BOM) Export:** Generate automated rack elevation diagrams, cabling schedules, and switch port provisioning tables.
