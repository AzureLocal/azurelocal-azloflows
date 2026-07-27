# Pre-Flight Compliance Auditor Engine

The **Pre-Flight Compliance Auditor** continuously inspects the active isometric diagram and evaluates hardware topology, cable links, and VLAN attributes against enterprise deployment standards.

---

## 1. Compliance Rule Catalog

| Rule ID | Severity Level | Inspection Focus | Resolution Guidance |
|---|:---:|---|---|
| `RULE-TOR-REDUNDANCY` | 🔴 **ERROR** | Verifies every server node connects to at least 2 distinct ToR switches. | Connect a second physical NIC cable to ToR Switch B. |
| `RULE-MTU-JUMBO` | 🟡 **WARNING** | Checks if Storage/RDMA paths have MTU set to 9000. | Select the storage area/connector in inspector and update MTU to 9000. |
| `RULE-SET-PORT-BALANCE` | 🟡 **WARNING** | Ensures physical ports in a SET team cross-connect to separate switches. | Re-anchor host pNIC2 to ToR Switch B. |
| `RULE-VLAN-ALIGNMENT` | 🔴 **ERROR** | Detects mismatched VLAN IDs between host adapters and switch trunk ports. | Align VLAN tags in the entity inspector. |
| `RULE-OOB-MANAGEMENT` | ℹ️ **INFO** | Confirms server iDRAC/iLO ports are cabled to an OOB switch or Opengear. | Connect server iDRAC port to OOB switch or Opengear console server. |

---

## 2. Canvas Badges & Audit Drawer

- **Pulsating Badges**: Badges appear on canvas nodes and connectors indicating active compliance issues.
- **Audit Drawer**: Click the `Compliance Audit` tab at the bottom of the designer to view all issues in an actionable table.
