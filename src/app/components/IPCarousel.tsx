'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import ImageCarousel from './ImageCarousel';
import type { CarouselImage } from './ImageCarousel';

const SLIDES: CarouselImage[] = [
  { src: '/assets/ip/CR1.png', alt: 'Intellectual Property Certificate 1', caption: 'Copyright registration certificate 1' },
  { src: '/assets/ip/CR2.png', alt: 'Intellectual Property Certificate 2', caption: 'Copyright registration certificate 2' },
  { src: '/ip/document-3.svg', alt: 'Intellectual Property Document 3', caption: 'Additional IP document slot' },
  { src: '/ip/document-4.svg', alt: 'Intellectual Property Document 4', caption: 'Additional IP document slot' },
  { src: '/ip/document-5.svg', alt: 'Intellectual Property Document 5', caption: 'Additional IP document slot' },
];

export default function IPCarousel() {
  const [selectedImg, setSelectedImg] = useState<CarouselImage | null>(null);

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
        <ImageCarousel
          images={SLIDES}
          autoplay
          autoplayDelay={4000}
          loop
          showArrows
          showDots
          className="portfolio-carousel--ip"
          onImageClick={setSelectedImg}
        />
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
