import React, { useState, useEffect } from 'react';
import './Navbar.css';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('#hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a href="#hero" className="navbar__logo">
          <span className="logo-dot" />
          <span className="logo-text">Angel<span className="logo-accent">.</span></span>
        </a>

        <nav className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`navbar__link ${active === link.href ? 'navbar__link--active' : ''}`}
              onClick={() => { setActive(link.href); setMenuOpen(false); }}
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary navbar__cta">
            <span>Hire Me</span>
          </a>
        </nav>

        <button
          className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
