'use client';

import { useEffect, useRef } from 'react';
import ImageCarousel from './ImageCarousel';
import type { CarouselImage } from './ImageCarousel';

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  org: string;
  images: CarouselImage[];
}

export default function ExperienceModal({ isOpen, onClose, title, org, images }: ExperienceModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const total = images.length;
  const showGallery = total > 0;

  return (
    <div 
      className={`exp-modal-overlay ${isOpen ? 'is-open' : ''}`} 
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      aria-modal="true"
      role="dialog"
    >
      <div className="exp-modal" ref={modalRef}>
        <div className="exp-modal__header">
          <div className="exp-modal__title-group">
            <h2 className="exp-modal__title">{title}</h2>
            <p className="exp-modal__org">{org}</p>
          </div>
          <button className="exp-modal__close" aria-label="Close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="exp-modal__body">
          {showGallery ? (
            <ImageCarousel
              images={images}
              autoplay
              autoplayDelay={3800}
              loop
              showArrows
              showDots
              className="portfolio-carousel--experience"
            />
          ) : (
            <div className="exp-modal__placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity={0.3}>
                <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
              </svg>
              <p>Experience highlights coming soon.</p>
              <p className="exp-modal__hint">Images will be added here for this role.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
