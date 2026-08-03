import React from 'react';
import { personal } from '../data/resume';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#hero" className="navbar__logo footer__logo">
            <span className="logo-dot" style={{ width: 8, height: 8 }} />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem' }}>
              Angel<span style={{ color: 'var(--accent)' }}>.</span>
            </span>
          </a>
          <p className="footer__tagline">{personal.title} · Caloocan City, PH</p>
        </div>

        <div className="footer__links">
          {/* 👑 Added '#projects' and 'Projects' to both tracking arrays below */}
          {['#hero','#about','#services','#experience', '#projects', '#skills','#contact'].map((href, i) => {
            const labels = ['Home','About','Services','Experience', 'Projects', 'Skills','Contact'];
            return (
              <a key={href} href={href} className="footer__link">{labels[i]}</a>
            );
          })}
        </div>

        <p className="footer__copy">© {year} Angel Benitez. Crafted with care.</p>
      </div>
    </footer>
  );
}