import React from 'react';
import { Link } from 'react-router-dom';
import './HealthSafetyPage.css';

const PILLARS = [
  {
    num: '01',
    title: 'Safety Leadership',
    desc: 'Every site manager leads by example. Safety standards are set at the top and upheld at every level of our organisation.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 3l2.5 7.5H27l-6.8 4.9 2.5 7.5L16 18.1l-6.7 4.8 2.5-7.5L5 10.5h8.5L16 3z"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Worker Training',
    desc: 'All personnel complete mandatory induction and ongoing safety training before setting foot on any Masterpattern site.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 26V12L16 4l12 8v14H4z"/>
        <path d="M12 26v-8h8v8"/>
        <path d="M16 4v4"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Risk Assessment',
    desc: 'Formal risk assessments are conducted before every work phase, identifying hazards and putting controls in place proactively.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 3L3 27h26L16 3z"/>
        <line x1="16" y1="13" x2="16" y2="20"/>
        <circle cx="16" cy="23" r="1"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'PPE Compliance',
    desc: 'Personal Protective Equipment is mandatory — no exceptions. Hard hats, hi-vis vests, boots and gloves are enforced at all times.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 16c0-5.5 4.5-10 10-10s10 4.5 10 10"/>
        <rect x="4" y="16" width="24" height="5" rx="1"/>
        <path d="M13 21v4M19 21v4"/>
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Regular Inspections',
    desc: 'Weekly safety inspections by our HSE officers identify and address hazards before they become incidents.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="4" width="22" height="26" rx="2"/>
        <line x1="10" y1="11" x2="22" y2="11"/>
        <line x1="10" y1="16" x2="22" y2="16"/>
        <line x1="10" y1="21" x2="16" y2="21"/>
        <circle cx="22" cy="23" r="5"/>
        <path d="M20 23l1.5 1.5L25 21"/>
      </svg>
    ),
  },
  {
    num: '06',
    title: 'Incident Reporting',
    desc: 'A transparent near-miss and incident reporting culture ensures every event is logged, investigated and learned from.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M28 20l-4-4-4 4"/>
        <path d="M24 16v8"/>
        <path d="M4 28V16L12 6h12"/>
        <line x1="4" y1="28" x2="16" y2="28"/>
      </svg>
    ),
  },
];

const PROTOCOLS = [
  {
    title: 'Site Access Control',
    items: [
      'All visitors must sign in at the site office before entry',
      'PPE must be worn from the site boundary — not just the work zone',
      'Unauthorised personnel are strictly prohibited from active work areas',
      'Security personnel monitor all entry and exit points',
    ],
  },
  {
    title: 'Work at Height',
    items: [
      'Working at height requires a permit-to-work issued by the site supervisor',
      'Full harness and lanyard required for all work above 2 metres',
      'Scaffold must be inspected and tagged by a competent person weekly',
      'Edge protection and toe boards required on all open platforms',
    ],
  },
  {
    title: 'Plant & Equipment',
    items: [
      'Only trained and certified operators may use heavy plant and equipment',
      'Daily pre-use checks must be completed and recorded before equipment use',
      'Exclusion zones must be established around all operating heavy machinery',
      'Defective equipment must be taken out of service immediately and tagged',
    ],
  },
  {
    title: 'Emergency Response',
    items: [
      'Emergency assembly point is marked at the site entrance for all personnel',
      'First aid kits are maintained at the site office and each work zone',
      'All supervisors are trained first aiders — there is always one on site',
      'Emergency contact numbers are posted at the site office and welfare facilities',
    ],
  },
];

const STATS = [
  { value: '0',    label: 'Fatalities on record',      color: 'var(--orange)' },
  { value: '100%', label: 'PPE compliance target',     color: 'var(--red)'    },
  { value: 'Weekly', label: 'Safety inspections',      color: 'var(--orange)' },
  { value: '100%', label: 'Staff induction rate',      color: 'var(--red)'    },
];

