'use client';

import { useTheme } from './ThemeProvider';
import { useEffect } from 'react';

const PLANT_LEFT = `<svg width="200" height="440" viewBox="0 0 200 440" fill="none" xmlns="http://www.w3.org/2000/svg" class="plant-svg">
  <ellipse cx="100" cy="434" rx="52" ry="8" fill="#6b4226" opacity="0.4"/>
  <path d="M100 434 Q98 370 94 305 Q90 248 97 185 Q102 140 94 88 Q88 52 102 18" stroke="#4a7c59" stroke-width="5" stroke-linecap="round" fill="none"/>
  <path d="M96 298 Q70 284 46 274 Q28 266 12 256" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round" fill="none"/>
  <path d="M95 222 Q120 207 146 197 Q164 190 180 184" stroke="#4a7c59" stroke-width="3" stroke-linecap="round" fill="none"/>
  <path d="M95 152 Q72 137 54 127 Q38 118 24 111" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M98 90 Q116 78 132 66 Q146 56 156 46" stroke="#4a7c59" stroke-width="2" stroke-linecap="round" fill="none"/>
  <ellipse cx="96" cy="364" rx="22" ry="10" fill="#52b788" transform="rotate(28 96 364)" opacity="0.9"/>
  <ellipse cx="94" cy="254" rx="24" ry="10" fill="#52b788" transform="rotate(-20 94 254)" opacity="0.9"/>
  <ellipse cx="96" cy="168" rx="20" ry="9" fill="#40916c" transform="rotate(24 96 168)" opacity="0.85"/>
  <ellipse cx="22" cy="258" rx="20" ry="8" fill="#52b788" transform="rotate(-16 22 258)" opacity="0.9"/>
  <circle cx="14" cy="253" r="14" fill="#c0392b"/>
  <circle cx="28" cy="261" r="12" fill="#e74c3c"/>
  <circle cx="40" cy="270" r="11" fill="#e74c3c"/>
  <circle cx="108" cy="16" r="9" fill="#e74c3c"/>
</svg>`;

const PLANT_RIGHT = `<svg width="200" height="440" viewBox="0 0 200 440" fill="none" xmlns="http://www.w3.org/2000/svg" class="plant-svg">
  <ellipse cx="100" cy="434" rx="52" ry="8" fill="#6b4226" opacity="0.4"/>
  <path d="M100 434 Q102 370 106 305 Q110 248 103 185 Q98 140 106 88 Q112 52 98 18" stroke="#4a7c59" stroke-width="5" stroke-linecap="round" fill="none"/>
  <path d="M104 298 Q130 284 154 274 Q172 266 188 256" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round" fill="none"/>
  <path d="M105 222 Q80 207 54 197 Q36 190 20 184" stroke="#4a7c59" stroke-width="3" stroke-linecap="round" fill="none"/>
  <path d="M105 152 Q128 137 146 127 Q162 118 176 111" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M102 90 Q84 78 68 66 Q54 56 44 46" stroke="#4a7c59" stroke-width="2" stroke-linecap="round" fill="none"/>
  <ellipse cx="104" cy="364" rx="22" ry="10" fill="#52b788" transform="rotate(-28 104 364)" opacity="0.9"/>
  <ellipse cx="186" cy="253" r="14" fill="#c0392b"/>
  <ellipse cx="92" cy="16" r="9" fill="#e74c3c"/>
</svg>`;

export default function PlantOverlay() {
  const { theme } = useTheme();

  useEffect(() => {
    const left  = document.getElementById('plantLeft');
    const right = document.getElementById('plantRight');
    if (left  && !left.querySelector('.plant-svg'))  left.innerHTML  = PLANT_LEFT;
    if (right && !right.querySelector('.plant-svg')) right.innerHTML = PLANT_RIGHT;

    if (theme === 'agri') {
      [left, right].forEach(el => {
        if (!el) return;
        const svg = el.querySelector('.plant-svg');
        if (svg) { const c = svg.cloneNode(true); el.replaceChild(c, svg); }
      });
    }
  }, [theme]);

  return (
    <div className="plant-overlay" id="plantOverlay" aria-hidden="true">
      <div className="plant plant--left"  id="plantLeft" />
      <div className="plant plant--right" id="plantRight" />
    </div>
  );
}
