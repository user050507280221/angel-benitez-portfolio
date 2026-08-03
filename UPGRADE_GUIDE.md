# Portfolio Upgrade — Integration Guide

## 1. Drop in the new files
Copy into your project, preserving structure:
```
src/context/ThemeContext.jsx
src/components/ThemeSwitcher.jsx + .css
src/components/ScrollVideoScrubber.jsx + .css
src/components/CustomCursor.jsx + .css
src/components/ScrollIndicator.jsx + .css
src/hooks/useMicroInteractions.js
src/polish.css
```
Replace `src/main.jsx` and `src/App.jsx` with the updated versions provided (or merge the diffs manually — both just add the new providers/components around your existing tree).

In `main.jsx`, import `polish.css` after `index.css`:
```js
import './index.css'
import './polish.css'
```

## 2. Theme switcher — how it works
`ThemeProvider` writes each palette's CSS custom properties directly onto `<html>` at runtime (`--accent`, `--accent-bright`, `--accent-glow`, `--border-accent`, `--accent-cyan`, `--accent-pink`), and persists the choice in `localStorage`. Because every component already reads these variables (you built it that way — nice), **no component CSS needs to change**. The floating dot in the bottom-left expands into 4 swatches: Neon Green, Electric Cyan, Royal Purple, Sunset Amber.

To add a 5th palette later, just add one entry to the `themes` object in `ThemeContext.jsx`.

## 3. Scroll-scrubbed reel
True frame-accurate video scrubbing isn't reliable across browsers (`video.currentTime` seeks lag on Safari/mobile), so `ScrollVideoScrubber` uses the same technique Apple's product pages use: a pre-extracted image sequence drawn to `<canvas>`, with the active frame chosen by scroll progress through a pinned (`position: sticky`) section.

Extract frames from any screen recording of a project demo:
```bash
ffmpeg -i reel.mp4 -vf "fps=24,scale=1280:-1" public/reel-frames/frame_%03d.webp
```
Then drop the component in wherever you want a cinematic beat (commented example already sits between Experience and Projects in `App.jsx`). 60–120 frames is usually enough for a smooth 3–5 second scrub across ~3000px of scroll.

If you'd rather scrub an actual `<video>` element for a quick prototype, this is the minimal version (accept the seek lag as a tradeoff):
```jsx
const videoRef = useRef(null);
useEffect(() => {
  const onScroll = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = v.parentElement.getBoundingClientRect();
    const pct = Math.min(Math.max(-rect.top / (rect.height - window.innerHeight), 0), 1);
    v.currentTime = pct * v.duration;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}, []);
```

## 4. Custom cursor & scroll indicator
- `CustomCursor` only activates on fine-pointer (mouse/trackpad) devices — it's a no-op on touch, so mobile is untouched.
- `ScrollIndicator` sits bottom-right: a down arrow invites exploration near the hero, flips to an up arrow once you've scrolled past it, and the ring around it fills with total page progress.
- Both respect `prefers-reduced-motion` via `polish.css`.

## 5. Section-by-section polish notes

**Hero** — Already strong (typed role, floating chips, stat bar). Pair it with the reel or keep it static; don't stack both a busy avatar animation *and* a scroll-scrubbed reel directly beneath it, let one be the "wow" moment per screen.

**About** — Timeline works well. Consider a `useTilt` on nothing here — this section should read calmly; save motion for cards below.

**Services** — Add `data-tilt` + `useTilt(4)` to `.service-card` for a subtle depth cue on hover (small `maxDeg` — this is a content card, not a hero object). The sheen sweep in `polish.css` already layers on automatically.

**Experience** — Tabs are solid. One addition: animate the `.exp__detail` content with a short fade/slide (60ms) when `active` changes, so switching roles doesn't feel like a hard cut:
```jsx
<div key={active} className="exp__detail animate-fadeUp">
```
(the `key={active}` forces React to remount and replay the animation).

**Projects** — Add `data-tilt` + `useTilt(5)` to `.project__card`. Since these are your strongest portfolio evidence, this is the section most worth the scroll-reel treatment if you only add it once.

**Skills** — Keep static; a toolkit list benefits from being scannable, not animated. Hover states you already have (`scale(1.04)`) are enough.

**Contact** — Wrap the submit button in `useMagnetic(0.25)` — small, professional nudge, not a gimmick. Keep the success/sending states as-is, they're clear.

**Hire Me (nav CTA)** — Give it `data-magnetic` + `useMagnetic(0.3)` too; it's the one button you want to feel the most alive since it's the conversion target.

## 6. Mobile responsiveness checklist
- `CustomCursor` — auto-disabled, no work needed.
- `ThemeSwitcher` / `ScrollIndicator` — both already have `@media (max-width: 640px)` size/position adjustments.
- `ScrollVideoScrubber` — test frame count on 4G; consider serving a shorter frame set (e.g., every 2nd frame) below 768px via a `frameUrlBuilder` that checks `window.innerWidth`.
- Tilt/magnetic hooks — both bail out automatically on `(pointer: coarse)`, so touch devices get plain hover-free cards, which is correct (no ghost `:hover` states stuck on after tap).
