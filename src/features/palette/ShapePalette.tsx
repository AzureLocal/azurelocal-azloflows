import { useState } from 'react';
import GlassPanel from '@/components/ui/GlassPanel';
import { colorSwatches, paletteShapes } from '@/features/palette/paletteData';
import { HARDWARE_PRESET_STACKS } from '@/features/palette/hardwarePresetStacks';
import PredefinedScenariosPicker from '@/features/scenarios/PredefinedScenariosPicker';
import { useEditorStore } from '@/state/useEditorStore';
import { HARDWARE_PROFILES, type HardwareVendor } from '@/types/hardwareProfiles';

type ActiveTab = 'all' | HardwareVendor | 'presets';

export default function ShapePalette() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('all');
  const preferredColor = useEditorStore((state) => state.preferredColor);
  const setPreferredColor = useEditorStore((state) => state.setPreferredColor);
  const addShape = useEditorStore((state) => state.addShape);

  const filteredHardware = HARDWARE_PROFILES.filter(
    (p) => activeTab === 'all' || p.vendor === activeTab
  );

  return (
    <div className="sidebar-stack">
      <PredefinedScenariosPicker />

      {/* Brand Hardware Filter Tabs */}
      <GlassPanel title="Hardware Catalog">
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '8px' }}>
          {(['all', 'dell', 'arista', 'cisco', 'opengear', 'nvidia', 'presets'] as ActiveTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                fontSize: '10px',
                fontWeight: 600,
                textTransform: 'uppercase',
                padding: '3px 6px',
                borderRadius: '4px',
                background: activeTab === tab ? 'rgba(0, 229, 255, 0.2)' : 'rgba(255,255,255,0.05)',
                color: activeTab === tab ? '#00e5ff' : '#94a3b8',
                border: activeTab === tab ? '1px solid rgba(0, 229, 255, 0.5)' : '1px solid transparent',
                cursor: 'pointer',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'presets' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {HARDWARE_PRESET_STACKS.map((stack) => (
              <button
                key={stack.id}
                onClick={() => {
                  let startY = 100;
                  stack.nodes.forEach((n, i) => {
                    addNode({
                      shape: n.shape || 'vendorSwitch',
                      x: 200,
                      y: startY + i * 90,
                      width: n.width || 320,
                      height: n.height || 80,
                      title: n.title || 'Hardware Node',
                      subtitle: n.subtitle || '',
                      fill: n.fill || '#1e2530',
                      glowColor: n.glowColor || '#007db8',
                      hardwareProfileId: n.hardwareProfileId,
                      tags: n.tags,
                    });
                  });
                }}
                style={{
                  textAlign: 'left',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  padding: '6px 8px',
                  color: '#e2e8f0',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '11px', color: '#00e5ff' }}>{stack.name}</div>
                <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>{stack.description}</div>
              </button>
            ))}
          </div>
        ) : (
          <div className="component-grid" style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {filteredHardware.map((hw) => (
              <button
                key={hw.id}
                className="component-tile"
                draggable
                onDragStart={(event) => {
                  event.dataTransfer.setData('application/x-isoflow-shape', 'node');
                  event.dataTransfer.setData(
                    'application/x-isoflow-template',
                    JSON.stringify({
                      shape: hw.category === 'torSwitch' ? 'vendorSwitch' : hw.category === 'oobSwitch' ? 'oobSwitch' : hw.category === 'opengearConsole' ? 'opengearConsole' : 'serverNode',
                      hardwareProfileId: hw.id,
                      title: hw.model,
                      subtitle: hw.defaultRole || hw.description,
                      fill: hw.primaryColor,
                      glowColor: hw.accentColor,
                    })
                  );
                }}
              >
                <div
                  className="component-tile__icon"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '9px',
                    fontWeight: 700,
                    color: hw.accentColor,
                    borderRadius: '3px',
                    border: `1px solid ${hw.accentColor}`,
                    height: '24px',
                    margin: '0 auto 4px',
                  }}
                >
                  {hw.vendor.toUpperCase()}
                </div>
                <span className="component-tile__label" style={{ fontSize: '10px' }}>{hw.model}</span>
              </button>
            ))}
          </div>
        )}
      </GlassPanel>

      <GlassPanel title="Shapes">
        <div className="component-grid">
          {paletteShapes.map((shape) => (
            <button
              key={shape.id}
              className="component-tile"
              draggable
              onDragStart={(event) => {
                event.dataTransfer.setData('application/x-isoflow-shape', shape.nodeShape ? 'node' : shape.id);
                if (shape.nodeShape) {
                  event.dataTransfer.setData('application/x-isoflow-template', JSON.stringify({ shape: shape.nodeShape }));
                }
              }}
            >
              <div className="component-tile__icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: shape.icon }} />
              <span className="component-tile__label">{shape.title}</span>
            </button>
          ))}
        </div>
      </GlassPanel>

      <GlassPanel title="Palette">
        <div className="swatch-row">
          {colorSwatches.map((color) => (
            <button
              key={color.id}
              className={`swatch ${color.className}${preferredColor === color.value ? ' is-active' : ''}`}
              onClick={() => setPreferredColor(color.value)}
              aria-label={`Select color ${color.value}`}
            />
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}