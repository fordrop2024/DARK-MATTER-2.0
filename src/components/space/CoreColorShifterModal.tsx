import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { X, Sparkles, Sliders, Check } from 'lucide-react';

interface CoreColorShifterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CoreColorShifterModal({ isOpen, onClose }: CoreColorShifterModalProps) {
  const { coreHue, corePreset, setCoreHue, setCorePreset, presets } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg cockpit-panel-elevated p-6 z-10 border border-cyan-500/40 shadow-[0_0_50px_rgba(56,189,248,0.25)] rounded-xl animate-in fade-in zoom-in-95 duration-200">
        {/* HUD Reticle Corners */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center border border-cyan-400/40 shadow-[0_0_12px_var(--dm-accent-glow)]"
              style={{ backgroundColor: 'var(--dm-accent-soft)' }}
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
            </div>
            <div>
              <h2 className="font-display font-bold text-sm tracking-wider uppercase text-white flex items-center gap-2">
                CORE ENERGY SHIFTER
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                  {coreHue}° HUE
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Calibrate primary cockpit telemetry and event horizon emission frequency
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Live Energy Frequency Preview */}
        <div className="my-5 p-4 rounded-lg bg-slate-950/80 border border-cyan-500/20 flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center relative flex-shrink-0 animate-pulse shadow-lg"
            style={{
              backgroundColor: '#000000',
              border: `2px solid var(--dm-accent)`,
              boxShadow: `0 0 20px var(--dm-accent-glow), inset 0 0 10px var(--dm-accent-glow)`,
            }}
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: 'var(--dm-accent)' }}
            />
          </div>
          <div className="flex-1 text-xs">
            <div className="font-mono font-bold text-slate-200 uppercase flex items-center justify-between">
              <span>FREQUENCY: {(coreHue * 0.12 + 10).toFixed(1)} THz</span>
              <span className="text-emerald-400">HARMONIC LOCK</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Synchronizing AI Core, HUD framing, warp conduits, active badges, and button highlights across all sectors.
            </p>
          </div>
        </div>

        {/* Preset Selector Grid */}
        <div className="space-y-2">
          <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            QUANTUM HARMONIC PRESETS
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {presets.map((p) => {
              const isSelected = corePreset === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setCorePreset(p.id)}
                  className={`p-2.5 rounded-lg border text-left transition-all relative flex flex-col gap-1.5 ${
                    isSelected
                      ? 'bg-slate-900/90 border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full shadow-[0_0_8px]"
                        style={{
                          backgroundColor: p.hex,
                          boxShadow: `0 0 8px ${p.hex}`,
                        }}
                      />
                      <span className="font-mono text-[10px] font-bold text-slate-200">
                        {p.label}
                      </span>
                    </div>
                    {isSelected && <Check className="w-3 h-3 text-cyan-400" />}
                  </div>
                  <span className="text-[9.5px] text-slate-500 line-clamp-1">
                    {p.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Fine-Tuning Slider */}
        <div className="mt-5 space-y-2 pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              MICRO-FREQUENCY TUNING
            </span>
            <span className="text-cyan-300 font-bold">{coreHue}° SPECTRUM</span>
          </div>

          <div className="relative pt-2">
            <input
              type="range"
              min="0"
              max="360"
              value={coreHue}
              onChange={(e) => setCoreHue(parseInt(e.target.value, 10))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer focus:outline-none"
              style={{
                background: `linear-gradient(to right, 
                  hsl(0, 100%, 50%), 
                  hsl(60, 100%, 50%), 
                  hsl(120, 100%, 50%), 
                  hsl(180, 100%, 50%), 
                  hsl(240, 100%, 50%), 
                  hsl(300, 100%, 50%), 
                  hsl(360, 100%, 50%))`,
              }}
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-display font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(56,189,248,0.35)]"
          >
            ENGAGE FREQUENCY
          </button>
        </div>
      </div>
    </div>
  );
}
