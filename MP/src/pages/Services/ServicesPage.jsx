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

/* ── SVG Illustrations per service ─────────────────────────── */
const ServiceVisual = ({ id }) => {
  const visuals = {
    construction: (
      <svg viewBox="0 0 480 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="svc-svg">
        <rect width="480" height="420" fill="#071428"/>
        <g stroke="#E8781A" strokeWidth="0.4" opacity="0.12">
          {[40,80,120,160,200,240,280,320,360,400,440].map(x=><line key={x} x1={x} y1="0" x2={x} y2="420"/>)}
          {[40,80,120,160,200,240,280,320,360,400].map(y=><line key={y} x1="0" y1={y} x2="480" y2={y}/>)}
        </g>
        {/* Main tower */}
        <rect x="160" y="40" width="160" height="360" fill="#0B1F3B" stroke="rgba(232,120,26,0.5)" strokeWidth="1.5"/>
        <rect x="160" y="40" width="160" height="5" fill="#C0272D" opacity="0.9"/>
        {[56,82,108,134,160,186,212,238,264,290,316,342,368].map((y,ri)=>
          [172,194,216,238,260,282,304].map((x,ci)=>(
            <rect key={`${ri}${ci}`} x={x} y={y} width="14" height="18" rx="1"
              fill={`rgba(232,120,26,${(ri+ci)%3===0?.55:(ri+ci)%3===1?.25:.12})`}/>
          ))
        )}
        <rect x="186" y="348" width="48" height="52" rx="1" fill="rgba(192,39,45,0.45)"/>
        {/* Left building */}
        <rect x="32" y="160" width="100" height="240" fill="#060F1E" stroke="rgba(192,39,45,0.3)" strokeWidth="1"/>
        <rect x="32" y="160" width="100" height="4" fill="#E8781A" opacity="0.7"/>
        {[174,198,222,246,270,294,318,342,366].map((y,ri)=>
          [42,60,78,96,112].map((x,ci)=>(
            <rect key={`l${ri}${ci}`} x={x} y={y} width="10" height="14" rx="1"
              fill={`rgba(232,120,26,${(ri*2+ci)%3===0?.5:.2})`}/>
          ))
        )}
        {/* Right building */}
        <rect x="348" y="200" width="96" height="200" fill="#050D1A" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
        {[214,234,254,274,294,314,334,354,374].map((y,ri)=>
          [358,374,390].map((x,ci)=>(
            <rect key={`r${ri}${ci}`} x={x} y={y} width="8" height="12" rx="1"
              fill={`rgba(232,120,26,${(ri+ci)%2===0?.45:.18})`}/>
          ))
        )}
        {/* Crane */}
        <rect x="228" y="12" width="5" height="30" fill="#555"/>
        <rect x="130" y="16" width="214" height="3" fill="#555"/>
        <line x1="130" y1="18" x2="231" y2="42" stroke="#666" strokeWidth="1.5"/>
        <rect x="336" y="8" width="18" height="24" rx="1" fill="#C0272D" opacity="0.8"/>
        <line x1="290" y1="16" x2="290" y2="72" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8"/>
        {/* Scaffold */}
        <line x1="158" y1="42" x2="158" y2="400" stroke="rgba(255,255,255,0.1)" strokeWidth="4"/>
        <line x1="322" y1="42" x2="322" y2="400" stroke="rgba(255,255,255,0.1)" strokeWidth="4"/>
        {[120,180,240,300,360].map(y=>(
          <line key={y} x1="155" y1={y} x2="325" y2={y} stroke="rgba(255,255,255,0.07)" strokeWidth="2"/>
        ))}
        <rect x="0" y="397" width="480" height="23" fill="#040C18"/>
        <rect x="0" y="395" width="480" height="4" fill="#E8781A" opacity="0.45"/>
      </svg>
    ),
    'civil-engineering': (
      <svg viewBox="0 0 480 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="svc-svg">
        <rect width="480" height="420" fill="#071428"/>
        <g stroke="#E8781A" strokeWidth="0.4" opacity="0.1">
          {[40,80,120,160,200,240,280,320,360,400,440].map(x=><line key={x} x1={x} y1="0" x2={x} y2="420"/>)}
          {[40,80,120,160,200,240,280,320,360,400].map(y=><line key={y} x1="0" y1={y} x2="480" y2={y}/>)}
        </g>
        {/* Bridge deck */}
        <rect x="20" y="200" width="440" height="24" fill="#0B1F3B" stroke="rgba(232,120,26,0.5)" strokeWidth="1.5"/>
        {/* Bridge supports */}
        <rect x="100" y="224" width="24" height="160" fill="#0D2040" stroke="rgba(232,120,26,0.3)" strokeWidth="1"/>
        <rect x="356" y="224" width="24" height="160" fill="#0D2040" stroke="rgba(232,120,26,0.3)" strokeWidth="1"/>
        {/* Arch cables */}
        {[0,1,2,3,4,5,6,7,8].map(i=>(
          <line key={i} x1={112} y1={140+i*8} x2={100+i*32} y2={200} stroke="rgba(232,120,26,0.4)" strokeWidth="0.8"/>
        ))}
        {[0,1,2,3,4,5,6,7,8].map(i=>(
          <line key={`r${i}`} x1={368} y1={140+i*8} x2={368+i*8} y2={200} stroke="rgba(232,120,26,0.4)" strokeWidth="0.8"/>
        ))}
        {/* Road surface */}
        <rect x="20" y="196" width="440" height="8" fill="#E8781A" opacity="0.3"/>
        <line x1="240" y1="200" x2="240" y2="224" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="4,4"/>
        {/* Road markings */}
        {[60,120,180,300,360,420].map(x=>(
          <rect key={x} x={x} y="208" width="30" height="4" rx="1" fill="rgba(255,255,255,0.25)"/>
        ))}
        {/* Drainage cross-section (bottom) */}
        <rect x="100" y="310" width="280" height="60" fill="#060D1A" stroke="rgba(232,120,26,0.3)" strokeWidth="1"/>
        <path d="M100 370 Q240 340 380 370" stroke="#E8781A" strokeWidth="1.5" fill="none" opacity="0.6"/>
        <text x="240" y="345" textAnchor="middle" fill="rgba(232,120,26,0.5)" fontSize="10" fontFamily="monospace" letterSpacing="2">DRAINAGE CHANNEL</text>
        {/* Ground line */}
        <rect x="0" y="390" width="480" height="30" fill="#040C18"/>
        <rect x="0" y="388" width="480" height="4" fill="#E8781A" opacity="0.4"/>
        {/* Dimension lines */}
        <line x1="20" y1="175" x2="460" y2="175" stroke="rgba(232,120,26,0.25)" strokeWidth="0.8"/>
        <line x1="20" y1="172" x2="20" y2="178" stroke="rgba(232,120,26,0.25)" strokeWidth="0.8"/>
        <line x1="460" y1="172" x2="460" y2="178" stroke="rgba(232,120,26,0.25)" strokeWidth="0.8"/>
        <text x="240" y="170" textAnchor="middle" fill="rgba(232,120,26,0.35)" fontSize="9" fontFamily="monospace" letterSpacing="1">SPAN: 440m</text>
      </svg>
    ),
    renovation: (
      <svg viewBox="0 0 480 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="svc-svg">
        <rect width="480" height="420" fill="#071428"/>
        <g stroke="#E8781A" strokeWidth="0.4" opacity="0.1">
          {[40,80,120,160,200,240,280,320,360,400,440].map(x=><line key={x} x1={x} y1="0" x2={x} y2="420"/>)}
          {[40,80,120,160,200,240,280,320,360,400].map(y=><line key={y} x1="0" y1={y} x2="480" y2={y}/>)}
        </g>
        {/* Before side (left, worn) */}
        <rect x="20" y="80" width="200" height="300" fill="#040C18" stroke="rgba(192,39,45,0.2)" strokeWidth="1"/>
        <rect x="20" y="80" width="200" height="4" fill="rgba(192,39,45,0.5)"/>
        <text x="120" y="65" textAnchor="middle" fill="rgba(192,39,45,0.5)" fontSize="9" fontFamily="monospace" letterSpacing="2">BEFORE</text>
        {[100,130,160,190,220,250,280,310].map((y,i)=>
          [32,65,98,131,164,197].map((x,j)=>(
            <rect key={`b${i}${j}`} x={x} y={y} width="24" height="18" rx="1"
              fill={`rgba(100,100,120,${j%2===0?.12:.06})`} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
          ))
        )}
        {/* Cracks on before side */}
        <path d="M60 120 L75 145 L65 170" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5"/>
        <path d="M130 180 L120 200 L135 225" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5"/>
        <path d="M170 250 L155 270" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5"/>
        {/* After side (right, renovated) */}
        <rect x="260" y="80" width="200" height="300" fill="#0B1F3B" stroke="rgba(232,120,26,0.45)" strokeWidth="1.5"/>
        <rect x="260" y="80" width="200" height="5" fill="#C0272D" opacity="0.9"/>
        <text x="360" y="65" textAnchor="middle" fill="rgba(232,120,26,0.6)" fontSize="9" fontFamily="monospace" letterSpacing="2">AFTER</text>
        {[100,130,160,190,220,250,280,310].map((y,i)=>
          [272,305,338,371,404,437].map((x,j)=>(
            <rect key={`a${i}${j}`} x={x} y={y} width="24" height="18" rx="1"
              fill={`rgba(232,120,26,${(i+j)%3===0?.45:(i+j)%3===1?.25:.12})`}/>
          ))
        )}
        <rect x="300" y="310" width="40" height="70" rx="1" fill="rgba(232,120,26,0.35)"/>
        <rect x="360" y="310" width="40" height="70" rx="1" fill="rgba(232,120,26,0.35)"/>
        {/* Centre divider with arrow */}
        <line x1="240" y1="80" x2="240" y2="380" stroke="rgba(232,120,26,0.5)" strokeWidth="2" strokeDasharray="6,4"/>
        <path d="M224 225 L240 210 L256 225" fill="#E8781A" opacity="0.7"/>
        <path d="M224 235 L240 250 L256 235" fill="#E8781A" opacity="0.7"/>
        {/* Ground */}
        <rect x="0" y="378" width="480" height="42" fill="#040C18"/>
        <rect x="0" y="376" width="480" height="4" fill="#E8781A" opacity="0.4"/>
      </svg>
    ),
    electrical: (
      <svg viewBox="0 0 480 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="svc-svg">
        <rect width="480" height="420" fill="#071428"/>
        <g stroke="#E8781A" strokeWidth="0.4" opacity="0.1">
          {[40,80,120,160,200,240,280,320,360,400,440].map(x=><line key={x} x1={x} y1="0" x2={x} y2="420"/>)}
          {[40,80,120,160,200,240,280,320,360,400].map(y=><line key={y} x1="0" y1={y} x2="480" y2={y}/>)}
        </g>
        {/* Distribution board */}
        <rect x="140" y="60" width="200" height="280" fill="#0B1F3B" stroke="rgba(232,120,26,0.5)" strokeWidth="1.5"/>
        <rect x="140" y="60" width="200" height="6" fill="#E8781A" opacity="0.8"/>
        <text x="240" y="52" textAnchor="middle" fill="rgba(232,120,26,0.5)" fontSize="9" fontFamily="monospace" letterSpacing="2">DISTRIBUTION BOARD</text>
        {/* Breakers */}
        {[85,110,135,160,185,210,235,260,285].map((y,i)=>(
          <g key={y}>
            <rect x="158" y={y} width="64" height="16" rx="2" fill="#0D2040" stroke="rgba(232,120,26,0.3)" strokeWidth="0.8"/>
            <rect x="160" y={y+4} width="14" height="8" rx="1" fill={i%3===0?'#E8781A':i%3===1?'rgba(232,120,26,0.4)':'rgba(11,31,59,0.8)'}/>
            <rect x="258" y={y} width="64" height="16" rx="2" fill="#0D2040" stroke="rgba(232,120,26,0.3)" strokeWidth="0.8"/>
            <rect x="260" y={y+4} width="14" height="8" rx="1" fill={i%2===0?'#C0272D':'rgba(232,120,26,0.4)'}/>
          </g>
        ))}
        {/* Main switch */}
        <rect x="195" y="78" width="90" height="28" rx="2" fill="#C0272D" opacity="0.7" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"/>
        <text x="240" y="96" textAnchor="middle" fill="#fff" fontSize="8" fontFamily="monospace" letterSpacing="1">MAIN SWITCH</text>
        {/* Wires going out */}
        {[92,117,142,167,192,217,242,267,292].map((y,i)=>(
          <line key={`wl${i}`} x1="140" y1={y+8} x2="20" y2={y+8}
            stroke={`rgba(${i%3===0?'232,120,26':i%3===1?'192,39,45':'100,150,255'},0.6)`} strokeWidth="1.5"/>
        ))}
        {[92,117,142,167,192,217,242,267,292].map((y,i)=>(
          <line key={`wr${i}`} x1="340" y1={y+8} x2="460" y2={y+8}
            stroke={`rgba(${i%3===0?'232,120,26':i%3===1?'192,39,45':'100,150,255'},0.6)`} strokeWidth="1.5"/>
        ))}
        {/* Lightning bolt */}
        <path d="M222 320 L244 300 L238 315 L262 295 L240 318 L248 315 Z"
          fill="#E8781A" opacity="0.8"/>
        {/* Ground line */}
        <rect x="0" y="390" width="480" height="30" fill="#040C18"/>
        <rect x="0" y="388" width="480" height="4" fill="#E8781A" opacity="0.4"/>
      </svg>
    ),
    plumbing: (
      <svg viewBox="0 0 480 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="svc-svg">
        <rect width="480" height="420" fill="#071428"/>
        <g stroke="#E8781A" strokeWidth="0.4" opacity="0.1">
          {[40,80,120,160,200,240,280,320,360,400,440].map(x=><line key={x} x1={x} y1="0" x2={x} y2="420"/>)}
          {[40,80,120,160,200,240,280,320,360,400].map(y=><line key={y} x1="0" y1={y} x2="480" y2={y}/>)}
        </g>
        {/* Main supply pipe (horizontal top) */}
        <rect x="20" y="100" width="440" height="20" rx="3" fill="#0B1F3B" stroke="rgba(232,120,26,0.6)" strokeWidth="1.5"/>
        <rect x="22" y="105" width="436" height="10" rx="2" fill="rgba(232,120,26,0.15)"/>
        {/* Vertical drops */}
        {[80,160,240,320,400].map((x,i)=>(
          <g key={x}>
            <rect x={x-8} y={120} width="16" height={200+i*10} rx="2" fill="#0B1F3B" stroke="rgba(232,120,26,0.4)" strokeWidth="1"/>
            {/* Valve */}
            <rect x={x-14} y={180+i*12} width="28" height="18" rx="2" fill="#0D2040" stroke="rgba(192,39,45,0.5)" strokeWidth="1"/>
            <rect x={x-4} y={175+i*12} width="8" height="6" rx="1" fill="rgba(192,39,45,0.7)"/>
            {/* Outlet */}
            <rect x={x-20} y={290+i*8} width="18" height="12" rx="1" fill="#060D1A" stroke="rgba(232,120,26,0.3)" strokeWidth="0.8"/>
            <path d={`M${x-18} ${302+i*8} Q${x-14} ${310+i*8} ${x-10} ${302+i*8}`}
              stroke="rgba(100,180,255,0.4)" strokeWidth="1.5" fill="none"/>
          </g>
        ))}
        {/* Return pipe (bottom) */}
        <rect x="20" y="340" width="440" height="16" rx="3" fill="#060D1A" stroke="rgba(232,120,26,0.3)" strokeWidth="1"/>
        {/* Water tank */}
        <rect x="180" y="20" width="120" height="70" rx="4" fill="#0D2040" stroke="rgba(232,120,26,0.5)" strokeWidth="1.5"/>
        <rect x="182" y="22" width="116" height="66" rx="3" fill="rgba(100,180,255,0.08)"/>
        <text x="240" y="58" textAnchor="middle" fill="rgba(232,120,26,0.5)" fontSize="9" fontFamily="monospace" letterSpacing="1.5">WATER TANK</text>
        <line x1="240" y1="90" x2="240" y2="100" stroke="rgba(232,120,26,0.5)" strokeWidth="2"/>
        {/* Labels */}
        <text x="240" y="92" textAnchor="middle" fill="rgba(232,120,26,0.35)" fontSize="8" fontFamily="monospace" letterSpacing="1">MAIN SUPPLY</text>
        {/* Ground */}
        <rect x="0" y="390" width="480" height="30" fill="#040C18"/>
        <rect x="0" y="388" width="480" height="4" fill="#E8781A" opacity="0.4"/>
      </svg>
    ),
    management: (
      <svg viewBox="0 0 480 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="svc-svg">
        <rect width="480" height="420" fill="#071428"/>
        <g stroke="#E8781A" strokeWidth="0.4" opacity="0.1">
          {[40,80,120,160,200,240,280,320,360,400,440].map(x=><line key={x} x1={x} y1="0" x2={x} y2="420"/>)}
          {[40,80,120,160,200,240,280,320,360,400].map(y=><line key={y} x1="0" y1={y} x2="480" y2={y}/>)}
        </g>
        {/* Dashboard frame */}
        <rect x="30" y="40" width="420" height="320" rx="4" fill="#0B1F3B" stroke="rgba(232,120,26,0.4)" strokeWidth="1.5"/>
        <rect x="30" y="40" width="420" height="32" rx="4" fill="#0D2444"/>
        <rect x="30" y="56" width="420" height="16" fill="#0D2444"/>
        {/* Top bar dots */}
        {[48,64,80].map((x,i)=>(
          <circle key={x} cx={x} cy={56} r="5" fill={['#C0272D','#E8781A','rgba(232,120,26,0.4)'][i]}/>
        ))}
        <text x="240" y="61" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="monospace" letterSpacing="2">PROJECT DASHBOARD</text>
        {/* Gantt chart rows */}
        {[
          { label:'CONSULTATION', start:60,  width:60,  color:'#E8781A', y:95  },
          { label:'PLANNING',     start:110, width:80,  color:'#C0272D', y:125 },
          { label:'PROCUREMENT',  start:180, width:70,  color:'#E8781A', y:155 },
          { label:'EXECUTION',    start:140, width:150, color:'#0B4F8A', y:185 },
          { label:'INSPECTION',   start:280, width:60,  color:'#C0272D', y:215 },
          { label:'HANDOVER',     start:330, width:80,  color:'#E8781A', y:245 },
        ].map(({ label, start, width, color, y }) => (
          <g key={label}>
            <text x="108" y={y+13} textAnchor="end" fill="rgba(255,255,255,0.35)" fontSize="8" fontFamily="monospace" letterSpacing="0.5">{label}</text>
            <rect x={58} y={y} width={360} height="20" rx="2" fill="rgba(255,255,255,0.03)"/>
            <rect x={58+start*0.8} y={y+2} width={width*0.9} height="16" rx="2"
              fill={color} opacity="0.8"/>
          </g>
        ))}
        {/* Timeline header */}
        {['WK1','WK2','WK3','WK4','WK5','WK6','WK7','WK8'].map((w,i)=>(
          <text key={w} x={78+i*44} y={88} textAnchor="middle"
            fill="rgba(232,120,26,0.4)" fontSize="7" fontFamily="monospace">{w}</text>
        ))}
        {/* Progress circle */}
        <circle cx="400" cy="315" r="36" stroke="rgba(255,255,255,0.06)" strokeWidth="6" fill="none"/>
        <circle cx="400" cy="315" r="36" stroke="#E8781A" strokeWidth="6" fill="none"
          strokeDasharray="188" strokeDashoffset="47" strokeLinecap="round"
          transform="rotate(-90 400 315)"/>
        <text x="400" y="312" textAnchor="middle" fill="#E8781A" fontSize="14" fontWeight="bold" fontFamily="monospace">75%</text>
        <text x="400" y="325" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="monospace">COMPLETE</text>
        {/* Ground */}
        <rect x="0" y="390" width="480" height="30" fill="#040C18"/>
        <rect x="0" y="388" width="480" height="4" fill="#E8781A" opacity="0.4"/>
      </svg>
    ),
  };

  return visuals[id] || visuals['construction'];
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
          <ServiceVisual id={svc.id} />
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
