'use client';

import { useState } from 'react';
import ImageCarousel from './ImageCarousel';
import type { CarouselImage } from './ImageCarousel';

interface Project {
  key: string;
  tag: string;
  title: string;
  desc: string;
  tags?: string[];
  demoUrl?: string;
  repoUrl?: string;
  hidden?: boolean;
  images: CarouselImage[];
}

const projectImages = (key: string, title: string): CarouselImage[] => [
  { src: `/projects/${key}/slide-1.svg`, alt: `${title} overview`, caption: `${title} overview` },
  { src: `/projects/${key}/slide-2.svg`, alt: `${title} interface`, caption: 'Interface and workflow preview' },
  { src: `/projects/${key}/slide-3.svg`, alt: `${title} technical setup`, caption: 'Technical setup and integration' },
  { src: `/projects/${key}/slide-4.svg`, alt: `${title} testing`, caption: 'Testing and validation' },
  { src: `/projects/${key}/slide-5.svg`, alt: `${title} documentation`, caption: 'Documentation and presentation' },
];

const smartFarmMonitoringWebsiteImages: CarouselImage[] = [
  { src: '/projects/smart-farm-monitoring-website/website.png', alt: 'Smart Farm Monitoring Website dashboard screen', caption: 'Dashboard overview and greenhouse monitoring' },
  { src: '/projects/smart-farm-monitoring-website/website2.png', alt: 'Smart Farm Monitoring Website sensor data screen', caption: 'Real-time sensor data and farm condition tracking' },
  { src: '/projects/smart-farm-monitoring-website/website3.png', alt: 'Smart Farm Monitoring Website device controls screen', caption: 'Device controls and automation workflow' },
  { src: '/projects/smart-farm-monitoring-website/website4.png', alt: 'Smart Farm Monitoring Website settings or report screen', caption: 'System settings, reports, and management tools' },
];

