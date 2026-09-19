import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  FolderGit2,
  FolderPlus,
  Layers,
  ExternalLink,
  PlaySquare,
  Tv,
  Radar,
  Crosshair,
  Radio,
  ShieldAlert,
  Rocket,
  Compass,
  FileText,
  Video,
  Lightbulb,
  Image as ImageIcon,
  Activity,
  CheckCircle2,
  Clock,
  Zap,
  Globe,
  Database,
  Cpu,
  Server,
  Cloud,
} from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import { useRouter } from '../context/RouterContext';
import { useTheme } from '../context/ThemeContext';
import { useScript } from '../context/ScriptContext';
import { WarpPathPipeline } from '../components/space/WarpPathPipeline';
import { DarkMatterCore, AICoreStatus } from '../components/space/DarkMatterCore';
import { HolographicSolarSystem } from '../components/space/HolographicSolarSystem';
import { OscilloscopeWave } from '../components/space/OscilloscopeWave';

interface DashboardPageProps {
  onOpenNewProject: () => void;
  onOpenRoadmap: () => void;
}

export function DashboardPage({ onOpenNewProject, onOpenRoadmap }: DashboardPageProps) {
  const { projects, activeProject, openProject } = useProjects();
  const { navigate } = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { isGenerating, generationStep } = useScript();

  const [commandPrompt, setCommandPrompt] = useState('');

  // Derive real status from active generation
  const coreStatus: AICoreStatus = isGenerating ? 'BUSY' : 'READY';

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandPrompt.trim()) return;
    navigate('/ideas');
  };

  // Sample or real recent projects
  const recentProjectsList = projects.length > 0 ? projects.slice(0, 3) : [
    {
      id: 'demo-1',
      name: 'The Lost Signal',
      genre: 'Sci-Fi / Mystery',
      status: 'Production',
      stage: 'Scenes',
      updatedAt: '2 min ago',
    },
    {
      id: 'demo-2',
      name: 'Quantum Odyssey',
      genre: 'Documentary',
      status: 'Planning',
      stage: 'Idea',
      updatedAt: '1 hour ago',
    },
    {
      id: 'demo-3',
      name: 'Neon Horizon',
      genre: 'Cyberpunk',
      status: 'Development',
      stage: 'Script',
      updatedAt: 'Yesterday',
    },
  ];

  // Sample recent telemetry activity logs
  const activityLogs = [
    { id: 'act-1', text: 'Script generated successfully', time: '2 min ago', type: 'script', icon: FileText, color: 'text-emerald-400' },
    { id: 'act-2', text: 'Media generation completed', time: '12 min ago', type: 'media', icon: ImageIcon, color: 'text-cyan-400' },
    { id: 'act-3', text: 'Project vector calibrated', time: '25 min ago', type: 'project', icon: FolderGit2, color: 'text-indigo-400' },
    { id: 'act-4', text: 'New idea hypothesis saved', time: '1 hour ago', type: 'idea', icon: Lightbulb, color: 'text-amber-400' },
    { id: 'act-5', text: 'Caption chrono-sync complete', time: '2 hours ago', type: 'caption', icon: Zap, color: 'text-cyan-400' },
  ];

  return (
    <div id="dashboard-page" className="space-y-8 animate-in fade-in duration-300">
      {/* ========================================================================= */}
      {/* SECTION 1: THE SPACECRAFT COCKPIT BRIDGE (MATCHING REFERENCE IMAGE)      */}
      {/* ========================================================================= */}
      <section
        id="cockpit-flight-bridge"
        className="relative overflow-hidden rounded-3xl p-4 sm:p-6 md:p-8 cockpit-panel-elevated bg-gradient-to-b from-[#030612]/95 via-[#020409]/95 to-[#040818]/95 border border-cyan-500/40 shadow-2xl shadow-cyan-950/60 hud-corners"
      >
        {/* Deep Space Atmosphere Ambient Glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-48 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-6">
          {/* Top Flight Bridge Telemetry Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-cyan-500/20 font-mono text-xs">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-[10px] tracking-widest uppercase font-bold shadow-[0_0_10px_rgba(56,189,248,0.2)]">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                CENTRAL FLIGHT BRIDGE // DECK 01
              </span>
              <span className="hidden sm:inline text-slate-500">&bull;</span>
              <span className="hidden sm:inline text-slate-400 text-[11px]">
                SECTOR: CYGNUS-ALPHA // AU 0.42
              </span>
            </div>

            <div className="flex items-center gap-3 text-[10px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                QUANTUM SYNC: <span className="text-cyan-300 font-bold">100% NOMINAL</span>
              </span>
              <span>&bull;</span>
              <span className="text-slate-400">
                ACTIVE MISSION: <span className="text-white font-bold">{activeProject ? activeProject.name : 'The Lost Signal'}</span>
              </span>
            </div>
          </div>

          {/* Panoramic Bridge Viewport: Left HUD Panels + Central AI Core + Right HUD Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-2">
            {/* ----------------- LEFT FLOATING HUD PANELS ----------------- */}
            <div className="lg:col-span-3 space-y-3.5 order-2 lg:order-1">
              {/* Panel 1: CURRENT MISSION */}
              <div className="cockpit-panel p-4 rounded-2xl border border-cyan-500/30 shadow-lg relative group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-1.5">
                    <Compass className="w-3 h-3" />
                    CURRENT MISSION
                  </span>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 font-bold">
                    Production
                  </span>
                </div>

                <div className="flex items-center gap-3 my-2">
                  {/* Circular Planetary Preview Window */}
                  <div className="w-12 h-12 rounded-full relative flex items-center justify-center p-0.5 border border-cyan-400/50 shadow-[0_0_12px_rgba(56,189,248,0.35)] shrink-0 bg-slate-950 overflow-hidden">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-600 via-indigo-900 to-slate-950 flex items-center justify-center">
                      <Globe className="w-6 h-6 text-cyan-200/90" />
                    </div>
                  </div>

                  <div className="overflow-hidden">
                    <h3 className="font-display font-bold text-sm text-white truncate group-hover:text-cyan-300 transition-colors">
                      {activeProject ? activeProject.name : 'The Lost Signal'}
                    </h3>
                    <p className="text-xs text-slate-400 truncate">
                      {activeProject?.genre || 'Sci-Fi / Mystery'}
                    </p>
                  </div>
                </div>

                {/* Mission Production Progress */}
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>PROGRESS TRACK</span>
                    <span className="text-cyan-300 font-bold">68%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 shadow-[0_0_8px_#38bdf8]"
                      style={{ width: '68%' }}
                    />
                  </div>
                </div>
              </div>

              {/* Panel 2: AI CORE STATUS */}
              <div className="cockpit-panel p-3.5 rounded-2xl border border-cyan-500/25 shadow-md flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                </div>
                <div className="overflow-hidden">
                  <div className="flex items-center gap-2 font-display font-bold text-xs text-white">
                    <span>AI CORE STATUS</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Ready</span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">
                    All quantum neural links operational
                  </p>
                </div>
              </div>

              {/* Panel 3: ACTIVE TASK */}
              <div className="cockpit-panel p-3.5 rounded-2xl border border-cyan-500/25 shadow-md space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-cyan-400" />
                    ACTIVE TASK
                  </span>
                  <span className="text-slate-400">STAGE 03</span>
                </div>
                <div className="font-display font-bold text-xs text-white truncate">
                  {isGenerating ? (generationStep || 'Processing Neural Pipeline') : 'Script Generation'}
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-amber-400 shadow-[0_0_8px_#38bdf8] animate-pulse"
                    style={{ width: isGenerating ? '92%' : '84%' }}
                  />
                </div>
              </div>
            </div>

            {/* ----------------- CENTER STAGE: HERO BLACK HOLE & AI CORE ----------------- */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2 py-4">
              <DarkMatterCore
                size="hero"
                status={coreStatus}
                activityLabel={generationStep || 'Relativistic Flight Engine Ready'}
                onClick={() => navigate('/script')}
              />
            </div>

            {/* ----------------- RIGHT FLOATING HUD PANELS ----------------- */}
            <div className="lg:col-span-3 space-y-3.5 order-3">
              {/* Panel 1: WARP DRIVE / CONTENT PIPELINE */}
              <div className="cockpit-panel p-4 rounded-2xl border border-cyan-500/30 shadow-lg relative group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-1.5">
                    <Rocket className="w-3 h-3" />
                    WARP DRIVE
                  </span>
                  <button
                    onClick={() => navigate('/script')}
                    className="text-[9px] font-mono text-cyan-300 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>View Pipeline</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 mb-3">
                  End-to-end galactic content trajectory
                </p>

                {/* Mini Orbital Linear Chain */}
                <div className="grid grid-cols-5 gap-1.5 py-1">
                  {[
                    { label: 'Idea', active: true, icon: Lightbulb },
                    { label: 'Story', active: true, icon: Compass },
                    { label: 'Script', active: true, icon: FileText },
                    { label: 'Media', active: false, icon: ImageIcon },
                    { label: 'Video', active: false, icon: Video },
                  ].map((st, i) => {
                    const Icon = st.icon;
                    return (
                      <div key={i} className="flex flex-col items-center gap-1 text-center">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all ${
                            st.active
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_8px_rgba(56,189,248,0.4)]'
                              : 'bg-slate-900 border-slate-800 text-slate-500'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[9px] font-mono text-slate-400">{st.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Panel 2: QUICK ACTIONS (4 TILES MATCHING REFERENCE) */}
              <div className="cockpit-panel p-4 rounded-2xl border border-cyan-500/30 shadow-lg space-y-2.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold block">
                  QUICK ACTIONS
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={onOpenNewProject}
                    className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-cyan-950/50 border border-slate-800 hover:border-cyan-500/50 transition-all text-left group flex flex-col justify-between"
                  >
                    <FolderPlus className="w-4 h-4 text-cyan-400 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-300">
                      New Project
                    </span>
                  </button>

                  <button
                    onClick={() => navigate('/ideas')}
                    className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-cyan-950/50 border border-slate-800 hover:border-cyan-500/50 transition-all text-left group flex flex-col justify-between"
                  >
                    <Lightbulb className="w-4 h-4 text-amber-400 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-slate-200 group-hover:text-amber-300">
                      Idea Generator
                    </span>
                  </button>

                  <button
                    onClick={() => navigate('/script')}
                    className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-cyan-950/50 border border-slate-800 hover:border-cyan-500/50 transition-all text-left group flex flex-col justify-between"
                  >
                    <FileText className="w-4 h-4 text-emerald-400 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-slate-200 group-hover:text-emerald-300">
                      Script Studio
                    </span>
                  </button>

                  <button
                    onClick={() => navigate('/image-studio')}
                    className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-cyan-950/50 border border-slate-800 hover:border-cyan-500/50 transition-all text-left group flex flex-col justify-between"
                  >
                    <ImageIcon className="w-4 h-4 text-purple-400 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-slate-200 group-hover:text-purple-300">
                      Media Library
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* BOTTOM COCKPIT CONSOLE DECK (4 INTEGRATED BAYS MATCHING REFERENCE IMAGE)   */}
          {/* ========================================================================= */}
          <div className="pt-4 border-t border-cyan-500/20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* ----------------- BAY 1: RECENT PROJECTS ----------------- */}
            <div className="cockpit-panel p-4 rounded-2xl border border-slate-800/90 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80">
                  <span className="text-xs font-bold text-slate-100 font-display flex items-center gap-1.5">
                    <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
                    Recent Projects
                  </span>
                  <button
                    onClick={() => navigate('/projects')}
                    className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </button>
                </div>

                <div className="space-y-2">
                  {recentProjectsList.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        if ('name' in p && projects.some(proj => proj.id === p.id)) {
                          openProject(p as any);
                        }
                        navigate('/script');
                      }}
                      className="p-2 rounded-xl bg-slate-950/70 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 transition-all cursor-pointer flex items-center justify-between gap-2"
                    >
                      <div className="overflow-hidden">
                        <div className="text-xs font-semibold text-slate-200 truncate">
                          {p.name}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono truncate">
                          {p.genre}
                        </div>
                      </div>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-cyan-300 shrink-0">
                        {p.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ----------------- BAY 2: HOLOGRAPHIC SOLAR SYSTEM ORBITAL MAP ----------------- */}
            <div className="cockpit-panel p-3.5 rounded-2xl border border-slate-800/90 flex flex-col justify-between relative overflow-hidden h-[190px]">
              <div className="flex items-center justify-between z-10">
                <span className="text-xs font-bold text-slate-100 font-display flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-cyan-400" />
                  Orbital System
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/50 text-cyan-300">
                  5 Bodies Active
                </span>
              </div>

              {/* Holographic Solar System Canvas */}
              <div className="flex-1 w-full relative -mt-2">
                <HolographicSolarSystem />
              </div>
            </div>

            {/* ----------------- BAY 3: SYSTEM OVERVIEW & OSCILLOSCOPE ----------------- */}
            <div className="cockpit-panel p-4 rounded-2xl border border-slate-800/90 flex flex-col justify-between space-y-2">
              <div>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80">
                  <span className="text-xs font-bold text-slate-100 font-display flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-cyan-400" />
                    System Overview
                  </span>
                  <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ALL SYSTEMS NOMINAL
                  </span>
                </div>

                {/* Telemetry Rows */}
                <div className="space-y-1.5 text-[11px] font-mono">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      AI Core:
                    </span>
                    <span className="text-cyan-300 font-bold">Ready</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      Cloud Sync:
                    </span>
                    <span className="text-blue-300">Online</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Database:
                    </span>
                    <span className="text-emerald-300">Connected</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      Generation Jobs:
                    </span>
                    <span className="text-amber-300 font-bold">{isGenerating ? '1 Active' : '2 Active'}</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Oscilloscope Waveform */}
              <OscilloscopeWave />
            </div>

            {/* ----------------- BAY 4: RECENT ACTIVITY ----------------- */}
            <div className="cockpit-panel p-4 rounded-2xl border border-slate-800/90 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80">
                  <span className="text-xs font-bold text-slate-100 font-display flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    Recent Activity
                  </span>
                  <button
                    onClick={() => navigate('/projects')}
                    className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </button>
                </div>

                <div className="space-y-2">
                  {activityLogs.map((log) => {
                    const Icon = log.icon;
                    return (
                      <div key={log.id} className="flex items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2 truncate">
                          <Icon className={`w-3.5 h-3.5 shrink-0 ${log.color}`} />
                          <span className="text-slate-300 truncate text-[11px]">
                            {log.text}
                          </span>
                        </div>
                        <span className="text-[9.5px] font-mono text-slate-500 shrink-0">
                          {log.time}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: EXPANDED SOLAR SYSTEM PIPELINE (END-TO-END ORBITAL STAGES)     */}
      {/* ========================================================================= */}
      <WarpPathPipeline />

      {/* ========================================================================= */}
      {/* SECTION 3: MISSION DIRECTIVE & TACTICAL CONSOLES                         */}
      {/* ========================================================================= */}
      <section id="dashboard-tactical-consoles" className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-100 font-display flex items-center gap-2">
              <span>Spacecraft Tactical Consoles</span>
              <span className="text-xs font-mono font-normal text-slate-400">
                (6 Operations Units)
              </span>
            </h2>
          </div>
          <button
            onClick={onOpenRoadmap}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
          >
            <span>View 17-Orbit Roadmap</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Directive Command Console */}
        <div className="cockpit-panel p-5 rounded-2xl border border-cyan-500/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-1.5">
              <Rocket className="w-3.5 h-3.5" />
              FLIGHT DIRECTIVE INPUT // AUTONOMOUS AI SCRIPT GENERATOR
            </span>
            <span className="text-[9px] font-mono text-slate-500">VOX-7 // TENSOR LINK</span>
          </div>

          <form onSubmit={handleCommandSubmit} className="space-y-3">
            <textarea
              id="hero-directive-input"
              rows={2}
              value={commandPrompt}
              onChange={(e) => setCommandPrompt(e.target.value)}
              placeholder="Initiate flight directive (e.g. quantum computing documentary, deep space mystery, viral tech breakdown)..."
              className="w-full px-4 py-3 rounded-xl input-cockpit text-white placeholder:text-slate-500 text-xs font-sans resize-none"
            />

            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] font-mono text-slate-500 truncate">
                WARPS DIRECTLY TO IDEA & SCRIPT ENGINE UPON LAUNCH
              </span>
              <button
                id="hero-command-submit-btn"
                type="submit"
                className="px-5 py-2 rounded-xl btn-warp-primary text-xs font-bold flex items-center gap-1.5 shrink-0"
              >
                <Rocket className="w-3.5 h-3.5" />
                <span>Launch Directive</span>
              </button>
            </div>
          </form>
        </div>

        {/* 6 Tactical Operations Consoles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Console 1: Sub-Space Trend Scanner */}
          <div
            id="console-trending-scanner"
            className="rounded-3xl p-5 cockpit-panel-interactive flex flex-col justify-between group hud-corners"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.2)]">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-100 font-display">
                      Sub-Space Trend Scanner
                    </h3>
                    <span className="text-[9px] font-mono text-slate-500">CONSOLE 01 // RADAR</span>
                  </div>
                </div>
                <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                  Active Link
                </span>
              </div>

              <div className="py-4 px-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-center space-y-1.5">
                <div className="text-sm font-bold text-white font-display">
                  Autonomous Velocity
                </div>
                <p className="text-[11px] text-slate-400">
                  Real-time Google Trends and YouTube signals filtered for high viewer retention.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500">SIGNALS: 12 DETECTED</span>
              <button
                onClick={() => navigate('/ideas')}
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
              >
                <span>Engage Scanner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Console 2: Algorithmic Script Matrix */}
          <div
            id="console-script-matrix"
            className="rounded-3xl p-5 cockpit-panel-interactive flex flex-col justify-between group hud-corners"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-100 font-display">
                      Script Studio Matrix
                    </h3>
                    <span className="text-[9px] font-mono text-slate-500">CONSOLE 02 // NARRATIVE</span>
                  </div>
                </div>
                <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                  Ready
                </span>
              </div>

              <div className="py-4 px-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-center space-y-1.5">
                <div className="text-sm font-bold text-white font-display">
                  Dramatic Arc Synthesizer
                </div>
                <p className="text-[11px] text-slate-400">
                  Multi-beat retention modeling, emotional hooks, and visual cue generation.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500">BEAT ACCURACY: 99.4%</span>
              <button
                onClick={() => navigate('/script')}
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono"
              >
                <span>Open Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Console 3: Generative Asset Vault */}
          <div
            id="console-asset-vault"
            className="rounded-3xl p-5 cockpit-panel-interactive flex flex-col justify-between group hud-corners"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-100 font-display">
                      Asset Holo-Deck
                    </h3>
                    <span className="text-[9px] font-mono text-slate-500">CONSOLE 03 // VISUALS</span>
                  </div>
                </div>
                <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/40">
                  Available
                </span>
              </div>

              <div className="py-4 px-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-center space-y-1.5">
                <div className="text-sm font-bold text-white font-display">
                  Imagen & Cinematic Nodes
                </div>
                <p className="text-[11px] text-slate-400">
                  Ultra-high fidelity visual prompts, aspect ratio adaptation, and styling.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500">RESOLUTION: 4K COMPAT</span>
              <button
                onClick={() => navigate('/image-studio')}
                className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 font-mono"
              >
                <span>Access Vault</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: DEEP SPACE RADAR INTELLIGENCE                                 */}
      {/* ========================================================================= */}
      <section id="dashboard-creova-intelligence" className="space-y-4 pt-4 border-t border-slate-800/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(56,189,248,0.3)]">
              <Radar className="w-5 h-5 animate-orbital" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white font-display">
                  Deep Space Radar Intelligence
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
                  Sub-space Velocity
                </span>
              </div>
              <p className="text-xs text-slate-400">
                YouTube platform signals, breakout orbit trends, and competitive creator telemetry
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/youtube-intelligence')}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 self-start sm:self-auto transition-colors px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40"
          >
            <span>Open Intelligence Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 6 Space Radar Array Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            id="dash-intel-trending"
            onClick={() => navigate('/youtube-intelligence/topics')}
            className="p-5 rounded-2xl cockpit-panel-interactive transition-all cursor-pointer group space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                    Trending Signals
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-slate-500">Radar</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Breakout search spikes and rapid keyword velocity clusters.
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
              <ShieldAlert className="w-3 h-3 text-cyan-400 shrink-0" />
              <span className="truncate">Sensors calibrating sub-space feed</span>
            </div>
          </div>

          <div
            id="dash-intel-rising-channels"
            onClick={() => navigate('/youtube-intelligence/channel')}
            className="p-5 rounded-2xl cockpit-panel-interactive transition-all cursor-pointer group space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <Tv className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                    Rising Channels
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-slate-500">Growth</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Creators experiencing explosive month-over-month subscriber acceleration.
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
              <ShieldAlert className="w-3 h-3 text-indigo-400 shrink-0" />
              <span className="truncate">Sensors calibrating sub-space feed</span>
            </div>
          </div>

          <div
            id="dash-intel-rising-videos"
            onClick={() => navigate('/youtube-intelligence/video')}
            className="p-5 rounded-2xl cockpit-panel-interactive transition-all cursor-pointer group space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <PlaySquare className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                    Rising Videos
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-slate-500">Velocity</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Fresh uploads gaining abnormal early traction across homepage feeds.
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
              <ShieldAlert className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="truncate">Sensors calibrating sub-space feed</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
