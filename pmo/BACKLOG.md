# Azure Local Draftsman Product Backlog & Expansion Strategy

This document tracks planned feature epics, architectural enhancements, and expansion initiatives for **Azure Local Draftsman**. While current releases (v1.0 – v1.6) focus on Azure Local physical node cabling, logical HCI VLAN profiles, and pre-flight auditor compliance, the platform vision extends across full-stack enterprise architecture, application flowcharts, storage arrays, security appliances, and automated deployment code generation.

---

## Epic 1: Flowchart & Business Logic Diagramming Engine

**Goal:** Expand the 2.5D isometric canvas beyond infrastructure networking into business process modeling, decision flowcharts, microservice event routing, and data pipelines.

- **[ITEM-101] Isometric Decision Diamonds & Condition Splitters**
  - Add 2.5D isometric diamond nodes with customizable boolean logic branches (`True` / `False` / `Default`).
  - Render condition tags along isometric connector paths with animated pulse signals.
- **[ITEM-102] Data Pipeline & Event Streaming Nodes**
  - Custom isometric renderers for Apache Kafka, Azure Event Hubs, RabbitMQ, and Redis Pub/Sub brokers.
  - Animated particle flow simulation representing queue message throughput and consumer group subscriptions.
- **[ITEM-103] Microservices & API Gateway Shapes**
  - Pod cluster boundaries with autoscaling replica count badges.
  - Ingress controller / Envoy API Gateway isometric shapes with SSL termination badges.
- **[ITEM-104] Interactive Flowchart Swimlane Areas**
  - Isometric swimlanes for multi-department process routing (e.g. `Client App` -> `API Gateway` -> `Auth Service` -> `Database`).

---

## Epic 2: Multi-Vendor Hardware & Storage Appliance Catalog

**Goal:** Expand OEM hardware profiles beyond Dell PowerEdge servers and Arista/Cisco switches to cover enterprise SAN/NAS storage, security firewalls, and power infrastructure.

- **[ITEM-201] Enterprise Storage Array Catalog**
  - **Pure Storage FlashArray //X & //C**: Isometric 3U array renderer with NVMe-oF and iSCSI target ports.
  - **Dell PowerStore & PowerScale (Isilon)**: Isometric storage controller chassis renderer.
  - **NetApp FAS / AFF Series**: Dual-controller HA pair isometric nodes with FC and NFS/SMB port anchors.
- **[ITEM-202] Security & Firewall Appliance Catalog**
  - **Palo Alto Networks PA-3400 / PA-5400**: High-availability firewall pair renderer with HA1/HA2 interconnects.
  - **Fortinet FortiGate 1000F Series**: Next-gen security gateway shapes with dedicated management ports.
  - **F5 BIG-IP LTM / ASM**: Application delivery controller shapes with virtual server IP badges.
- **[ITEM-203] Datacenter Power & UPS Rack Hardware**
  - **APC / Eaton Smart-UPS Online**: 3U rackmount UPS shapes with battery runtime indicators.
  - **Smart Metered PDUs**: Metered PDU strip overlays showing kW load and phase balance.
- **[ITEM-204] Expanded OEM Server Hardware**
  - **HPE ProLiant DL380 / DL360 Gen11**: Gen11 HCI node shapes with iLO6 port anchors.
  - **Lenovo ThinkSystem SR650 V3**: 2U dual-socket HCI node shapes with XClarity controller.

---

## Epic 3: Advanced Real-Time Flow Simulation & Telemetry

**Goal:** Transform static architecture diagrams into dynamic, real-time telemetry dashboards and network traffic simulators.

- **[ITEM-301] Live Animated Packet & Flow Simulator**
  - Simulate active HTTP/S, SMB3, NVMe-oF, and RoCEv2 traffic along connector paths with configurable packet rates (packets/sec).
  - Visual traffic congestion heatmaps highlighting link utilization bottlenecks.
- **[ITEM-302] Dell iDRAC eAPI & Arista Telemetry Sync**
  - Sync real-time link speed, port status (Up/Down), and thermal stats via REST/gRPC.
  - Automatically flag disconnected physical cables on the canvas during outage events.
- **[ITEM-303] Bandwidth Capacity & Oversubscription Calculator**
  - Calculate aggregate uplink bandwidth from host nodes to ToR switches (e.g. 4x 25GbE = 100Gbps total host throughput).
  - Warn when ToR-to-Spine oversubscription exceeds 4:1 ratio.

---

## Epic 4: Infrastructure as Code (IaC) & Deployment Automation

**Goal:** Automatically compile verified isometric diagrams into executable Infrastructure as Code templates and CI/CD pipeline steps.

- **[ITEM-401] Azure Bicep & ARM Template Exporter**
  - Compile diagram state into production-grade `infra.bicep` for Azure Local cluster deployment.
  - Generate virtual network definitions (`Microsoft.AzureStackHCI/logicalNetworks`) and storage network intents.
- **[ITEM-402] Terraform HCL Provider Generator**
  - Export `main.tf` files for AzAPI / AzureRM Terraform providers matching diagram nodes and VLAN subnets.
- **[ITEM-403] Azure DevOps Pipeline Audit Extension**
  - Custom ADO pipeline task to run `auditDiagramDocument()` in CI/CD build pipelines before PRs merge.
- **[ITEM-404] Visio (.vsdx) & Draw.io XML Exporter**
  - Native export converter to Microsoft Visio (.vsdx) and Draw.io XML formats preserving layer grouping.

---

## Epic 5: Predefined Industry Scenarios & Architecture Templates

**Goal:** Provide turnkey reference architecture templates for complex enterprise deployment scenarios.

- **[ITEM-501] Hybrid Cloud Disaster Recovery (Azure Site Recovery)**
  - Pre-wired 4-Node Azure Local cluster connected to Azure West US 2 recovery region via ExpressRoute / VPN.
- **[ITEM-502] AI / ML GPU Training Cluster**
  - NVIDIA H100 / H200 SXM5 server stack with 800Gbps InfiniBand Quantum-2 switch fabric.
- **[ITEM-503] Edge Micro-Datacenter (Single 15U Enclosure)**
  - Compact 2-node switchless cluster with 1U OOB switch and APC UPS in a ruggedized wall-mount rack.
