import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Projects.css';

const BuildingSVG = ({ height = 300 }) => (
  <svg width="100%" height="100%" viewBox={`0 0 400 ${height}`}
    preserveAspectRatio="xMidYMid slice"
    style={{ position:'absolute', inset:0 }}>
    <rect width="400" height={height} fill="#071428"/>
    <g opacity="0.09" stroke="#E8781A" strokeWidth="0.5">
      {[35,70,105,140,175,210,245,280,315,350,385].map(x=><line key={x} x1={x} y1="0" x2={x} y2={height}/>)}
    </g>
    <rect x="60" y="40" width="280" height={height-50} fill="#0B1F3B" stroke="rgba(232,120,26,0.5)" strokeWidth="1.5"/>
    <rect x="60" y="40" width="280" height="4" fill="#C0272D" opacity="0.9"/>
    {[58,82,108,133,158,183,208,233].map((y,ri)=>(
      [72,97,122,147,172,197,222,247,272,297].map((x,ci)=>(
        <rect key={`${ri}-${ci}`} x={x} y={y} width="12" height="16" rx="1"
          fill={`rgba(232,120,26,${Math.random()>.45?.5+Math.random()*.2:.15+Math.random()*.15})`}/>
      ))
    ))}
    <rect x="60" y={height-72} width="280" height="72" fill="rgba(4,9,20,0.72)"/>
  </svg>
);

const PROJECTS = [
  { num:'01', cat:'RESIDENTIAL · LAGOS', title:'Residential Building Construction', loc:'Victoria Island, Lagos', bg:'#071428', tall:true  },
  { num:'02', cat:'EDUCATION · LAGOS',   title:'School Renovation Projects',        loc:'Lagos State, Nigeria',   bg:'#0f1a0c', tall:false },
  { num:'03', cat:'COMMERCIAL · V.I.',   title:'Office Complex Finishing',           loc:'Victoria Island, Lagos', bg:'#0c0c1e', tall:false },
  { num:'04', cat:'CIVIL · LAGOS',       title:'Drainage Construction Systems',      loc:'Mainland, Lagos',        bg:'#0a1520', tall:false },
];

const Projects = () => {
  const navigate = useNavigate();

  const goToProjects = () => navigate('/projects');

  return (
    <section className="projects" id="projects">
      <div className="projects__header">
        <div>
          <div className="projects__tag">
            <span className="projects__tag-line"/>
            <span className="projects__tag-text">OUR PORTFOLIO</span>
          </div>
          <h2 className="projects__heading">Featured <span>Projects</span></h2>
        </div>
        {/* ← Routes to the dedicated Projects page */}
        <button
          className="projects__cta-link"
          onClick={goToProjects}
          type="button"
        >
          ALL PROJECTS
        </button>
      </div>

      <div className="projects__grid">
        {/* Main tall card */}
        <div
          className="projects__card projects__card--tall"
          onClick={goToProjects}
          role="button" tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && goToProjects()}
          aria-label="View all projects"
        >
          <BuildingSVG height={500}/>
          <div className="projects__overlay"/>
          <div className="projects__deco-num">01</div>
          <div className="projects__info">
            <span className="projects__cat">{PROJECTS[0].cat}</span>
            <h3 className="projects__title">{PROJECTS[0].title}</h3>
            <span className="projects__loc">{PROJECTS[0].loc}</span>
          </div>
          <span className="projects__line"/>
        </div>

        {/* Right column */}
        <div className="projects__col">
          {PROJECTS.slice(1).map(({ num, cat, title, loc }) => (
            <div
              key={num}
              className="projects__card"
              onClick={goToProjects}
              role="button" tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && goToProjects()}
              aria-label={`View ${title}`}
            >
              <BuildingSVG height={220}/>
              <div className="projects__overlay"/>
              <div className="projects__deco-num">{num}</div>
              <div className="projects__info">
                <span className="projects__cat">{cat}</span>
                <h3 className="projects__title">{title}</h3>
                <span className="projects__loc">{loc}</span>
              </div>
              <span className="projects__line"/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
