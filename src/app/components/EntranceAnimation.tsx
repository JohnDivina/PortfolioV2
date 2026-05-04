'use client';

import { useEffect, useState } from 'react';

export default function EntranceAnimation() {
  const [stage, setStage] = useState<'pulsing' | 'expanding' | 'done'>('pulsing');

  useEffect(() => {
    // Stage 1: Pulse for 1.2 seconds, then trigger expansion
    const expandTimer = setTimeout(() => {
      setStage('expanding');
    }, 1200);

    // Stage 2: Expansion lasts 0.8s, then remove overlay
    const doneTimer = setTimeout(() => {
      setStage('done');
      // Dispatch an event so the rest of the app knows the animation finished
      window.dispatchEvent(new Event('entranceComplete'));
    }, 2000);

    return () => {
      clearTimeout(expandTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (stage === 'done') return null;

  return (
    <div className={`entrance-overlay ${stage === 'expanding' ? 'is-expanding' : ''}`}>
      <div className="entrance-sphere"></div>
    </div>
  );
}
