import React from 'react';
import './HealthSafety.css';

const ITEMS = [
  'Full HSE policy compliance on all active sites',
  'Mandatory safety training for all site personnel',
  'Regular inspections and risk assessment reviews',
  'Personal Protective Equipment enforced at all times',
  'Emergency response protocols on every single site',
];

const HealthSafety = () => (
  <section className="hs" id="health-safety">

    {/* ── Left ── */}
    <div className="hs__left">
      <div className="hs__tag">
        <span className="hs__tag-line"/>
        <span className="hs__tag-text">HEALTH &amp; SAFETY</span>
      </div>
      <h2 className="hs__heading">
        Zero Compromise.<br/>Zero Incidents.
      </h2>
      <p className="hs__body">
        Every Masterpattern site operates under a strict Health, Safety &amp; Environment
        (HSE) framework — protecting our workers, clients, and surrounding communities
        at every stage of construction.
      </p>
      <a href="#contact" className="hs__btn">READ SAFETY POLICY</a>
    </div>

    {/* ── Right ── */}
    <div className="hs__right">
      <ul className="hs__list">
        {ITEMS.map(item => (
          <li className="hs__item" key={item}>
            <span className="hs__dot" aria-hidden="true"/>
            {item}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default HealthSafety;
