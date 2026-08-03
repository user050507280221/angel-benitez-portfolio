import React, { createContext, useContext, useEffect, useState } from 'react';

export const themes = {
  green: {
    name: 'Cyberpunk Neon',
    swatch: '#00e08e',
    vars: {
      '--accent': '#00e08e',
      '--accent-bright': '#33ffb2',
      '--accent-glow': 'rgba(0, 224, 142, 0.22)',
      '--border-accent': 'rgba(0, 224, 142, 0.35)',
      '--accent-cyan': '#00d4ff',
      '--accent-pink': '#ff6b9d',
    },
  },
  cyan: {
    name: 'Electric Cyan',
    swatch: '#00d4ff',
    vars: {
      '--accent': '#00d4ff',
      '--accent-bright': '#5ce8ff',
      '--accent-glow': 'rgba(0, 212, 255, 0.22)',
      '--border-accent': 'rgba(0, 212, 255, 0.35)',
      '--accent-cyan': '#00e08e',
      '--accent-pink': '#ff6b9d',
    },
  },
  purple: {
    name: 'Royal Purple',
    swatch: '#8b5cf6',
    vars: {
      '--accent': '#8b5cf6',
      '--accent-bright': '#a78bfa',
      '--accent-glow': 'rgba(139, 92, 246, 0.22)',
      '--border-accent': 'rgba(139, 92, 246, 0.35)',
      '--accent-cyan': '#00d4ff',
      '--accent-pink': '#ff6b9d',
    },
  },
  amber: {
    name: 'Sunset Amber',
    swatch: '#ff9d42',
    vars: {
      '--accent': '#ff9d42',
      '--accent-bright': '#ffb96b',
      '--accent-glow': 'rgba(255, 157, 66, 0.22)',
      '--border-accent': 'rgba(255, 157, 66, 0.35)',
      '--accent-cyan': '#ffd166',
      '--accent-pink': '#ff6b9d',
    },
  },
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children, defaultTheme = 'green' }) {
  const [themeKey, setThemeKey] = useState(() => {
    try {
      return localStorage.getItem('portfolio-theme') || defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  useEffect(() => {
    const theme = themes[themeKey] || themes[defaultTheme];
    const root = document.documentElement;
    Object.entries(theme.vars).forEach(([key, val]) => {
      root.style.setProperty(key, val);
    });
    root.setAttribute('data-theme', themeKey);
    try {
      localStorage.setItem('portfolio-theme', themeKey);
    } catch {
      /* ignore */
    }
  }, [themeKey, defaultTheme]);

  return (
    <ThemeContext.Provider value={{ themeKey, setThemeKey, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}