import React, { useState } from 'react';
import { experience } from '../data/resume';
import './Experience.css';

export default function Experience() {
  const [active, setActive] = useState(0);

  return (
    <section id="experience" className="experience">
      <div className="glow-orb exp__orb--1" />
      <div className="glow-orb exp__orb--2" />
      <div className="container">
        <div className="experience__header">
          <span className="section-label">My Journey</span>
          <h2 className="section-title">
            Experience &amp; <span className="exp__title-accent">Roles</span>
          </h2>
          <p className="exp__subtitle">
            Every role has shaped my leadership, technical, and creative skills.
          </p>
        </div>

        <div className="experience__layout">
          {/* Tab list */}
          <div className="exp__tabs">
            {experience.map((exp, i) => (
              <button
                key={i}
                className={`exp__tab ${active === i ? 'exp__tab--active' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="exp__tab-role">{exp.role}</span>
                <span className="exp__tab-company">{exp.company}</span>
              </button>
            ))}
          </div>

          {/* Active detail */}
          <div className="exp__detail">
            <div className="exp__detail-header">
              <div>
                <h3 className="exp__detail-role">{experience[active].role}</h3>
                <p className="exp__detail-company">{experience[active].company}</p>
              </div>
              <span className="exp__detail-period">{experience[active].period}</span>
            </div>
            <ul className="exp__bullets">
              {experience[active].bullets.map((b, i) => (
                <li key={i} className="exp__bullet">
                  <span className="exp__bullet-dot" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
