import React from 'react';
import './Footer.css';

const QUICK_LINKS = [
  { label: 'Home',            href: '#home'          },
  { label: 'About Us',        href: '#about'         },
  { label: 'Services',        href: '#services'      },
  { label: 'Projects',        href: '#projects'      },
  { label: 'Health & Safety', href: '#health-safety' },
  { label: 'Contact',         href: '#contact'       },
];

const SERVICES_LIST = [
  'Construction Services', 'Civil Engineering',
  'Renovation & Maintenance', 'Electrical Installation',
  'Plumbing Services', 'Project Management',
];

const Footer = () => (
  <footer className="footer">
    <div className="footer__top">

      {/* Brand */}
      <div className="footer__brand">
        <div className="footer__brand-name">
          <span className="footer__master">MASTER</span>
          <span className="footer__parttern">PARTTERN</span>
        </div>
        <span className="footer__brand-sub">NIG. LTD.</span>
        <p className="footer__brand-desc">
          Building excellence with quality and integrity across Nigeria.
          Your trusted partner for all construction, engineering, and
          project management needs.
        </p>
      </div>

      {/* Quick Links */}
      <div className="footer__col">
        <h4 className="footer__col-title">QUICK LINKS</h4>
        <ul className="footer__links">
          {QUICK_LINKS.map(({ label, href }) => (
            <li key={label}><a href={href}>{label}</a></li>
          ))}
        </ul>
      </div>

      {/* Services */}
      <div className="footer__col">
        <h4 className="footer__col-title">SERVICES</h4>
        <ul className="footer__links">
          {SERVICES_LIST.map(s => (
            <li key={s}><a href="#services">{s}</a></li>
          ))}
        </ul>
      </div>

      {/* Contact */}
      <div className="footer__col">
        <h4 className="footer__col-title">CONTACT INFO</h4>
        <ul className="footer__links footer__links--plain">
          <li>9, Agade Street, Sabo</li>
          <li>Yaba, Lagos, Nigeria</li>
          <li><a href="tel:08038159214">08038159214</a></li>
          <li><a href="mailto:masterpatternltd@gmail.com">masterpatternltd@gmail.com</a></li>
          <li>Mon–Fri: 8AM – 5PM</li>
          <li>Sat: 9AM – 2PM</li>
        </ul>
      </div>
    </div>

    <div className="footer__bottom">
      <span className="footer__copy">
        © {new Date().getFullYear()} Masterpattern Nig. Ltd. All Rights Reserved.
      </span>
      <div className="footer__policies">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Use</a>
        <a href="#">HSE Policy</a>
      </div>
    </div>
  </footer>
);

export default Footer;
