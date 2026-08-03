import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import './ThemeSwitcher.css';

export default function ThemeSwitcher() {
  const { themeKey, setThemeKey, themes } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div ref={rootRef} className={`theme-switcher ${open ? 'theme-switcher--open' : ''}`}>
      <button
        className="theme-switcher__toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label="Change accent color"
        aria-expanded={open}
      >
        <span className="theme-switcher__toggle-dot" />
      </button>

      <div className="theme-switcher__panel" role="menu">
        <span className="theme-switcher__label">Accent</span>
        <div className="theme-switcher__options">
          {Object.entries(themes).map(([key, theme]) => (
            <button
              key={key}
              role="menuitemradio"
              aria-checked={themeKey === key}
              className={`theme-switcher__swatch ${
                themeKey === key ? 'theme-switcher__swatch--active' : ''
              }`}
              style={{ '--swatch-color': theme.swatch }}
              onClick={() => setThemeKey(key)}
              title={theme.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
