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

/* ── Social links ──────────────────────────────────────────────
   Replace each url below with your real profile/page link.
   WhatsApp is pre-filled using the office number (08038159214 → +234 803 815 9214).
─────────────────────────────────────────────────────────────── */
const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    url: 'https://facebook.com/masterpatternltd', // TODO: replace with real Facebook page URL
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.91h-2.33V22c4.78-.79 8.44-4.94 8.44-9.94z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    url: 'https://www.instagram.com/masterpatternng?utm_source=qr&igsh=MWtvZWptaG51Z242MA==', // TODO: replace with real Instagram handle URL
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
        <rect x="3" y="3" width="18" height="18" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    url: 'https://linkedin.com/company/masterpatternltd', // TODO: replace with real LinkedIn page URL
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM3.56 20.45h3.56V9H3.56v11.45z"/>
      </svg>
    ),
  },
  {
    label: 'TikTok',
    url: 'https://www.tiktok.com/@master.pattern.li?_r=1&_t=ZS-97G6o03oMdg', // TODO: replace with real TikTok handle URL
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M16.6 5.82c-.7-.76-1.1-1.75-1.1-2.82h-3.1v13.4c0 1.5-1.22 2.72-2.72 2.72a2.72 2.72 0 0 1 0-5.44c.27 0 .53.04.78.11V10.6a5.83 5.83 0 0 0-.78-.05A5.85 5.85 0 0 0 3.79 16.4 5.85 5.85 0 0 0 9.64 22.25 5.85 5.85 0 0 0 15.49 16.4V9.27a8.06 8.06 0 0 0 4.72 1.5V7.65c-1.26 0-2.42-.42-3.36-1.12a5.4 5.4 0 0 1-.25-.71z"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    url: 'https://wa.me/2348038159214', // pre-filled from your office number
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.85.5 3.58 1.46 5.08L2 22l5.2-1.56a9.9 9.9 0 0 0 4.84 1.24h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.79 14.04c-.24.68-1.4 1.34-1.93 1.4-.5.06-1.07.3-3.6-.75-3.04-1.26-4.99-4.34-5.14-4.55-.15-.21-1.23-1.64-1.23-3.13s.78-2.22 1.05-2.52c.27-.3.6-.37.8-.37.2 0 .4.002.57.01.18.01.43-.07.67.51.25.6.85 2.07.92 2.22.08.15.13.32.02.52-.1.2-.16.32-.31.49-.16.18-.32.4-.46.54-.15.15-.31.31-.13.61.18.3.8 1.32 1.72 2.14 1.18 1.05 2.18 1.38 2.49 1.53.31.15.5.13.68-.08.18-.2.78-.91.99-1.22.21-.31.41-.26.69-.16.28.1 1.77.84 2.07.99.3.15.5.23.57.36.07.13.07.75-.17 1.43z"/>
      </svg>
    ),
  },
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
          <div className="footer__social">
            {SOCIAL_LINKS.map(({ label, url, icon }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label={label}
              >
                {icon}
              </a>
            ))}
          </div>
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
