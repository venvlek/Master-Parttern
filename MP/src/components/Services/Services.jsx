import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Services.css';

const SERVICES = [
  {
    num: '01', id: 'construction', title: 'Construction Services',
    desc: 'Residential, commercial & industrial building construction with modern techniques and premium materials.',
    icon: <><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/></>,
  },
  {
    num: '02', id: 'civil-engineering', title: 'Civil Engineering',
    desc: 'Roads, drainage systems, concrete structures, and critical civil infrastructure projects delivered on time.',
    icon: <><path d="M2 20h20M4 20V10l8-6 8 6v10M10 20v-6h4v6"/></>,
  },
  {
    num: '03', id: 'renovation', title: 'Renovation & Maintenance',
    desc: 'Complete remodeling, finishing, and structural upgrades that restore and enhance property value.',
    icon: <><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></>,
  },
  {
    num: '04', id: 'electrical', title: 'Electrical Installation',
    desc: 'Full wiring, power systems, and electrical maintenance for all residential and commercial properties.',
    icon: <><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></>,
  },
  {
    num: '05', id: 'plumbing', title: 'Plumbing Services',
    desc: 'Water systems, drainage design, and full plumbing installation with long-lasting, reliable results.',
    icon: <><path d="M12 2a3 3 0 0 0-3 3v7H6l-2 6h16l-2-6h-3V5a3 3 0 0 0-3-3z"/></>,
  },
  {
    num: '06', id: 'management', title: 'Project Management',
    desc: 'End-to-end planning, supervision, cost control, and quality assurance across all project phases.',
    icon: <><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></>,
  },
];

const Services = () => {
  const navigate = useNavigate();

  /* Navigate to /services then scroll to the specific section */
  const goToService = (id) => {
    navigate('/services');
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 350);
  };

  return (
    <section className="services" id="services">
      <div className="services__header">
        <div>
          <div className="services__tag">
            <span className="services__tag-line"/>
            <span className="services__tag-text">WHAT WE DO</span>
          </div>
          <h2 className="services__heading">
            Our Core <span>Services</span>
          </h2>
        </div>
        {/* ← Routes to the dedicated Services page */}
        <button
          className="services__cta-link"
          onClick={() => navigate('/services')}
          type="button"
        >
          VIEW ALL SERVICES
        </button>
      </div>

      <div className="services__grid">
        {SERVICES.map(({ num, id, title, desc, icon }) => (
          /* ← Each card navigates to the exact section on /services */
          <div
            className="services__card"
            key={num}
            onClick={() => goToService(id)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && goToService(id)}
            aria-label={`View ${title}`}
          >
            <span className="services__num">{num}</span>
            <div className="services__icon">
              <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                {icon}
              </svg>
            </div>
            <h3 className="services__title">{title}</h3>
            <p className="services__desc">{desc}</p>
            <span className="services__more">LEARN MORE →</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
