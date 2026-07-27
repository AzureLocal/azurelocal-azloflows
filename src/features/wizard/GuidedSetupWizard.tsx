import { useState } from 'react';
import { useEditorStore, type WizardTopologyConfig } from '@/state/useEditorStore';

export default function GuidedSetupWizard() {
  const wizardOpen = useEditorStore((state) => state.wizardOpen);
  const setWizardOpen = useEditorStore((state) => state.setWizardOpen);
  const buildWizardTopology = useEditorStore((state) => state.buildWizardTopology);

  const [step, setStep] = useState<number>(1);

  const [nodeCount, setNodeCount] = useState<2 | 4 | 8>(4);
  const [serverModel, setServerModel] = useState<string>('AX-760');
  const [switchModel, setSwitchModel] = useState<string>('Arista 7050SX3');
  const [oobConsole, setOobConsole] = useState<string>('Opengear OM2248');
  const [mgmtVlan, setMgmtVlan] = useState<number>(711);
  const [computeVlan, setComputeVlan] = useState<number>(712);
  const [storageVlan1, setStorageVlan1] = useState<number>(713);
  const [storageVlan2, setStorageVlan2] = useState<number>(714);
  const [mtu, setMtu] = useState<number>(9000);
  const [cableMedia, setCableMedia] = useState<'DAC 25G' | 'MMF 100G'>('DAC 25G');

  if (!wizardOpen) return null;

  const handleFinish = () => {
    const config: WizardTopologyConfig = {
      nodeCount,
      serverModel,
      switchModel,
      oobConsole,
      vlanProfile: {
        mgmtVlan,
        computeVlan,
        storageVlan1,
        storageVlan2,
        mtu,
      },
      cableMedia,
    };
    buildWizardTopology(config);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(10, 15, 26, 0.82)',
        backdropFilter: 'blur(12px)',
        padding: '24px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '820px',
          background: 'linear-gradient(145deg, rgba(20, 30, 48, 0.95), rgba(15, 23, 42, 0.98))',
          border: '1px solid rgba(0, 229, 255, 0.3)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(0, 229, 255, 0.15)',
          borderRadius: '16px',
          padding: '32px',
          color: '#f8fafc',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#00e5ff' }}>
              Azure Local Infrastructure Assistant
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '4px 0 0', color: '#ffffff' }}>
              Guided Architecture Setup Wizard
            </h2>
          </div>
          <button
            onClick={() => setWizardOpen(false)}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#94a3b8',
              borderRadius: '8px',
              padding: '6px 12px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            ✕ Close
          </button>
        </div>

        {/* Step Progress Indicator */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', margin: '8px 0' }}>
          {[
            { id: 1, name: 'Topology' },
            { id: 2, name: 'Servers' },
            { id: 3, name: 'Network' },
            { id: 4, name: 'VLANs & MTU' },
            { id: 5, name: 'Cabling' },
          ].map((s) => (
            <div key={s.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div
                style={{
                  height: '4px',
                  borderRadius: '2px',
                  background: step >= s.id ? 'linear-gradient(90deg, #00e5ff, #3b82f6)' : 'rgba(255,255,255,0.1)',
                  boxShadow: step >= s.id ? '0 0 8px rgba(0, 229, 255, 0.5)' : 'none',
                }}
              />
              <span style={{ fontSize: '11px', color: step >= s.id ? '#00e5ff' : '#64748b', fontWeight: step === s.id ? 700 : 500 }}>
                {s.id}. {s.name}
              </span>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {step === 1 && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 8px', color: '#38bdf8' }}>
                Step 1: Select Cluster Topology Target
              </h3>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 16px' }}>
                Choose the target Azure Local HCI deployment architecture node scale.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                {[
                  { count: 2, title: '2-Node Switchless Cluster', desc: 'Direct back-to-back storage interconnects. Ideal for remote office & edge branches.' },
                  { count: 4, title: '4-Node Dual-ToR HA Cluster', desc: 'Standard enterprise HCI deployment with redundant ToR switches and dual-path SET teaming.' },
                  { count: 8, title: '8-Node High-Density Cluster', desc: 'Enterprise datacenter scale with multi-rack storage fault domains and dedicated OOB console.' },
                ].map((item) => (
                  <div
                    key={item.count}
                    onClick={() => setNodeCount(item.count as 2 | 4 | 8)}
                    style={{
                      padding: '16px',
                      borderRadius: '12px',
                      background: nodeCount === item.count ? 'rgba(0, 229, 255, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                      border: nodeCount === item.count ? '2px solid #00e5ff' : '1px solid rgba(255, 255, 255, 0.1)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ fontSize: '16px', fontWeight: 700, color: nodeCount === item.count ? '#00e5ff' : '#ffffff' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px', lineHeight: 1.4 }}>
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 8px', color: '#38bdf8' }}>
                Step 2: Select OEM Server Hardware Profile
              </h3>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 16px' }}>
                Select validated Dell PowerEdge HCI node hardware for Azure Local deployment.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                {[
                  { model: 'AX-760', specs: '2U Dual-Socket Xeon 4th Gen, 2x 25GbE Mellanox CX6-Lx, iDRAC9 Enterprise', badge: 'Popular Enterprise' },
                  { model: 'AX-660', specs: '1U High-Density Xeon 4th Gen, 2x 25GbE Mellanox CX6-Lx, iDRAC9', badge: 'High Density 1U' },
                  { model: 'AX-770', specs: '2U Dual-Socket Xeon 5th Gen, 4x 100GbE Mellanox CX7, RoCEv2 iDRAC9', badge: 'Next-Gen 100G' },
                  { model: 'AX-670', specs: '1U Compact Xeon 5th Gen, 4x 100GbE Mellanox CX7, RoCEv2 iDRAC9', badge: 'Next-Gen 1U' },
                ].map((item) => (
                  <div
                    key={item.model}
                    onClick={() => setServerModel(item.model)}
                    style={{
                      padding: '16px',
                      borderRadius: '12px',
                      background: serverModel === item.model ? 'rgba(0, 229, 255, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                      border: serverModel === item.model ? '2px solid #00e5ff' : '1px solid rgba(255, 255, 255, 0.1)',
                      cursor: 'pointer',
                      position: 'relative',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '16px', fontWeight: 700, color: serverModel === item.model ? '#00e5ff' : '#ffffff' }}>
                        Dell PowerEdge {item.model}
                      </span>
                      <span style={{ fontSize: '10px', background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                        {item.badge}
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px', lineHeight: 1.4 }}>
                      {item.specs}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 8px', color: '#38bdf8' }}>
                Step 3: Network & Management Infrastructure
              </h3>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 16px' }}>
                Choose ToR Ethernet switches and serial console management servers.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0', marginBottom: '8px' }}>Top-of-Rack (ToR) Switch Pair:</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {[
                      { name: 'Arista 7050SX3', desc: '48x 25GbE SFP28 + 6x 100GbE QSFP28, ultra-low latency MLAG pair' },
                      { name: 'Cisco Nexus 93180YC-FX3', desc: '48x 25GbE SFP28 + 6x 100GbE, vPC dual-ToR HA pair' },
                    ].map((sw) => (
                      <div
                        key={sw.name}
                        onClick={() => setSwitchModel(sw.name)}
                        style={{
                          padding: '14px',
                          borderRadius: '10px',
                          background: switchModel === sw.name ? 'rgba(0, 229, 255, 0.1)' : 'rgba(255,255,255,0.03)',
                          border: switchModel === sw.name ? '2px solid #00e5ff' : '1px solid rgba(255,255,255,0.1)',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{ fontWeight: 700, color: switchModel === sw.name ? '#00e5ff' : '#ffffff' }}>{sw.name}</div>
                        <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>{sw.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0', marginBottom: '8px' }}>Out-of-Band (OOB) Management:</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {[
                      { name: 'Opengear OM2248', desc: '48-Port Serial Console & Management Server with Smart OOB' },
                      { name: '1G OOB Switch', desc: 'Dedicated 48-Port 1GbE RJ45 Management Ethernet Switch' },
                    ].map((oob) => (
                      <div
                        key={oob.name}
                        onClick={() => setOobConsole(oob.name)}
                        style={{
                          padding: '14px',
                          borderRadius: '10px',
                          background: oobConsole === oob.name ? 'rgba(0, 229, 255, 0.1)' : 'rgba(255,255,255,0.03)',
                          border: oobConsole === oob.name ? '2px solid #00e5ff' : '1px solid rgba(255,255,255,0.1)',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{ fontWeight: 700, color: oobConsole === oob.name ? '#00e5ff' : '#ffffff' }}>{oob.name}</div>
                        <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>{oob.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 8px', color: '#38bdf8' }}>
                Step 4: Logical HCI VLAN Profile & MTU Jumbo Frames
              </h3>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 16px' }}>
                Define network traffic isolation VLAN tags and MTU jumbo frame parameters.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Management VLAN ID:</label>
                  <input
                    type="number"
                    value={mgmtVlan}
                    onChange={(e) => setMgmtVlan(Number(e.target.value))}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Compute / VM Traffic VLAN ID:</label>
                  <input
                    type="number"
                    value={computeVlan}
                    onChange={(e) => setComputeVlan(Number(e.target.value))}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Storage 1 (RoCEv2) VLAN ID:</label>
                  <input
                    type="number"
                    value={storageVlan1}
                    onChange={(e) => setStorageVlan1(Number(e.target.value))}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Storage 2 (RoCEv2) VLAN ID:</label>
                  <input
                    type="number"
                    value={storageVlan2}
                    onChange={(e) => setStorageVlan2(Number(e.target.value))}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
                  />
                </div>
              </div>
              <div style={{ marginTop: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Storage MTU (Jumbo Frames):</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {[9000, 1500].map((m) => (
                    <button
                      key={m}
                      onClick={() => setMtu(m)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        background: mtu === m ? 'rgba(0, 229, 255, 0.2)' : 'rgba(255,255,255,0.05)',
                        border: mtu === m ? '1px solid #00e5ff' : '1px solid transparent',
                        color: mtu === m ? '#00e5ff' : '#94a3b8',
                        cursor: 'pointer',
                        fontWeight: 600,
                      }}
                    >
                      MTU {m} {m === 9000 ? '(Recommended Jumbo)' : '(Standard)'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 8px', color: '#38bdf8' }}>
                Step 5: Physical Media Selection & Review
              </h3>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 16px' }}>
                Review topology parameters and select cabling media before generating the diagram.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                {[
                  { media: 'DAC 25G', desc: 'Direct Attach Copper (Passive SFP28 25GbE, 3m/5m)' },
                  { media: 'MMF 100G', desc: 'Multi-Mode Fiber Optic (QSFP28 100GbE SR4, OM4 LC)' },
                ].map((cm) => (
                  <div
                    key={cm.media}
                    onClick={() => setCableMedia(cm.media as any)}
                    style={{
                      padding: '14px',
                      borderRadius: '10px',
                      background: cableMedia === cm.media ? 'rgba(0, 229, 255, 0.1)' : 'rgba(255,255,255,0.03)',
                      border: cableMedia === cm.media ? '2px solid #00e5ff' : '1px solid rgba(255,255,255,0.1)',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontWeight: 700, color: cableMedia === cm.media ? '#00e5ff' : '#ffffff' }}>{cm.media}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>{cm.desc}</div>
                  </div>
                ))}
              </div>

              {/* Summary Box */}
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(0, 229, 255, 0.2)' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#00e5ff', marginBottom: '8px' }}>
                  Architecture Configuration Summary:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px', color: '#cbd5e1' }}>
                  <div>• Cluster Size: <strong>{nodeCount} Nodes</strong></div>
                  <div>• Server Model: <strong>Dell PowerEdge {serverModel}</strong></div>
                  <div>• ToR Switches: <strong>Dual {switchModel}</strong></div>
                  <div>• OOB Console: <strong>{oobConsole}</strong></div>
                  <div>• Mgmt / Compute VLAN: <strong>VLAN {mgmtVlan} / {computeVlan}</strong></div>
                  <div>• Storage VLANs: <strong>VLAN {storageVlan1} / {storageVlan2} (MTU {mtu})</strong></div>
                  <div>• Cabling Media: <strong>{cableMedia}</strong></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button
            disabled={step === 1}
            onClick={() => setStep((s) => s - 1)}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: step === 1 ? '#475569' : '#fff',
              cursor: step === 1 ? 'not-allowed' : 'pointer',
              fontWeight: 600,
            }}
          >
            ← Previous
          </button>

          {step < 5 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              style={{
                padding: '10px 24px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #00e5ff, #3b82f6)',
                border: 'none',
                color: '#0f172a',
                cursor: 'pointer',
                fontWeight: 800,
                boxShadow: '0 0 15px rgba(0, 229, 255, 0.4)',
              }}
            >
              Next Step →
            </button>
          ) : (
            <button
              onClick={handleFinish}
              style={{
                padding: '12px 28px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                fontWeight: 800,
                boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)',
                fontSize: '15px',
              }}
            >
              ⚡ Generate Topology & Open Designer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
