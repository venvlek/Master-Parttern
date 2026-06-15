import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MPLogo from '../../assets/MP logo.png';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home',            href: '/'              },
  { label: 'About Us',        href: '/about'         },
  { label: 'Services',        href: '/services'      },
  { label: 'Projects',        href: '/projects'      },
  { label: 'Health & Safety', href: '/health-safety' },
  { label: 'Contact',         href: '/contact'       },
];

const SERVICES_ITEMS = [
  { label: 'Construction Services',    id: 'construction'      },
  { label: 'Civil Engineering',        id: 'civil-engineering'  },
  { label: 'Renovation & Maintenance', id: 'renovation'        },
  { label: 'Electrical Installation',  id: 'electrical'        },
  { label: 'Plumbing Services',        id: 'plumbing'          },
  { label: 'Project Management',       id: 'management'        },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [dropdown,  setDropdown]  = useState(false);

  const dropTimerRef = useRef(null);

  const getActive = () => {
    const p = location.pathname;
    if (p === '/about')         return 'About Us';
    if (p === '/services')      return 'Services';
    if (p === '/projects')      return 'Projects';
    if (p === '/health-safety') return 'Health & Safety';
    if (p === '/contact')       return 'Contact';
    if (p === '/')              return 'Home';
    return '';
  };

  const handleScroll = useCallback(() => setScrolled(window.scrollY > 30), []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* Close drawer on route change */
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const go = (href) => {
    setMenuOpen(false);
    setDropdown(false);
    navigate(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDropdownClick = (id) => {
    setMenuOpen(false);
    setDropdown(false);
    navigate('/services');
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 350);
  };

  const activeLink = getActive();

  return (
    <>
      <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <div className="navbar__top-bar" aria-hidden="true" />
        <div className="navbar__inner">

          <Link to="/" className="navbar__logo-wrap"
            onClick={() => window.scrollTo({ top: 0 })}>
            <img src={MPLogo} alt="Masterpattern Nig. Ltd." className="navbar__logo-img" />
          </Link>

          <ul className="navbar__links">
            {NAV_LINKS.map((link) => (
              <li
                key={link.label}
                className={link.label === 'Services' ? 'navbar__item--has-dropdown' : ''}
                onMouseEnter={() => {
                  if (link.label === 'Services') {
                    clearTimeout(dropTimerRef.current);
                    setDropdown(true);
                  }
                }}
                onMouseLeave={() => {
                  if (link.label === 'Services') {
                    dropTimerRef.current = setTimeout(() => setDropdown(false), 160);
                  }
                }}
              >
                <button
                  className={`navbar__link${activeLink === link.label ? ' navbar__link--active' : ''}`}
                  onClick={() => go(link.href)}
                  type="button"
                >
                  {link.label.toUpperCase()}
                  {link.label === 'Services' && (
                    <svg className="navbar__link-chevron" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>

                {link.label === 'Services' && (
                  <div
                    className={`navbar__dropdown${dropdown ? ' navbar__dropdown--open' : ''}`}
                    onMouseEnter={() => { clearTimeout(dropTimerRef.current); setDropdown(true); }}
                    onMouseLeave={() => { dropTimerRef.current = setTimeout(() => setDropdown(false), 160); }}
                  >
                    <div className="navbar__dropdown-header">OUR SERVICES</div>
                    {SERVICES_ITEMS.map(({ label, id }) => (
                      <button
                        key={id}
                        className="navbar__dropdown-item"
                        type="button"
                        onClick={() => handleDropdownClick(id)}
                      >
                        <span className="navbar__dropdown-dot" aria-hidden="true"/>
                        {label}
                        <svg className="navbar__dropdown-arrow" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="navbar__right">
            <span className="navbar__tel">CALL:&nbsp;<strong>08038159214</strong></span>
            {/* GET A QUOTE → dedicated /quote page */}
            <button className="navbar__cta" type="button" onClick={() => go('/quote')}>
              GET A QUOTE
            </button>
          </div>

          <button
            className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            type="button"
          >
            <span className="navbar__hb-line" />
            <span className="navbar__hb-line" />
            <span className="navbar__hb-line" />
          </button>
        </div>
      </nav>

      <div
        className={`navbar__overlay${menuOpen ? ' navbar__overlay--show' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`navbar__drawer${menuOpen ? ' navbar__drawer--open' : ''}`}
        role="dialog" aria-modal="true"
      >
        <div className="navbar__drawer-logo">
          <span className="navbar__drawer-brand">
            <span className="navbar__drawer-brand-master">MASTER</span>
            <span className="navbar__drawer-brand-parttern">PARTTERN</span>
          </span>
          <span className="navbar__drawer-brand-sub">NIG. LTD.</span>
        </div>

        <ul className="navbar__drawer-links">
          {NAV_LINKS.map(({ label, href }, i) => (
            <li key={label}>
              <button
                className={`navbar__drawer-link${activeLink === label ? ' navbar__drawer-link--active' : ''}`}
                onClick={() => go(href)}
                style={{ transitionDelay: menuOpen ? `${i * 45}ms` : '0ms' }}
                type="button"
              >
                <span className="navbar__drawer-num">{String(i + 1).padStart(2, '0')}</span>
                {label.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>

        <div className="navbar__drawer-footer">
          <a href="tel:08038159214" className="navbar__drawer-tel">08038159214</a>
          <button className="navbar__cta navbar__cta--full" type="button"
            onClick={() => go('/quote')}>
            GET A QUOTE
          </button>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
