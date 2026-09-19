import React from 'react';
import {
  Lightbulb,
  BookOpen,
  FileText,
  Layers,
  Image,
  Mic,
  Subtitles,
  Film,
  Send,
  CheckCircle2,
  Compass,
  ArrowUpRight,
  Radio,
} from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export interface OrbitalMissionNode {
  id: string;
  orbitIndex: string;
  name: string;
  orbitalClass: string;
  path: string;
  icon: typeof Lightbulb;
  status: 'completed' | 'active' | 'standby';
  description: string;
  coordinates: string;
  glowColor: string;
}

interface WarpPathPipelineProps {
  currentStageId?: string;
  className?: string;
}

export function WarpPathPipeline({ currentStageId, className = '' }: WarpPathPipelineProps) {
  const { currentRoute, navigate } = useRouter();

  const nodes: OrbitalMissionNode[] = [
    {
      id: 'idea',
      orbitIndex: 'ORB-01',
      name: 'IDEA HORIZON',
      orbitalClass: 'Hypothesis Field',
      path: '/ideas',
      icon: Lightbulb,
      status: currentRoute === '/ideas' ? 'active' : 'completed',
      description: 'Trend ideation & viral telemetry',
      coordinates: 'RA 18h / DEC +36°',
      glowColor: '#38bdf8',
    },
    {
      id: 'story',
      orbitIndex: 'ORB-02',
      name: 'NARRATIVE CORE',
      orbitalClass: 'Story Gravity Arc',
      path: '/script',
      icon: BookOpen,
      status: currentRoute === '/script' ? 'active' : 'completed',
      description: 'Adaptive story structure engine',
      coordinates: 'RA 19h / DEC +24°',
      glowColor: '#818cf8',
    },
    {
      id: 'script',
      orbitIndex: 'ORB-03',
      name: 'SCRIPT MATRIX',
      orbitalClass: 'Algorithmic Vector',
      path: '/script',
      icon: FileText,
      status: currentRoute === '/script' ? 'active' : 'completed',
      description: 'Hook, beat & retention pacing',
      coordinates: 'RA 20h / DEC +12°',
      glowColor: '#34d399',
    },
    {
      id: 'scenes',
      orbitIndex: 'ORB-04',
      name: 'SCENE BREAKDOWN',
      orbitalClass: 'Directing Horizon',
      path: '/script',
      icon: Layers,
      status: currentRoute === '/script' ? 'active' : 'completed',
      description: 'Shot list & visual framing',
      coordinates: 'RA 21h / DEC +04°',
      glowColor: '#a78bfa',
    },
    {
      id: 'media',
      orbitIndex: 'ORB-05',
      name: 'ASSET VAULT',
      orbitalClass: 'Generative Cluster',
      path: '/image-studio',
      icon: Image,
      status: currentRoute === '/image-studio' ? 'active' : 'standby',
      description: 'Cinematic visual generators',
      coordinates: 'RA 22h / DEC -08°',
      glowColor: '#f472b6',
    },
    {
      id: 'voice',
      orbitIndex: 'ORB-06',
      name: 'NEURAL AUDIO',
      orbitalClass: 'Sonic Resonance',
      path: '/voice',
      icon: Mic,
      status: currentRoute === '/voice' ? 'active' : 'standby',
      description: 'Multi-voice speech synthesis',
      coordinates: 'RA 23h / DEC -18°',
      glowColor: '#fb923c',
    },
    {
      id: 'captions',
      orbitIndex: 'ORB-07',
      name: 'KINETIC CHRONO',
      orbitalClass: 'Chrono-sync Layer',
      path: '/editor',
      icon: Subtitles,
      status: currentRoute === '/editor' ? 'active' : 'standby',
      description: 'Dynamic typography & timing',
      coordinates: 'RA 00h / DEC -22°',
      glowColor: '#38bdf8',
    },
    {
      id: 'video',
      orbitIndex: 'ORB-08',
      name: 'WARP SYNTHESIS',
      orbitalClass: 'Timeline Engine',
      path: '/video-generator',
      icon: Film,
      status: currentRoute === '/video-generator' ? 'active' : 'standby',
      description: 'Final multi-track video render',
      coordinates: 'RA 01h / DEC -10°',
      glowColor: '#60a5fa',
    },
    {
      id: 'publish',
      orbitIndex: 'ORB-09',
      name: 'ORBITAL LAUNCH',
      orbitalClass: 'Warp Gate Outpost',
      path: '/youtube',
      icon: Send,
      status: currentRoute === '/youtube' ? 'active' : 'standby',
      description: 'Flight distribution & telemetry',
      coordinates: 'RA 02h / DEC +05°',
      glowColor: '#facc15',
    },
  ];

  return (
    <section
      id="warp-path-pipeline"
      className={`relative rounded-3xl p-6 cockpit-panel-elevated overflow-hidden ${className}`}
    >
      {/* Background Star Map Lines & Cosmic Dust */}
      <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />
      <div
        className="absolute -top-32 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, #38bdf8 0%, #818cf8 50%, transparent 80%)' }}
      />

      {/* Header Telemetry Bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-md shadow-cyan-950">
            <Compass className="w-5 h-5 animate-orbital" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white font-display tracking-tight">
                Orbital Flight Trajectory
              </h2>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                WARP PIPELINE // 9 STATIONS
              </span>
            </div>
            <p className="text-xs text-slate-400">
              End-to-end solar system production route. Click any planetary dock to warp to that station.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[10px] font-mono self-start md:self-auto">
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
            <span>Docked / Synced</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Current Sector</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-slate-600" />
            <span>Trajectory Standby</span>
          </div>
        </div>
      </div>

      {/* Orbital Channel Route: SVG Warp Conduits connecting planetary nodes */}
      <div className="relative z-10">
        {/* Horizontal Scrollable Orbital Waypoint Chain */}
        <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 scrollbar-thin">
          {nodes.map((node, index) => {
            const Icon = node.icon;
            const isCurrent = node.status === 'active';
            const isCompleted = node.status === 'completed';

            return (
              <React.Fragment key={node.id}>
                {/* Orbital Planetary Dock Card */}
                <button
                  onClick={() => navigate(node.path as any)}
                  id={`warp-node-${node.id}`}
                  className={`shrink-0 w-44 p-3.5 rounded-2xl text-left transition-all relative group flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-cyan-950/70 border border-cyan-400/70 shadow-lg shadow-cyan-950/70 scale-[1.02]'
                      : isCompleted
                      ? 'bg-slate-950/80 hover:bg-slate-900 border border-emerald-500/40 hover:border-cyan-400/50'
                      : 'bg-slate-950/60 hover:bg-slate-900/80 border border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  {/* Top: Orbit index & status */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[9px] font-bold text-slate-400 group-hover:text-cyan-300">
                      {node.orbitIndex}
                    </span>
                    {isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    ) : isCompleted ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-slate-500" />
                    )}
                  </div>

                  {/* Icon with Planetary Glow */}
                  <div className="flex items-center gap-2.5 my-1.5">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                        isCurrent
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                          : isCompleted
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-900 text-slate-400 border border-slate-800 group-hover:text-slate-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white group-hover:text-cyan-300 truncate">
                        {node.name}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono truncate">
                        {node.orbitalClass}
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Description & Coordinates */}
                  <div className="mt-2 pt-2 border-t border-slate-800/70 flex items-center justify-between text-[9px] font-mono">
                    <span className="text-slate-400 truncate max-w-[100px]">
                      {node.coordinates}
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-cyan-400 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </button>

                {/* Warp Conduit Connector Line between nodes */}
                {index < nodes.length - 1 && (
                  <div className="shrink-0 flex items-center justify-center w-6 relative">
                    <div
                      className={`h-[2px] w-full rounded-full transition-all ${
                        isCompleted
                          ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_8px_#38bdf8]'
                          : isCurrent
                          ? 'bg-gradient-to-r from-cyan-400 to-slate-700 animate-pulse'
                          : 'bg-slate-800'
                      }`}
                    />
                    {isCurrent && (
                      <div className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#38bdf8] animate-ping" />
                    )}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
