'use client';

import { useState } from 'react';
import ExperienceModal from './ExperienceModal';
import type { CarouselImage } from './ImageCarousel';

interface ExperienceItem {
  period: string;
  title: string;
  org: string;
  sub?: string;
  highlights?: CarouselImage[];
}

const projectTechnicalImages: CarouselImage[] = [
  { src: '/experience/_placeholder/exp1.png', alt: 'Project Technical greenhouse monitoring setup', caption: 'Greenhouse monitoring setup and project field work' },
  { src: '/experience/_placeholder/exp2.png', alt: 'Project Technical smart indoor farming dashboard', caption: 'Smart indoor farming system interface and monitoring' },
  { src: '/experience/_placeholder/exp3.jpg', alt: 'Project Technical sensor and equipment documentation', caption: 'Sensor, equipment, and implementation documentation' },
  { src: '/experience/_placeholder/exp4.JPG', alt: 'Project Technical greenhouse equipment installation', caption: 'Greenhouse equipment installation and validation' },
  { src: '/experience/_placeholder/exp5.jpg', alt: 'Project Technical crop monitoring activity', caption: 'Crop monitoring and project activity documentation' },
  { src: '/experience/_placeholder/exp6.jpg', alt: 'Project Technical system testing activity', caption: 'System testing and technical support work' },
  { src: '/experience/_placeholder/exp7.jpg', alt: 'Project Technical project presentation material', caption: 'Project presentation and reporting material' },
  { src: '/experience/_placeholder/exp8.jpg', alt: 'Project Technical team and field documentation', caption: 'Team coordination and field documentation' },
];

const EXPERIENCE: ExperienceItem[] = [
  {
    period: 'February 2026 – March 2026',
    title: 'Research Assistant I',
    org: 'Central Luzon State University - DOST-PCAARRD',
    sub: 'R&D Program for Sustainable and Competitive Philippines Onion Industry',
  },
  {
    period: 'September 2023 – January 2026',
    title: 'Project Technical',
    org: 'Central Luzon State University - DOST-PCAARRD',
    sub: 'Smart Indoor-Farming for High-Value Crops',
    highlights: projectTechnicalImages,
  },
  {
    period: '2020 – 2021',
    title: 'Staff',
    org: 'Center for Diabetes Care',
    sub: '',
  },
];

const EDUCATION = [
  {
    period: '2025 – Present',
    badge: 'Graduate',
    badgeClass: 'tl-badge--edu',
    title: 'Master of Information Systems',
    org: 'University of the Philippines',
    star: false,
  },
  {
    period: '2023',
    badge: 'Undergraduate',
    badgeClass: 'tl-badge--edu',
    title: 'BS Information Technology',
    org: 'Central Luzon State University · Major in Systems Development',
    star: true,
  },
];

export default function Timeline() {
  const [activeExp, setActiveExp] = useState<ExperienceItem | null>(null);

  return (
    <>
      <section className="section reveal" id="experience">
        <h2 className="section__title">Experience</h2>
        <div className="timeline">
          {EXPERIENCE.map((item, i) => (
            <div className="timeline-item" key={i}>
              <div className="tl-dot" />
              <div 
                className={`tl-content ${item.highlights?.length ? 'tl-content--interactive' : ''}`}
                onClick={() => { if (item.highlights?.length) setActiveExp(item); }}
                role={item.highlights?.length ? 'button' : undefined}
                tabIndex={item.highlights?.length ? 0 : undefined}
              >
                <div className="tl-meta">
                  <span className="tl-year">{item.period}</span>
                  <span className="tl-badge tl-badge--work">Work</span>
                </div>
                <h3 className="tl-title">{item.title}</h3>
                <p className="tl-sub">{item.org}</p>
                {item.sub && <p className="tl-sub">{item.sub}</p>}
                
                {item.highlights?.length ? (
                  <button className="tl-view-btn">
                    View Highlights ›
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section reveal" id="education">
        <h2 className="section__title">Education</h2>
        <div className="timeline">
          {EDUCATION.map((item, i) => (
            <div className="timeline-item" key={i}>
              <div className={`tl-dot${item.star ? ' tl-dot--star' : ''}`} />
              <div className="tl-content">
                <div className="tl-meta">
                  <span className="tl-year">{item.period}</span>
                  <span className={`tl-badge ${item.badgeClass}`}>{item.badge}</span>
                </div>
                <h3 className="tl-title">{item.title}</h3>
                <p className="tl-sub">{item.org}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ExperienceModal 
        isOpen={!!activeExp}
        onClose={() => setActiveExp(null)}
        title={activeExp?.title || ''}
        org={activeExp?.org || ''}
        images={activeExp?.highlights || []}
      />
    </>
  );
}
