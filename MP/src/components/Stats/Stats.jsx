import React, { useEffect, useRef, useState } from 'react';
import './Stats.css';

const STATS = [
  { value: 12,  suffix: '+', label: 'Years of Experience'  },
  { value: 200, suffix: '+', label: 'Projects Completed'   },
  { value: 50,  suffix: '+', label: 'Expert Professionals' },
  { value: 100, suffix: '%', label: 'Client Satisfaction'  },
];

/* Eased counter — triggers once when section enters viewport */
const Counter = ({ target, suffix, started }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const startTime = performance.now();

    const tick = (now) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(tick);
      else setCount(target);
    };

    requestAnimationFrame(tick);
  }, [started, target]);

  return (
    <span className="stats__number">
      {count}<span className="stats__suffix">{suffix}</span>
    </span>
  );
};

const Stats = () => {
  const ref     = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats" ref={ref}>
      {STATS.map(({ value, suffix, label }) => (
        <div className="stats__item" key={label}>
          <Counter target={value} suffix={suffix} started={started} />
          <span className="stats__label">{label.toUpperCase()}</span>
        </div>
      ))}
    </section>
  );
};

export default Stats;
