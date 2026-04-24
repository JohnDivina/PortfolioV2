'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const SLIDES = [
  { src: '/assets/ip/CR1.png', alt: 'Intellectual Property Certificate 1', href: '/assets/ip/CR1.png' },
  { src: '/assets/ip/CR2.png', alt: 'Intellectual Property Certificate 2', href: '/assets/ip/CR2.png' },
];

export default function IPCarousel() {
  const [current, setCurrent] = useState(0);
  const paused  = useRef(false);
  const total   = SLIDES.length;

  const goTo = (index: number) => {
    setCurrent(((index % total) + total) % total);
  };

  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(() => {
      if (!paused.current) goTo(current + 1);
    }, 4000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  return (
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
            <a
              key={i}
              href={slide.href}
              className="ip-slide"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={slide.alt}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                width={380}
                height={280}
                className="ip-img"
                style={{ objectFit: 'contain', width: '100%', height: '280px' }}
              />
            </a>
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
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
