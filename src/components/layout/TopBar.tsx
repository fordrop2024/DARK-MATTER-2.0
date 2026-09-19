import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Folder,
  FolderPlus,
  Bell,
  Sun,
  Moon,
  Layers,
  ChevronDown,
  Check,
  User,
  Settings,
  ShieldCheck,
  Sparkles,
  LogOut,
  LogIn,
  Cloud,
  HardDrive,
  Radio,
  Rocket,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useProjects } from '../../context/ProjectContext';
import { useRouter } from '../../context/RouterContext';
import { useAuth } from '../../context/AuthContext';
import { useScript } from '../../context/ScriptContext';
import { DarkMatterCore, AICoreStatus } from '../space/DarkMatterCore';
import { CoreColorShifterModal } from '../space/CoreColorShifterModal';
import type { ThemeMode } from '../../types';

interface TopBarProps {
  onOpenCommand: () => void;
  onOpenNewProject: () => void;
}

export function TopBar({ onOpenCommand, onOpenNewProject }: TopBarProps) {
  const { theme, setTheme } = useTheme();
  const { projects, activeProject, openProject } = useProjects();
  const { navigate } = useRouter();
  const { user, authState, logout } = useAuth();
  const { isGenerating, generationStep } = useScript();

  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isColorShifterOpen, setIsColorShifterOpen] = useState(false);

  const projectRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Derive real AI Core status from active script generation
  const coreStatus: AICoreStatus = isGenerating ? 'BUSY' : 'READY';

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (projectRef.current && !projectRef.current.contains(e.target as Node)) {
        setIsProjectDropdownOpen(false);
      }
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setIsThemeDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themes: { id: ThemeMode; label: string; icon: typeof Moon }[] = [
    { id: 'dark', label: 'Dark Matter Void', icon: Moon },
    { id: 'light', label: 'Celestial Light', icon: Sun },
    { id: 'mix', label: 'Nebula Mix', icon: Layers },
  ];

  return (
    <header
      id="top-navigation-bar"
      className="h-16 px-4 md:px-6 border-b border-slate-800/80 glass-panel bg-[#020409]/95 flex items-center justify-between gap-3 sticky top-0 z-30"
    >
      {/* ========================================================= */}
      {/* LEFT: DARK MATTER 2.0 & AI CONTENT PRODUCTION OS          */}
      {/* ========================================================= */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-black text-sm md:text-base tracking-wider text-white">
              DARK MATTER <span className="text-cyan-400 font-mono text-xs font-bold">2.0</span>
            </span>
          </div>
          <span className="text-[8px] md:text-[9px] font-mono uppercase tracking-widest text-slate-400 leading-none hidden sm:inline">
            AI CONTENT PRODUCTION OS
          </span>
        </div>

        {/* Command Matrix Shortcut Trigger */}
        <button
          id="topbar-search-trigger"
          onClick={onOpenCommand}
          className="hidden xl:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 text-slate-400 hover:text-slate-200 transition-all text-xs group"
          title="Open Command Matrix (⌘K)"
        >
          <Search className="w-3 h-3 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
          <span className="font-mono text-[10px]">COMMAND</span>
          <kbd className="text-[9px] font-mono bg-slate-900 px-1 py-0.5 rounded border border-slate-800 text-cyan-400">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* ========================================================= */}
      {/* CENTER: CURRENT MISSION                                   */}
      {/* ========================================================= */}
      <div className="flex items-center justify-center flex-1 max-w-xs sm:max-w-sm md:max-w-md">
        <div className="relative w-full flex justify-center" ref={projectRef}>
          <button
            id="topbar-project-selector"
            onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/90 border border-cyan-500/40 hover:border-cyan-400/80 text-xs font-semibold text-slate-200 transition-all shadow-sm shadow-cyan-950/50 group max-w-full"
          >
            <Rocket className="w-3.5 h-3.5 text-cyan-400 shrink-0 group-hover:-translate-y-0.5 transition-transform" />
            <div className="flex flex-col text-left min-w-0">
              <span className="text-[7.5px] font-mono uppercase tracking-widest text-cyan-400 font-bold leading-none">
                CURRENT MISSION
              </span>
              <span className="max-w-[140px] sm:max-w-[180px] md:max-w-[220px] truncate leading-tight font-display text-xs text-white">
                {activeProject ? activeProject.name : 'Unassigned Vector'}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-0.5" />
          </button>

          {isProjectDropdownOpen && (
            <div className="absolute top-full mt-2 w-80 rounded-2xl glass-panel border border-cyan-500/40 shadow-2xl p-2 z-50 animate-in fade-in-50 duration-100 bg-[#040814]/98 cockpit-panel-elevated">
              {/* Mission Header */}
              <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between border-b border-slate-800/80">
                <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  Mission Flight Manifest
                </span>
                <span className="text-slate-400 font-mono">{projects.length} Vectors</span>
              </div>

              {/* Active Mission Telemetry Dossier */}
              {activeProject && (
                <div className="p-3 my-2 rounded-xl bg-slate-950/90 border border-cyan-500/30 space-y-1.5 font-mono text-[10px]">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>MISSION:</span>
                    <span className="text-white font-bold truncate max-w-[170px]">{activeProject.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>MISSION STATUS:</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-emerald-400" />
                      ORBITAL SYNC
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>AI CORE STATUS:</span>
                    <span className="text-cyan-300 font-bold">
                      {coreStatus === 'BUSY' ? 'RELATIVISTIC TENSOR' : 'WARP STABLE'}
                    </span>
                  </div>
                </div>
              )}

              {/* Project Selection List */}
              <div className="max-h-44 overflow-y-auto py-1 space-y-1 scrollbar-thin">
                {projects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => {
                      openProject(proj.id);
                      setIsProjectDropdownOpen(false);
                    }}
                    className={`w-full px-2.5 py-2 rounded-xl flex items-center justify-between text-left text-xs transition-colors ${
                      activeProject?.id === proj.id
                        ? 'bg-cyan-500/20 text-cyan-200 font-semibold border border-cyan-500/40'
                        : 'text-slate-300 hover:bg-slate-900 border border-transparent'
                    }`}
                  >
                    <div className="flex flex-col min-w-0 pr-2">
                      <span className="truncate font-medium">{proj.name}</span>
                      <span className="text-[9px] font-mono text-slate-500">
                        {proj.description ? proj.description.slice(0, 32) + '...' : 'Mission Active'}
                      </span>
                    </div>
                    {activeProject?.id === proj.id && (
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    )}
                  </button>
                ))}

                {projects.length === 0 && (
                  <div className="px-3 py-4 text-center text-xs text-slate-500 font-mono">
                    No active missions registered
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-1">
                <button
                  onClick={() => {
                    setIsProjectDropdownOpen(false);
                    onOpenNewProject();
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:bg-cyan-950/50 transition-colors"
                >
                  <FolderPlus className="w-3.5 h-3.5" />
                  <span>Initialize New Mission Vector</span>
                </button>
                <button
                  onClick={() => {
                    setIsProjectDropdownOpen(false);
                    navigate('/projects');
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg flex items-center justify-between text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                >
                  <span>Mission Control Deck</span>
                  <span className="font-mono text-[10px] text-cyan-400/80">/projects</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* RIGHT: AI CORE, SYSTEM STATUS, SYNC, HUE, SETTINGS, USER  */}
      {/* ========================================================= */}
      <div className="flex items-center gap-2 md:gap-2.5 shrink-0">
        {/* Real-time Spacecraft AI Core Status */}
        <div className="hidden lg:flex items-center px-2.5 py-1 rounded-xl bg-slate-950/80 border border-slate-800/90">
          <DarkMatterCore
            size="sm"
            status={coreStatus}
            activityLabel={generationStep || 'Warp Engine Ready'}
          />
          <div className="flex flex-col ml-2">
            <span className="font-mono text-[8.5px] font-bold text-slate-300 tracking-wider flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${coreStatus === 'BUSY' ? 'bg-amber-400 animate-ping' : 'bg-cyan-400'}`} />
              {coreStatus === 'BUSY' ? 'AI BUSY' : 'AI CORE READY'}
            </span>
            <span className="text-[9.5px] font-mono text-slate-500 truncate max-w-[110px]">
              {isGenerating ? (generationStep || 'Synthesizing') : 'Gemini 2.5'}
            </span>
          </div>
        </div>

        {/* System Status Telemetry */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950/80 border border-slate-800/90 text-[10px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
          <span className="text-slate-400">STATUS:</span>
          <span className="text-emerald-300 font-bold">NOMINAL</span>
        </div>

        {/* Sync Status */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950/80 border border-slate-800/90 text-[10px] font-mono text-slate-400">
          {authState === 'AUTHENTICATED' ? (
            <>
              <Cloud className="w-3 h-3 text-cyan-400" />
              <span className="text-cyan-300 font-bold">SYNCED</span>
            </>
          ) : (
            <>
              <HardDrive className="w-3 h-3 text-amber-400" />
              <span className="text-amber-300 font-bold">LOCAL</span>
            </>
          )}
        </div>

        {/* Notifications Icon with Real Empty State */}
        <div className="relative" ref={notifRef}>
          <button
            id="topbar-notifications-btn"
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent hover:border-slate-800 transition-all relative"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#38bdf8]" />
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-72 rounded-xl glass-panel border border-slate-800 shadow-2xl p-3 z-40 animate-in fade-in-50 duration-100 bg-[#040814]/98">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-200 font-display">
                  System Feed
                </span>
                <span className="text-[10px] font-mono text-cyan-400">
                  Telemetry Active
                </span>
              </div>
              <div className="py-4 text-center">
                <Bell className="w-6 h-6 mx-auto mb-2 text-cyan-400/80" />
                <p className="text-xs font-semibold text-slate-300">
                  All Systems Operating Nominally
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Dark Matter 2.0 quantum event channels are synchronized.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Guest Mode Indicator */}
        {authState === 'GUEST' && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-semibold text-amber-300">Guest Mode</span>
            <span className="text-slate-500">&bull;</span>
            <button
              onClick={() => navigate('/login')}
              className="text-amber-200 hover:text-white underline font-medium hover:no-underline transition-colors"
            >
              Sign in to save your work
            </button>
          </div>
        )}

        {/* Core Color / Hue Shifter Trigger */}
        <button
          id="topbar-core-hue-shifter-btn"
          onClick={() => setIsColorShifterOpen(true)}
          className="p-2 md:px-2.5 md:py-1.5 rounded-xl bg-slate-950/80 border border-slate-800/90 hover:border-cyan-500/50 transition-all flex items-center gap-2 group"
          title="Calibrate Cockpit Core Energy Hue"
        >
          <span
            className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px] transition-transform group-hover:scale-125"
            style={{
              backgroundColor: 'var(--dm-accent)',
              boxShadow: '0 0 8px var(--dm-accent)',
            }}
          />
          <span className="font-mono text-[10px] font-bold text-slate-300 group-hover:text-cyan-300 hidden md:inline uppercase tracking-wider">
            CORE HUE
          </span>
          <Sparkles className="w-3 h-3 text-cyan-400 opacity-70 group-hover:opacity-100 hidden sm:inline" />
        </button>

        {/* Theme Selector Dropdown */}
        <div className="relative" ref={themeRef}>
          <button
            id="topbar-theme-selector-btn"
            onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent hover:border-slate-800 transition-all flex items-center gap-1"
            title={`Current Theme: ${theme.toUpperCase()}`}
          >
            {theme === 'dark' && <Moon className="w-4 h-4 text-cyan-400" />}
            {theme === 'light' && <Sun className="w-4 h-4 text-amber-400" />}
            {theme === 'mix' && <Layers className="w-4 h-4 text-indigo-400" />}
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>

          {isThemeDropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 rounded-xl glass-panel border border-slate-800 shadow-2xl p-1 z-40 animate-in fade-in-50 duration-100">
              <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800">
                Workspace Theme
              </div>
              <div className="py-1 space-y-0.5">
                {themes.map((t) => {
                  const Icon = t.icon;
                  const isSelected = theme === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        setIsThemeDropdownOpen(false);
                      }}
                      className={`w-full px-2.5 py-1.5 rounded-lg flex items-center justify-between text-xs transition-colors ${
                        isSelected
                          ? 'bg-cyan-500/15 text-cyan-300 font-semibold'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-cyan-400" />
                        {t.label}
                      </span>
                      {isSelected && <Check className="w-3 h-3 text-cyan-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Profile Menu */}
        <div className="relative" ref={profileRef}>
          <button
            id="topbar-profile-menu-btn"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 pl-1.5 pr-2 py-1 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 transition-all"
          >
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'Creator'}
                referrerPolicy="no-referrer"
                className="w-6 h-6 rounded-lg object-cover border border-slate-700"
              />
            ) : (
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-slate-950 font-extrabold text-[10px] font-mono shadow-sm">
                {user?.displayName ? user.displayName.slice(0, 2).toUpperCase() : 'CR'}
              </div>
            )}
            <span className="text-xs font-semibold text-slate-200 hidden md:inline truncate max-w-[120px]">
              {user?.displayName || (authState === 'GUEST' ? 'Guest Creator' : 'Creator')}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl glass-panel border border-slate-800 shadow-2xl p-2 z-40 animate-in fade-in-50 duration-100">
              <div className="px-3 py-2.5 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'Creator'}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-xl object-cover border border-cyan-500/40"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-slate-950 font-bold text-xs font-mono">
                      {user?.displayName ? user.displayName.slice(0, 2).toUpperCase() : 'CR'}
                    </div>
                  )}
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-slate-100 truncate">
                      {user?.displayName || (authState === 'GUEST' ? 'Guest Creator' : 'Creator')}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {user?.email || (authState === 'GUEST' ? 'Temporary Guest Session' : 'Signed out')}
                    </div>
                  </div>
                </div>

                <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono">
                  <span className="flex items-center gap-1 text-slate-400">
                    {authState === 'AUTHENTICATED' ? (
                      <>
                        <Cloud className="w-3 h-3 text-cyan-400" />
                        <span className="text-cyan-300">Cloud Synced</span>
                      </>
                    ) : (
                      <>
                        <HardDrive className="w-3 h-3 text-amber-400" />
                        <span className="text-amber-300">Local Only</span>
                      </>
                    )}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/60">
                    {authState}
                  </span>
                </div>
              </div>

              <div className="py-1">
                <button
                  id="topbar-settings-nav-btn"
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate('/settings');
                  }}
                  className="w-full px-3 py-2 rounded-xl flex items-center gap-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  <span>Workspace Settings</span>
                </button>

                {authState === 'GUEST' ? (
                  <button
                    id="topbar-signin-btn"
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate('/login');
                    }}
                    className="w-full mt-1 px-3 py-2 rounded-xl flex items-center gap-2 text-xs text-cyan-300 hover:text-cyan-100 hover:bg-cyan-950/40 border border-cyan-500/20 transition-colors font-semibold"
                  >
                    <LogIn className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Sign In to Save Work</span>
                  </button>
                ) : (
                  <button
                    id="topbar-signout-btn"
                    onClick={async () => {
                      setIsProfileOpen(false);
                      await logout();
                      navigate('/login');
                    }}
                    className="w-full mt-1 px-3 py-2 rounded-xl flex items-center gap-2 text-xs text-rose-400 hover:text-rose-200 hover:bg-rose-950/30 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-400" />
                    <span>Sign Out</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Core Color Shifter Modal */}
      <CoreColorShifterModal
        isOpen={isColorShifterOpen}
        onClose={() => setIsColorShifterOpen(false)}
      />
    </header>
  );
}
