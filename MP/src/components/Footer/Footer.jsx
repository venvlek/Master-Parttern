import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Footer.css';

const QUICK_LINKS = [
  { label: 'Home',            to: '/'              },
  { label: 'About Us',        to: '/about'         },
  { label: 'Services',        to: '/services'      },
  { label: 'Projects',        to: '/projects'      },
  { label: 'Health & Safety', to: '/health-safety' },
  { label: 'Blog',            to: '/blog'          },
  { label: 'Contact',         to: '/contact'       },
];

const SERVICES_LIST = [
  { label: 'Construction Services',    id: 'construction'      },
  { label: 'Civil Engineering',        id: 'civil-engineering'  },
  { label: 'Renovation & Maintenance', id: 'renovation'        },
  { label: 'Electrical Installation',  id: 'electrical'        },
  { label: 'Plumbing Services',        id: 'plumbing'          },
  { label: 'Project Management',       id: 'management'        },
];

const Footer = () => {
  const navigate = useNavigate();

  const goToService = (id) => {
    navigate('/services');
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 350);
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="footer__top">

        {/* Brand */}
        <div className="footer__brand">
          <Link to="/" onClick={scrollTop} className="footer__brand-name">
            <span className="footer__master">MASTER</span>
            <span className="footer__parttern">PARTTERN</span>
          </Link>
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
            {QUICK_LINKS.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} onClick={scrollTop}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="footer__col">
          <h4 className="footer__col-title">SERVICES</h4>
          <ul className="footer__links">
            {SERVICES_LIST.map(({ label, id }) => (
              <li key={id}>
                <button
                  className="footer__link-btn"
                  onClick={() => goToService(id)}
                  type="button"
                >
                  {label}
                </button>
              </li>
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
          <Link to="/quote" className="footer__quote-btn">GET A FREE QUOTE</Link>
        </div>
      </div>

      <div className="footer__bottom">
        <span className="footer__copy">
          © {new Date().getFullYear()} Masterpattern Nig. Ltd. All Rights Reserved.
        </span>
        <div className="footer__policies">
          <Link to="/blog">Blog</Link>
          <Link to="/health-safety">HSE Policy</Link>
          <Link to="/contact">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
