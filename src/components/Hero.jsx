import React, { useState, useEffect } from 'react';
import { personal, stats } from '../data/resume';
import './Hero.css';

const roles = ["IT Student Assistant", "Graphic Designer", "Quick Learner", "Tech Support"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 45);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((roleIndex + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <section id="hero" className="hero">
      {/* Ambient background orbs */}
      <div className="glow-orb hero__orb hero__orb--1" />
      <div className="glow-orb hero__orb hero__orb--2" />
      <div className="hero__grid-bg" />

      <div className="container hero__inner">
        {/* Left: text content */}
        <div className="hero__content">
          <div className="hero__badge animate-fadeUp" style={{ animationDelay: '0.1s' }}>
            <span className="hero__badge-dot" />
            <span>Available for opportunities</span>
          </div>

          <h1 className="hero__name animate-fadeUp" style={{ animationDelay: '0.2s' }}>
            Hi, I'm<br />
            <span className="hero__name-accent">{personal.name}</span>
          </h1>

          <div className="hero__role animate-fadeUp" style={{ animationDelay: '0.35s' }}>
            <span className="hero__role-static">A </span>
            <span className="hero__role-typed">{displayed}</span>
            <span className="hero__cursor">|</span>
          </div>

          <p className="hero__bio animate-fadeUp" style={{ animationDelay: '0.5s' }}>
            {personal.title} at Global Reciprocal Colleges. Passionate about tech support,
            graphic design, and building real-world skills through every role I take on.
          </p>

          <div className="hero__actions animate-fadeUp" style={{ animationDelay: '0.65s' }}>
            <a href="#contact" className="btn-primary">
              <span>Get In Touch</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#experience" className="btn-outline">View My Work</a>
          </div>

          <div className="hero__socials animate-fadeUp" style={{ animationDelay: '0.75s' }}>
            <span className="hero__socials-label">Find me on</span>
            <div className="hero__social-links">
              {/* GitHub Link - Opens in a new tab */}
              <a 
                href="https://github.com/user050507280221" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hero__social-btn" 
                aria-label="GitHub"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>

              {/* Indeed Link - Opens in a new tab */}
              <a 
                href="https://ph.indeed.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hero__social-btn" 
                aria-label="Indeed"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>

              {/* Email Link - Opens local mail client (no target="_blank" needed here) */}
              <a href={`mailto:${personal.email}`} className="hero__social-btn" aria-label="Email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right: avatar visual */}
        <div className="hero__visual animate-fadeUp" style={{ animationDelay: '0.4s' }}>
          <div className="hero__avatar-ring hero__avatar-ring--outer" />
          <div className="hero__avatar-ring hero__avatar-ring--inner" />
          <div className="hero__avatar-wrapper animate-float">
            {/* Direct profile image delivery linked straight from your GitHub asset hub */}
            <img 
             src="/src/assets/ID.png" 
              alt="Angel Benitez" 
              className="hero__avatar-img" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                borderRadius: '50%',
                display: 'block'
              }} 
            />
          </div>

          {/* Floating chips */}
          <div className="hero__chip hero__chip--1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01z"/></svg>
            IT Support
          </div>
          <div className="hero__chip hero__chip--2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
            Canva Design
          </div>
          <div className="hero__chip hero__chip--3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff6b9d" strokeWidth="2.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.58-7 8-7s8 3 8 7"/></svg>
            Class President
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="hero__stats">
        <div className="container hero__stats-inner">
          {stats.map((s, i) => (
            <div key={i} className="hero__stat">
              <span className="hero__stat-value">{s.value}</span>
              <span className="hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}