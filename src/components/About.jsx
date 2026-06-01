import React from 'react';
import { personal, education, languages } from '../data/resume';
import './About.css';

export default function About() {
  return (
    <section id="about" className="about">
      <div className="glow-orb about__orb" />
      <div className="container about__inner">

        {/* Left: intro text */}
        <div className="about__text">
          <span className="section-label">About Me</span>
          <h2 className="section-title about__title">
            A Passionate<br />
            <span className="about__title-accent">IT Student</span>
          </h2>
          <p className="about__bio">{personal.bio}</p>

          <div className="about__info-grid">
            <div className="about__info-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              <span>{personal.phone}</span>
            </div>
            <div className="about__info-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <a href={`mailto:${personal.email}`}>{personal.email}</a>
            </div>
            <div className="about__info-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>{personal.address}</span>
            </div>
          </div>

          <div className="about__langs">
            <span className="about__langs-label">Languages:</span>
            {languages.map(l => (
              <span key={l} className="about__lang-badge">{l}</span>
            ))}
          </div>
        </div>

        {/* Right: education timeline */}
        <div className="about__education">
          <span className="section-label">Education</span>
          <div className="edu__timeline">
            {education.map((ed, i) => (
              <div key={i} className="edu__item">
                <div className="edu__dot-line">
                  <div className="edu__dot" />
                  {i < education.length - 1 && <div className="edu__line" />}
                </div>
                <div className="edu__content">
                  <span className="edu__level">{ed.level}</span>
                  <h4 className="edu__degree">{ed.degree}</h4>
                  <p className="edu__school">{ed.school}</p>
                  <span className="edu__period">{ed.period}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
