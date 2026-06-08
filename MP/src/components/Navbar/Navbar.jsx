import React, { useState, useEffect, useCallback } from 'react';
import MPLogo from '../../assets/MP logo.png';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home',            href: '#home'          },
  { label: 'About Us',        href: '#about'         },
  { label: 'Services',        href: '#services'      },
  { label: 'Projects',        href: '#projects'      },
  { label: 'Health & Safety', href: '#health-safety' },
  { label: 'Contact',         href: '#contact'       },
];

const Navbar = () => {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 30);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleLinkClick = (label) => {
    setActiveLink(label);
    setMenuOpen(false);
  };

  return (
    <>
      {/* ══════════════════════ NAVBAR ══════════════════════ */}
      <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>

        <div className="navbar__top-bar" aria-hidden="true" />

        <div className="navbar__inner">

          {/* ── Logo image from assets ── */}
          <a href="#home" className="navbar__logo-wrap" onClick={() => handleLinkClick('Home')}>
            <img
              src={MPLogo}
              alt="Masterpattern Nig. Ltd."
              className="navbar__logo-img"
            />
          </a>

          {/* ── Desktop links (CSS hides on mobile) ── */}
          <ul className="navbar__links">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className={`navbar__link${activeLink === label ? ' navbar__link--active' : ''}`}
                  onClick={() => handleLinkClick(label)}
                >
                  {label.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>

          {/* ── Desktop right: phone + CTA (CSS hides on mobile) ── */}
          <div className="navbar__right">
            <span className="navbar__tel">
              CALL:&nbsp;<strong>08038159214</strong>
            </span>
            <button className="navbar__cta" type="button">GET A QUOTE</button>
          </div>

          {/* ── Hamburger (CSS hides on desktop) ── */}
          <button
            className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen((o) => !o)}
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

      {/* ═══════════════════ MOBILE OVERLAY ════════════════ */}
      <div
        className={`navbar__overlay${menuOpen ? ' navbar__overlay--show' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* ════════════════════ MOBILE DRAWER ════════════════ */}
      <aside
        className={`navbar__drawer${menuOpen ? ' navbar__drawer--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Drawer text logo — MASTER navy, PARTTERN red */}
        <div className="navbar__drawer-logo">
          <span className="navbar__drawer-brand">
            <span className="navbar__drawer-brand-master">MASTER</span>
            <span className="navbar__drawer-brand-parttern">PARTTERN</span>
          </span>
          <span className="navbar__drawer-brand-sub">NIG. LTD.</span>
        </div>

        {/* Drawer links */}
        <ul className="navbar__drawer-links">
          {NAV_LINKS.map(({ label, href }, i) => (
            <li key={label}>
              <a
                href={href}
                className={`navbar__drawer-link${activeLink === label ? ' navbar__drawer-link--active' : ''}`}
                onClick={() => handleLinkClick(label)}
                style={{ transitionDelay: menuOpen ? `${i * 45}ms` : '0ms' }}
              >
                <span className="navbar__drawer-num">{String(i + 1).padStart(2, '0')}</span>
                {label.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>

        {/* Drawer footer */}
        <div className="navbar__drawer-footer">
          <a href="tel:08038159214" className="navbar__drawer-tel">08038159214</a>
          <button className="navbar__cta navbar__cta--full" type="button">
            GET A QUOTE
          </button>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
