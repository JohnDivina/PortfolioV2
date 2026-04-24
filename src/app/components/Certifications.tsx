'use client';

import { useState } from 'react';

const CERTS = [
  { href: 'https://drive.google.com/file/d/18IjOgBSBCl55U0CvcJSKI0WMCosNxKLb/view?usp=drive_link', name: 'Being a Manager-Leader in a VUCA world', org: 'Charles Sturt University', year: '2025', hidden: false },
  { href: 'https://drive.google.com/file/d/1yjLiltOwTDLg4q1IqBbdqmvRHlWKCG-z/view?usp=drive_link', name: 'Patent Search and Basic Claim Drafting', org: 'Central Luzon State University', year: '2025', hidden: false },
  { href: 'https://drive.google.com/file/d/1WMkXNCm4wUxTKVlFRTdG7sZRiQeVLLEf/view?usp=drive_link', name: 'IT Fest 2025 SMART Nations Rising Panelist', org: 'Central Luzon State University', year: '2025', hidden: false },
  { href: 'https://drive.google.com/file/d/1PfedIoAefmYYRH5HomY52wmgF92DzSMh/view?usp=drive_link', name: 'Introduction to Cybersecurity', org: 'Cisco Networking Academy', year: '2025', hidden: true },
  { href: 'https://drive.google.com/file/d/1pvadDKVZdIo47AwSkGQbZy25qRqOAxOD/view?usp=drive_link', name: 'PHILAAST HYBRID WEBINAR SERIES: Smart STI Solutions to Ensure Food Security', org: 'DOST-PCAARRD', year: '2024', hidden: true },
  { href: 'https://drive.google.com/file/d/1S1bzo_4AXO46BM6u3QV90h7Ev8S9Rh5q/view?usp=drive_link', name: 'Unveiling Tomorrow: The Force of Artificial Intelligence and Machine Learning', org: 'Department of Information and Communications Technology', year: '2024', hidden: true },
  { href: 'https://drive.google.com/file/d/1-2ut3_Ul8wS3MPDYC3MPg5cMAt94YDfL/view?usp=drive_link', name: 'Mastering Email Excellence: for Improved Client Relations', org: 'Central Luzon State University - US Department of State', year: '2023', hidden: true },
  { href: 'https://www.credly.com/go/b3Qa0Koz', name: 'AWS Academy Cloud Foundations', org: 'AWS Academy', year: '2022', hidden: true },
];

export default function Certifications() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? CERTS : CERTS.filter(c => !c.hidden);

  return (
    <section className="section reveal" id="certs">
      <div className="section__hdr">
        <h2 className="section__title">Certifications</h2>
        <button className="view-all-btn" id="viewAllCertsBtn" onClick={() => setShowAll(p => !p)}>
          {showAll ? '‹ Show Less' : 'View All ›'}
        </button>
      </div>
      <div className="cert-list">
        {visible.map(cert => (
          <a key={cert.href} href={cert.href} className="cert-item" target="_blank" rel="noopener noreferrer">
            <div className="cert-left">
              <span className="cert-dot" />
              <div className="cert-text">
                <span className="cert-name">{cert.name}</span>
                <span className="cert-org">{cert.org}</span>
              </div>
            </div>
            <span className="cert-year">{cert.year}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
