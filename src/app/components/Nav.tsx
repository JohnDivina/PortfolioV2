'use client';

import { useTheme } from './ThemeProvider';
import StatusWidget from './StatusWidget';

const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);
const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export default function Nav() {
  const { theme, setTheme } = useTheme();
  const themes = [
    { id: 'light' as const, icon: <SunIcon />, label: 'Light Mode' },
    { id: 'dark'  as const, icon: <MoonIcon />, label: 'Dark Mode' },
  ];

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
  };

  return (
    <nav className="topbar" id="topbar">
      <div className="topbar__inner">
        <a href="#home" className="topbar__brand" onClick={scrollTo('home')}>
          JRD<span className="brand-dot">.</span>
        </a>
        <div className="topbar__links">
          {['about','stack','projects','experience'].map(id => (
            <a key={id} href={`#${id}`} className="nav-link" onClick={scrollTo(id)}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </div>
        <StatusWidget />
        <div className="theme-switcher" role="group" aria-label="Theme selection">
          {themes.map(t => (
            <button
              key={t.id}
              className={`theme-btn${theme === t.id ? ' is-active' : ''}`}
              title={t.label}
              onClick={() => setTheme(t.id)}
            >
              {t.icon}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

