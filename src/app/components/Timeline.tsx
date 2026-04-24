const EXPERIENCE = [
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
  return (
    <>
      <section className="section reveal" id="experience">
        <h2 className="section__title">Experience</h2>
        <div className="timeline">
          {EXPERIENCE.map((item, i) => (
            <div className="timeline-item" key={i}>
              <div className="tl-dot" />
              <div className="tl-content">
                <div className="tl-meta">
                  <span className="tl-year">{item.period}</span>
                  <span className="tl-badge tl-badge--work">Work</span>
                </div>
                <h3 className="tl-title">{item.title}</h3>
                <p className="tl-sub">{item.org}</p>
                {item.sub && <p className="tl-sub">{item.sub}</p>}
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
    </>
  );
}
