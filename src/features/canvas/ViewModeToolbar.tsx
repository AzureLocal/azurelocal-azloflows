import { useEditorStore } from '@/state/useEditorStore';
import type { ViewMode } from '@/types/logicalNetwork';

export default function ViewModeToolbar() {
  const viewMode = useEditorStore((state) => state.viewMode ?? 'hybrid');
  const setViewMode = useEditorStore((state) => state.setViewMode);

  const modes: { id: ViewMode; label: string; icon: string }[] = [
    { id: 'physical', label: 'Physical', icon: '🔌' },
    { id: 'logical', label: 'Logical', icon: '🌐' },
    { id: 'hybrid', label: 'Hybrid', icon: '🔀' },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        top: '12px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '4px 6px',
        borderRadius: '8px',
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
      }}
    >
      <span style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '0 6px' }}>
        Layer Mode:
      </span>
      {modes.map((m) => (
        <button
          key={m.id}
          onClick={() => setViewMode(m.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '11px',
            fontWeight: 600,
            padding: '4px 10px',
            borderRadius: '6px',
            cursor: 'pointer',
            border: viewMode === m.id ? '1px solid rgba(0, 229, 255, 0.6)' : '1px solid transparent',
            background: viewMode === m.id ? 'rgba(0, 229, 255, 0.2)' : 'rgba(255, 255, 255, 0.04)',
            color: viewMode === m.id ? '#00e5ff' : '#cbd5e1',
            transition: 'all 0.15s ease',
          }}
        >
          <span>{m.icon}</span>
          <span>{m.label}</span>
        </button>
      ))}
    </div>
  );
}
