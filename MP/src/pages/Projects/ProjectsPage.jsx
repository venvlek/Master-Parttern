import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Stats from '../../components/Stats/Stats';
import './ProjectsPage.css';

/* ── Project data ───────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 'p1',
    title: 'Luxury Residential Complex',
    category: 'Residential',
    location: 'Lekki Phase 1, Lagos',
    year: '2024',
    featured: true,
    bg: '#071428',
    desc: 'Five-storey residential apartment complex with premium finishing, fitted kitchens, and dedicated parking.',
    tags: ['5 Floors', 'Premium Finishing', 'New Build'],
  },
  {
    id: 'p2',
    title: 'Secondary School Renovation',
    category: 'Education',
    location: 'Surulere, Lagos',
    year: '2024',
    featured: false,
    bg: '#0f1a0c',
    desc: 'Complete renovation of 12 classrooms, administrative block, and sports facilities for a Lagos state school.',
    tags: ['12 Classrooms', 'Renovation', 'Education'],
  },
  {
    id: 'p3',
    title: 'Office Complex Finishing',
    category: 'Commercial',
    location: 'Victoria Island, Lagos',
    year: '2023',
    featured: false,
    bg: '#0c0c1e',
    desc: 'Interior and exterior finishing works for a 4-floor commercial office development in Victoria Island.',
    tags: ['4 Floors', 'Commercial', 'Finishing'],
  },
  {
    id: 'p4',
    title: 'Mainland Drainage System',
    category: 'Civil',
    location: 'Shomolu, Lagos',
    year: '2023',
    featured: false,
    bg: '#071820',
    desc: 'Construction of 2.4km open drainage channel and culvert system to address seasonal flooding.',
    tags: ['2.4km Drain', 'Flood Control', 'Civil'],
  },
  {
    id: 'p5',
    title: 'Commercial Shopping Complex',
    category: 'Commercial',
    location: 'Ikeja, Lagos',
    year: '2023',
    featured: true,
    bg: '#100a14',
    desc: 'Ground-up construction of a modern two-storey shopping complex with 24 retail units and central atrium.',
    tags: ['24 Units', 'Retail', 'New Build'],
  },
  {
    id: 'p6',
    title: 'Estate Electrical Installation',
    category: 'Electrical',
    location: 'Ikoyi, Lagos',
    year: '2024',
    featured: false,
    bg: '#0a0f1e',
    desc: 'Full electrical installation across 36-unit residential estate including distribution boards and backup systems.',
    tags: ['36 Units', 'Electrical', 'Estate'],
  },
  {
    id: 'p7',
    title: 'Access Road Construction',
    category: 'Civil',
    location: 'Festac Town, Lagos',
    year: '2022',
    featured: false,
    bg: '#101810',
    desc: 'Construction of 1.8km interlocking stone access road serving a residential estate with proper drainage.',
    tags: ['1.8km Road', 'Interlocking', 'Civil'],
  },
  {
    id: 'p8',
    title: 'Industrial Warehouse Facility',
    category: 'Commercial',
    location: 'Apapa, Lagos',
    year: '2022',
    featured: false,
    bg: '#0e1420',
    desc: 'Design and build of a 1,200m² warehouse facility with office block and loading dock for a logistics company.',
    tags: ['1,200m²', 'Industrial', 'New Build'],
  },
  {
    id: 'p9',
    title: 'Duplex Development',
    category: 'Residential',
    location: 'Ajah, Lagos',
    year: '2024',
    featured: false,
    bg: '#071428',
    desc: 'Construction of 4 semi-detached luxury duplexes with BQ, swimming pool, and perimeter fencing.',
    tags: ['4 Units', 'Luxury', 'Residential'],
  },
];

const CATEGORIES = ['All', 'Residential', 'Commercial', 'Civil', 'Education', 'Electrical'];

/* ── Building illustration (shared, slight variation per project) */
const BuildingIllustration = ({ bg = '#071428', featured = false }) => {
  const h = featured ? 380 : 280;
  const w = featured ? 600 : 400;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      <rect width={w} height={h} fill={bg}/>
      <g stroke="#E8781A" strokeWidth="0.4" opacity="0.1">
        {[0,1,2,3,4,5,6,7,8,9].map(i=>(
          <line key={`v${i}`} x1={i*(w/10)} y1="0" x2={i*(w/10)} y2={h}/>
        ))}
        {[0,1,2,3,4,5,6].map(i=>(
          <line key={`h${i}`} x1="0" y1={i*(h/6)} x2={w} y2={i*(h/6)}/>
        ))}
      </g>
      {/* Main building */}
      <rect x={w*0.25} y={h*0.08} width={w*0.34} height={h*0.84}
        fill="#0B1F3B" stroke="rgba(232,120,26,0.45)" strokeWidth="1.2"/>
      <rect x={w*0.25} y={h*0.08} width={w*0.34} height={5}
        fill="#C0272D" opacity="0.9"/>
      {/* Main building windows */}
      {Array.from({length: featured ? 9 : 7}, (_,ri)=>
        Array.from({length: featured ? 6 : 4}, (_,ci)=>(
          <rect key={`mw${ri}${ci}`}
            x={w*0.27 + ci*(w*0.055)} y={h*0.11 + ri*(h*0.1)}
            width={w*0.04} height={h*0.07} rx="1"
            fill={`rgba(232,120,26,${(ri+ci)%3===0?.55:(ri+ci)%3===1?.25:.1})`}/>
        ))
      )}
      {/* Left building */}
      <rect x={w*0.03} y={h*0.35} width={w*0.19} height={h*0.57}
        fill="#060D1A" stroke="rgba(192,39,45,0.3)" strokeWidth="0.8"/>
      <rect x={w*0.03} y={h*0.35} width={w*0.19} height={4}
        fill="#E8781A" opacity="0.6"/>
      {Array.from({length:6},(_,ri)=>
        Array.from({length:3},(_,ci)=>(
          <rect key={`lw${ri}${ci}`}
            x={w*0.05 + ci*(w*0.06)} y={h*0.38 + ri*(h*0.09)}
            width={w*0.04} height={h*0.06} rx="1"
            fill={`rgba(232,120,26,${(ri+ci)%2===0?.4:.15})`}/>
        ))
      )}
      {/* Right building */}
      <rect x={w*0.62} y={h*0.45} width={w*0.16} height={h*0.47}
        fill="#050B18" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
      {Array.from({length:5},(_,ri)=>
        Array.from({length:2},(_,ci)=>(
          <rect key={`rw${ri}${ci}`}
            x={w*0.64 + ci*(w*0.07)} y={h*0.48 + ri*(h*0.09)}
            width={w*0.04} height={h*0.06} rx="1"
            fill={`rgba(232,120,26,${(ri*ci)%2===0?.35:.15})`}/>
        ))
      )}
      {/* Scaffold */}
      <line x1={w*0.245} y1={h*0.1} x2={w*0.245} y2={h*0.9}
        stroke="rgba(255,255,255,0.09)" strokeWidth="4"/>
      <line x1={w*0.595} y1={h*0.1} x2={w*0.595} y2={h*0.9}
        stroke="rgba(255,255,255,0.09)" strokeWidth="4"/>
      {[0.3,0.5,0.7].map(y=>(
        <line key={y} x1={w*0.24} y1={h*y} x2={w*0.60} y2={h*y}
          stroke="rgba(255,255,255,0.06)" strokeWidth="1.5"/>
      ))}
      {/* Ground */}
      <rect x="0" y={h*0.91} width={w} height={h*0.09} fill="#040C18"/>
      <rect x="0" y={h*0.9}  width={w} height={4} fill="#E8781A" opacity="0.4"/>
      {/* Dark info overlay at bottom */}
      <rect x="0" y={h*0.76} width={w} height={h*0.16} fill="rgba(4,9,20,0.72)"/>
    </svg>
  );
};

