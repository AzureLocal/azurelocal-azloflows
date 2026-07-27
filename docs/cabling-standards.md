# Physical Node-to-Switch Cabling Architecture

This document defines physical wiring standards and cabling geometry for **Azure Local** HCI cluster nodes connected to Top-of-Rack (ToR) Ethernet switches and Out-of-Band (OOB) management equipment.

---

## 1. Dual-ToR Cross-Connect Architecture

To prevent single points of failure (SPOF) and support zero-downtime switch firmware maintenance, host nodes must cross-connect across redundant physical switches (ToR-A and ToR-B).

```
+-------------------------------------------------------------------+
|                        Top-of-Rack Switch A                       |
+-------------------------------------------------------------------+
       ^                                            ^
       | (pNIC1 - DAC/MMF)                          | (pNIC1 - DAC/MMF)
+------------------------+                +------------------------+
|   Server Host Node 1   |                |   Server Host Node 2   |
+------------------------+                +------------------------+
       | (pNIC2 - DAC/MMF)                          | (pNIC2 - DAC/MMF)
       v                                            v
+-------------------------------------------------------------------+
|                        Top-of-Rack Switch B                       |
+-------------------------------------------------------------------+
```

- **pNIC1**: Connects to an SFP28/QSFP28 port on **ToR Switch A**.
- **pNIC2**: Connects to an SFP28/QSFP28 port on **ToR Switch B**.

---

## 2. Supported Cable Media Specifications

| Cable Media Type | Connector Type | Speed | Max Recommended Length | Typical Deployment Use |
|---|---|---|---|---|
| **DAC (Direct Attach Copper)** | SFP28 / QSFP28 | 25Gbps / 100Gbps | 3 meters | Intra-rack host-to-ToR switch connections |
| **MMF (Multi-Mode Fiber)** | LC Duplex | 25Gbps / 100Gbps | 100 meters | Inter-rack or end-of-row switch links |
| **SMF (Single-Mode Fiber)** | LC Duplex | 100Gbps | 10 kilometers | Datacenter-to-datacenter optical trunks |
| **Cat6A RJ45** | RJ45 | 1Gbps / 10Gbps | 100 meters | Dedicated iDRAC / iLO management ports |
| **RS-232 Serial** | RJ45 / DB9 | 115.2 Kbps | 15 meters | Opengear serial console management |

---

## 3. Switch Embedded Teaming (SET)

Azure Local utilizes **Switch Embedded Teaming (SET)** at the Hyper-V vSwitch layer instead of traditional LACP / LAG port channeling.

- **Load Balancing Algorithm**: Dynamic or Hyper-V Port mode.
- **Port Isolation**: Physical ports bound to the SET team are overlaid on the AzLoFlows isometric canvas with a glowing cyan boundary line.
