# Phase 4 Deep-Dive Specification: Pre-Flight Compliance & Network Validation Engine

## Executive Overview

Phase 4 introduces an automated **Pre-Flight Network Compliance Rules Engine** (`src/features/validation`) to the Enterprise Infrastructure & Network Flow Architect. While earlier phases enable visual hardware placement and port cabling, Phase 4 acts as an intelligent pre-flight checker that inspects the architecture diagram for single points of failure, MTU mismatches, and improper NIC team configurations.

This specification details:
1. Pre-Flight Compliance Audit Rules Catalog
2. Compliance Warning & Error Badge Overlays
3. Audit HUD Panel & Resolution Inspector UI
4. Granular Phase 4 Sub-Milestone Execution Breakdown (Phases 4.1 through 4.4)

---

## 1. Pre-Flight Compliance Audit Rules Catalog

The compliance engine evaluates five core enterprise network rules in real time:

| Rule ID | Severity | Rule Name | Validation Logic | Target Use Case |
|---|---|---|---|---|
| `RULE-TOR-REDUNDANCY` | 🔴 **ERROR** | **Dual-ToR Redundancy Check** | Verifies that every Hyper-V or Azure Local HCI host node has physical links connected to at least two distinct ToR switches (**ToR-A** and **ToR-B**). Flags any node connected to only a single switch. | High Availability & Cluster Resilience |
| `RULE-MTU-JUMBO` | 🟡 **WARNING** | **Storage MTU 9000 Consistency** | Inspects connectors attached to Storage/RDMA VLAN areas or ports. Flags any link where MTU is set to 1500 instead of 9000 (Jumbo Frames). | SMB Direct / RoCEv2 Performance |
| `RULE-SET-PORT-BALANCE` | 🟡 **WARNING** | **SET Team Member Port Balance** | Verifies that physical NIC ports inside a Switch Embedded Team (e.g. `OCP-P1` and `OCP-P2`) are wired to separate physical switches rather than the same chassis. | Host Teaming Fault Tolerance |
| `RULE-VLAN-ALIGNMENT` | 🔴 **ERROR** | **VLAN ID Alignment Check** | Detects mismatched VLAN IDs between host network interfaces and switch trunk ports or subnet boundaries. | Network Segmentation Integrity |
| `RULE-OOB-MANAGEMENT` | ℹ️ **INFO** | **OOB Management Connection** | Checks that every server node has its `iDRAC9` / `iLO` management port cabled to a 1G OOB switch or Opengear serial console server. | Out-of-Band Disaster Recovery |

---

## 2. Compliance Warning & Error Badge Overlays

- **Visual Canvas Badges:** Render pulsating red 🔴 (Error) or yellow 🟡 (Warning) alert badges directly over non-compliant nodes, switches, or cables.
- **Hover Tooltips:** Hovering over an alert badge displays the exact rule violation (e.g. *"Single Point of Failure: Host Node 01 is only connected to ToR-A"*).

---

## 3. Audit HUD Panel & Resolution Inspector UI

- **Pre-Flight Audit Drawer (`CompliancePanel.tsx`):** A collapsible panel in the bottom toolbar listing all active warnings and errors across the diagram.
- **Auto-Fix Recommendations:** Click a warning item in the panel to highlight the offending node and view step-by-step resolution suggestions.

---

## 4. Phase 4 Granular Sub-Milestone Execution Breakdown

```
Phase 4.1: Compliance Rules Engine & Validation Types
    │
    ├── Phase 4.2: Real-Time Diagram Auditor & Validator Module
    │       │
    │       ├── Phase 4.3: Canvas Alert Badge & Warning Overlays
    │       │       │
    │       └── Phase 4.4: Pre-Flight Audit Drawer & Fix Inspector UI
```

### Phase 4.1: Compliance Rules Engine & Validation Types
- Create `src/types/validation.ts` defining `ValidationIssue`, `RuleSeverity`, and `ComplianceRule` interfaces.

### Phase 4.2: Real-Time Diagram Auditor & Validator Module
- Create `src/features/validation/diagramAuditor.ts` implementing `auditDiagramDocument(doc)` to evaluate all 5 compliance rules.

### Phase 4.3: Canvas Alert Badge & Warning Overlays
- Create `src/features/canvas/renderers/renderValidationBadges.ts` rendering alert icons over offending canvas elements.

### Phase 4.4: Pre-Flight Audit Drawer & Fix Inspector UI
- Create `CompliancePanel.tsx` in `src/features/validation` providing an interactive audit drawer with issue resolution actions.
