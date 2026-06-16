import React from 'react';
import { Link } from 'react-router-dom';
import './ServicesPage.css';

/* ── Service data ───────────────────────────────────────────── */
const SERVICES = [
  {
    id: 'construction',
    num: '01',
    title: 'Construction Services',
    subtitle: 'Residential, Commercial & Industrial Buildings',
    desc: [
      'Masterpattern delivers high-quality building construction across all sectors — from individual residential homes to large-scale commercial complexes and industrial facilities.',
      'Every project is executed with precision using modern construction techniques, premium materials, and a skilled workforce committed to excellence at every stage.',
    ],
    features: [
      'Residential: bungalows, duplexes, apartment blocks',
      'Commercial: offices, shopping centres, warehouses',
      'Industrial: factories, production facilities',
      'Foundation, structural, and finishing works',
      'On-time delivery and full project documentation',
    ],
    reverse: false,
  },
  {
    id: 'civil-engineering',
    num: '02',
    title: 'Civil Engineering',
    subtitle: 'Infrastructure, Roads & Drainage Systems',
    desc: [
      'Our civil engineering division handles the design and construction of critical infrastructure that supports communities — from road networks and drainage channels to retaining walls and concrete structures.',
      'We apply modern engineering standards and locally-relevant expertise to deliver resilient, long-lasting infrastructure across Lagos and Nigeria.',
    ],
    features: [
      'Road construction, rehabilitation and paving',
      'Drainage channels and stormwater systems',
      'Concrete structures and retaining walls',
      'Culverts, kerbing and channelling',
      'Site clearing, grading and earthworks',
    ],
    reverse: true,
  },
  {
    id: 'renovation',
    num: '03',
    title: 'Renovation & Maintenance',
    subtitle: 'Remodelling, Finishing & Structural Upgrades',
    desc: [
      'We transform existing properties into modern, functional spaces through comprehensive renovation and maintenance services. From a full interior overhaul to targeted structural repairs, our team handles it all.',
      'Our renovation work restores property value, improves liveability, and brings ageing structures up to current standards safely and efficiently.',
    ],
    features: [
      'Full interior and exterior renovation',
      'Tiling, screeding and floor finishing',
      'Plastering, painting and décor upgrades',
      'Roof repairs, waterproofing and sealing',
      'Structural crack repair and reinforcement',
    ],
    reverse: false,
  },
  {
    id: 'electrical',
    num: '04',
    title: 'Electrical Installation',
    subtitle: 'Wiring, Power Systems & Maintenance',
    desc: [
      'Our certified electricians provide full electrical installations for residential and commercial properties — from initial conduit and cable laying to final testing, commissioning, and handover.',
      'We follow strict safety codes on every job, ensuring installations are reliable, compliant, and built to last.',
    ],
    features: [
      'Complete building wiring and conduit installation',
      'Distribution boards, meters and load centres',
      'Street lighting and external power systems',
      'Generator installation and ATS integration',
      'Electrical testing, inspection and certification',
    ],
    reverse: true,
  },
  {
    id: 'plumbing',
    num: '05',
    title: 'Plumbing Services',
    subtitle: 'Water Systems, Drainage & Sanitation',
    desc: [
      "From new installations to complex repair works, Masterpattern's plumbing team delivers reliable water supply, sanitation, and drainage solutions for residential and commercial clients.",
      'We source quality materials and follow best practices to ensure every system is durable, leak-free, and properly commissioned.',
    ],
    features: [
      'Cold and hot water supply pipework',
      'Bathroom and kitchen fixture installation',
      'Sewage and drainage pipe laying',
      'Overhead and underground water tanks',
      'Plumbing inspection, testing and repairs',
    ],
    reverse: false,
  },
  {
    id: 'management',
    num: '06',
    title: 'Project Management',
    subtitle: 'Planning, Supervision & Quality Control',
    desc: [
      'Our project management service gives clients complete confidence that their construction project will be delivered on schedule, within budget, and to the highest quality standard — with full transparency throughout.',
      'We provide dedicated project managers who oversee every phase from pre-construction planning through to final handover, managing contractors, timelines, costs, and compliance.',
    ],
    features: [
      'Pre-construction planning and programme development',
      'Procurement and contractor coordination',
      'On-site supervision and daily progress reporting',
      'Cost management, variation control and billing',
      'Quality assurance, inspections and snagging',
    ],
    reverse: true,
  },
];

const PROCESS = [
  { num: '01', title: 'Consultation',      desc: 'We meet with you to understand your project goals, site conditions, and budget before proposing any solutions.' },
  { num: '02', title: 'Planning & Design', desc: 'Our team prepares detailed plans, cost estimates, and timelines for your review and approval before work begins.' },
  { num: '03', title: 'Execution',         desc: 'Skilled professionals carry out the work to specification, with constant on-site supervision and quality checks.' },
  { num: '04', title: 'Handover',          desc: 'We complete a thorough inspection, address any snagging items, and hand over full documentation on completion.' },
];


/* ── Real photos per service (free license, Unsplash) ───────── */
const IMAGES = {
  construction:       'https://images.unsplash.com/photo-1653280662710-1cac52cde6d7?w=1200&q=80&fm=jpg&fit=crop',
  'civil-engineering': 'https://images.unsplash.com/photo-1760708626681-59a5373819a6?w=1200&q=80&fm=jpg&fit=crop',
  renovation:          'https://images.unsplash.com/photo-1668643659203-888e29578b39?w=1200&q=80&fm=jpg&fit=crop',
  electrical:          'https://images.unsplash.com/photo-1758101755915-462eddc23f57?w=1200&q=80&fm=jpg&fit=crop',
  plumbing:            'https://images.unsplash.com/photo-1503789146722-cf137a3c0fea?w=1200&q=80&fm=jpg&fit=crop',
  management:          'https://images.unsplash.com/photo-1694521787799-ad4ad241cb39?w=1200&q=80&fm=jpg&fit=crop',
};


