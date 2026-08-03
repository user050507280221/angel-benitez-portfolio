import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isTouch, setIsTouch] = useState(true); // default hidden until we confirm a mouse
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return; // stay hidden on touch devices
    setIsTouch(false);
    document.body.classList.add('cursor-none');

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { ...pos };
    let rafId;

    const onMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }
    };

    const animateRing = () => {
      ring.x += (pos.x - ring.x) * 0.18;
      ring.y += (pos.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }
      rafId = requestAnimationFrame(animateRing);
    };
    animateRing();

    const onOver = (e) => {
      const interactive = e.target.closest('a, button, input, textarea, [data-cursor-hover]');
      setHovering(!!interactive);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(rafId);
      document.body.classList.remove('cursor-none');
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div ref={dotRef} className="custom-cursor__dot" />
      <div
        ref={ringRef}
        className={`custom-cursor__ring ${hovering ? 'custom-cursor__ring--hover' : ''}`}
      />
    </>
  );
}
