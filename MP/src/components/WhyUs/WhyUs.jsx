import React from 'react';
import './WhyUs.css';

const POINTS = [
  { num: '01', title: 'Safety First, Always',     desc: 'Strict HSE compliance and safety protocols enforced on every project site without exception.' },
  { num: '02', title: 'Proven Track Record',       desc: 'Over a decade of successful project delivery across residential, commercial, and civil sectors in Nigeria.' },
  { num: '03', title: 'On-Time, On-Budget',        desc: 'Transparent pricing, zero hidden costs, and strict adherence to all agreed project timelines.' },
  { num: '04', title: 'Quality Guaranteed',        desc: 'Premium materials, certified professionals, and rigorous quality control at every single stage.' },
];

const WhyUs = () => (
  <section className="why">

    {/* ── Left: Red panel ── */}
    <div className="why__left">
      <div className="why__deco" aria-hidden="true">W</div>

      <div className="why__tag">
        <span className="why__tag-line"/>
        <span className="why__tag-text">WHY MASTERPATTERN</span>
      </div>

      <h2 className="why__heading">
        We Build With Purpose,<br/>Precision &amp; Pride.
      </h2>

      <p className="why__body">
        With experienced professionals and modern construction techniques,
        we ensure every project is completed efficiently, safely, and within budget.
      </p>

      <div className="why__stats">
        {[['10+','YEARS'],['200+','PROJECTS'],['50+','EXPERTS']].map(([v, l]) => (
          <div className="why__stat" key={l}>
            <span className="why__stat-value">{v}</span>
            <span className="why__stat-label">{l}</span>
          </div>
        ))}
      </div>
    </div>

    {/* ── Right: White panel ── */}
    <div className="why__right">
      <p className="why__right-intro">
        Four reasons to choose <span>Masterpattern</span>
      </p>
      <div className="why__points">
        {POINTS.map(({ num, title, desc }) => (
          <div className="why__point" key={num}>
            <span className="why__point-num">{num}</span>
            <div className="why__point-body">
              <h3 className="why__point-title">{title}</h3>
              <p className="why__point-desc">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUs;
