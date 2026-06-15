import React from 'react';
import { Link } from 'react-router-dom';
import Stats from '../../components/Stats/Stats';
import './AboutPage.css';

/* ── Data ──────────────────────────────────────────────────── */
const VALUES = [
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 3l2.5 7.5H27l-6.8 4.9 2.5 7.5L16 18.1l-6.7 4.8 2.5-7.5L5 10.5h8.5L16 3z"/>
      </svg>
    ),
    title: 'Integrity',
    desc: 'We hold ourselves to the highest standards of honesty and transparency in every project we undertake.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 3C9 3 3 9 3 16s6 13 13 13 13-6 13-13S23 3 16 3z"/>
        <path d="M11 16l3.5 3.5L21 11"/>
      </svg>
    ),
    title: 'Quality',
    desc: 'Premium materials, skilled craftsmen, and rigorous inspections ensure every build exceeds expectations.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 3l-1 8H7l7 5-3 9 5-4 5 4-3-9 7-5h-8l-1-8z"/>
        <circle cx="16" cy="16" r="13"/>
      </svg>
    ),
    title: 'Safety',
    desc: 'Zero incidents is our target. Strict HSE protocols protect every worker, client, and community we serve.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 24l6-6 5 5 11-14"/>
        <path d="M3 29h26"/>
      </svg>
    ),
    title: 'Innovation',
    desc: 'We continuously adopt modern techniques and technologies to deliver smarter, more efficient solutions.',
  },
];

const TEAM = [
  { name: 'Project Director',    role: 'Leadership & Strategy'    },
  { name: 'Civil Engineer',       role: 'Structural & Civil Works'  },
  { name: 'Site Supervisor',      role: 'On-site Execution'         },
  { name: 'Electrical Engineer',  role: 'Power & Installation'      },
];

