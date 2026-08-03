import React, { useEffect, useRef, useState } from 'react';
import './ScrollIndicator.css';

/**
 * Fixed bottom-right control. Arrow points down (explore) while near the
 * top of the page and flips to point up (back to top) once you've
 * scrolled past the hero — the ring fills as you move through the page.
 */
export default function ScrollIndicator({ topTargetId = 'hero', nextSectionId = 'about' }) {
  const [progress, setProgress] = useState(0);
  const [atTop, setAtTop] = useState(true);
  const tickingRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, y / max) : 0);
        setAtTop(y < window.innerHeight * 0.6);
        tickingRef.current = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    if (atTop) {
      document.getElementById(nextSectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.getElementById(topTargetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const circumference = 2 * Math.PI * 20;
  const offset = circumference * (1 - progress);

  return (
    <button
      className={`scroll-indicator ${atTop ? '' : 'scroll-indicator--flipped'}`}
      onClick={handleClick}
      aria-label={atTop ? 'Scroll to content' : 'Back to top'}
    >
      <svg width="48" height="48" viewBox="0 0 48 48" className="scroll-indicator__ring">
        <circle cx="24" cy="24" r="20" className="scroll-indicator__track" />
        <circle
          cx="24"
          cy="24"
          r="20"
          className="scroll-indicator__fill"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        className="scroll-indicator__arrow"
      >
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
    </button>
  );
}
