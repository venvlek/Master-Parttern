import React from 'react';
import './About.css';

const CHECKS = [
  'Licensed, Certified & Insured',
  'On-Time, On-Budget Project Delivery',
  'Safety-First on Every Single Site',
  'Premium Materials & Expert Execution',
];

const About = () => (
  <section className="about" id="about">

    {/* ── Left: architectural illustration ── */}
    <div className="about__visual">
      <svg className="about__grid" width="100%" height="100%" viewBox="0 0 340 480"
        preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="340" height="480" fill="#0B1F3B"/>
        <g stroke="#E8781A" strokeWidth="0.4" opacity="0.12">
          {[30,60,90,120,150,180,210,240,270,300,330].map(x => <line key={x} x1={x} y1="0" x2={x} y2="480"/>)}
          {[30,60,90,120,150,180,210,240,270,300,330,360,390,420,450,480].map(y => <line key={y} x1="0" y1={y} x2="340" y2={y}/>)}
        </g>
        {/* Secondary building left */}
        <rect x="18" y="180" width="72" height="290" fill="#071A30" stroke="rgba(192,39,45,0.35)" strokeWidth="1"/>
        <rect x="18" y="180" width="72" height="3" fill="#C0272D" opacity="0.8"/>
        {[195,218,241,264,287,310,333,356,379,402,425,448].map((y,i)=>(
          <g key={y}>
            <rect x="27" y={y} width="9" height="13" rx="1" fill={`rgba(232,120,26,${[.5,.25,.6,.3,.55,.2,.6,.4,.15,.5,.35,.45][i]})`}/>
            <rect x="42" y={y} width="9" height="13" rx="1" fill={`rgba(232,120,26,${[.2,.6,.3,.55,.15,.6,.35,.5,.6,.25,.5,.3][i]})`}/>
            <rect x="57" y={y} width="9" height="13" rx="1" fill={`rgba(232,120,26,${[.6,.35,.5,.2,.6,.4,.25,.6,.3,.55,.2,.6][i]})`}/>
            <rect x="72" y={y} width="9" height="13" rx="1" fill={`rgba(232,120,26,${[.35,.5,.2,.6,.4,.25,.5,.15,.45,.35,.6,.2][i]})`}/>
          </g>
        ))}
        <rect x="30" y="420" width="44" height="50" rx="1" fill="rgba(232,120,26,0.3)"/>
        {/* Main building center */}
        <rect x="108" y="55" width="120" height="415" fill="#0B1F3B" stroke="rgba(232,120,26,0.4)" strokeWidth="1.2"/>
        <rect x="108" y="55" width="120" height="4" fill="#C0272D" opacity="0.9"/>
        <line x1="106" y1="57" x2="106" y2="470" stroke="rgba(255,255,255,0.1)" strokeWidth="4"/>
        <line x1="230" y1="57" x2="230" y2="470" stroke="rgba(255,255,255,0.1)" strokeWidth="4"/>
        <line x1="103" y1="130" x2="233" y2="130" stroke="rgba(255,255,255,0.07)" strokeWidth="2"/>
        <line x1="103" y1="210" x2="233" y2="210" stroke="rgba(255,255,255,0.07)" strokeWidth="2"/>
        <line x1="103" y1="290" x2="233" y2="290" stroke="rgba(255,255,255,0.07)" strokeWidth="2"/>
        <line x1="103" y1="370" x2="233" y2="370" stroke="rgba(255,255,255,0.07)" strokeWidth="2"/>
        {[72,96,120,144,168,192,216,240,264,288,312,336,360,384,408,432].map((y,i)=>(
          <g key={y}>
            {[118,133,148,163,178,193,208].map((x,j)=>(
              <rect key={x} x={x} y={y} width="10" height="14" rx="1"
                fill={`rgba(232,120,26,${Math.random()>.4?.5+Math.random()*.2:.15+Math.random()*.15})`}/>
            ))}
          </g>
        ))}
        <rect x="124" y="415" width="44" height="55" rx="1" fill="rgba(192,39,45,0.45)"/>
        {/* Right building */}
        <rect x="248" y="220" width="78" height="250" fill="#060E1C" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
        {[234,254,274,294,314,334,354,374,394,414,434].map((y,i)=>(
          <g key={y}>
            {[256,271,286,301,316].map((x,j)=>(
              <rect key={x} x={x} y={y} width="8" height="12" rx="1"
                fill={`rgba(232,120,26,${[.45,.2,.6,.3,.55][j]})`}/>
            ))}
          </g>
        ))}
        {/* Crane */}
        <rect x="165" y="18" width="4" height="40" fill="#666"/>
        <rect x="88"  y="22" width="162" height="3" fill="#666"/>
        <line x1="88" y1="24" x2="167" y2="57" stroke="#777" strokeWidth="1.5"/>
        <rect x="240" y="14" width="18" height="22" rx="1" fill="#C0272D" opacity="0.8"/>
        <line x1="210" y1="22" x2="210" y2="88" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8"/>
        {/* Ground */}
        <rect x="0" y="468" width="340" height="12" fill="#060D1A"/>
        <rect x="0" y="466" width="340" height="4" fill="#E8781A" opacity="0.5"/>
      </svg>
    </div>

    {/* ── Right: text content ── */}
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
                <polyline points="1,4 3.5,7 9,1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            {item}
          </li>
        ))}
      </ul>

      <a href="#contact" className="about__btn">LEARN MORE ABOUT US</a>
    </div>
  </section>
);

export default About;
