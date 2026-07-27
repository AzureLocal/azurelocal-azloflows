# Cabling Schedule CSV & Switch Port Map Exporters

AzLoFlows allows datacenter engineers to export production-ready installation manifests directly from diagram topologies.

---

## 1. Cabling Schedule (CSV)

The **Cabling Schedule CSV** export provides a line-by-line physical cable manifest for datacenter technicians wiring racks.

### Export Format Columns

1. `Cable ID` (e.g. `CBL-1001`)
2. `Source Entity` (e.g. `Node-1 (Dell AX-760)`)
3. `Source Port` (e.g. `pNIC1 / Port 1`)
4. `Destination Switch` (e.g. `Arista 7050SX3 (ToR-A)`)
5. `Destination Port` (e.g. `Ethernet1`)
6. `Cable Media` (e.g. `25GbE DAC`, `100GbE MMF`)
7. `VLAN Tag` (e.g. `VLAN 711`)

---

## 2. Switch Port Provisioning Map (TXT)

The **Switch Port Map TXT** export formats port allocations for network engineers configuring switch CLI trunk profiles (Arista EOS / Cisco NX-OS).
