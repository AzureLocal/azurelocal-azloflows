import { useEditorStore } from '@/state/useEditorStore';

export type LandingTab = 'home' | 'about' | 'docs';

interface LandingHeaderProps {
  activeTab: LandingTab;
  setActiveTab: (tab: LandingTab) => void;
}

export default function LandingHeader({ activeTab, setActiveTab }: LandingHeaderProps) {
  const setActiveView = useEditorStore((state) => state.setActiveView);
  const setWizardOpen = useEditorStore((state) => state.setWizardOpen);
  const theme = useEditorStore((state) => state.theme);
  const toggleTheme = useEditorStore((state) => state.toggleTheme);

  const isLight = theme === 'light';

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: isLight ? 'rgba(255, 255, 255, 0.92)' : 'rgba(10, 15, 26, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)',
        padding: '14px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Brand Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setActiveTab('home')}>
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
          <div style={{ fontSize: '18px', fontWeight: 900, letterSpacing: '-0.5px', color: isLight ? '#0f172a' : '#ffffff' }}>
            Draftsman
          </div>
          <div style={{ fontSize: '10px', fontWeight: 700, color: isLight ? '#0284c7' : '#00e5ff', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Azure Local & Hyper-V Studio
          </div>
        </div>
      </div>

      {/* Main Nav Tabs: Home, About, How-To & Docs */}
      <nav style={{ display: 'flex', gap: '8px', background: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.03)', padding: '4px', borderRadius: '10px', border: isLight ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.06)' }}>
        {[
          { id: 'home', label: '🏠 Home' },
          { id: 'about', label: 'ℹ️ About' },
          { id: 'docs', label: '📚 How-To & Docs' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as LandingTab)}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === tab.id ? (isLight ? 'rgba(2, 132, 199, 0.12)' : 'rgba(0, 229, 255, 0.15)') : 'transparent',
              color: activeTab === tab.id ? (isLight ? '#0284c7' : '#00e5ff') : (isLight ? '#475569' : '#94a3b8'),
              fontWeight: activeTab === tab.id ? 700 : 500,
              fontSize: '14px',
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
