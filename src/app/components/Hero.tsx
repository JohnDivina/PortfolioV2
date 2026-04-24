import Image from 'next/image';

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero__photo-ring">
        <Image
          src="/assets/profile.jpg"
          alt="John Rey L. Divina"
          width={130}
          height={130}
          className="hero__photo"
          priority
        />
      </div>
      <div className="hero__content">
        <div className="hero__name-row">
          <h1 className="hero__name">John Rey L. Divina</h1>
        </div>
        <p className="hero__location">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Science City of Munoz, Nueva Ecija, Philippines
        </p>
        <div className="hero__roles">
          <span className="role-chip">IoT Developer</span>
          <span className="role-sep">·</span>
          <span className="role-chip">Embedded Systems</span>
          <span className="role-sep">·</span>
          <span className="role-chip">Smart Agriculture</span>
        </div>
        <div className="hero__cta">
          <a
            href="https://www.linkedin.com/in/johnreydivina/"
            className="btn btn--primary"
            target="_blank"
            rel="noopener noreferrer"
            id="linkedinBtn"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