/* ── Component ─────────────────────────────────────────────── */
const AboutPage = () => {
  return (
    <div className="about-page">

      {/* ══════════ HERO BANNER ══════════════════════════════ */}
      <section className="abt-hero">
        <div className="abt-hero__bg" aria-hidden="true">
          <svg width="100%" height="100%" viewBox="0 0 1200 480" preserveAspectRatio="xMidYMid slice">
            <rect width="1200" height="480" fill="#0B1F3B"/>
            <g stroke="#E8781A" strokeWidth="0.4" opacity="0.1">
              {Array.from({ length: 20 }, (_, i) => (
                <line key={`v${i}`} x1={i * 64} y1="0" x2={i * 64} y2="480"/>
              ))}
              {Array.from({ length: 10 }, (_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 54} x2="1200" y2={i * 54}/>
              ))}
            </g>
            {/* Decorative buildings silhouette */}
            <rect x="800" y="100" width="120" height="380" fill="rgba(255,255,255,0.03)"/>
            <rect x="940" y="160" width="90"  height="320" fill="rgba(255,255,255,0.03)"/>
            <rect x="1050" y="200" width="80"  height="280" fill="rgba(255,255,255,0.03)"/>
            <rect x="1040" y="70"  width="150" height="410" fill="rgba(255,255,255,0.025)"/>
          </svg>
        </div>

        <div className="abt-hero__content">
          {/* Breadcrumb */}
          <nav className="abt-hero__breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="abt-hero__breadcrumb-link">Home</Link>
            <span aria-hidden="true">→</span>
            <span>About Us</span>
          </nav>

          <div className="abt-hero__tag">
            <span className="abt-hero__tag-line" aria-hidden="true"/>
            <span className="abt-hero__tag-text">WHO WE ARE</span>
          </div>

          <h1 className="abt-hero__heading">
            Building Nigeria's Future,<br/>
            One <em>Project</em> at a Time.
          </h1>

          <p className="abt-hero__sub">
            Masterpattern Nig. Ltd is a full-service construction and engineering
            company headquartered in Yaba, Lagos — delivering excellence across
            Nigeria with integrity, precision, and pride.
          </p>

          <div className="abt-hero__actions">
            <Link to="/quote" className="abt-hero__btn abt-hero__btn--primary">
              GET A QUOTE
            </Link>
            <Link to="/projects" className="abt-hero__btn abt-hero__btn--outline">
              VIEW PROJECTS
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ OUR STORY ════════════════════════════════ */}
      <section className="abt-story">
        <div className="abt-story__content">
          <div className="abt-story__tag">
            <span className="abt-story__tag-line" aria-hidden="true"/>
            <span className="abt-story__tag-text">OUR STORY</span>
          </div>
          <h2 className="abt-story__heading">
            Founded on Trust,<br/>Built on <em>Excellence</em>
          </h2>
          <p className="abt-story__body">
            Masterpattern Nig. Ltd was established with a singular purpose — to
            redefine construction standards in Nigeria. From our base in Yaba, Lagos,
            we have grown into a trusted name across residential, commercial, and civil
            engineering sectors.
          </p>
          <p className="abt-story__body">
            Over the years we have assembled a team of experienced engineers, project
            managers, and skilled tradespeople who share one vision: delivering every
            project safely, on time, and within budget — without compromising on quality.
          </p>
          <p className="abt-story__body">
            Today, with over 200 completed projects and a client satisfaction rate of
            100%, Masterpattern stands as one of Lagos's most reliable construction
            partners.
          </p>
        </div>

        <div className="abt-story__visual">
          <svg width="100%" height="100%" viewBox="0 0 480 520"
            preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <rect width="480" height="520" fill="#0B1F3B"/>
            <g stroke="#E8781A" strokeWidth="0.4" opacity="0.12">
              {Array.from({ length: 10 }, (_, i) => <line key={`v${i}`} x1={i*48} y1="0" x2={i*48} y2="520"/>)}
              {Array.from({ length: 12 }, (_, i) => <line key={`h${i}`} x1="0" y1={i*44} x2="480" y2={i*44}/>)}
            </g>
            {/* Main building */}
            <rect x="120" y="60" width="160" height="440" fill="#071A30" stroke="rgba(232,120,26,0.45)" strokeWidth="1.2"/>
            <rect x="120" y="60" width="160" height="4"   fill="#C0272D" opacity="0.9"/>
            {[78,102,126,150,174,198,222,246,270,294,318,342,366,390,414,438].map((y, ri) =>
              [132,150,168,186,204,222,240,258].map((x, ci) => (
                <rect key={`${ri}${ci}`} x={x} y={y} width="12" height="15" rx="1"
                  fill={`rgba(232,120,26,${(ri + ci) % 3 === 0 ? 0.55 : (ri + ci) % 3 === 1 ? 0.25 : 0.15})`}/>
              ))
            )}
            <rect x="142" y="418" width="56" height="82" rx="1" fill="rgba(192,39,45,0.45)"/>
            {/* Left building */}
            <rect x="22"  y="200" width="88" height="300" fill="#061020" stroke="rgba(192,39,45,0.3)" strokeWidth="0.8"/>
            <rect x="22"  y="200" width="88" height="3"   fill="#E8781A" opacity="0.7"/>
            {[214,236,258,280,302,324,346,368,390,412,434,456].map((y, ri) =>
              [32,50,68,86,100].map((x, ci) => (
                <rect key={`l${ri}${ci}`} x={x} y={y} width="10" height="13" rx="1"
                  fill={`rgba(232,120,26,${(ri * ci) % 2 === 0 ? 0.5 : 0.2})`}/>
              ))
            )}
            {/* Right building */}
            <rect x="296" y="240" width="80" height="260" fill="#050F1C" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
            {/* Crane */}
            <rect x="206" y="18"  width="4" height="44" fill="#666"/>
            <rect x="110" y="22"  width="176" height="3" fill="#666"/>
            <line x1="110" y1="24" x2="208" y2="62" stroke="#777" strokeWidth="1.5"/>
            <rect x="278" y="14"  width="16" height="20" rx="1" fill="#C0272D" opacity="0.8"/>
            {/* Scaffold */}
            <line x1="118" y1="62" x2="118" y2="500" stroke="rgba(255,255,255,0.1)" strokeWidth="4"/>
            <line x1="282" y1="62" x2="282" y2="500" stroke="rgba(255,255,255,0.1)" strokeWidth="4"/>
            {[140,200,260,320,380,440].map(y => (
              <line key={y} x1="115" y1={y} x2="285" y2={y} stroke="rgba(255,255,255,0.07)" strokeWidth="2"/>
            ))}
            {/* Ground */}
            <rect x="0" y="498" width="480" height="22" fill="#040C18"/>
            <rect x="0" y="496" width="480" height="4"  fill="#E8781A" opacity="0.5"/>
          </svg>
        </div>
      </section>

      {/* ══════════ MISSION & VISION ═════════════════════════ */}
      <section className="abt-mv">
        <div className="abt-mv__card abt-mv__card--mission">
          <span className="abt-mv__icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="16" cy="16" r="13"/>
              <circle cx="16" cy="16" r="7"/>
              <circle cx="16" cy="16" r="2"/>
              <line x1="16" y1="3"  x2="16" y2="7"/>
              <line x1="16" y1="25" x2="16" y2="29"/>
              <line x1="3"  y1="16" x2="7"  y2="16"/>
              <line x1="25" y1="16" x2="29" y2="16"/>
            </svg>
          </span>
          <div className="abt-mv__label">OUR MISSION</div>
          <h3 className="abt-mv__title">Delivering safe, reliable, and high-quality engineering solutions</h3>
          <p className="abt-mv__body">
            To deliver safe, reliable, and high-quality engineering solutions that
            consistently meet and exceed client expectations — through professionalism,
            innovation, and skilled execution on every project we undertake.
          </p>
        </div>

        <div className="abt-mv__card abt-mv__card--vision">
          <span className="abt-mv__icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 16s5-9 14-9 14 9 14 9-5 9-14 9S2 16 2 16z"/>
              <circle cx="16" cy="16" r="4"/>
            </svg>
          </span>
          <div className="abt-mv__label">OUR VISION</div>
          <h3 className="abt-mv__title">To be Nigeria's most trusted construction and engineering company</h3>
          <p className="abt-mv__body">
            To be recognised as Nigeria's most trusted and respected construction
            partner — known for transforming communities, creating lasting
            infrastructure, and raising the bar for quality and professionalism
            across the industry.
          </p>
        </div>
      </section>

      {/* ══════════ CORE VALUES ══════════════════════════════ */}
      <section className="abt-values">
        <div className="abt-values__header">
          <div className="abt-values__tag">
            <span className="abt-values__tag-line" aria-hidden="true"/>
            <span className="abt-values__tag-text">WHAT DRIVES US</span>
          </div>
          <h2 className="abt-values__heading">Our Core <span>Values</span></h2>
        </div>

        <div className="abt-values__grid">
          {VALUES.map(({ icon, title, desc }) => (
            <div className="abt-values__card" key={title}>
              <div className="abt-values__card-icon">{icon}</div>
              <h3 className="abt-values__card-title">{title}</h3>
              <p className="abt-values__card-desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ STATS ════════════════════════════════════ */}
      <Stats />

      {/* ══════════ TEAM ═════════════════════════════════════ */}
      <section className="abt-team">
        <div className="abt-team__header">
          <div className="abt-team__tag">
            <span className="abt-team__tag-line" aria-hidden="true"/>
            <span className="abt-team__tag-text">OUR PEOPLE</span>
          </div>
          <h2 className="abt-team__heading">Meet the <span>Team</span></h2>
          <p className="abt-team__sub">
            Experienced professionals dedicated to delivering excellence on every project.
          </p>
        </div>

        <div className="abt-team__grid">
          {TEAM.map(({ name, role }) => (
            <div className="abt-team__card" key={name}>
              {/* Avatar placeholder */}
              <div className="abt-team__avatar" aria-hidden="true">
                <svg viewBox="0 0 80 80" fill="none">
                  <circle cx="40" cy="30" r="18" fill="rgba(11,31,59,0.15)"/>
                  <path d="M10 75c0-16.6 13.4-30 30-30s30 13.4 30 30" fill="rgba(11,31,59,0.1)"/>
                </svg>
              </div>
              <h3 className="abt-team__name">{name}</h3>
              <p className="abt-team__role">{role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ CTA SECTION ══════════════════════════════ */}
      <section className="abt-cta">
        <div className="abt-cta__content">
          <h2 className="abt-cta__heading">
            Ready to Start Your<br/>Next Project?
          </h2>
          <p className="abt-cta__sub">
            Contact us today for a free consultation and let's build something great together.
          </p>
          <div className="abt-cta__actions">
            <Link to="/quote" className="abt-cta__btn abt-cta__btn--white">
              GET A FREE QUOTE
            </Link>
            <a href="tel:08038159214" className="abt-cta__btn abt-cta__btn--outline">
              CALL 08038159214
            </a>
          </div>
        </div>
        <div className="abt-cta__deco" aria-hidden="true">MASTERPARTTERN</div>
      </section>

    </div>
  );
};

export default AboutPage;
