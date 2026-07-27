# Logical Network Isolation & HCI VLAN Profiles

This guide outlines the standard VLAN segmentation and MTU requirements for Azure Local HCI host clusters.

---

## 1. HCI Traffic Isolation Schedule

Network traffic in an Azure Local deployment is separated into distinct logical networks to prevent storage bandwidth contention from impacting virtual machine or host management traffic.

| Traffic Network | Default VLAN ID | Subnet CIDR (Example) | MTU Size | RDMA / RoCEv2 | Description |
|---|:---:|---|:---:|:---:|---|
| **Management** | **VLAN 711** | `10.0.10.0/24` | 1500 | No | Host OS management, Arc agent, WAC, and AD communication. |
| **Compute / Tenant** | **VLAN 712** | `10.0.12.0/24` | 1500 / 9000 | Optional | Hyper-V virtual machine tenant workload networks. |
| **Storage 1 (S2D)** | **VLAN 713** | `172.16.10.0/24` | **9000 (Jumbo)** | **Yes (RoCEv2 / iWARP)** | Storage Spaces Direct RDMA fabric 1 traffic. |
| **Storage 2 (S2D)** | **VLAN 714** | `172.16.11.0/24` | **9000 (Jumbo)** | **Yes (RoCEv2 / iWARP)** | Storage Spaces Direct RDMA fabric 2 traffic. |

---

## 2. Jumbo Frames (MTU 9000) Requirement

- Storage Spaces Direct (S2D) uses RDMA (Remote Direct Memory Access) for high-speed, low-latency disk serialization across host nodes.
- **MTU 9000** must be configured consistently end-to-end across:
  1. Server physical NIC adapters (pNICs).
  2. Hyper-V vSwitch adapters.
  3. Top-of-Rack (ToR) switch trunk ports and VLAN interfaces.

> ⚠️ Mismatched MTU settings (e.g. Host configured for 9000 while Switch is 1500) will cause silent packet drops and S2D cluster storage failure.
