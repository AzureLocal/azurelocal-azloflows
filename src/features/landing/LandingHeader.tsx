import { useEditorStore } from '@/state/useEditorStore';

interface LandingHeaderProps {
  activeTab: 'overview' | 'docs' | 'changelog' | 'roadmap';
  setActiveTab: (tab: 'overview' | 'docs' | 'changelog' | 'roadmap') => void;
}

export default function LandingHeader({ activeTab, setActiveTab }: LandingHeaderProps) {
  const setActiveView = useEditorStore((state) => state.setActiveView);
  const setWizardOpen = useEditorStore((state) => state.setWizardOpen);
  const theme = useEditorStore((state) => state.theme);
  const toggleTheme = useEditorStore((state) => state.toggleTheme);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(10, 15, 26, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Brand Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setActiveTab('overview')}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #00e5ff, #3b82f6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(0, 229, 255, 0.4)',
            fontSize: '18px',
            fontWeight: 900,
            color: '#0f172a',
          }}
        >
          ⚡
        </div>
        <div>
          <div style={{ fontSize: '18px', fontWeight: 900, letterSpacing: '-0.5px', color: '#ffffff' }}>
            AzLoFlows
          </div>
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#00e5ff', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Azure Local Architecture Portal
          </div>
        </div>
      </div>

      {/* Nav Tabs */}
      <nav style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '4px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'docs', label: 'How-To & Docs' },
          { id: 'changelog', label: 'Changelog' },
          { id: 'roadmap', label: 'Roadmap' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === tab.id ? 'rgba(0, 229, 255, 0.15)' : 'transparent',
              color: activeTab === tab.id ? '#00e5ff' : '#94a3b8',
              fontWeight: activeTab === tab.id ? 700 : 500,
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={toggleTheme}
          title="Toggle Theme"
          style={{
            padding: '8px 12px',
            borderRadius: '8px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#cbd5e1',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>

        <button
          onClick={() => setWizardOpen(true)}
          style={{
            padding: '10px 18px',
            borderRadius: '8px',
            background: 'rgba(0, 229, 255, 0.1)',
            border: '1px solid rgba(0, 229, 255, 0.4)',
            color: '#00e5ff',
            fontWeight: 700,
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          🧙 Guided Setup Wizard
        </button>

        <button
          onClick={() => setActiveView('designer')}
          style={{
            padding: '10px 22px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #00e5ff, #3b82f6)',
            border: 'none',
            color: '#0f172a',
            fontWeight: 900,
            fontSize: '13px',
            cursor: 'pointer',
            boxShadow: '0 0 20px rgba(0, 229, 255, 0.3)',
            transition: 'all 0.2s ease',
          }}
        >
          🚀 Launch Designer
        </button>
      </div>
    </header>
  );
}
