import React from 'react';
import { Activity, Disc3, Zap } from 'lucide-react';

export type AICoreStatus = 'READY' | 'BUSY' | 'OFFLINE' | 'ERROR';

interface DarkMatterCoreProps {
  status?: AICoreStatus;
  activityLabel?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  providerName?: string;
  telemetryMode?: boolean;
  onClick?: () => void;
  className?: string;
}

export function DarkMatterCore({
  status = 'READY',
  activityLabel,
  size = 'md',
  providerName = 'Gemini 2.5 Flash',
  telemetryMode = true,
  onClick,
  className = '',
}: DarkMatterCoreProps) {
  // Dimensions per size
  const dimMap = {
    sm: {
      container: 'w-12 h-12',
      singularity: 'w-5 h-5',
      photonRing: 'w-6 h-6',
      accretion: 'w-11 h-11',
      telemetry: 'w-12 h-12',
      iconSize: 'w-2.5 h-2.5',
    },
    md: {
      container: 'w-28 h-28',
      singularity: 'w-12 h-12',
      photonRing: 'w-14 h-14',
      accretion: 'w-24 h-24',
      telemetry: 'w-28 h-28',
      iconSize: 'w-4 h-4',
    },
    lg: {
      container: 'w-48 h-48',
      singularity: 'w-20 h-20',
      photonRing: 'w-24 h-24',
      accretion: 'w-40 h-40',
      telemetry: 'w-48 h-48',
      iconSize: 'w-6 h-6',
    },
    xl: {
      container: 'w-64 h-64',
      singularity: 'w-28 h-28',
      photonRing: 'w-32 h-32',
      accretion: 'w-56 h-56',
      telemetry: 'w-64 h-64',
      iconSize: 'w-8 h-8',
    },
    hero: {
      container: 'w-72 sm:w-80 md:w-96 h-72 sm:h-80 md:h-96',
      singularity: 'w-36 sm:w-44 md:w-52 h-36 sm:h-44 md:h-52',
      photonRing: 'w-40 sm:w-48 md:w-56 h-40 sm:h-48 md:h-56',
      accretion: 'w-64 sm:w-72 md:w-84 h-64 sm:h-72 md:h-84',
      telemetry: 'w-72 sm:w-80 md:w-96 h-72 sm:h-80 md:h-96',
      iconSize: 'w-10 h-10',
    },
  };

  const dims = dimMap[size];

  // Visual palettes based on real engine status
  const config = {
    READY: {
      themeColor: 'var(--dm-accent, #38bdf8)',
      glow: 'var(--dm-accent-glow, rgba(56, 189, 248, 0.45))',
      photonBorder: 'border-cyan-300',
      statusText: 'READY',
      subText: providerName || 'Quantum Neural Link Stable',
      freq: '14.8 THz',
      temp: '2.7 K [NOMINAL]',
      badgeClass: 'bg-cyan-950/70 text-cyan-300 border-cyan-500/40 shadow-cyan-950/50',
      dotClass: 'bg-emerald-400 shadow-[0_0_8px_#34d399]',
      glowColorHex: '#34d399',
    },
    BUSY: {
      themeColor: '#f59e0b',
      glow: 'rgba(245, 158, 11, 0.6)',
      photonBorder: 'border-amber-300',
      statusText: 'BUSY',
      subText: activityLabel || 'Generating Creative Tensor Fields...',
      freq: '48.2 THz [OVERCLOCK]',
      temp: '840 K [RELATIVISTIC]',
      badgeClass: 'bg-amber-950/80 text-amber-300 border-amber-500/60 shadow-amber-950/80',
      dotClass: 'bg-amber-400 animate-ping',
      glowColorHex: '#f59e0b',
    },
    OFFLINE: {
      themeColor: '#64748b',
      glow: 'rgba(100, 116, 139, 0.1)',
      photonBorder: 'border-slate-600',
      statusText: 'OFFLINE',
      subText: 'Standby Mode / Awaiting Signal',
      freq: '0.0 THz',
      temp: '0.1 K [DORMANT]',
      badgeClass: 'bg-slate-900 text-slate-400 border-slate-800',
      dotClass: 'bg-slate-600',
      glowColorHex: '#64748b',
    },
    ERROR: {
      themeColor: '#f43f5e',
      glow: 'rgba(244, 63, 94, 0.5)',
      photonBorder: 'border-rose-400',
      statusText: 'ERROR',
      subText: activityLabel || 'Gravitational Wave Instability',
      freq: 'ERR: PHASE_MISMATCH',
      temp: '1420 K [CRITICAL]',
      badgeClass: 'bg-rose-950/80 text-rose-300 border-rose-500/60',
      dotClass: 'bg-rose-400 animate-pulse',
      glowColorHex: '#f43f5e',
    },
  }[status];

  // If HERO mode (Central Cockpit Viewport matching reference image)
  if (size === 'hero') {
    return (
      <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
        {/* Accretion Disk / Outer Luminous Rings */}
        <div className="relative w-80 sm:w-96 md:w-[440px] h-80 sm:h-96 md:h-[440px] flex items-center justify-center">
          {/* 1. Deep Space Gravitational Lensing Halo */}
          <div
            className="absolute inset-0 rounded-full blur-2xl opacity-80 pointer-events-none transition-all duration-700"
            style={{
              background: `radial-gradient(circle, var(--dm-accent-glow, rgba(56, 189, 248, 0.35)) 0%, rgba(139, 92, 246, 0.25) 45%, transparent 75%)`,
            }}
          />

          {/* 2. Vertical Relativistic Plasma Column / Lightning Beam */}
          <div className="absolute top-[-30px] bottom-[-30px] w-2.5 sm:w-3.5 z-0 pointer-events-none flex flex-col items-center">
            {/* Core lightning line */}
            <div
              className="w-full h-full animate-pulse opacity-90"
              style={{
                background: `linear-gradient(to bottom, transparent 0%, #38bdf8 20%, #a855f7 50%, #38bdf8 80%, transparent 100%)`,
                boxShadow: `0 0 20px #38bdf8, 0 0 40px #a855f7`,
                filter: 'blur(1px)',
              }}
            />
            {/* Intense central laser filament */}
            <div className="absolute inset-0 mx-auto w-[1.5px] bg-white opacity-95 blur-[0.5px]" />
          </div>

          {/* 3. Outer Relativistic Accretion Ring (Electric Violet / Cyan Swirl) */}
          <div
            className="absolute w-72 sm:w-80 md:w-[380px] h-72 sm:h-80 md:h-[380px] rounded-full pointer-events-none animate-orbital"
            style={{
              background: `conic-gradient(from 0deg, var(--dm-accent, #38bdf8) 0deg, rgba(168, 85, 247, 0.9) 110deg, transparent 180deg, rgba(56, 189, 248, 0.8) 260deg, var(--dm-accent, #38bdf8) 360deg)`,
              filter: 'blur(2px)',
              transform: 'scaleY(0.48) rotate(-18deg)',
              opacity: 0.85,
            }}
          />

          {/* 4. Secondary Fiery Golden/Orange Accretion Ring (Relativistic Doppler Beaming) */}
          <div
            className="absolute w-64 sm:w-72 md:w-[340px] h-64 sm:h-72 md:h-[340px] rounded-full pointer-events-none animate-orbital-reverse"
            style={{
              background: `conic-gradient(from 120deg, #f97316 0deg, #fbbf24 60deg, transparent 150deg, #ea580c 240deg, #f97316 360deg)`,
              filter: 'blur(1.5px)',
              transform: 'scaleY(0.42) rotate(22deg)',
              opacity: 0.9,
            }}
          />

          {/* 5. Floating Asteroid / Dark Matter Debris Field */}
          <div className="absolute inset-0 pointer-events-none animate-orbital" style={{ animationDuration: '45s' }}>
            <div className="absolute top-[22%] left-[16%] w-2 h-2 rounded-full bg-slate-400/80 shadow-[0_0_6px_#38bdf8]" />
            <div className="absolute top-[28%] right-[14%] w-1.5 h-1.5 rounded-full bg-amber-200/90 shadow-[0_0_8px_#f59e0b]" />
            <div className="absolute bottom-[24%] left-[22%] w-2.5 h-1.5 rounded bg-slate-300/70 rotate-45 shadow-[0_0_5px_#a855f7]" />
            <div className="absolute bottom-[20%] right-[25%] w-1.5 h-1.5 rounded-full bg-cyan-300/80 shadow-[0_0_6px_#38bdf8]" />
            <div className="absolute top-[48%] left-[6%] w-3 h-2 rounded-sm bg-slate-500/80 rotate-12" />
            <div className="absolute top-[52%] right-[8%] w-2 h-2 rounded-full bg-amber-300/80" />
          </div>

          {/* 6. Glowing Photon Ring (Thin Razor Edge Surrounding the Singularity) */}
          <div
            className="absolute w-44 sm:w-52 md:w-60 h-44 sm:h-52 md:h-60 rounded-full border border-cyan-300/80 animate-event-horizon pointer-events-none"
            style={{
              boxShadow: `0 0 25px var(--dm-accent, #38bdf8), inset 0 0 20px rgba(168, 85, 247, 0.6)`,
            }}
          />

          {/* 7. Central Pure Black Hole Singularity */}
          <div
            className="relative z-10 w-40 sm:w-48 md:w-56 h-40 sm:h-48 md:h-56 rounded-full bg-[#000000] border border-cyan-500/40 flex flex-col items-center justify-center text-center shadow-2xl overflow-hidden cursor-pointer group"
            onClick={onClick}
            style={{
              boxShadow: 'inset 0 0 24px rgba(0, 0, 0, 1), 0 0 40px rgba(0, 0, 0, 0.95)',
            }}
          >
            {/* Subtle inner radial depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-transparent to-purple-950/20 pointer-events-none" />

            {/* Glowing Center Display Typography matching reference */}
            <div className="relative z-10 flex flex-col items-center px-4">
              <span className="font-display font-black text-sm sm:text-base md:text-lg tracking-wider text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
                DARK MATTER
              </span>
              <span className="font-display font-bold text-xs sm:text-sm tracking-widest text-cyan-300 drop-shadow-[0_0_8px_var(--dm-accent-glow)]">
                AI CORE
              </span>

              {/* Status Indicator */}
              <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-950/90 border border-slate-800/80 text-[10px] sm:text-xs font-mono font-bold">
                <span className={`w-2 h-2 rounded-full ${config.dotClass}`} />
                <span className="tracking-widest" style={{ color: config.glowColorHex }}>
                  {config.statusText}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Spacecraft Emitter Dais / Pedestal Deck (Illuminated mechanical base matching reference image) */}
        <div className="relative -mt-10 sm:-mt-12 z-0 w-64 sm:w-80 md:w-96 flex flex-col items-center pointer-events-none">
          {/* Upper metallic emitter ring */}
          <div className="w-56 sm:w-64 md:w-72 h-4 rounded-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-cyan-500/50 shadow-[0_0_15px_rgba(56,189,248,0.3)]" />

          {/* Lower concentric glowing floor ring with amber lights */}
          <div className="w-72 sm:w-84 md:w-96 h-6 -mt-2 rounded-full bg-gradient-to-r from-[#020409] via-slate-950 to-[#020409] border-t border-amber-500/60 flex items-center justify-around px-8 shadow-[0_4px_25px_rgba(249,115,22,0.3)]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#38bdf8]" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#38bdf8]" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
          </div>
        </div>
      </div>
    );
  }

  // Standard/Compact widget layout
  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`relative inline-flex items-center gap-4 select-none ${
        onClick ? 'cursor-pointer group' : ''
      } ${className}`}
    >
      {/* Central Black Hole & Event Horizon Assembly */}
      <div className={`relative ${dims.container} flex items-center justify-center`}>
        {/* Layer 1: Gravitational Lensing Halo (outer glow) */}
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-75 transition-all duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${config.glow} 0%, transparent 70%)`,
          }}
        />

        {/* Layer 2: Outer HUD Targeting & Degree Markers */}
        <div
          className={`absolute ${dims.telemetry} rounded-full border border-dashed border-cyan-500/25 pointer-events-none ${
            status === 'BUSY' ? 'animate-orbital-fast' : 'animate-orbital'
          }`}
          style={{ borderDasharray: '4 8' }}
        />

        {/* Layer 3: Relativistic Accretion Disk */}
        <div
          className={`absolute ${dims.accretion} rounded-full opacity-70 pointer-events-none animate-orbital`}
          style={{
            background: `conic-gradient(from 45deg, var(--dm-accent, #38bdf8) 0deg, transparent 90deg, rgba(99,102,241,0.6) 180deg, transparent 270deg, var(--dm-accent, #38bdf8) 360deg)`,
            filter: 'blur(1px)',
            transform: 'scaleY(0.65) rotate(15deg)',
          }}
        />

        {/* Layer 4: Counter-rotating Secondary Accretion Wave */}
        <div
          className={`absolute ${dims.photonRing} rounded-full opacity-60 pointer-events-none animate-orbital-reverse`}
          style={{
            background: `conic-gradient(from 180deg, rgba(168,85,247,0.8) 0deg, transparent 120deg, var(--dm-accent, #38bdf8) 240deg, transparent 360deg)`,
            filter: 'blur(1.5px)',
            transform: 'scaleX(0.75) rotate(-35deg)',
          }}
        />

        {/* Layer 5: Relativistic Jet / Magnetic Field Ejection */}
        <div
          className="absolute w-[2px] h-full rounded-full opacity-70 pointer-events-none animate-pulse"
          style={{
            background: `linear-gradient(to bottom, transparent 0%, var(--dm-accent, #38bdf8) 50%, transparent 100%)`,
            boxShadow: `0 0 12px var(--dm-accent, #38bdf8)`,
          }}
        />

        {/* Layer 6: Luminous Photon Ring */}
        <div
          className={`absolute ${dims.photonRing} rounded-full border ${config.photonBorder} animate-event-horizon pointer-events-none`}
          style={{
            boxShadow: `0 0 15px var(--dm-accent, #38bdf8), inset 0 0 10px var(--dm-accent, #38bdf8)`,
          }}
        />

        {/* Layer 7: The Event Horizon / Pure Black Hole Singularity */}
        <div
          className={`relative z-10 ${dims.singularity} rounded-full bg-[#000000] border border-cyan-500/40 flex items-center justify-center shadow-2xl overflow-hidden`}
          style={{
            boxShadow: 'inset 0 0 12px rgba(0, 0, 0, 1), 0 0 8px rgba(0, 0, 0, 0.9)',
          }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full pointer-events-none animate-ping opacity-80"
            style={{ backgroundColor: config.glowColorHex }}
          />
        </div>
      </div>

      {/* Telemetry Readout (Side info panel) */}
      {telemetryMode && size !== 'sm' && (
        <div className="flex flex-col space-y-1 text-left">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${config.badgeClass}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${config.dotClass}`} />
              {config.statusText}
            </span>
          </div>

          <div className="text-xs font-semibold text-slate-200 truncate max-w-[200px] sm:max-w-[280px]">
            {config.subText}
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
            <span>FREQ: <span className="text-cyan-400">{config.freq}</span></span>
            <span>&bull;</span>
            <span>TEMP: <span className="text-slate-400">{config.temp}</span></span>
          </div>
        </div>
      )}
    </div>
  );
}
