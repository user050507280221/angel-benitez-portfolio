import React, { useEffect, useRef, useState } from 'react';
import './ScrollVideoScrubber.css';

/**
 * Scroll-scrubbed image-sequence player (the technique Apple product pages use —
 * a real <video> is NOT scrubbed frame-accurately across browsers, so the
 * reliable version pre-extracts frames and draws whichever one matches
 * scroll progress onto a <canvas>).
 *
 * How to get frames from an existing project reel / screen recording:
 *   ffmpeg -i reel.mp4 -vf "fps=24,scale=1280:-1" frames/frame_%03d.webp
 *
 * Usage:
 *   <ScrollVideoScrubber
 *     frameCount={90}
 *     frameUrlBuilder={(i) => `/reel-frames/frame_${String(i + 1).padStart(3, '0')}.webp`}
 *     scrollHeight={3200}
 *     caption="Watch the dashboard build itself"
 *   />
 */
export default function ScrollVideoScrubber({
  frameUrlBuilder,
  frameCount,
  scrollHeight = 3000,
  caption,
}) {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(-1);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    const scale = Math.max(width / img.width, height / img.height);
    const x = (width - img.width * scale) / 2;
    const y = (height - img.height * scale) / 2;
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  // Preload every frame up front so scrubbing never shows a blank frame.
  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    const images = new Array(frameCount);

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = frameUrlBuilder(i);
      img.onload = img.onerror = () => {
        loadedCount++;
        if (loadedCount === frameCount && !cancelled) setLoaded(true);
      };
      images[i] = img;
    }
    imagesRef.current = images;

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameCount]);

  // Handle canvas sizing (device-pixel-ratio aware)
  useEffect(() => {
    const canvas = canvasRef.current;
    const resize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      if (currentFrameRef.current >= 0) drawFrame(currentFrameRef.current);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [loaded]);

  // Tie the active frame to scroll progress through the pinned section
  useEffect(() => {
    if (!loaded) return;
    let rafId = null;

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const wrapper = wrapperRef.current;
        if (!wrapper) return;
        const rect = wrapper.getBoundingClientRect();
        const total = wrapper.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 0));
        const pct = total > 0 ? scrolled / total : 0;
        setProgress(pct);

        const frameIndex = Math.min(frameCount - 1, Math.floor(pct * frameCount));
        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [loaded, frameCount]);

  return (
    <div ref={wrapperRef} className="scroll-scrubber" style={{ height: `${scrollHeight}px` }}>
      <div className="scroll-scrubber__sticky">
        <canvas ref={canvasRef} className="scroll-scrubber__canvas" />

        {!loaded && (
          <div className="scroll-scrubber__loading">
            <span className="scroll-scrubber__spinner" />
            <span>Loading reel…</span>
          </div>
        )}

        {caption && (
          <div className="scroll-scrubber__caption">
            <p>{caption}</p>
          </div>
        )}

        <div className="scroll-scrubber__progress-track">
          <div
            className="scroll-scrubber__progress-fill"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
