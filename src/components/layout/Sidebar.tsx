import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Disc3,
  GitBranch,
  Terminal,
  Activity,
  Cpu,
} from 'lucide-react';
import { NAV_ITEMS } from '../../constants/routes';
import { useRouter } from '../../context/RouterContext';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onOpenRoadmap: () => void;
}

export function Sidebar({ isCollapsed, onToggleCollapse, onOpenRoadmap }: SidebarProps) {
  const { currentRoute, navigate } = useRouter();

  // Spacecraft Command Center Navigation Sectors:
  // 1. MISSION CONTROL
  const missionControlItems = NAV_ITEMS.filter((i) => i.path === '/dashboard');

  // 2. THINK
  const thinkItems = NAV_ITEMS.filter((i) =>
    ['/ideas', '/trends', '/research', '/youtube-intelligence'].includes(i.path)
  );

  // 3. CREATE
  const createItems = NAV_ITEMS.filter((i) =>
    ['/script', '/video-generator', '/image-studio', '/voice'].includes(i.path)
  );

  // 4. PRODUCE
  const produceItems = NAV_ITEMS.filter((i) =>
    ['/editor', '/thumbnail'].includes(i.path)
  );

  // 5. GROW
  const growItems = NAV_ITEMS.filter((i) =>
    ['/seo', '/repurpose', '/youtube', '/scheduler', '/analytics'].includes(i.path)
  );

  // 6. SYSTEM
  const systemItems = NAV_ITEMS.filter((i) =>
    ['/projects', '/brand', '/templates', '/team', '/settings'].includes(i.path)
  );

  const renderNavGroup = (title: string, tag: string, items: typeof NAV_ITEMS) => {
    if (items.length === 0) return null;
    return (
      <div className="mb-3.5">
        {!isCollapsed && (
          <div className="px-3 mb-1.5 text-[9px] font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-cyan-400/90 shadow-[0_0_4px_#38bdf8]" />
              {title}
            </span>
            <span className="text-[8px] px-1 py-0.2 rounded bg-slate-900/90 text-cyan-400 border border-slate-800 font-mono">
              {tag}
            </span>
          </div>
        )}
        <div className="space-y-0.5">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.path;
            const isPhase2 = item.phase === 'phase_2';

            return (
              <button
                key={item.path}
                id={`nav-link-${item.path.replace('/', '')}`}
                onClick={() => navigate(item.path)}
                title={isCollapsed ? `${item.label} ${isPhase2 ? '(Standby)' : ''}` : undefined}
                className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all relative group ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/5 border border-transparent'
                } ${isCollapsed ? 'justify-center px-2' : ''}`}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
                )}

                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-cyan-300' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />

                {!isCollapsed && (
                  <div className="flex items-center justify-between flex-1 min-w-0">
                    <span className="truncate text-left">{item.label}</span>
                    {item.pipelineStage && (
                      <span className="ml-1 text-[8px] font-mono px-1.5 py-0.2 rounded bg-slate-900 text-cyan-400 border border-slate-800 group-hover:border-cyan-500/30">
                        W{item.pipelineStage.toString().padStart(2, '0')}
                      </span>
                    )}
                    {isPhase2 && !item.pipelineStage && (
                      <span className="ml-1 text-[8px] font-mono px-1 py-0.2 rounded bg-slate-950 text-slate-500 border border-slate-800">
                        STANDBY
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <aside
      id="main-sidebar"
      className={`relative flex flex-col shrink-0 border-r border-slate-800/80 glass-panel bg-[#03060f]/95 transition-all duration-300 ease-in-out z-30 ${
        isCollapsed ? 'w-18' : 'w-64'
      }`}
    >
      {/* Spacecraft Command Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800/80 bg-[#020409]/95">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2.5 group overflow-hidden text-left focus:outline-none"
        >
          {/* Black Hole & Event Horizon Core Symbol */}
          <div className="relative w-9 h-9 rounded-xl bg-slate-950 border border-cyan-500/40 p-0.5 shadow-lg shadow-cyan-500/20 shrink-0 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-purple-500/20 animate-event-horizon" />
            <div className="w-5 h-5 rounded-full bg-black border border-cyan-400 flex items-center justify-center shadow-[0_0_10px_rgba(56,189,248,0.5)]">
              <Disc3 className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
            </div>
          </div>

          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-display font-black text-sm tracking-wider text-white flex items-center gap-1.5">
                DARK MATTER <span className="text-cyan-400 text-xs font-mono font-bold">2.0</span>
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400">
                AI PRODUCTION OS
              </span>
            </div>
          )}
        </button>

        {/* Collapse Toggle */}
        <button
          id="sidebar-toggle-btn"
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label={isCollapsed ? 'Expand navigation console' : 'Collapse navigation console'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Space Command Sectors Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-1 scrollbar-thin">
        {renderNavGroup('MISSION CONTROL', 'BRIDGE', missionControlItems)}
        {renderNavGroup('THINK', 'RESEARCH', thinkItems)}
        {renderNavGroup('CREATE', 'STUDIO', createItems)}
        {renderNavGroup('PRODUCE', 'PIPELINE', produceItems)}
        {renderNavGroup('GROW', 'DISTRIBUTION', growItems)}
        {renderNavGroup('SYSTEM', 'AVIONICS', systemItems)}
      </div>

      {/* Telemetry & Warp Mission Footer */}
      <div className="p-3 border-t border-slate-800/80 bg-[#020409]/95">
        {!isCollapsed ? (
          <div className="space-y-2">
            <button
              onClick={onOpenRoadmap}
              className="w-full px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-950/50 via-indigo-950/40 to-purple-950/40 border border-cyan-500/40 hover:border-cyan-400/70 text-xs font-semibold text-cyan-300 flex items-center justify-between transition-all group shadow-sm shadow-cyan-950"
            >
              <span className="flex items-center gap-2">
                <GitBranch className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
                <span>Warp Sequence</span>
              </span>
              <span className="text-[9px] font-mono text-cyan-300 bg-cyan-950/90 border border-cyan-500/40 px-1.5 py-0.5 rounded">
                17 Orbits
              </span>
            </button>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-1">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#38bdf8]" />
                WARP CORE ONLINE
              </span>
              <span className="text-slate-500">v2.0-STABLE</span>
            </div>
          </div>
        ) : (
          <button
            onClick={onOpenRoadmap}
            title="View Warp Sequence Production Roadmap"
            className="w-full py-2 flex items-center justify-center rounded-xl bg-cyan-950/40 text-cyan-400 hover:bg-cyan-900/50 transition-colors"
          >
            <GitBranch className="w-4 h-4" />
          </button>
        )}
      </div>
    </aside>
  );
}
