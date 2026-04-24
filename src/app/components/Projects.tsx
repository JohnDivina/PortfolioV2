'use client';

import { useState } from 'react';

interface Project {
  key: string;
  tag: string;
  title: string;
  desc: string;
}

const PROJECTS: Project[] = [
  { key:'smart-indoor-farming-system',    tag:'Agriculture',   title:'Smart Indoor-Farming System',      desc:'Greenhouse monitoring, automation, and smart agriculture for high-value crop production in the Philippines. Built using ESP32 microcontrollers, environmental sensors, and a web-based dashboard.' },
  { key:'smart-farm-monitoring-website',  tag:'Web Dashboard', title:'Smart Farm Monitoring Website',    desc:'Real-time dashboard for sensor data, device control, settings, and greenhouse management.' },
  { key:'phase-2-ai-smart-farm-proposal', tag:'AI / Phase 2',  title:'Phase 2 AI Smart Farm Proposal',  desc:'Advanced continuation with AI-driven decision support, grow lights, and crop disease detection.' },
  { key:'esp32-environmental-monitor',    tag:'ESP32',         title:'ESP32 Environmental Monitor',      desc:'Microcontroller system collecting temperature, humidity, light, soil moisture, and NPK readings.' },
  { key:'fertigation-control-system',     tag:'Automation',    title:'Fertigation Control System',       desc:'Automated irrigation and fertigation scheduling using ESP32, relays, and web-based controls.' },
  { key:'budget-tracker-mobile-app',      tag:'Mobile App',    title:'Budget Tracker Mobile App',        desc:'React Native / Expo app for expense tracking, accounts, budget monitoring, and local storage.' },
  { key:'npk-soil-sensor-monitoring',     tag:'Sensors',       title:'NPK & Soil Sensor Monitoring',    desc:'NPK and soil sensor setup monitoring soil condition and supporting nutrient decisions.',    hidden:true } as Project & {hidden:boolean},
  { key:'evaporative-cooling-system',     tag:'Cooling',       title:'Evaporative Cooling System',       desc:'Manages fans and water pump via ESP32 for stable greenhouse temperature control.',          hidden:true } as Project & {hidden:boolean},
  { key:'auxiliary-fan-automation',       tag:'Automation',    title:'Auxiliary Fan Automation',         desc:'Fan control subsystem with auto/manual logic and full website integration.',                hidden:true } as Project & {hidden:boolean},
  { key:'retractable-solar-panel-control',tag:'Solar',         title:'Retractable Solar Panel Control',  desc:'Motorized solar panel with ESP32 relay polarity reversal for automated positioning.',       hidden:true } as Project & {hidden:boolean},
  { key:'solar-powered-microcontroller',  tag:'Power',         title:'Solar-Powered Microcontroller',    desc:'Power system supplying microcontrollers through solar energy and battery hardware.',        hidden:true } as Project & {hidden:boolean},
  { key:'sensor-data-logging-system',     tag:'Data',          title:'Sensor Data Logging System',       desc:'Multiple MCUs pushing readings via PHP/API endpoints into a centralized MySQL database.',   hidden:true } as Project & {hidden:boolean},
  { key:'local-iot-dashboard-xampp',      tag:'Local Server',  title:'Local IoT Dashboard (XAMPP)',      desc:'Locally hosted XAMPP, PHP, MySQL server to serve the smart farm dashboard and handle data.',hidden:true } as Project & {hidden:boolean},
  { key:'upou-ai-helpdesk',               tag:'AI Chatbot',    title:'UPOU AI Helpdesk Chatbot',         desc:'AI Chatbot for answering questions about the website.',                                   hidden:true } as Project & {hidden:boolean},
];

type ModalData = { tag: string; title: string; desc: string } | null;

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [modal, setModal]    = useState<ModalData>(null);

  const visible = showAll ? PROJECTS : PROJECTS.filter(p => !(p as any).hidden);

  return (
    <>
      <section className="section reveal" id="projects">
        <div className="section__hdr">
          <h2 className="section__title">Projects</h2>
          <button className="view-all-btn" id="viewAllBtn" onClick={() => setShowAll(p => !p)}>
            {showAll ? '‹ Show Less' : 'View All ›'}
          </button>
        </div>
        <div className="projects-grid" id="projectsGrid">
          {visible.map(p => (
            <article
              key={p.key}
              className="project-card"
              role="button"
              tabIndex={0}
              onClick={() => setModal({ tag: p.tag, title: p.title, desc: p.desc })}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setModal({ tag: p.tag, title: p.title, desc: p.desc }); }}
            >
              <div className="project-card__top"><span className="project-tag">{p.tag}</span></div>
              <h3 className="project-card__name">{p.title}</h3>
              <p className="project-card__desc">{p.desc}</p>
              <span className="project-card__cta">View Documentation ›</span>
            </article>
          ))}
        </div>
      </section>

      {/* Modal */}
      <div
        className={`proj-modal-overlay${modal ? ' is-open' : ''}`}
        aria-hidden={!modal}
        role="dialog"
        aria-modal="true"
        onClick={e => { if (e.target === e.currentTarget) setModal(null); }}
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
          <div className="proj-modal__images">
            <div className="proj-modal__placeholder">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity={0.35}>
                <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
              </svg>
              <p>Documentation images will appear here.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
