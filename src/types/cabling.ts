export type CableMediaType = 'dac' | 'mmf' | 'smf' | 'cat6a' | 'rs232';

export interface CableMediaSpec {
  id: CableMediaType;
  name: string;
  speedLabel: string;
  color: string;
  lineWeight: number;
  dashArray?: number[];
  glow: boolean;
  description: string;
}

export const CABLE_MEDIA_CATALOG: Record<CableMediaType, CableMediaSpec> = {
  dac: {
    id: 'dac',
    name: 'DAC (Direct Attach Copper)',
    speedLabel: '25G / 100G',
    color: '#00d2ff',
    lineWeight: 3,
    glow: true,
    description: 'Direct Attach Copper for short-reach in-rack ToR-to-Host connectivity'
  },
  mmf: {
    id: 'mmf',
    name: 'MMF (Multi-Mode Fiber)',
    speedLabel: '25G / 100G',
    color: '#00f5d4',
    lineWeight: 2.5,
    glow: true,
    description: 'Multi-Mode Fiber (Aqua) for inter-rack ToR-to-Spine uplinks'
  },
  smf: {
    id: 'smf',
    name: 'SMF (Single-Mode Fiber)',
    speedLabel: '100G / 400G',
    color: '#ffea00',
    lineWeight: 2.5,
    glow: true,
    description: 'Single-Mode Fiber (Yellow) for campus backbone and interconnects'
  },
  cat6a: {
    id: 'cat6a',
    name: 'Cat6A RJ45 Copper',
    speedLabel: '1G / 10G',
    color: '#ff9100',
    lineWeight: 2,
    glow: false,
    description: 'Twisted Pair RJ45 for Out-of-Band (OOB) management and iDRAC/iLO'
  },
  rs232: {
    id: 'rs232',
    name: 'RS-232 Serial Rollover',
    speedLabel: '115.2 kbps',
    color: '#e040fb',
    lineWeight: 2,
    dashArray: [6, 4],
    glow: true,
    description: 'Serial console rollover cable for Opengear emergency console access'
  }
};

export function getCableSpec(cableType?: CableMediaType): CableMediaSpec {
  if (!cableType) return CABLE_MEDIA_CATALOG.dac;
  return CABLE_MEDIA_CATALOG[cableType] ?? CABLE_MEDIA_CATALOG.dac;
}
