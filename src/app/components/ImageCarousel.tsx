'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export interface CarouselImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  captions?: string[];
  autoplay?: boolean;
  autoplayDelay?: number;
  showArrows?: boolean;
  showDots?: boolean;
  loop?: boolean;
  className?: string;
  onImageClick?: (image: CarouselImage, index: number) => void;
}

export default function ImageCarousel({
  images,
  captions,
  autoplay = true,
  autoplayDelay = 4000,
  showArrows = true,
  showDots = true,
  loop = true,
  className = '',
  onImageClick,
}: ImageCarouselProps) {
  const plugins = useMemo(
    () => (autoplay && images.length > 1 ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: false, stopOnMouseEnter: true })] : []),
    [autoplay, autoplayDelay, images.length]
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop }, plugins);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!images.length) return null;

  const activeCaption = captions?.[selectedIndex] || images[selectedIndex]?.caption;

  return (
    <div className={`portfolio-carousel ${className}`.trim()}>
      <div className="portfolio-carousel__viewport" ref={emblaRef}>
        <div className="portfolio-carousel__container">
          {images.map((image, index) => {
            const slide = (
              <Image
                className="portfolio-carousel__image"
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, 680px"
              />
            );

            return (
              <div className="portfolio-carousel__slide" key={`${image.src}-${index}`}>
                {onImageClick ? (
                  <button
                    className="portfolio-carousel__media portfolio-carousel__media--button"
                    onClick={() => onImageClick(image, index)}
                    aria-label={`View ${image.alt}`}
                  >
                    {slide}
                  </button>
                ) : (
                  <div className="portfolio-carousel__media">{slide}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showArrows && images.length > 1 ? (
        <>
          <button className="portfolio-carousel__arrow portfolio-carousel__arrow--prev" onClick={scrollPrev} aria-label="Previous image">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button className="portfolio-carousel__arrow portfolio-carousel__arrow--next" onClick={scrollNext} aria-label="Next image">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      ) : null}

      {(activeCaption || showDots) && (
        <div className="portfolio-carousel__footer">
          {activeCaption ? <p className="portfolio-carousel__caption">{activeCaption}</p> : <span />}
          {showDots && images.length > 1 ? (
            <div className="portfolio-carousel__dots" role="group" aria-label="Carousel pagination">
              {images.map((_, index) => (
                <button
                  className={`portfolio-carousel__dot${index === selectedIndex ? ' portfolio-carousel__dot--active' : ''}`}
                  key={index}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-pressed={index === selectedIndex}
                  onClick={() => scrollTo(index)}
                />
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
