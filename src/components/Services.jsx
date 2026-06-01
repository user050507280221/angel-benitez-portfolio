import React from 'react';
import { services } from '../data/resume';
import './Services.css';

export default function Services() {
  return (
    <section id="services" className="services">
      <div className="glow-orb services__orb" />
      <div className="container">
        <div className="services__header">
          <span className="section-label">What I Do</span>
          <h2 className="section-title">What I Provide <span className="services__title-accent">For You</span></h2>
          <p className="services__subtitle">
            From technical support to creative design, I bring dedication and adaptability to every role.
          </p>
        </div>

        <div className="services__grid">
          {services.map((svc, i) => (
            <div key={i} className="service-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="service-card__icon">{svc.icon}</div>
              <div className="service-card__line" />
              <h3 className="service-card__title">{svc.title}</h3>
              <p className="service-card__desc">{svc.desc}</p>
              <div className="service-card__arrow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
