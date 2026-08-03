import React from 'react';
import { projects } from '../data/resume';
import './Projects.css';

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="glow-orb projects__orb" />
      <div className="container projects__inner">
        
        <div className="projects__header">
          <span className="section-label">My Work</span>
          <h2 className="section-title projects__title">
            Featured <span className="projects__title-accent">Projects</span>
          </h2>
          <p className="projects__subtitle">
            A showcase of my systems development alongside creative layouts built using Canva.
          </p>
        </div>

        <div className="projects__grid">
          {projects.map((project, index) => (
            <div key={index} className="project__card">
              <div className="project__card-content">
                <span className={`project__type-badge project__type-${project.type}`}>
                  {project.type === 'github' ? '💻 GitHub App' : '🎨 Canva Layout'}
                </span>
                
                <h3 className="project__card-title">{project.title}</h3>
                <p className="project__card-desc">{project.description}</p>
                
                <div className="project__tags">
                  {project.tags.map((tag, tIndex) => (
                    <span 
                      key={tIndex} 
                      className={`project__tag-badge project__tag-${tag.category}`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>

                {project.link !== '#' && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project__link-btn"
                  >
                    View Project Assets
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}