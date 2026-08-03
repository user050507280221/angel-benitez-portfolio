import { useEffect, useRef } from 'react';

/**
 * Subtle 3D tilt that follows the pointer. Attach the returned ref to any
 * element that has `data-tilt` in its className/attributes (see polish.css).
 *   const tiltRef = useTilt();
 *   <div ref={tiltRef} data-tilt className="service-card">...</div>
 */
export function useTilt(maxDeg = 6) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(700px) rotateX(${-py * maxDeg}deg) rotateY(${px * maxDeg}deg) translateY(-2px)`;
    };
    const onLeave = () => {
      el.style.transform = 'perspective(700px) rotateX(0) rotateY(0)';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [maxDeg]);

  return ref;
}

/**
 * Nudges a button toward the cursor within a small radius, snapping back on leave.
 *   const magneticRef = useMagnetic();
 *   <a ref={magneticRef} data-magnetic className="btn-primary">...</a>
 */
export function useMagnetic(strength = 0.35) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const onLeave = () => {
      el.style.transform = 'translate(0, 0)';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  return ref;
}
