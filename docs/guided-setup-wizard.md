# Guided 5-Step Architecture Setup Wizard

The **Guided Setup Wizard** allows users to synthesize pre-validated Azure Local cluster topologies in 5 simple steps.

---

## Wizard Step Breakdown

1. **Step 1: Topology Target**
   - Select cluster scale (2-Node Switchless, 4-Node Dual-ToR HA, or 8-Node Stretched Cluster).
2. **Step 2: Server Hardware**
   - Select Dell PowerEdge HCI server nodes (AX-760, AX-660, AX-770, AX-670).
3. **Step 3: Network & OOB Stack**
   - Select ToR switch pairs (Arista 7050SX3, Cisco Nexus 93180, Dell S5248F/S5224F, Nvidia SN2100) and OOB management (Opengear OM2248/CM8148, Dell N3248TE/S3148P).
4. **Step 4: Logical HCI VLAN Profile**
   - Configure VLAN IDs for Management (711), Compute (712), Storage 1 (713), and Storage 2 (714) with MTU 9000.
5. **Step 5: Physical Cabling Media**
   - Choose DAC 25G copper or MMF 100G fiber interconnects.
