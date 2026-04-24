'use client';

import { useEffect } from 'react';
import Nav           from './components/Nav';
import Hero          from './components/Hero';
import About         from './components/About';
import TechStack     from './components/TechStack';
import Projects      from './components/Projects';
import Timeline      from './components/Timeline';
import Certifications from './components/Certifications';
import IPCarousel    from './components/IPCarousel';
import Footer        from './components/Footer';
import PlantOverlay  from './components/PlantOverlay';
import CatCharacter  from './components/CatCharacter';

export default function HomePage() {
  /* Scroll reveal via IntersectionObserver */
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* Topbar shadow on scroll */
  useEffect(() => {
    const onScroll = () => {
      document.getElementById('topbar')?.classList.toggle('topbar--scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Active nav highlight on scroll */
  useEffect(() => {
    const links    = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.getAttribute('id');
          links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === `#${id}`));
        }
      }),
      { threshold: 0.4 }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <PlantOverlay />
      <CatCharacter />
      <Nav />
      <div className="page-wrapper">
        <Hero />
        <About />
        <div className="main-grid">
          {/* Left column */}
          <div className="col-left">
            <TechStack />
            <Projects />
          </div>
          {/* Right column */}
          <div className="col-right">
            <Timeline />
            <Certifications />
            <IPCarousel />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
