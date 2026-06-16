import React from 'react';
import { Link } from 'react-router-dom';
import oneImg from '../../assets/one.jpeg';
import './About.css';

const CHECKS = [
  'Licensed, Certified & Insured',
  'On-Time, On-Budget Project Delivery',
  'Safety-First on Every Single Site',
  'Premium Materials & Expert Execution',
];

const About = () => (
  <section className="about" id="about">

    {/* Left: photo */}
    <div className="about__visual">
      <img src={oneImg} alt="Masterpattern construction site" className="about__photo" />
    </div>

    {/* Right: text */}
    <div className="about__content">
      <div className="about__tag">
        <span className="about__tag-line"/>
        <span className="about__tag-text">WHO WE ARE</span>
      </div>
      <h2 className="about__heading">
        Nigeria's Premier <em>Engineering</em> &amp;<br/>Construction Company
      </h2>
      <p className="about__body">
        Masterpattern Nig. Ltd is a full-service construction and engineering company
        headquartered in Lagos, Nigeria. We specialise in building construction, civil
        engineering works, renovation, electrical installations, plumbing, and
        professional project management.
      </p>
      <ul className="about__list">
        {CHECKS.map(item => (
          <li className="about__list-item" key={item}>
            <span className="about__check" aria-hidden="true">
              <svg viewBox="0 0 10 8" fill="none">
                <polyline points="1,4 3.5,7 9,1" stroke="#fff" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            {item}
          </li>
        ))}
      </ul>

      {/* ← Routes to the dedicated About page */}
      <Link to="/about" className="about__btn">LEARN MORE ABOUT US</Link>
    </div>
  </section>
);

export default About;