const PROJECTS: Project[] = [
  { key:'smart-indoor-farming-system',    tag:'Agriculture',   title:'Smart Indoor-Farming System',      desc:'Greenhouse monitoring, automation, and smart agriculture for high-value crop production in the Philippines. Built using ESP32 microcontrollers, environmental sensors, and a web-based dashboard.', images: projectImages('smart-indoor-farming-system', 'Smart Indoor-Farming System') },
  { key:'smart-farm-monitoring-website',  tag:'Web Dashboard', title:'Smart Farm Monitoring Website',    desc:'Real-time dashboard for sensor data, device control, settings, and greenhouse management.', images: smartFarmMonitoringWebsiteImages },
  { key:'phase-2-ai-smart-farm-proposal', tag:'AI / Phase 2',  title:'Phase 2 AI Smart Farm Proposal',   desc:'Advanced continuation with AI-driven decision support, grow lights, and crop disease detection.', images: projectImages('phase-2-ai-smart-farm-proposal', 'Phase 2 AI Smart Farm Proposal') },
  { key:'ai-powered-chatbot-web-app',      tag:'AI Chatbot',    title:'AI-Powered Chatbot Web App',       desc:'Built and deployed an AI chatbot web app with real-time responses, frontend integration, API connectivity, and Vercel hosting for online demonstration.', tags:['AI Chatbot','Vercel','GitHub','JavaScript','HTML','CSS','API Integration'], images: projectImages('ai-powered-chatbot-web-app', 'AI-Powered Chatbot Web App') },
  { key:'esp32-environmental-monitor',    tag:'ESP32',         title:'ESP32 Environmental Monitor',      desc:'Microcontroller system collecting temperature, humidity, light, soil moisture, and NPK readings.', images: projectImages('esp32-environmental-monitor', 'ESP32 Environmental Monitor') },
  { key:'fertigation-control-system',     tag:'Automation',    title:'Fertigation Control System',       desc:'Automated irrigation and fertigation scheduling using ESP32, relays, and web-based controls.', images: projectImages('fertigation-control-system', 'Fertigation Control System') },
  { key:'budget-tracker-mobile-app',      tag:'Mobile App',    title:'Budget Tracker Mobile App',        desc:'React Native / Expo app for expense tracking, accounts, budget monitoring, and local storage.', images: projectImages('budget-tracker-mobile-app', 'Budget Tracker Mobile App') },
  { key:'npk-soil-sensor-monitoring',     tag:'Sensors',       title:'NPK & Soil Sensor Monitoring',     desc:'NPK and soil sensor setup monitoring soil condition and supporting nutrient decisions.', images: projectImages('npk-soil-sensor-monitoring', 'NPK & Soil Sensor Monitoring') },
  { key:'evaporative-cooling-system',     tag:'Cooling',       title:'Evaporative Cooling System',       desc:'Manages fans and water pump via ESP32 for stable greenhouse temperature control.', hidden:true, images: projectImages('evaporative-cooling-system', 'Evaporative Cooling System') },
  { key:'auxiliary-fan-automation',       tag:'Automation',    title:'Auxiliary Fan Automation',         desc:'Fan control subsystem with auto/manual logic and full website integration.', hidden:true, images: projectImages('auxiliary-fan-automation', 'Auxiliary Fan Automation') },
  { key:'retractable-solar-panel-control',tag:'Solar',         title:'Retractable Solar Panel Control',   desc:'Motorized solar panel with ESP32 relay polarity reversal for automated positioning.', hidden:true, images: projectImages('retractable-solar-panel-control', 'Retractable Solar Panel Control') },
  { key:'sensor-data-logging-system',     tag:'Data',          title:'Sensor Data Logging System',        desc:'Multiple MCUs pushing readings via PHP/API endpoints into a centralized MySQL database.', hidden:true, images: projectImages('sensor-data-logging-system', 'Sensor Data Logging System') },
];

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [modal, setModal] = useState<Project | null>(null);

  const visible = showAll ? PROJECTS : PROJECTS.filter(project => !project.hidden);

  return (
    <>
      <section className="section reveal" id="projects">
        <div className="section__hdr">
          <h2 className="section__title">Projects</h2>
          <button className="view-all-btn" id="viewAllBtn" onClick={() => setShowAll(value => !value)}>
            {showAll ? 'Show Less' : 'View All'}
          </button>
        </div>
        <div className="projects-grid" id="projectsGrid">
          {visible.map(project => (
            <article
              key={project.key}
              className="project-card"
              role="button"
              tabIndex={0}
              onClick={() => setModal(project)}
              onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') setModal(project); }}
            >
              <div className="project-card__top"><span className="project-tag">{project.tag}</span></div>
              <h3 className="project-card__name">{project.title}</h3>
              <p className="project-card__desc">{project.desc}</p>
              {project.tags?.length ? (
                <div className="project-card__tags" aria-label={`${project.title} technologies`}>
                  {project.tags.slice(0, 5).map(tag => <span className="project-card__tech" key={tag}>{tag}</span>)}
                </div>
              ) : null}
              <span className="project-card__cta">View Documentation &gt;</span>
            </article>
          ))}
        </div>
      </section>

      <div
        className={`proj-modal-overlay${modal ? ' is-open' : ''}`}
        aria-hidden={!modal}
        role="dialog"
        aria-modal="true"
        onClick={event => { if (event.target === event.currentTarget) setModal(null); }}
      >
        <div className="proj-modal" id="projModal">
          <div className="proj-modal__header">
            <div>
              <span className="proj-modal__tag">{modal?.tag}</span>
              <h2 className="proj-modal__title">{modal?.title}</h2>
            </div>
            <button className="proj-modal__close" aria-label="Close" onClick={() => setModal(null)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <p className="proj-modal__desc">{modal?.desc}</p>
          {modal?.tags?.length ? (
            <div className="proj-modal__tags" aria-label={`${modal.title} technologies`}>
              {modal.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}
            </div>
          ) : null}
          {(modal?.demoUrl || modal?.repoUrl) ? (
            <div className="proj-modal__actions">
              {modal.demoUrl ? <a className="btn btn--primary" href={modal.demoUrl} target="_blank" rel="noreferrer">Live Demo</a> : null}
              {modal.repoUrl ? <a className="btn btn--outline" href={modal.repoUrl} target="_blank" rel="noreferrer">GitHub</a> : null}
            </div>
          ) : null}
          {modal ? (
            <ImageCarousel
              images={modal.images}
              autoplay
              autoplayDelay={4200}
              loop
              showArrows
              showDots
              className="portfolio-carousel--project"
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