/* ════════════════════════════════════════════════════════════════
   SERVICES PAGE COMPONENT
════════════════════════════════════════════════════════════════ */
const ServicesPage = () => (
  <div className="svc-page">

    {/* ══════════ HERO ══════════════════════════════════════ */}
    <section className="svc-hero">
      <div className="svc-hero__bg" aria-hidden="true">
        <svg width="100%" height="100%" viewBox="0 0 1200 460" preserveAspectRatio="xMidYMid slice">
          <rect width="1200" height="460" fill="#0B1F3B"/>
          <g stroke="#E8781A" strokeWidth="0.4" opacity="0.1">
            {Array.from({length:20},(_,i)=><line key={i} x1={i*64} y1="0" x2={i*64} y2="460"/>)}
            {Array.from({length:9},(_,i)=><line key={i} x1="0" y1={i*54} x2="1200" y2={i*54}/>)}
          </g>
          <rect x="900" y="80"  width="100" height="380" fill="rgba(255,255,255,0.02)"/>
          <rect x="1020" y="140" width="80" height="320" fill="rgba(255,255,255,0.02)"/>
          <rect x="1115" y="180" width="70" height="280" fill="rgba(255,255,255,0.02)"/>
        </svg>
      </div>
      <div className="svc-hero__content">
        <nav className="svc-hero__crumb">
          <Link to="/" className="svc-hero__crumb-link">Home</Link>
          <span>→</span>
          <span>Services</span>
        </nav>
        <div className="svc-hero__tag">
          <span className="svc-hero__tag-line"/>
          <span className="svc-hero__tag-text">WHAT WE OFFER</span>
        </div>
        <h1 className="svc-hero__heading">
          Built on Skill.<br/>Delivered with <em>Precision.</em>
        </h1>
        <p className="svc-hero__sub">
          From the ground up — Masterpattern provides end-to-end construction
          and engineering services across six core disciplines, each carried out
          to the highest professional standard.
        </p>
        <div className="svc-hero__links">
          {SERVICES.map(s => (
            <a key={s.id} href={`#${s.id}`} className="svc-hero__quick-link">
              <span className="svc-hero__quick-num">{s.num}</span>
              {s.title}
            </a>
          ))}
        </div>
      </div>
    </section>

    {/* ══════════ SERVICE SECTIONS ══════════════════════════ */}
    {SERVICES.map((svc) => (
      <section
        key={svc.id}
        id={svc.id}
        className={`svc-section${svc.reverse ? ' svc-section--reverse' : ''}`}
      >
        {/* Visual panel */}
        <div className="svc-section__visual">
          <img
            src={IMAGES[svc.id]}
            alt={svc.title}
            className="svc-section__photo"
            loading="lazy"
          />
        </div>

        {/* Content panel */}
        <div className="svc-section__content">
          <div className="svc-section__tag">
            <span className="svc-section__num">{svc.num}</span>
            <span className="svc-section__divider" aria-hidden="true"/>
            <span className="svc-section__tag-text">SERVICE</span>
          </div>

          <h2 className="svc-section__heading">{svc.title}</h2>
          <p className="svc-section__subtitle">{svc.subtitle}</p>

          {svc.desc.map((p, i) => (
            <p key={i} className="svc-section__body">{p}</p>
          ))}

          <div className="svc-section__features">
            <p className="svc-section__features-label">WHAT WE DELIVER</p>
            <ul className="svc-section__feature-list">
              {svc.features.map(f => (
                <li key={f} className="svc-section__feature-item">
                  <span className="svc-section__feature-dot" aria-hidden="true"/>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <Link to="/quote" state={{ service: svc.title }} className="svc-section__cta">
            GET A QUOTE FOR THIS SERVICE
          </Link>
        </div>
      </section>
    ))}

    {/* ══════════ HOW WE WORK ════════════════════════════════ */}
    <section className="svc-process">
      <div className="svc-process__header">
        <div className="svc-process__tag">
          <span className="svc-process__tag-line"/>
          <span className="svc-process__tag-text">OUR APPROACH</span>
        </div>
        <h2 className="svc-process__heading">How We <span>Work</span></h2>
        <p className="svc-process__sub">
          A clear, structured process from first meeting to final handover.
        </p>
      </div>

      <div className="svc-process__steps">
        {PROCESS.map(({ num, title, desc }, i) => (
          <div className="svc-process__step" key={num}>
            <div className="svc-process__step-num">{num}</div>
            {i < PROCESS.length - 1 && (
              <div className="svc-process__step-line" aria-hidden="true"/>
            )}
            <h3 className="svc-process__step-title">{title}</h3>
            <p className="svc-process__step-desc">{desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* ══════════ CTA ════════════════════════════════════════ */}
    <section className="svc-cta">
      <div className="svc-cta__deco" aria-hidden="true">BUILD</div>
      <div className="svc-cta__content">
        <h2 className="svc-cta__heading">Ready to Start<br/>Your Project?</h2>
        <p className="svc-cta__sub">
          Contact us today for a free consultation and quote.
        </p>
        <div className="svc-cta__actions">
          <Link to="/quote" className="svc-cta__btn svc-cta__btn--white">
            GET A FREE QUOTE
          </Link>
          <a href="tel:08038159214" className="svc-cta__btn svc-cta__btn--outline">
            CALL 08038159214
          </a>
        </div>
      </div>
    </section>

  </div>
);

export default ServicesPage;
