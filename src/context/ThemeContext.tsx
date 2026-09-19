import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ThemeMode } from '../types';
import { useAuth } from './AuthContext';
import { db, isFirebaseConfigured } from '../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface CoreColorPreset {
  id: string;
  label: string;
  hue: number;
  hex: string;
  glow: string;
  description: string;
}

export const CORE_COLOR_PRESETS: CoreColorPreset[] = [
  {
    id: 'cyan',
    label: 'CYAN CORE',
    hue: 185,
    hex: '#00f0ff',
    glow: 'rgba(0, 240, 255, 0.45)',
    description: 'Quantum relativistic telemetry (Default)',
  },
  {
    id: 'blue',
    label: 'DEEP BLUE',
    hue: 215,
    hex: '#3b82f6',
    glow: 'rgba(59, 130, 246, 0.45)',
    description: 'Deep-space sensor & avionics wave',
  },
  {
    id: 'violet',
    label: 'VIOLET CORE',
    hue: 265,
    hex: '#8b5cf6',
    glow: 'rgba(139, 92, 246, 0.45)',
    description: 'Dark matter singularity ion cloud',
  },
  {
    id: 'magenta',
    label: 'MAGENTA CORE',
    hue: 320,
    hex: '#ec4899',
    glow: 'rgba(236, 72, 153, 0.45)',
    description: 'Event horizon relativistic burst',
  },
  {
    id: 'orange',
    label: 'SOLAR ORANGE',
    hue: 25,
    hex: '#f97316',
    glow: 'rgba(249, 115, 22, 0.45)',
    description: 'Accretion disk plasma radiation',
  },
  {
    id: 'green',
    label: 'ENERGY GREEN',
    hue: 150,
    hex: '#10b981',
    glow: 'rgba(16, 185, 129, 0.45)',
    description: 'Warp matrix nominal status flow',
  },
];

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  // Global Hue & Core Color Shifter
  coreHue: number;
  corePreset: string;
  setCoreHue: (hue: number) => void;
  setCorePreset: (presetId: string) => void;
  presets: CoreColorPreset[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'creova_theme';
const HUE_STORAGE_KEY = 'creova_core_hue';
const PRESET_STORAGE_KEY = 'creova_core_preset';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { authState, user } = useAuth();

  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'dark' || saved === 'light' || saved === 'mix') {
        return saved;
      }
    } catch {
      // ignore storage error
    }
    return 'dark'; // Default futuristic dark command center
  });

  const [coreHue, setCoreHueState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(HUE_STORAGE_KEY);
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 360) {
          return parsed;
        }
      }
    } catch {
      // ignore storage error
    }
    return 185; // Default Cyan Core
  });

  const [corePreset, setCorePresetState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(PRESET_STORAGE_KEY);
      if (saved) return saved;
    } catch {
      // ignore storage error
    }
    return 'cyan';
  });

  // Apply theme classes and dynamic CSS hue variables to document root
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-dark', 'theme-light', 'theme-mix');
    root.classList.add(`theme-${theme}`);
    root.style.colorScheme = theme === 'light' ? 'light' : 'dark';

    // Apply centralized theme token system
    root.style.setProperty('--dm-hue', String(coreHue));
    root.style.setProperty('--dm-accent', `hsl(${coreHue}, 100%, 50%)`);
    root.style.setProperty('--dm-accent-bright', `hsl(${coreHue}, 100%, 68%)`);
    root.style.setProperty('--dm-accent-glow', `hsla(${coreHue}, 100%, 50%, 0.45)`);
    root.style.setProperty('--dm-accent-soft', `hsla(${coreHue}, 100%, 50%, 0.12)`);
    root.style.setProperty('--dm-accent-border', `hsla(${coreHue}, 100%, 50%, 0.38)`);
    root.style.setProperty('--dm-accent-energy', `hsl(${(coreHue + 35) % 360}, 100%, 55%)`);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
      localStorage.setItem(HUE_STORAGE_KEY, String(coreHue));
      localStorage.setItem(PRESET_STORAGE_KEY, corePreset);
    } catch (e) {
      console.warn('Could not persist theme/hue to localStorage', e);
    }
  }, [theme, coreHue, corePreset]);

  // Sync settings from Firestore when user authenticates
  useEffect(() => {
    if (authState === 'AUTHENTICATED' && user && isFirebaseConfigured && db) {
      const settingsDocRef = doc(db, 'users', user.id, 'settings', 'preferences');
      getDoc(settingsDocRef)
        .then((snap) => {
          if (snap.exists()) {
            const data = snap.data();
            if (data.theme === 'dark' || data.theme === 'light' || data.theme === 'mix') {
              setThemeState(data.theme);
            }
            if (typeof data.coreHue === 'number') {
              setCoreHueState(data.coreHue);
            }
            if (typeof data.corePreset === 'string') {
              setCorePresetState(data.corePreset);
            }
          }
        })
        .catch((err) => {
          console.warn('Could not fetch user theme settings from Firestore:', err);
        });
    }
  }, [authState, user]);

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);

    if (authState === 'AUTHENTICATED' && user && isFirebaseConfigured && db) {
      const settingsDocRef = doc(db, 'users', user.id, 'settings', 'preferences');
      setDoc(
        settingsDocRef,
        {
          id: 'preferences',
          theme: mode,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      ).catch((err) => {
        console.warn('Failed persisting theme to Firestore:', err);
      });
    }
  };

  const setCoreHue = (hue: number) => {
    const validHue = Math.max(0, Math.min(360, Math.round(hue)));
    setCoreHueState(validHue);
    
    // Check if matches preset
    const matching = CORE_COLOR_PRESETS.find((p) => Math.abs(p.hue - validHue) < 5);
    setCorePresetState(matching ? matching.id : 'custom');

    if (authState === 'AUTHENTICATED' && user && isFirebaseConfigured && db) {
      const settingsDocRef = doc(db, 'users', user.id, 'settings', 'preferences');
      setDoc(
        settingsDocRef,
        {
          coreHue: validHue,
          corePreset: matching ? matching.id : 'custom',
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      ).catch((err) => {
        console.warn('Failed persisting coreHue to Firestore:', err);
      });
    }
  };

  const setCorePreset = (presetId: string) => {
    const found = CORE_COLOR_PRESETS.find((p) => p.id === presetId);
    if (found) {
      setCorePresetState(found.id);
      setCoreHueState(found.hue);

      if (authState === 'AUTHENTICATED' && user && isFirebaseConfigured && db) {
        const settingsDocRef = doc(db, 'users', user.id, 'settings', 'preferences');
        setDoc(
          settingsDocRef,
          {
            coreHue: found.hue,
            corePreset: found.id,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        ).catch((err) => {
          console.warn('Failed persisting corePreset to Firestore:', err);
        });
      }
    }
  };

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === 'dark' ? 'mix' : theme === 'mix' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        coreHue,
        corePreset,
        setCoreHue,
        setCorePreset,
        presets: CORE_COLOR_PRESETS,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