/* ════════════════════════════════════════════════════════════════
   PROJECTS PAGE
════════════════════════════════════════════════════════════════ */
const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [filterKey,    setFilterKey]    = useState(0);

  const handleFilter = (cat) => {
    setActiveFilter(cat);
    setFilterKey(k => k + 1);
  };

  const filtered = PROJECTS.filter(p =>
    activeFilter === 'All' || p.category === activeFilter
  );

  return (
    <div className="proj-page">

      {/* ══════════ HERO ════════════════════════════════════ */}
      <section className="proj-hero">
        <div className="proj-hero__bg" aria-hidden="true">
          <svg width="100%" height="100%" viewBox="0 0 1200 460"
            preserveAspectRatio="xMidYMid slice">
            <rect width="1200" height="460" fill="#060D1A"/>
            <g stroke="#E8781A" strokeWidth="0.4" opacity="0.09">
              {Array.from({length:20},(_,i)=>(
                <line key={i} x1={i*64} y1="0" x2={i*64} y2="460"/>
              ))}
              {Array.from({length:9},(_,i)=>(
                <line key={i} x1="0" y1={i*54} x2="1200" y2={i*54}/>
              ))}
            </g>
            {/* Silhouette buildings */}
            <rect x="780"  y="60"  width="140" height="400" fill="rgba(255,255,255,0.018)"/>
            <rect x="940"  y="120" width="100" height="340" fill="rgba(255,255,255,0.015)"/>
            <rect x="1060" y="160" width="80"  height="300" fill="rgba(255,255,255,0.012)"/>
            <rect x="1155" y="100" width="50"  height="360" fill="rgba(255,255,255,0.02)"/>
            {/* Orange ground line */}
            <rect x="0" y="456" width="1200" height="4" fill="#E8781A" opacity="0.4"/>
          </svg>
        </div>

        <div className="proj-hero__content">
          <nav className="proj-hero__crumb">
            <Link to="/" className="proj-hero__crumb-link">Home</Link>
            <span>→</span>
            <span>Projects</span>
          </nav>
          <div className="proj-hero__tag">
            <span className="proj-hero__tag-line"/>
            <span className="proj-hero__tag-text">OUR PORTFOLIO</span>
          </div>
          <h1 className="proj-hero__heading">
            Work That <em>Speaks</em><br/>for Itself.
          </h1>
          <p className="proj-hero__sub">
            Over 200 completed projects across Lagos and Nigeria — from residential
            homes and commercial complexes to civil infrastructure and industrial
            facilities. Every one delivered with quality and precision.
          </p>

          {/* Quick stats */}
          <div className="proj-hero__stats">
            {[['200+','Projects'],['10+','Years'],['6','Sectors'],['100%','On-Time']].map(([v,l])=>(
              <div className="proj-hero__stat" key={l}>
                <span className="proj-hero__stat-val">{v}</span>
                <span className="proj-hero__stat-label">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FILTER + GRID ═══════════════════════════ */}
      <section className="proj-main">

        {/* Filter bar */}
        <div className="proj-filters">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`proj-filter-btn${activeFilter === cat ? ' proj-filter-btn--active' : ''}`}
              onClick={() => handleFilter(cat)}
              type="button"
            >
              {cat}
              {activeFilter === cat && (
                <span className="proj-filter-count">
                  {cat === 'All' ? PROJECTS.length : PROJECTS.filter(p=>p.category===cat).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="proj-grid" key={filterKey}>
          {filtered.map((proj, i) => (
            <div
              key={proj.id}
              className={`proj-card${proj.featured ? ' proj-card--featured' : ''}`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {/* Illustration */}
              <div className="proj-card__img">
                <BuildingIllustration bg={proj.bg} featured={proj.featured}/>
                <div className="proj-card__overlay"/>

                {/* Category badge */}
                <span className="proj-card__cat">{proj.category.toUpperCase()}</span>

                {/* Hover info panel */}
                <div className="proj-card__hover-panel">
                  <p className="proj-card__hover-desc">{proj.desc}</p>
                  <div className="proj-card__hover-tags">
                    {proj.tags.map(t => (
                      <span key={t} className="proj-card__tag">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Orange slide line */}
                <span className="proj-card__line"/>
              </div>

              {/* Card footer */}
              <div className="proj-card__footer">
                <div className="proj-card__meta">
                  <h3 className="proj-card__title">{proj.title}</h3>
                  <span className="proj-card__location">
                    <svg viewBox="0 0 16 16" fill="none" className="proj-card__loc-icon">
                      <path d="M8 1a5 5 0 0 0-5 5c0 3.5 5 9 5 9s5-5.5 5-9a5 5 0 0 0-5-5z"
                        stroke="currentColor" strokeWidth="1.2"/>
                      <circle cx="8" cy="6" r="1.8" stroke="currentColor" strokeWidth="1.2"/>
                    </svg>
                    {proj.location}
                  </span>
                </div>
                <span className="proj-card__year">{proj.year}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="proj-empty">
            <p>No projects found in this category yet.</p>
            <button className="proj-empty-btn" onClick={() => handleFilter('All')} type="button">
              VIEW ALL PROJECTS
            </button>
          </div>
        )}
      </section>

      {/* ══════════ STATS ═══════════════════════════════════ */}
      <Stats />

      {/* ══════════ CTA ═════════════════════════════════════ */}
      <section className="proj-cta">
        <div className="proj-cta__deco" aria-hidden="true">PROJECT</div>
        <div className="proj-cta__content">
          <div className="proj-cta__tag">
            <span className="proj-cta__tag-line"/>
            <span className="proj-cta__tag-text">START YOUR PROJECT</span>
          </div>
          <h2 className="proj-cta__heading">
            Have a Project<br/>in Mind?
          </h2>
          <p className="proj-cta__sub">
            Tell us about your construction or engineering needs and we will
            provide a free consultation and detailed quote.
          </p>
          <div className="proj-cta__actions">
            <Link to="/quote" className="proj-cta__btn proj-cta__btn--white">
              GET A FREE QUOTE
            </Link>
            <a href="tel:08038159214" className="proj-cta__btn proj-cta__btn--outline">
              CALL 08038159214
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ProjectsPage;
