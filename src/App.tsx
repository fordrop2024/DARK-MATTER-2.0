import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ProjectProvider } from './context/ProjectContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { CompetitorProvider } from './context/CompetitorContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { SettingsPage } from './pages/SettingsPage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { YouTubeIntelligenceDashboardPage } from './pages/youtube/YouTubeIntelligenceDashboardPage';
import { ChannelAnalyzerPage } from './pages/youtube/ChannelAnalyzerPage';
import { VideoAnalyzerPage } from './pages/youtube/VideoAnalyzerPage';
import { RankingsPage } from './pages/youtube/RankingsPage';
import { TopicRadarPage } from './pages/youtube/TopicRadarPage';
import { CompetitorRadarPage } from './pages/youtube/CompetitorRadarPage';
import { LiveRadarPage } from './pages/youtube/LiveRadarPage';
import { OutlierDetectorPage } from './pages/youtube/OutlierDetectorPage';
import { StrategyAnalyzerPage } from './pages/youtube/StrategyAnalyzerPage';
import { IdeaGeneratorPage } from './pages/ideas/IdeaGeneratorPage';
import { ScriptStudioPage } from './pages/script/ScriptStudioPage';
import { IdeaProvider } from './context/IdeaContext';
import { ScriptProvider } from './context/ScriptContext';
import { YouTubeProvider } from './context/YouTubeContext';
import { NewProjectModal } from './components/common/NewProjectModal';
import { CommandModal } from './components/common/CommandModal';
import { RoadmapModal } from './components/common/RoadmapModal';
import { StarField } from './components/space/StarField';
import { Cpu, Loader2, Sparkles } from 'lucide-react';

function AppContent() {
  const { currentRoute, navigate, isWarping } = useRouter();
  const { theme } = useTheme();
  const { authState } = useAuth();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    try {
      return localStorage.getItem('creova_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isCommandModalOpen, setIsCommandModalOpen] = useState(false);
  const [isRoadmapModalOpen, setIsRoadmapModalOpen] = useState(false);

  useEffect(() => {
    if (authState === 'LOADING') return;

    if (authState === 'SIGNED_OUT' && currentRoute !== '/login') {
      navigate('/login');
    } else if (authState === 'AUTHENTICATED' && currentRoute === '/login') {
      navigate('/dashboard');
    }
  }, [authState, currentRoute, navigate]);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('creova_sidebar_collapsed', String(next));
      } catch (e) {
        console.warn('Could not store sidebar state', e);
      }
      return next;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (authState === 'LOADING') {
    return (
      <div className="min-h-screen relative flex flex-col items-center justify-center bg-[#020409] text-slate-100 overflow-hidden">
        <StarField />
        <div className="relative z-10 flex flex-col items-center">
          {/* Black Hole Event Horizon Loader */}
          <div className="relative w-20 h-20 flex items-center justify-center mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-600 to-cyan-400 animate-spin opacity-75 blur-md" />
            <div className="absolute inset-1 rounded-full border border-cyan-400/40 animate-ping" />
            <div className="relative w-14 h-14 rounded-full bg-[#020409] border border-cyan-500/80 flex items-center justify-center shadow-2xl">
              <div className="w-5 h-5 rounded-full bg-cyan-400/20 border border-cyan-300 animate-pulse" />
            </div>
          </div>

          <div className="text-center space-y-1">
            <span className="font-display font-black text-xl tracking-widest text-white flex items-center justify-center gap-2">
              DARK MATTER <span className="text-cyan-400 font-mono text-base font-bold">2.0</span>
            </span>
            <p className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
              AI CONTENT PRODUCTION OS
            </p>
          </div>

          <span className="text-xs text-slate-400 mt-6 font-mono flex items-center gap-2 bg-slate-900/80 px-3.5 py-1.5 rounded-full border border-slate-800">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
            Calibrating sub-space telemetry...
          </span>
        </div>
      </div>
    );
  }

  if (currentRoute === '/login') {
    return <LoginPage />;
  }

  const renderActivePage = () => {
    switch (currentRoute) {
      case '/dashboard':
        return (
          <DashboardPage
            onOpenNewProject={() => setIsNewProjectModalOpen(true)}
            onOpenRoadmap={() => setIsRoadmapModalOpen(true)}
          />
        );
      case '/projects':
        return (
          <ProjectsPage
            onOpenNewProject={() => setIsNewProjectModalOpen(true)}
          />
        );
      case '/settings':
        return <SettingsPage />;
      case '/youtube-intelligence':
        return <YouTubeIntelligenceDashboardPage />;
      case '/youtube-intelligence/channel':
        return <ChannelAnalyzerPage />;
      case '/youtube-intelligence/video':
        return <VideoAnalyzerPage />;
      case '/youtube-intelligence/rankings':
        return <RankingsPage />;
      case '/youtube-intelligence/topics':
        return <TopicRadarPage />;
      case '/youtube-intelligence/competitors':
        return <CompetitorRadarPage />;
      case '/youtube-intelligence/live':
        return <LiveRadarPage />;
      case '/youtube-intelligence/outliers':
        return <OutlierDetectorPage />;
      case '/youtube-intelligence/strategy':
        return <StrategyAnalyzerPage />;
      case '/ideas':
        return <IdeaGeneratorPage />;
      case '/script':
      case '/editor':
        return <ScriptStudioPage initialTab="editor" />;
      case '/video-generator':
      case '/image-studio':
        return <ScriptStudioPage initialTab="media" />;
      case '/voice':
        return <ScriptStudioPage initialTab="voice" />;
      case '/thumbnail':
        return <ScriptStudioPage initialTab="thumbnails" />;
      case '/seo':
        return <ScriptStudioPage initialTab="seo" />;
      case '/repurpose':
        return <ScriptStudioPage initialTab="repurpose" />;
      case '/youtube':
        return <ScriptStudioPage initialTab="publish" />;
      default:
        return (
          <PlaceholderPage
            route={currentRoute}
            onOpenRoadmap={() => setIsRoadmapModalOpen(true)}
          />
        );
    }
  };

  return (
    <div
      id="creova-app-root"
      data-app-identity="dark-matter-2.0"
      className={`min-h-screen relative flex text-slate-100 transition-colors duration-300 ${
        theme === 'light' ? 'bg-slate-50 text-slate-900' : 'bg-[#020409] text-slate-100'
      }`}
    >
      {/* Spacecraft Deep Space Background Canvas with Warp Speed Trajectory */}
      <StarField isWarping={isWarping} />

      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
        onOpenRoadmap={() => setIsRoadmapModalOpen(true)}
      />

      <div className="flex-1 flex flex-col min-w-0 min-h-screen relative z-10">
        <TopBar
          onOpenCommand={() => setIsCommandModalOpen(true)}
          onOpenNewProject={() => setIsNewProjectModalOpen(true)}
        />

        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {renderActivePage()}
        </main>
      </div>

      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
      />

      <CommandModal
        isOpen={isCommandModalOpen}
        onClose={() => setIsCommandModalOpen(false)}
      />

      <RoadmapModal
        isOpen={isRoadmapModalOpen}
        onClose={() => setIsRoadmapModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider>
        <ThemeProvider>
          <ProjectProvider>
            <CompetitorProvider>
              <IdeaProvider>
                <ScriptProvider>
                  <YouTubeProvider>
                    <AppContent />
                  </YouTubeProvider>
                </ScriptProvider>
              </IdeaProvider>
            </CompetitorProvider>
          </ProjectProvider>
        </ThemeProvider>
      </RouterProvider>
    </AuthProvider>
  );
}