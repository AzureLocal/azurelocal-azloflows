import GlassPanel from '@/components/ui/GlassPanel';
import { CABLE_MEDIA_CATALOG } from '@/types/cabling';

export default function LegendPanel() {
  return (
    <GlassPanel className="legend-panel" title="Cable Media Legend">
      <div className="legend-list" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {Object.values(CABLE_MEDIA_CATALOG).map((cable) => (
          <div key={cable.id} className="legend-row" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}>
            <span
              style={{
                display: 'inline-block',
                width: '18px',
                height: '3px',
                background: cable.color,
                boxShadow: cable.glow ? `0 0 6px ${cable.color}` : 'none',
                borderRadius: '1px',
              }}
            />
            <span style={{ fontWeight: 600, color: '#e2e8f0' }}>{cable.name.split(' ')[0]}</span>
            <span style={{ fontSize: '10px', color: '#94a3b8' }}>({cable.speedLabel})</span>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}