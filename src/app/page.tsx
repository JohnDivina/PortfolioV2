'use client';

import { useEffect, useRef, useState } from 'react';
import Nav           from './components/Nav';
import Hero          from './components/Hero';
import About         from './components/About';
import TechStack     from './components/TechStack';
import Projects      from './components/Projects';
import Timeline      from './components/Timeline';
import Certifications from './components/Certifications';
import IPCarousel    from './components/IPCarousel';
import Footer        from './components/Footer';
import EntranceAnimation from './components/EntranceAnimation';

export default function HomePage() {
  const progressRef = useRef<HTMLDivElement>(null);
  const [showContent, setShowContent] = useState(false);

  /* Listen for entrance animation completion */
  useEffect(() => {
    const handleEntrance = () => {
      setShowContent(true);
      // We wait a tiny bit after mounting the content to initialize observers,
      // otherwise elements might not be in the DOM yet
      setTimeout(initObservers, 50);
    };
    
    window.addEventListener('entranceComplete', handleEntrance);
    return () => window.removeEventListener('entranceComplete', handleEntrance);
  }, []);

  /* Move intersection observers into a function we can call after animation */
  const initObservers = () => {
    // Scroll reveal via IntersectionObserver
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach(el => obs.observe(el));

    // Active nav highlight on scroll
    const links    = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const navObs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.getAttribute('id');
          links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === `#${id}`));
        }
      }),
      { threshold: 0.4 }
    );
    sections.forEach(s => navObs.observe(s));
  };

  /* Topbar shadow on scroll */
  useEffect(() => {
    const onScroll = () => {
      document.getElementById('topbar')?.classList.toggle('topbar--scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Scroll progress bar */
  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = total > 0 ? `${(scrolled / total) * 100}%` : '0%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [showContent]);

  return (
    <>
      <EntranceAnimation />
      
      {showContent && (
        <div className="content-fade-in">
          <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
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
        </div>
      )}
    </>
  );
}

