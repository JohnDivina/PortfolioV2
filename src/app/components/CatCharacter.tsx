'use client';

import { useTheme } from './ThemeProvider';
import { useEffect, useRef } from 'react';

export default function CatCharacter() {
  const { theme } = useTheme();
  const catRef    = useRef<HTMLDivElement>(null);
  const stateRef  = useRef({ x: 30, dir: 1, timer: null as ReturnType<typeof setTimeout> | null, raf: null as number | null, last: '' as string, paused: false });

  useEffect(() => {
    const cat = catRef.current;
    if (!cat) return;
    const s = stateRef.current;

    function stop() {
      if (s.timer) { clearTimeout(s.timer); s.timer = null; }
      if (s.raf)   { cancelAnimationFrame(s.raf); s.raf = null; }
      cat!.className = 'cat-char';
    }

    function setState(state: string) {
      cat!.className = `cat-char cat-char--${state}`;
    }

    function pick(exclude: string) {
      const states = ['run','run','run','sit','sit','sleep','wash','stretch'];
      const opts   = states.filter(st => st !== exclude);
      return opts[Math.floor(Math.random() * opts.length)];
    }

    function runTo(targetVw: number, ms: number, done: () => void) {
      if (s.raf) cancelAnimationFrame(s.raf);
      const startX  = s.x;
      const startT  = performance.now();
      function step(now: number) {
        const p = Math.min((now - startT) / ms, 1);
        s.x = startX + (targetVw - startX) * p;
        cat!.style.left = `${s.x}vw`;
        if (p < 1) { s.raf = requestAnimationFrame(step); } else { s.x = targetVw; done(); }
      }
      s.raf = requestAnimationFrame(step);
    }

    function cycle() {
      const state = pick(s.last);
      s.last = state;
      if (state === 'run') {
        if (Math.random() > 0.3) s.dir *= -1;
        const target = s.dir === 1 ? 55 + Math.random() * 33 : 2 + Math.random() * 28;
        const dur    = 3000 + Math.random() * 4000;
        cat!.classList.toggle('cat-char--face-left', s.dir === -1);
        setState('run');
        runTo(target, dur, () => { s.timer = setTimeout(cycle, 80 + Math.random() * 220); });
      } else {
        setState(state);
        if (s.raf) { cancelAnimationFrame(s.raf); s.raf = null; }
        const dur = state === 'sleep' ? 4000 + Math.random() * 4000 : state === 'sit' ? 2000 + Math.random() * 3000 : 1500 + Math.random() * 3500;
        s.timer = setTimeout(cycle, dur);
      }
    }

    if (theme === 'cat') {
      s.x   = 10 + Math.random() * 50;
      s.dir = Math.random() > 0.5 ? 1 : -1;
      s.last = '';
      cat.style.left = `${s.x}vw`;
      cat.classList.toggle('cat-char--face-left', s.dir === -1);
      cycle();
    } else {
      stop();
    }

    return stop;
  }, [theme]);

  return (
    <div className="cat-stage" id="catStage" aria-hidden="true">
      <div className="cat-char" id="catChar" ref={catRef}>
        <div className="cat-zzz" id="catZzz">z</div>
        <svg className="cat-svg" id="catSvg" viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bodyGrad" cx="42%" cy="38%" r="60%"><stop offset="0%" stopColor="#f5cdb8"/><stop offset="55%" stopColor="#e8a882"/><stop offset="100%" stopColor="#c4734a"/></radialGradient>
            <radialGradient id="headGrad" cx="40%" cy="35%" r="58%"><stop offset="0%" stopColor="#f7d5c2"/><stop offset="50%" stopColor="#ebb894"/><stop offset="100%" stopColor="#c97855"/></radialGradient>
            <radialGradient id="earInnerGrad" cx="50%" cy="60%" r="55%"><stop offset="0%" stopColor="#fbaabb"/><stop offset="100%" stopColor="#e06080"/></radialGradient>
            <radialGradient id="eyeGrad" cx="35%" cy="30%" r="55%"><stop offset="0%" stopColor="#7ecfb0"/><stop offset="60%" stopColor="#2a9370"/><stop offset="100%" stopColor="#0d5a41"/></radialGradient>
            <radialGradient id="bellyGrad" cx="50%" cy="45%" r="55%"><stop offset="0%" stopColor="#fde8d8"/><stop offset="100%" stopColor="#f2c4a0"/></radialGradient>
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="rgba(0,0,0,0.25)"/></filter>
          </defs>
          <ellipse cx="60" cy="98" rx="32" ry="5" fill="rgba(0,0,0,0.12)"/>
          <ellipse className="cat-body" cx="60" cy="78" rx="28" ry="20" fill="url(#bodyGrad)" filter="url(#softShadow)"/>
          <ellipse cx="60" cy="80" rx="15" ry="12" fill="url(#bellyGrad)" opacity="0.85"/>
          <ellipse cx="80" cy="92" rx="9" ry="6" fill="#c47250" transform="rotate(-20 80 92)"/>
          <ellipse cx="42" cy="93" rx="9" ry="6" fill="#c47250" transform="rotate(20 42 93)"/>
          <rect className="cat-leg cat-leg--fr" x="70" y="84" width="12" height="16" rx="6" fill="#d68860" transform="rotate(8 70 84)"/>
          <rect className="cat-leg cat-leg--fl" x="38" y="84" width="12" height="16" rx="6" fill="#d68860" transform="rotate(-8 38 84)"/>
          <ellipse cx="78" cy="98" rx="7" ry="4.5" fill="#f0c4a0"/>
          <ellipse cx="44" cy="98" rx="7" ry="4.5" fill="#f0c4a0"/>
          <path className="cat-tail" d="M84 82 Q98 72 96 58 Q94 46 86 52 Q82 55 85 62" stroke="url(#bodyGrad)" strokeWidth="8" strokeLinecap="round" fill="none"/>
          <circle cx="84" cy="52" r="5" fill="#f5cdb8"/>
          <ellipse cx="60" cy="60" rx="16" ry="10" fill="url(#bodyGrad)"/>
          <ellipse className="cat-head" cx="60" cy="42" rx="28" ry="26" fill="url(#headGrad)" filter="url(#softShadow)"/>
          <ellipse cx="50" cy="32" rx="11" ry="8" fill="rgba(255,255,255,0.25)" transform="rotate(-20 50 32)"/>
          <polygon className="cat-ear cat-ear--l" points="34,22 26,2 44,18" fill="#d68860"/>
          <polygon className="cat-ear cat-ear--r" points="86,22 94,2 76,18" fill="#d68860"/>
          <polygon points="35,20 29,6 43,17" fill="url(#earInnerGrad)" opacity="0.85"/>
          <polygon points="85,20 91,6 77,17" fill="url(#earInnerGrad)" opacity="0.85"/>
          <ellipse className="cat-eye cat-eye--l" cx="46" cy="40" rx="8" ry="9" fill="#1a1206"/>
          <ellipse className="cat-eye cat-eye--r" cx="74" cy="40" rx="8" ry="9" fill="#1a1206"/>
          <ellipse cx="46" cy="40" rx="6" ry="7" fill="url(#eyeGrad)"/>
          <ellipse cx="74" cy="40" rx="6" ry="7" fill="url(#eyeGrad)"/>
          <ellipse className="cat-pupil--l" cx="46" cy="41" rx="3" ry="5" fill="#0d1117"/>
          <ellipse className="cat-pupil--r" cx="74" cy="41" rx="3" ry="5" fill="#0d1117"/>
          <circle cx="43" cy="37" r="2.2" fill="white" opacity="0.9"/>
          <circle cx="71" cy="37" r="2.2" fill="white" opacity="0.9"/>
          <path d="M57 50 L60 53 L63 50 Q60 47 57 50Z" fill="#e06080"/>
          <path d="M55 54 Q60 59 65 54" stroke="#c04060" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <line x1="60" y1="53" x2="60" y2="57" stroke="#c04060" strokeWidth="1.2" strokeLinecap="round"/>
          <ellipse cx="38" cy="50" rx="7" ry="4" fill="rgba(240,140,140,0.3)"/>
          <ellipse cx="82" cy="50" rx="7" ry="4" fill="rgba(240,140,140,0.3)"/>
          <line x1="62" y1="51" x2="88" y2="46" stroke="#8b6346" strokeWidth="1.2" opacity="0.7" strokeLinecap="round"/>
          <line x1="62" y1="53" x2="90" y2="53" stroke="#8b6346" strokeWidth="1.2" opacity="0.7" strokeLinecap="round"/>
          <line x1="62" y1="55" x2="88" y2="60" stroke="#8b6346" strokeWidth="1.2" opacity="0.7" strokeLinecap="round"/>
          <line x1="58" y1="51" x2="32" y2="46" stroke="#8b6346" strokeWidth="1.2" opacity="0.7" strokeLinecap="round"/>
          <line x1="58" y1="53" x2="30" y2="53" stroke="#8b6346" strokeWidth="1.2" opacity="0.7" strokeLinecap="round"/>
          <line x1="58" y1="55" x2="32" y2="60" stroke="#8b6346" strokeWidth="1.2" opacity="0.7" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
}
