import { useState } from 'react';
import { useEditorStore } from '@/state/useEditorStore';
import LandingHeader from '@/features/landing/LandingHeader';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'docs' | 'changelog' | 'roadmap'>('overview');
  const [docsCategory, setDocsCategory] = useState<'cabling' | 'logical' | 'auditor' | 'exporter'>('cabling');
  const setActiveView = useEditorStore((state) => state.setActiveView);
  const setWizardOpen = useEditorStore((state) => state.setWizardOpen);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at top, #0f172a 0%, #090d16 100%)',
        color: '#f8fafc',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Bar Navigation */}
      <LandingHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Body */}
      <main style={{ flex: 1, maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '40px 24px' }}>
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {/* Hero Section */}
            <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  alignSelf: 'center',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  background: 'rgba(0, 229, 255, 0.1)',
                  border: '1px solid rgba(0, 229, 255, 0.3)',
                  color: '#00e5ff',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                <span>⚡ Version 1.6 Production Ready</span>
              </div>

              <h1
                style={{
                  fontSize: '48px',
                  fontWeight: 900,
                  lineHeight: 1.1,
                  letterSpacing: '-1.5px',
                  margin: 0,
                  background: 'linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Enterprise Azure Local & Hyper-V Network Infrastructure Designer
              </h1>

              <p style={{ fontSize: '18px', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                Design physical node-to-switch topologies, logical HCI VLAN isolation, SET team port cabling, and run automated pre-flight compliance audits before deployment.
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '12px' }}>
                <button
                  onClick={() => setActiveView('designer')}
                  style={{
                    padding: '14px 32px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #00e5ff, #3b82f6)',
                    border: 'none',
                    color: '#0f172a',
                    fontWeight: 900,
                    fontSize: '16px',
                    cursor: 'pointer',
                    boxShadow: '0 0 30px rgba(0, 229, 255, 0.4)',
                    transition: 'transform 0.2s ease',
                  }}
                >
                  🚀 Launch Architecture Designer
                </button>

                <button
                  onClick={() => setWizardOpen(true)}
                  style={{
                    padding: '14px 28px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(0, 229, 255, 0.4)',
                    color: '#00e5ff',
                    fontWeight: 800,
                    fontSize: '15px',
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  🧙 Start Guided Setup Wizard
                </button>
              </div>
            </div>

            {/* Feature Highlights Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              {[
                {
                  icon: '🖥️',
                  title: 'OEM Hardware Catalog',
                  desc: 'Validated hardware profiles for Dell PowerEdge AX-760, AX-660, AX-770, AX-670, Arista 7050SX3, Cisco Nexus 9300, and Opengear OM2248 console servers.',
                },
                {
                  icon: '🔌',
                  title: 'Physical Port Cabling Geometry',
                  desc: 'Accurate SFP28 / QSFP28 port anchor positioning, cable media specifications (DAC, MMF, SMF, Cat6A, RS-232), and SET team glowing overlays.',
                },
                {
                  icon: '🌐',
                  title: 'Multi-Layer View Modes',
                  desc: 'Toggle seamlessly between [ 🔌 Physical ], [ 🌐 Logical ], and [ 🔀 Hybrid ] view modes to isolate cabling vs HCI VLAN 711-714 subnet boundaries.',
                },
                {
                  icon: '🛡️',
                  title: 'Pre-Flight Compliance Auditor',
                  desc: 'Automated compliance rule engine checking dual-ToR redundancy, storage MTU 9000 jumbo frames, SET team port balance, and OOB management connectivity.',
                },
                {
                  icon: '📊',
                  title: 'Cabling & Port Map Exports',
                  desc: 'Export Technician Cabling Schedules in CSV format and Switch Port Map specs in TXT format for seamless datacenter deployment handoff.',
                },
                {
                  icon: '🧙',
                  title: 'Guided Setup Wizard',
                  desc: '5-step interactive wizard assistant generating pre-wired, pre-validated Azure Local cluster topologies in seconds.',
                },
              ].map((feat, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ fontSize: '28px' }}>{feat.icon}</div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#f1f5f9' }}>{feat.title}</h3>
                  <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HOW-TO & DOCUMENTATION TAB */}
        {activeTab === 'docs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 8px', color: '#00e5ff' }}>
                AzLoFlows Documentation & Technical Standards Guide
              </h2>
              <p style={{ fontSize: '15px', color: '#94a3b8', margin: 0 }}>
                Comprehensive reference guides for Azure Local physical network wiring, logical HCI VLAN isolation, and auditor validation rules.
              </p>
            </div>

            {/* Docs Sub-tabs */}
            <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
              {[
                { id: 'cabling', label: '🔌 Physical Cabling Standards' },
                { id: 'logical', label: '🌐 Logical HCI VLANs' },
                { id: 'auditor', label: '🛡️ Pre-Flight Auditor Rules' },
                { id: 'exporter', label: '📊 Exporter Workflows' },
              ].map((dt) => (
                <button
                  key={dt.id}
                  onClick={() => setDocsCategory(dt.id as any)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '8px',
                    background: docsCategory === dt.id ? 'rgba(0, 229, 255, 0.15)' : 'transparent',
                    border: docsCategory === dt.id ? '1px solid rgba(0, 229, 255, 0.4)' : '1px solid transparent',
                    color: docsCategory === dt.id ? '#00e5ff' : '#94a3b8',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  {dt.label}
                </button>
              ))}
            </div>

            {/* Docs Content Area */}
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '32px' }}>
              {docsCategory === 'cabling' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', lineHeight: 1.6 }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#38bdf8', margin: 0 }}>
                    Physical Node-to-Switch Cabling Architecture
                  </h3>
                  <p style={{ color: '#cbd5e1', margin: 0 }}>
                    Azure Local HCI host nodes require high-availability physical connectivity across redundant Top-of-Rack (ToR) switches to ensure fault tolerance against switch failures or firmware maintenance.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <h4 style={{ color: '#00e5ff', margin: '0 0 8px' }}>Dual-ToR Cross-Connect Requirement</h4>
                      <ul style={{ paddingLeft: '20px', margin: 0, color: '#94a3b8', fontSize: '13px' }}>
                        <li>pNIC1 on Host Node connects to ToR Switch A (SFP28 / QSFP28 port).</li>
                        <li>pNIC2 on Host Node connects to ToR Switch B.</li>
                        <li>Ensures zero-downtime failover via Switch Embedded Teaming (SET).</li>
                      </ul>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <h4 style={{ color: '#00e5ff', margin: '0 0 8px' }}>Out-of-Band (OOB) & Serial Console</h4>
                      <ul style={{ paddingLeft: '20px', margin: 0, color: '#94a3b8', fontSize: '13px' }}>
                        <li>Dedicated iDRAC / iLO RJ45 Cat6A connection to OOB switch.</li>
                        <li>Serial RS-232 connections wired to Opengear console manager.</li>
                        <li>Enables remote bare-metal provisioning and power control.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {docsCategory === 'logical' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', lineHeight: 1.6 }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#38bdf8', margin: 0 }}>
                    Logical Network Isolation & HCI VLAN Profile
                  </h3>
                  <p style={{ color: '#cbd5e1', margin: 0 }}>
                    Traffic isolation is enforced at the network level using dedicated VLAN tags and Subnet CIDRs for Management, Compute, and Storage RoCEv2 traffic.
                  </p>

                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: 'rgba(255,255,255,0.05)', color: '#00e5ff', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <th style={{ padding: '10px' }}>Network Traffic Type</th>
                        <th style={{ padding: '10px' }}>Default VLAN ID</th>
                        <th style={{ padding: '10px' }}>MTU Requirement</th>
                        <th style={{ padding: '10px' }}>Description</th>
                      </tr>
                    </thead>
                    <tbody style={{ color: '#cbd5e1' }}>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '10px', fontWeight: 700 }}>Management Network</td>
                        <td style={{ padding: '10px' }}>VLAN 711</td>
                        <td style={{ padding: '10px' }}>MTU 1500</td>
                        <td style={{ padding: '10px' }}>Host OS management, Arc agent, & WAC communication</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '10px', fontWeight: 700 }}>Compute / VM Traffic</td>
                        <td style={{ padding: '10px' }}>VLAN 712</td>
                        <td style={{ padding: '10px' }}>MTU 1500 / 9000</td>
                        <td style={{ padding: '10px' }}>Virtual Machine tenant networks & Hyper-V vSwitch</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '10px', fontWeight: 700 }}>Storage 1 (RoCEv2)</td>
                        <td style={{ padding: '10px' }}>VLAN 713</td>
                        <td style={{ padding: '10px', color: '#10b981', fontWeight: 700 }}>MTU 9000 (Jumbo)</td>
                        <td style={{ padding: '10px' }}>Storage Spaces Direct (S2D) RDMA fabric 1</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '10px', fontWeight: 700 }}>Storage 2 (RoCEv2)</td>
                        <td style={{ padding: '10px' }}>VLAN 714</td>
                        <td style={{ padding: '10px', color: '#10b981', fontWeight: 700 }}>MTU 9000 (Jumbo)</td>
                        <td style={{ padding: '10px' }}>Storage Spaces Direct (S2D) RDMA fabric 2</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {docsCategory === 'auditor' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', lineHeight: 1.6 }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#38bdf8', margin: 0 }}>
                    Pre-Flight Compliance Auditor Engine Rules
                  </h3>
                  <p style={{ color: '#cbd5e1', margin: 0 }}>
                    The compliance auditor validates diagram topologies in real time and highlights misconfigurations with pulsating canvas badges.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { code: 'RULE-TOR-REDUNDANCY', type: '🔴 ERROR', desc: 'Flags host nodes connected to only a single ToR switch. Dual-ToR cross-connect is mandatory.' },
                      { code: 'RULE-MTU-JUMBO', type: '🟡 WARNING', desc: 'Flags Storage/RDMA paths configured with MTU 1500 instead of Jumbo Frames MTU 9000.' },
                      { code: 'RULE-SET-PORT-BALANCE', type: '🟡 WARNING', desc: 'Verifies that physical ports in a SET team cross-connect to separate physical switches.' },
                      { code: 'RULE-VLAN-ALIGNMENT', type: '🔴 ERROR', desc: 'Detects mismatched VLAN tags between hosts and switch trunk ports.' },
                      { code: 'RULE-OOB-MANAGEMENT', type: 'ℹ️ INFO', desc: 'Verifies server nodes have iDRAC/iLO ports wired to 1G OOB switches or Opengear console servers.' },
                    ].map((rule) => (
                      <div key={rule.code} style={{ background: 'rgba(0,0,0,0.3)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 800, color: '#00e5ff', fontSize: '14px' }}>{rule.code}</span>
                          <span style={{ fontSize: '12px', fontWeight: 700 }}>{rule.type}</span>
                        </div>
                        <p style={{ fontSize: '13px', color: '#94a3b8', margin: '4px 0 0' }}>{rule.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {docsCategory === 'exporter' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', lineHeight: 1.6 }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#38bdf8', margin: 0 }}>
                    Cabling Schedule & Switch Port Map Exports
                  </h3>
                  <p style={{ color: '#cbd5e1', margin: 0 }}>
                    Generate production-ready handoff documentation for datacenter technicians and network engineers directly from the top menu.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <h4 style={{ color: '#10b981', margin: '0 0 8px' }}>📄 Cabling Schedule (CSV)</h4>
                      <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
                        Exports a complete cable manifest containing Cable ID, Source Node, Source Port, Target Switch, Target Port, Cable Media (DAC/MMF/Cat6A), Speed (Gbps), and VLAN tag for physical installation technicians.
                      </p>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <h4 style={{ color: '#10b981', margin: '0 0 8px' }}>📑 Switch Port Map (TXT)</h4>
                      <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
                        Exports switch port allocation specifications formatted for network engineers configuring Arista eAPI or Cisco NX-OS trunk profiles.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CHANGELOG TAB */}
        {activeTab === 'changelog' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 8px', color: '#00e5ff' }}>
                Release History & Feature Timeline
              </h2>
              <p style={{ fontSize: '15px', color: '#94a3b8', margin: 0 }}>
                Milestones completed across Phase 1 through Phase 5 development.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { version: 'v1.6 (Phase 5)', date: 'July 2026', title: 'Reporting & Schedule Exporters', points: ['Cabling Schedule CSV exporter for datacenter wiring technicians', 'Switch Port Map TXT spec exporter for network engineers', 'Top menu export actions & file download integration'] },
                { version: 'v1.4 (Phase 4)', date: 'July 2026', title: 'Pre-Flight Auditor Rules Engine', points: ['Real-time compliance engine inspecting 5 core validation rules', 'Pulsating 🔴 Error and 🟡 Warning badges over canvas elements', 'Collapsible audit drawer UI with quick "Select & Fix" handlers'] },
                { version: 'v1.3 (Phase 3)', date: 'July 2026', title: 'Multi-Layer View Modes & Subnet Badges', points: ['View mode toolbar: [ 🔌 Physical ], [ 🌐 Logical ], [ 🔀 Hybrid ]', 'HCI VLAN profile tags (VLAN 711-714) and CIDR subnets', 'Jumbo Frames MTU 9000 indicators'] },
                { version: 'v1.2 (Phase 2)', date: 'July 2026', title: 'Port Cabling Geometry & Cable Catalog', points: ['SFP28 / QSFP28 port anchor positioning on isometric nodes', 'Cable Media catalog (DAC 25G, MMF 100G, Cat6A, RS-232)', 'SET team glowing overlays & inspector cable controls'] },
                { version: 'v1.0 (Phase 1)', date: 'July 2026', title: 'OEM Hardware Catalog & Isometric Renderer', points: ['Dell PowerEdge AX-760, AX-660, AX-770, AX-670 hardware profiles', 'Arista 7050SX3, Cisco Nexus 9300, Opengear OM2248 custom renderers', 'Brand hardware palette tabs & preset stack insertion'] },
              ].map((rel) => (
                <div key={rel.version} style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '16px', fontWeight: 800, color: '#00e5ff' }}>{rel.version} — {rel.title}</span>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>{rel.date}</span>
                  </div>
                  <ul style={{ paddingLeft: '20px', margin: '8px 0 0', color: '#cbd5e1', fontSize: '13px', lineHeight: 1.5 }}>
                    {rel.points.map((p, idx) => <li key={idx}>{p}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ROADMAP TAB */}
        {activeTab === 'roadmap' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 8px', color: '#00e5ff' }}>
                AzLoFlows Architecture Roadmap
              </h2>
              <p style={{ fontSize: '15px', color: '#94a3b8', margin: 0 }}>
                Upcoming features and platform integrations planned for future releases.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {[
                { quarter: 'Q3 2026', title: '🔮 Azure Bicep & ARM Generator', desc: 'Automatically export Azure Local deployment template artifacts (`infra.bicep` and `parameters.json`) directly from verified diagram state.' },
                { quarter: 'Q3 2026', title: '⚡ Azure DevOps Pipeline Extension', desc: 'CI/CD task to automatically run Pre-Flight Compliance Auditor during ADO pull requests containing architecture changes.' },
                { quarter: 'Q4 2026', title: '📡 Live Telemetry & SNMP Sync', desc: 'Sync live link speed and power status from Dell iDRAC eAPI and Arista eAPI telemetry directly into the canvas.' },
                { quarter: 'Q4 2026', title: '🗺️ Multi-Rack Datacenter Layout', desc: 'Expand isometric canvas to support multi-row datacenter floor racks and inter-rack fiber trunking.' },
              ].map((item, i) => (
                <div key={i} style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(0, 229, 255, 0.2)', borderRadius: '14px', padding: '20px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.quarter}</span>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', margin: '4px 0 8px' }}>{item.title}</h3>
                  <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
