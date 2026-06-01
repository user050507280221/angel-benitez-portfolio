import React from 'react';
import { skills } from '../data/resume';
import './Skills.css';

const categoryColors = {
  technical: { bg: 'rgba(108,99,255,0.12)', border: 'rgba(108,99,255,0.35)', text: '#8b85ff' },
  creative:  { bg: 'rgba(0,212,255,0.1)',   border: 'rgba(0,212,255,0.3)',   text: '#00d4ff' },
  soft:      { bg: 'rgba(255,107,157,0.1)', border: 'rgba(255,107,157,0.3)', text: '#ff6b9d' },
};

const categoryIcons = {
  technical: '⚙️',
  creative:  '🎨',
  soft:      '💡',
};

const categoryLabels = {
  technical: 'Technical',
  creative:  'Creative',
  soft:      'Soft Skills',
};

const grouped = skills.reduce((acc, s) => {
  if (!acc[s.category]) acc[s.category] = [];
  acc[s.category].push(s);
  return acc;
}, {});

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="glow-orb skills__orb" />
      <div className="container">
        <div className="skills__header">
          <span className="section-label">My Toolkit</span>
          <h2 className="section-title">
            Skills &amp; <span className="skills__title-accent">Competencies</span>
          </h2>
          <p className="skills__subtitle">
            A versatile blend of technical know-how, creative tools, and people skills.
          </p>
        </div>

        <div className="skills__categories">
          {Object.entries(grouped).map(([category, items]) => {
            const c = categoryColors[category];
            return (
              <div key={category} className="skills__category-block">
                <div className="skills__cat-header">
                  <span className="skills__cat-icon">{categoryIcons[category]}</span>
                  <h3 className="skills__cat-label">{categoryLabels[category]}</h3>
                  <span
                    className="skills__cat-count"
                    style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
                  >
                    {items.length}
                  </span>
                </div>
                <div className="skills__tags">
                  {items.map((skill, i) => (
                    <span
                      key={i}
                      className="skill-tag"
                      style={{
                        background: c.bg,
                        border: `1px solid ${c.border}`,
                        color: c.text,
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
