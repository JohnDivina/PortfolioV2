'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
const STORAGE_KEY = 'portfolio-theme';

interface ThemeCtx {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeCtx>({ theme: 'light', setTheme: () => {} });
export const useTheme = () => useContext(ThemeContext);

const getStoredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  return (localStorage.getItem(STORAGE_KEY) as Theme) || 'light';
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getStoredTheme);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    if (newTheme === theme) return;

    // Fallback for browsers that don't support View Transitions
    if (!document.startViewTransition) {
      setThemeState(newTheme);
      return;
    }

    // Set a class so CSS knows which direction to wipe
    document.documentElement.className = newTheme === 'dark' ? 'to-dark' : 'to-light';

    document.startViewTransition(() => {
      // The API takes a snapshot, executes this callback, then takes another snapshot
      // and animates between them based on our CSS.
      setThemeState(newTheme);
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
