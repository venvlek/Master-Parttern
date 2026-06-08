import React from 'react';
import './Ticker.css';

const ITEMS = [
  'Construction Services', 'Civil Engineering', 'Renovation & Maintenance',
  'Electrical Installation', 'Plumbing Services', 'Project Management', 'HSE Compliant',
];

const Ticker = () => (
  <div className="ticker" aria-hidden="true">
    <div className="ticker__track">
      {[...ITEMS, ...ITEMS].map((item, i) => (
        <span className="ticker__item" key={i}>
          <span className="ticker__dot" />
          {item.toUpperCase()}
        </span>
      ))}
    </div>
  </div>
);

export default Ticker;
