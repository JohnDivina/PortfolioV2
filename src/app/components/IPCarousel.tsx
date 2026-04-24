'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const SLIDES = [
  { src: '/assets/ip/CR1.png', alt: 'Intellectual Property Certificate 1' },
  { src: '/assets/ip/CR2.png', alt: 'Intellectual Property Certificate 2' },
];

export default function IPCarousel() {
  const [current, setCurrent] = useState(0);
  const [selectedImg, setSelectedImg] = useState<{ src: string; alt: string } | null>(null);
  const paused  = useRef(false);
  const total   = SLIDES.length;

  const goTo = (index: number) => {
    setCurrent(((index % total) + total) % total);
  };

  useEffect(() => {
    if (total <= 1 || selectedImg) return;
    const timer = setInterval(() => {
      if (!paused.current) goTo(current + 1);
    }, 4000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, selectedImg]);

  // ESC to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImg(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <section className="section reveal" id="ip">
        <div className="section__hdr">
          <h2 className="section__title">IP / Copyrights Accomplished</h2>
        </div>
        <div
          className="ip-carousel"
          id="ipCarousel"
          onMouseEnter={() => { paused.current = true; }}
          onMouseLeave={() => { paused.current = false; }}
        >
          <div
            className="ip-track"
            id="ipTrack"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {SLIDES.map((slide, i) => (
              <div
                key={i}
                className="ip-slide"
                role="button"
                tabIndex={0}
                onClick={() => setSelectedImg(slide)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedImg(slide); }}
                aria-label={`View ${slide.alt}`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  width={380}
                  height={280}
                  className="ip-img"
                  style={{ objectFit: 'contain', width: '100%', height: '280px' }}
                />
              </div>
            ))}
          </div>
          {total > 1 && (
            <div className="ip-dots" id="ipDots" role="group" aria-label="Carousel navigation">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  className={`ip-dot${i === current ? ' ip-dot--active' : ''}`}
                  aria-label={`Slide ${i + 1}`}
                  aria-pressed={i === current}
                  onClick={(e) => { e.stopPropagation(); goTo(i); }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* IP Modal / Lightbox */}
      <div 
        className={`ip-modal-overlay ${selectedImg ? 'is-open' : ''}`}
        onClick={() => setSelectedImg(null)}
        aria-hidden={!selectedImg}
        role="dialog"
      >
        <div className="ip-modal" onClick={(e) => e.stopPropagation()}>
          <button className="ip-modal__close" onClick={() => setSelectedImg(null)} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          {selectedImg && (
            <div className="ip-modal__content">
              <Image 
                src={selectedImg.src} 
                alt={selectedImg.alt} 
                width={1200} 
                height={1600} 
                className="ip-modal__img"
                style={{ objectFit: 'contain' }}
              />
              <p className="ip-modal__caption">{selectedImg.alt}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