/* ════════════════════════════════════════════════════════════ */
const HealthSafetyPage = () => (
  <div className="hs-page">

    {/* ── HERO ─────────────────────────────────────────────── */}
    <section className="hs-hero">
      <div className="hs-hero__bg" aria-hidden="true">
        <svg width="100%" height="100%" viewBox="0 0 1200 480"
          preserveAspectRatio="xMidYMid slice">
          <rect width="1200" height="480" fill="#0B1F3B"/>
          <g stroke="#E8781A" strokeWidth="0.4" opacity="0.09">
            {Array.from({length:20},(_,i)=>(
              <line key={i} x1={i*64} y1="0" x2={i*64} y2="480"/>
            ))}
            {Array.from({length:9},(_,i)=>(
              <line key={i} x1="0" y1={i*56} x2="1200" y2={i*56}/>
            ))}
          </g>
          {/* Hard hat silhouette */}
          <g opacity="0.06" fill="rgba(232,120,26,1)">
            <path d="M820 140 C820 100 850 70 900 70 C950 70 980 100 980 140 L820 140Z"/>
            <rect x="810" y="138" width="180" height="20" rx="4"/>
            <rect x="840" y="158" width="120" height="8" rx="2"/>
          </g>
          <rect x="0" y="474" width="1200" height="6" fill="#E8781A" opacity="0.4"/>
        </svg>
      </div>
      <div className="hs-hero__content">
        <nav className="hs-hero__crumb">
          <Link to="/" className="hs-hero__crumb-link">Home</Link>
          <span>→</span>
          <span>Health &amp; Safety</span>
        </nav>
        <div className="hs-hero__tag">
          <span className="hs-hero__tag-line"/>
          <span className="hs-hero__tag-text">HSE POLICY</span>
        </div>
        <h1 className="hs-hero__heading">
          Safety Is Not<br/>Optional. It Is <em>Everything.</em>
        </h1>
        <p className="hs-hero__sub">
          At Masterpattern Nig. Ltd, health, safety, and environment are not
          boxes to tick — they are the foundation of how we work. Every decision
          on every site starts and ends with the safety of our people.
        </p>
        <div className="hs-hero__actions">
          <a href="#protocols" className="hs-hero__btn hs-hero__btn--primary">
            VIEW SAFETY PROTOCOLS
          </a>
          <Link to="/contact" className="hs-hero__btn hs-hero__btn--outline">
            REPORT A CONCERN
          </Link>
        </div>
      </div>
    </section>

    {/* ── ZERO HARM STATEMENT ──────────────────────────────── */}
    <section className="hs-zero">
      <div className="hs-zero__badge" aria-hidden="true">0</div>
      <div className="hs-zero__content">
        <div className="hs-zero__tag">
          <span className="hs-zero__tag-line"/>
          <span className="hs-zero__tag-text">OUR COMMITMENT</span>
        </div>
        <h2 className="hs-zero__heading">Zero Harm. Zero Compromise.</h2>
        <p className="hs-zero__body">
          Our target is simple: every person who comes to work on a Masterpattern
          project goes home safe. We achieve this through disciplined processes,
          relentless training, and a culture where every worker — from site labourer
          to project director — is empowered to stop unsafe work.
        </p>
        <p className="hs-zero__body">
          We comply fully with Nigerian Labour Law, the Factories Act, and international
          best practice HSE standards. Our HSE plan is reviewed and updated before
          every new project commences.
        </p>
      </div>
      <div className="hs-zero__stats">
        {STATS.map(({ value, label, color }) => (
          <div className="hs-zero__stat" key={label}>
            <span className="hs-zero__stat-val" style={{ color }}>{value}</span>
            <span className="hs-zero__stat-label">{label}</span>
          </div>
        ))}
      </div>
    </section>

    {/* ── HSE PILLARS ──────────────────────────────────────── */}
    <section className="hs-pillars">
      <div className="hs-pillars__header">
        <div className="hs-pillars__tag">
          <span className="hs-pillars__tag-line"/>
          <span className="hs-pillars__tag-text">OUR FRAMEWORK</span>
        </div>
        <h2 className="hs-pillars__heading">
          Six Pillars of <span>Our HSE Framework</span>
        </h2>
        <p className="hs-pillars__sub">
          Every pillar is a non-negotiable standard applied on every Masterpattern project.
        </p>
      </div>
      <div className="hs-pillars__grid">
        {PILLARS.map(({ num, title, desc, icon }) => (
          <div className="hs-pillar" key={num}>
            <div className="hs-pillar__icon">{icon}</div>
            <span className="hs-pillar__num">{num}</span>
            <h3 className="hs-pillar__title">{title}</h3>
            <p className="hs-pillar__desc">{desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* ── PROTOCOLS ────────────────────────────────────────── */}
    <section className="hs-protocols" id="protocols">
      <div className="hs-protocols__header">
        <div className="hs-protocols__tag">
          <span className="hs-protocols__tag-line"/>
          <span className="hs-protocols__tag-text">SITE RULES</span>
        </div>
        <h2 className="hs-protocols__heading">
          On-Site Safety <span>Protocols</span>
        </h2>
      </div>
      <div className="hs-protocols__grid">
        {PROTOCOLS.map(({ title, items }) => (
          <div className="hs-protocol-card" key={title}>
            <h3 className="hs-protocol-card__title">{title}</h3>
            <ul className="hs-protocol-card__list">
              {items.map((item, i) => (
                <li key={i} className="hs-protocol-card__item">
                  <span className="hs-protocol-card__dot" aria-hidden="true"/>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>

    {/* ── EMERGENCY CONTACTS ───────────────────────────────── */}
    <section className="hs-emergency">
      <div className="hs-emergency__left">
        <div className="hs-emergency__tag">
          <span className="hs-emergency__tag-line"/>
          <span className="hs-emergency__tag-text">EMERGENCY</span>
        </div>
        <h2 className="hs-emergency__heading">
          In Case of<br/>an Emergency
        </h2>
        <p className="hs-emergency__body">
          In the event of an accident, near-miss, or emergency on any
          Masterpattern site, follow these steps immediately.
        </p>
        <ol className="hs-emergency__steps">
          {[
            'Stop all work in the immediate area immediately',
            'Call emergency services — 112 (ambulance/fire)',
            'Alert the site supervisor or HSE officer on duty',
            'Administer first aid only if you are trained to do so',
            'Preserve the scene — do not move anything until cleared',
            'Complete an incident report form within 24 hours',
          ].map((step, i) => (
            <li key={i} className="hs-emergency__step">
              <span className="hs-emergency__step-num">{String(i+1).padStart(2,'0')}</span>
              {step}
            </li>
          ))}
        </ol>
      </div>
      <div className="hs-emergency__right">
        <div className="hs-emergency__contact-card">
          <div className="hs-emergency__contact-label">SITE EMERGENCY LINE</div>
          <a href="tel:08038159214" className="hs-emergency__contact-number">
            08038159214
          </a>
          <p className="hs-emergency__contact-note">
            Available Mon–Fri 8AM–5PM<br/>
            Sat 9AM–2PM
          </p>
        </div>
        <div className="hs-emergency__contact-card">
          <div className="hs-emergency__contact-label">NATIONAL EMERGENCY</div>
          <a href="tel:112" className="hs-emergency__contact-number">112</a>
          <p className="hs-emergency__contact-note">
            Nigerian Emergency Management<br/>
            24 hours, 7 days a week
          </p>
        </div>
        <div className="hs-emergency__contact-card">
          <div className="hs-emergency__contact-label">HSE CONCERNS EMAIL</div>
          <a href="mailto:masterpatternltd@gmail.com" className="hs-emergency__contact-number hs-emergency__contact-email">
            masterpatternltd<br/>@gmail.com
          </a>
          <p className="hs-emergency__contact-note">
            Report safety concerns<br/>
            confidentially by email
          </p>
        </div>
      </div>
    </section>

    {/* ── CTA ──────────────────────────────────────────────── */}
    <section className="hs-cta">
      <div className="hs-cta__deco" aria-hidden="true">SAFETY</div>
      <div className="hs-cta__content">
        <h2 className="hs-cta__heading">Have a Safety Concern?</h2>
        <p className="hs-cta__sub">
          We take every report seriously. If you have witnessed or experienced
          an unsafe condition on any Masterpattern project, please contact us immediately.
        </p>
        <div className="hs-cta__actions">
          <Link to="/contact" className="hs-cta__btn hs-cta__btn--white">
            CONTACT US NOW
          </Link>
          <a href="tel:08038159214" className="hs-cta__btn hs-cta__btn--outline">
            CALL 08038159214
          </a>
        </div>
      </div>
    </section>

  </div>
);

export default HealthSafetyPage;
