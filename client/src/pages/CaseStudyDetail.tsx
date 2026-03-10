import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectBySlug, type Project } from "../data/projects";
import SEO from "../components/SEO";

// ─── Slide config ─────────────────────────────────────────────────────────────

const SLIDES = [
  { id: "cover", label: "Overview" },
  { id: "purpose", label: "Purpose" },
  { id: "tech", label: "Stack" },
  { id: "uniqueness", label: "Approach" },
  { id: "impact", label: "Impact" },
] as const;

type SlideId = typeof SLIDES[number]["id"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

// ─── Slide content renderers ──────────────────────────────────────────────────

function CoverSlide({ project, animKey }: { project: Project; animKey: number }) {
  return (
    <div className="csd-slide-content csd-cover" key={animKey}>
      <div className="csd-cover-eyebrow">
        <span className="csd-cover-cat-dot" />
        {project.category}
      </div>
      <h1 className="csd-cover-title">
        {project.name.split("").map((char, i) => (
          <span
            key={i}
            className="csd-cover-char"
            style={{ animationDelay: `${i * 0.04}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
      <p className="csd-cover-tagline">{project.tagline}</p>
      <div className="csd-cover-tags">
        {project.techStack.map((t, i) => (
          <span key={t} className="csd-cover-tag" style={{ animationDelay: `${0.3 + i * 0.07}s` }}>{t}</span>
        ))}
      </div>
      <div className="csd-cover-hint">
        <span>Click anywhere on the right to explore</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M6 2l4 5-4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

function PurposeSlide({ project, animKey }: { project: Project; animKey: number }) {
  return (
    <div className="csd-slide-content" key={animKey}>
      <div className="csd-slide-eyebrow">
        <span className="csd-eyebrow-line" />
        The Problem
      </div>
      <h2 className="csd-slide-title csd-stagger-title">Why we built it</h2>
      <p className="csd-slide-body csd-stagger-body">{project.purpose}</p>
    </div>
  );
}

function TechSlide({ project, animKey }: { project: Project; animKey: number }) {
  return (
    <div className="csd-slide-content" key={animKey}>
      <div className="csd-slide-eyebrow">
        <span className="csd-eyebrow-line" />
        Technology
      </div>
      <h2 className="csd-slide-title csd-stagger-title">The Stack</h2>
      <div className="csd-tech-grid">
        {project.techDetails.map((t, i) => (
          <div key={t.name} className="csd-tech-item" style={{ animationDelay: `${0.15 + i * 0.09}s` }}>
            <div className="csd-tech-header">
              <span className="csd-tech-num">0{i + 1}</span>
              <span className="csd-tech-name">{t.name}</span>
            </div>
            <span className="csd-tech-role">{t.role}</span>
            <div className="csd-tech-bar">
              <div className="csd-tech-bar-fill" style={{ animationDelay: `${0.3 + i * 0.09}s` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UniquenessSlide({ project, animKey }: { project: Project; animKey: number }) {
  return (
    <div className="csd-slide-content" key={animKey}>
      <div className="csd-slide-eyebrow">
        <span className="csd-eyebrow-line" />
        Differentiator
      </div>
      <h2 className="csd-slide-title csd-stagger-title">What makes it different</h2>
      <p className="csd-slide-body csd-stagger-body">{project.uniqueness}</p>
    </div>
  );
}

function ImpactSlide({ project, animKey }: { project: Project; animKey: number }) {
  return (
    <div className="csd-slide-content" key={animKey}>
      <div className="csd-slide-eyebrow">
        <span className="csd-eyebrow-line" />
        Outcomes
      </div>
      <h2 className="csd-slide-title csd-stagger-title">The Impact</h2>
      <div className="csd-impact-grid">
        {project.impactDetails.map((item, i) => (
          <div key={i} className="csd-impact-item" style={{ animationDelay: `${0.1 + i * 0.12}s` }}>
            <span className="csd-impact-metric">{item.metric}</span>
            <span className="csd-impact-label">{item.label}</span>
            <div className="csd-impact-rule" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Architecture placeholder ─────────────────────────────────────────────────

function ArchitecturePlaceholder({ project }: { project: Project }) {
  return (
    <div className="csd-arch-placeholder">
      <div className="csd-arch-rings">
        <div className="csd-arch-ring csd-arch-ring-1" style={{ borderColor: project.accentColor + "30" }} />
        <div className="csd-arch-ring csd-arch-ring-2" style={{ borderColor: project.accentColor + "20" }} />
        <div className="csd-arch-ring csd-arch-ring-3" style={{ borderColor: project.accentColor + "10" }} />
        <div className="csd-arch-icon-wrap" style={{ background: project.accentColor + "15", borderColor: project.accentColor + "40" }}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ color: project.accentColor }}>
            <rect x="2" y="13" width="9" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="13" y="2" width="9" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="13" y="24" width="9" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="24" y="13" width="9" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
            <line x1="11" y1="17.5" x2="13" y2="17.5" stroke="currentColor" strokeWidth="1.5" />
            <line x1="17.5" y1="11" x2="17.5" y2="13" stroke="currentColor" strokeWidth="1.5" />
            <line x1="17.5" y1="24" x2="17.5" y2="24" stroke="currentColor" strokeWidth="1.5" />
            <line x1="23" y1="17.5" x2="24" y2="17.5" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="17.5" cy="17.5" r="3" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <h3 className="csd-arch-title">Architecture Diagram</h3>
      <p className="csd-arch-body">
        The interactive system architecture for <strong>{project.name}</strong> will
        be visualised here using React Flow — coming soon.
      </p>
      <div className="csd-arch-badge" style={{ background: project.accentColor + "15", color: project.accentColor, borderColor: project.accentColor + "30" }}>
        React Flow · Interactive · Coming Soon
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = getProjectBySlug(slug ?? "");

  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [archMode, setArchMode] = useState(false);
  const [imgLoaded, setImgLoaded] = useState<boolean[]>([false, false, false, false, false]);
  const [animKey, setAnimKey] = useState(0);

  // Mouse parallax
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number | null>(null);

  // Cursor zone (left=prev, right=next)
  const [cursorZone, setCursorZone] = useState<"left" | "right" | "center">("center");

  // Slide counter visibility
  const [counterVisible, setCounterVisible] = useState(false);
  const counterTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const animTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Preload images
  useEffect(() => {
    if (!project) return;
    project.images.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () =>
        setImgLoaded((prev) => { const n = [...prev]; n[i] = true; return n; });
    });
  }, [project]);

  // ── Smooth mouse tracking via rAF
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const nx = e.clientX / window.innerWidth;
    const ny = e.clientY / window.innerHeight;
    mouseRef.current = { x: nx, y: ny };

    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      setMouse({ x: mouseRef.current.x, y: mouseRef.current.y });
      rafRef.current = null;
    });

    // Cursor zone
    if (nx < 0.25) setCursorZone("left");
    else if (nx > 0.75) setCursorZone("right");
    else setCursorZone("center");
  }, []);

  // ── Navigate
  const goTo = useCallback((index: number) => {
    if (animating) return;
    if (index < 0 || index >= SLIDES.length) return;

    setDirection(index > currentSlide ? "next" : "prev");
    setAnimating(true);
    setPrevSlide(currentSlide);
    setCurrentSlide(index);
    setAnimKey((k) => k + 1);

    // Flash counter
    setCounterVisible(true);
    if (counterTimeout.current) clearTimeout(counterTimeout.current);
    counterTimeout.current = setTimeout(() => setCounterVisible(false), 1800);

    if (animTimeout.current) clearTimeout(animTimeout.current);
    animTimeout.current = setTimeout(() => {
      setAnimating(false);
      setPrevSlide(null);
    }, 600);
  }, [animating, currentSlide]);

  // ── Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goTo(currentSlide + 1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goTo(currentSlide - 1);
      if (e.key === "Escape") navigate(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [currentSlide, animating, goTo, navigate]);

  // ── Click zone handler
  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Ignore clicks on interactive elements
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest(".csd-topbar") || target.closest(".csd-nav-dots")) return;

    const x = e.clientX / window.innerWidth;
    if (x > 0.55) goTo(currentSlide + 1);
    else if (x < 0.45) goTo(currentSlide - 1);
  }, [currentSlide, goTo]);

  if (!project) {
    return (
      <div className="csd-not-found">
        <p>Project not found.</p>
        <button onClick={() => navigate(-1)}>← Go back</button>
      </div>
    );
  }

  const accentRgb = hexToRgb(project.accentColor);
  const bgImage = project.images[currentSlide] ?? project.images[0];
  const prevBgImg = prevSlide !== null ? (project.images[prevSlide] ?? project.images[0]) : null;

  // Parallax offsets
  const px = (mouse.x - 0.5) * 28;
  const py = (mouse.y - 0.5) * 16;
  const px2 = (mouse.x - 0.5) * -14;
  const py2 = (mouse.y - 0.5) * -8;

  const renderSlide = (index: number, key: number) => {
    const id = SLIDES[index].id as SlideId;
    if (id === "cover") return <CoverSlide project={project} animKey={key} />;
    if (id === "purpose") return <PurposeSlide project={project} animKey={key} />;
    if (id === "tech") return <TechSlide project={project} animKey={key} />;
    if (id === "uniqueness") return <UniquenessSlide project={project} animKey={key} />;
    if (id === "impact") return <ImpactSlide project={project} animKey={key} />;
    return null;
  };

  return (
    <>
      <SEO
        title={`${project.name} | Case Study by Canopux`}
        description={project.tagline}
        type="article"
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Root ── */
        .csd-root {
          position: fixed; inset: 0;
          background: #03060F;
          font-family: 'DM Sans', sans-serif;
          --accent: ${project.accentColor};
          --accent-rgb: ${accentRgb};
          --grad-from: ${project.gradientFrom};
          --grad-to: ${project.gradientTo};
          overflow: hidden;
          z-index: 9999;
          cursor: default;
        }
        .csd-root.cursor-left  { cursor: w-resize; }
        .csd-root.cursor-right { cursor: e-resize; }

        /* ── Background ── */
        .csd-bg { position: absolute; inset: 0; z-index: 0; }

        .csd-bg-img {
          position: absolute; inset: -4%;
          background-size: cover; background-position: center;
          transition: opacity 0.8s ease, transform 0.8s ease;
          will-change: transform, opacity;
        }
        .csd-bg-img::after {
          content: '';
          position: absolute; inset: 0;
          background:
            linear-gradient(105deg, rgba(3,6,15,0.94) 30%, rgba(3,6,15,0.6) 75%, rgba(3,6,15,0.4) 100%),
            linear-gradient(to bottom, rgba(3,6,15,0.25) 0%, rgba(3,6,15,0.8) 100%);
        }

        /* Ambient radial glow that follows mouse */
        .csd-bg-glow {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background: radial-gradient(
            ellipse 55% 55% at calc(20% + ${px * 0.5}px) calc(50% + ${py * 0.5}px),
            rgba(var(--accent-rgb), 0.10) 0%,
            transparent 65%
          );
          transition: background 0.15s ease;
        }

        /* Grain overlay */
        .csd-grain {
          position: absolute; inset: 0; z-index: 2; pointer-events: none; opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }

        /* Floating geometric accent — parallax layer */
        .csd-geo {
          position: absolute; z-index: 2; pointer-events: none;
          will-change: transform;
          transition: transform 0.12s ease-out;
        }
        .csd-geo-1 {
          right: 8%;  top: 15%;
          width: 320px; height: 320px;
          border: 1px solid rgba(var(--accent-rgb), 0.08);
          border-radius: 50%;
          transform: translate(${px2 * 1.4}px, ${py2 * 1.4}px);
        }
        .csd-geo-2 {
          right: 12%; top: 20%;
          width: 200px; height: 200px;
          border: 1px solid rgba(var(--accent-rgb), 0.05);
          border-radius: 50%;
          transform: translate(${px2 * 0.8}px, ${py2 * 0.8}px);
        }
        .csd-geo-3 {
          right: 20%; top: 32%;
          width: 80px; height: 80px;
          background: rgba(var(--accent-rgb), 0.04);
          border: 1px solid rgba(var(--accent-rgb), 0.12);
          border-radius: 16px;
          transform: translate(${px2 * 0.5}px, ${py2 * 0.5}px) rotate(${px * 0.5}deg);
        }
        .csd-geo-4 {
          left: 55%; bottom: 20%;
          width: 6px; height: 6px;
          background: var(--accent);
          border-radius: 50%;
          opacity: 0.5;
          transform: translate(${px}px, ${py * 2}px);
          box-shadow: 0 0 20px 4px rgba(var(--accent-rgb), 0.4);
        }
        .csd-geo-5 {
          right: 30%; top: 18%;
          width: 4px; height: 4px;
          background: rgba(255,255,255,0.4);
          border-radius: 50%;
          transform: translate(${px2 * 2}px, ${py2 * 2}px);
        }

        /* ── Top bar ── */
        .csd-topbar {
          position: absolute; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 28px 44px;
          background: linear-gradient(to bottom, rgba(3,6,15,0.7) 0%, transparent 100%);
        }
        .csd-back-btn {
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 500; letter-spacing: 0.04em;
          color: rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 100px; padding: 9px 20px;
          cursor: pointer; transition: all 0.25s ease;
          backdrop-filter: blur(10px);
        }
        .csd-back-btn:hover { color: #fff; background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.18); }

        .csd-topbar-name {
          font-family: 'Sora', sans-serif;
          font-size: 13px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.25);
        }

        .csd-arch-toggle {
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 600; letter-spacing: 0.04em;
          color: var(--accent);
          background: rgba(var(--accent-rgb), 0.08);
          border: 1px solid rgba(var(--accent-rgb), 0.25);
          border-radius: 100px; padding: 9px 20px;
          cursor: pointer; transition: all 0.25s ease;
          backdrop-filter: blur(10px);
          font-family: 'DM Sans', sans-serif;
        }
        .csd-arch-toggle:hover {
          background: rgba(var(--accent-rgb), 0.16);
          border-color: rgba(var(--accent-rgb), 0.45);
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(var(--accent-rgb), 0.2);
        }

        /* ── Side nav dots ── */
        .csd-nav-dots {
          position: absolute; right: 44px; top: 50%;
          transform: translateY(-50%); z-index: 100;
          display: flex; flex-direction: column; gap: 14px; align-items: flex-end;
        }
        .csd-dot-row {
          display: flex; align-items: center; gap: 10px;
          cursor: pointer; transition: all 0.2s ease;
        }
        .csd-dot-row:hover .csd-dot-lbl,
        .csd-dot-row.active .csd-dot-lbl { opacity: 1; transform: translateX(0); }
        .csd-dot-lbl {
          font-size: 10px; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: rgba(255,255,255,0.5);
          opacity: 0; transform: translateX(6px);
          transition: all 0.2s ease;
        }
        .csd-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: rgba(255,255,255,0.2);
          transition: all 0.35s cubic-bezier(0.23,1,0.32,1);
          flex-shrink: 0;
        }
        .csd-dot-row.active .csd-dot {
          background: var(--accent);
          width: 5px; height: 20px; border-radius: 3px;
          box-shadow: 0 0 10px rgba(var(--accent-rgb), 0.9);
        }
        .csd-dot-row:hover .csd-dot { background: rgba(255,255,255,0.5); }

        /* ── Slide counter (auto-hide) ── */
        .csd-counter {
          position: absolute; bottom: 44px; right: 44px; z-index: 100;
          font-family: 'Sora', sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
          color: rgba(255,255,255,0.35);
          display: flex; align-items: center; gap: 8px;
          opacity: 0; transition: opacity 0.4s ease;
        }
        .csd-counter.visible { opacity: 1; }
        .csd-counter:hover   { opacity: 1 !important; }
        .csd-counter-current {
          font-size: 28px; font-weight: 800; letter-spacing: -0.03em;
          color: rgba(255,255,255,0.85); line-height: 1;
        }
        .csd-counter-sep { color: rgba(255,255,255,0.15); font-size: 18px; }
        .csd-counter-total { font-size: 14px; color: rgba(255,255,255,0.25); }

        /* ── Click zones (visual hint on hover) ── */
        .csd-click-zone {
          position: absolute; top: 0; bottom: 0; z-index: 50; width: 22%;
          display: flex; align-items: center;
          opacity: 0; transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .csd-root:hover .csd-click-zone { opacity: 1; }
        .csd-click-zone-left  { left: 0;  justify-content: flex-start; padding-left: 28px;
          background: linear-gradient(to right, rgba(3,6,15,0.3), transparent); }
        .csd-click-zone-right { right: 0; justify-content: flex-end;  padding-right: 28px;
          background: linear-gradient(to left, rgba(3,6,15,0.3), transparent); }
        .csd-zone-arrow {
          width: 44px; height: 44px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.4);
          transition: all 0.25s ease;
        }
        .csd-click-zone:hover .csd-zone-arrow {
          background: rgba(var(--accent-rgb), 0.12);
          border-color: rgba(var(--accent-rgb), 0.35);
          color: var(--accent);
          box-shadow: 0 0 20px rgba(var(--accent-rgb), 0.2);
        }
        /* Disable zones at boundaries */
        .csd-click-zone.disabled { display: none; }

        /* ── Progress bar ── */
        .csd-progress-track {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 100;
          height: 1.5px; background: rgba(255,255,255,0.06);
        }
        .csd-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--grad-from), var(--grad-to));
          transition: width 0.6s cubic-bezier(0.23,1,0.32,1);
          border-radius: 0 2px 2px 0;
          box-shadow: 0 0 8px rgba(var(--accent-rgb), 0.6);
        }

        /* ── Flip ── */
        .csd-flip-wrapper { position: absolute; inset: 0; z-index: 10; perspective: 1600px; }
        .csd-flip-inner {
          width: 100%; height: 100%;
          position: relative; transform-style: preserve-3d;
          transition: transform 0.75s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .csd-flip-inner.flipped { transform: rotateY(180deg); }
        .csd-flip-front, .csd-flip-back {
          position: absolute; inset: 0;
          backface-visibility: hidden; -webkit-backface-visibility: hidden;
        }
        .csd-flip-back {
          transform: rotateY(180deg);
          background: #03060F;
          display: flex; align-items: center; justify-content: center;
        }

        /* ── Stage ── */
        .csd-stage {
          position: absolute; inset: 0;
          display: flex; align-items: center;
          padding: 100px 120px 100px 10%;
          z-index: 10; pointer-events: none;
        }

        /* ── Slide transitions ── */
        /* Enter from right (next) */
        @keyframes enterNext {
          0%   { opacity: 0; transform: scale(0.92) translateX(40px) translateY(8px); filter: blur(4px); }
          100% { opacity: 1; transform: scale(1)    translateX(0)     translateY(0);  filter: blur(0);   }
        }
        /* Enter from left (prev) */
        @keyframes enterPrev {
          0%   { opacity: 0; transform: scale(0.92) translateX(-40px) translateY(8px); filter: blur(4px); }
          100% { opacity: 1; transform: scale(1)    translateX(0)      translateY(0);  filter: blur(0);   }
        }
        /* Exit to left (next) */
        @keyframes exitNext {
          0%   { opacity: 1; transform: scale(1)    translateX(0)      translateY(0);   filter: blur(0);   }
          100% { opacity: 0; transform: scale(1.05) translateX(-30px)  translateY(-6px); filter: blur(3px); }
        }
        /* Exit to right (prev) */
        @keyframes exitPrev {
          0%   { opacity: 1; transform: scale(1)    translateX(0)     translateY(0);   filter: blur(0);   }
          100% { opacity: 0; transform: scale(1.05) translateX(30px)  translateY(-6px); filter: blur(3px); }
        }

        .csd-enter-next { animation: enterNext 0.6s cubic-bezier(0.23,1,0.32,1) forwards; }
        .csd-enter-prev { animation: enterPrev 0.6s cubic-bezier(0.23,1,0.32,1) forwards; }
        .csd-exit-next  { animation: exitNext  0.5s cubic-bezier(0.23,1,0.32,1) forwards; position: absolute; pointer-events: none; }
        .csd-exit-prev  { animation: exitPrev  0.5s cubic-bezier(0.23,1,0.32,1) forwards; position: absolute; pointer-events: none; }

        /* ── Slide content shared ── */
        .csd-slide-content { max-width: 600px; pointer-events: all; }

        .csd-slide-eyebrow {
          display: flex; align-items: center; gap: 10px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--accent);
          margin-bottom: 16px;
        }
        .csd-eyebrow-line {
          display: block; width: 24px; height: 1.5px;
          background: var(--accent); border-radius: 2px;
        }

        .csd-slide-title {
          font-family: 'Sora', sans-serif;
          font-size: clamp(34px, 4.5vw, 56px);
          font-weight: 700; color: #ffffff;
          line-height: 1.08; letter-spacing: -0.025em;
          margin-bottom: 28px;
        }
        .csd-stagger-title {
          animation: staggerUp 0.55s cubic-bezier(0.23,1,0.32,1) 0.08s both;
        }
        .csd-slide-body {
          font-size: 16px; line-height: 1.8;
          color: rgba(255,255,255,0.62); max-width: 520px;
          font-weight: 300;
        }
        .csd-stagger-body {
          animation: staggerUp 0.55s cubic-bezier(0.23,1,0.32,1) 0.16s both;
        }

        @keyframes staggerUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Cover slide ── */
        .csd-cover-eyebrow {
          display: flex; align-items: center; gap: 8px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--accent);
          margin-bottom: 20px;
          animation: staggerUp 0.5s ease 0.05s both;
        }
        .csd-cover-cat-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 8px rgba(var(--accent-rgb), 1);
          animation: dotPulse 2.5s ease-in-out infinite;
        }
        @keyframes dotPulse {
          0%, 100% { box-shadow: 0 0 6px 1px rgba(var(--accent-rgb), 0.8); }
          50%       { box-shadow: 0 0 14px 4px rgba(var(--accent-rgb), 0.4); }
        }
        .csd-cover-title {
          font-family: 'Sora', sans-serif;
          font-size: clamp(58px, 9vw, 100px);
          font-weight: 800; line-height: 0.95;
          letter-spacing: -0.035em;
          margin-bottom: 24px;
          display: block;
        }
        .csd-cover-char {
          display: inline-block;
          background: linear-gradient(140deg, #ffffff 0%, rgba(var(--accent-rgb), 0.75) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 0;
          animation: charIn 0.5s cubic-bezier(0.23,1,0.32,1) forwards;
        }
        @keyframes charIn {
          from { opacity: 0; transform: translateY(20px) skewY(3deg); }
          to   { opacity: 1; transform: translateY(0)    skewY(0);    }
        }
        .csd-cover-tagline {
          font-size: 16px; line-height: 1.7;
          color: rgba(255,255,255,0.55);
          max-width: 460px; margin-bottom: 28px; font-weight: 300;
          animation: staggerUp 0.5s ease 0.28s both;
        }
        .csd-cover-tags {
          display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 36px;
        }
        .csd-cover-tag {
          font-size: 11px; font-weight: 500;
          color: rgba(255,255,255,0.45);
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 5px 13px; border-radius: 6px;
          opacity: 0;
          animation: staggerUp 0.5s cubic-bezier(0.23,1,0.32,1) forwards;
        }
        .csd-cover-hint {
          display: flex; align-items: center; gap: 7px;
          font-size: 11px; color: rgba(255,255,255,0.22);
          animation: staggerUp 0.5s ease 0.5s both;
        }

        /* ── Tech slide ── */
        .csd-tech-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 14px; max-width: 560px;
        }
        .csd-tech-item {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px; padding: 18px 20px;
          opacity: 0; animation: staggerUp 0.5s cubic-bezier(0.23,1,0.32,1) forwards;
          transition: background 0.25s ease, border-color 0.25s ease;
        }
        .csd-tech-item:hover {
          background: rgba(var(--accent-rgb), 0.07);
          border-color: rgba(var(--accent-rgb), 0.2);
        }
        .csd-tech-header {
          display: flex; align-items: center; gap: 8px; margin-bottom: 8px;
        }
        .csd-tech-num {
          font-family: 'Sora', sans-serif; font-size: 10px; font-weight: 700;
          color: rgba(var(--accent-rgb), 0.6); letter-spacing: 0.05em;
        }
        .csd-tech-name {
          font-family: 'Sora', sans-serif; font-size: 15px; font-weight: 700; color: #fff;
        }
        .csd-tech-role { display: block; font-size: 12px; line-height: 1.55; color: rgba(255,255,255,0.45); margin-bottom: 12px; }
        .csd-tech-bar  { height: 2px; background: rgba(255,255,255,0.06); border-radius: 2px; overflow: hidden; }
        .csd-tech-bar-fill {
          height: 100%; width: 0%; border-radius: 2px;
          background: linear-gradient(90deg, var(--grad-from), var(--grad-to));
          animation: barFill 0.8s cubic-bezier(0.23,1,0.32,1) forwards;
        }
        @keyframes barFill {
          from { width: 0%; } to { width: 100%; }
        }

        /* ── Impact slide ── */
        .csd-impact-grid {
          display: flex; flex-direction: column; gap: 0;
        }
        .csd-impact-item {
          padding: 20px 0;
          opacity: 0; animation: staggerUp 0.55s cubic-bezier(0.23,1,0.32,1) forwards;
          position: relative;
        }
        .csd-impact-metric {
          display: block;
          font-family: 'Sora', sans-serif;
          font-size: clamp(44px, 6vw, 72px);
          font-weight: 800; letter-spacing: -0.04em;
          background: linear-gradient(130deg, #fff 30%, var(--accent) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; line-height: 1; margin-bottom: 6px;
        }
        .csd-impact-label { font-size: 14px; color: rgba(255,255,255,0.45); font-weight: 300; }
        .csd-impact-rule {
          position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,0.07), transparent);
        }

        /* ── Architecture placeholder ── */
        .csd-arch-placeholder {
          display: flex; flex-direction: column; align-items: center;
          text-align: center; padding: 48px; max-width: 440px; margin: 0 auto;
        }
        .csd-arch-rings {
          position: relative; width: 120px; height: 120px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 32px;
        }
        .csd-arch-ring {
          position: absolute; border-radius: 50%; border: 1px solid;
          animation: ringPulse 3s ease-in-out infinite;
        }
        .csd-arch-ring-1 { inset: 0; }
        .csd-arch-ring-2 { inset: -20px; animation-delay: 0.5s; }
        .csd-arch-ring-3 { inset: -40px; animation-delay: 1s; }
        @keyframes ringPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(1.03); }
        }
        .csd-arch-icon-wrap {
          width: 64px; height: 64px; border-radius: 18px;
          border: 1px solid; display: flex; align-items: center; justify-content: center;
          position: relative; z-index: 1;
        }
        .csd-arch-title {
          font-family: 'Sora', sans-serif; font-size: 24px; font-weight: 700;
          color: #fff; margin-bottom: 12px;
        }
        .csd-arch-body {
          font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.7; margin-bottom: 24px;
        }
        .csd-arch-body strong { color: rgba(255,255,255,0.75); }
        .csd-arch-badge {
          font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
          padding: 7px 18px; border-radius: 100px; border: 1px solid;
        }

        /* ── Not found ── */
        .csd-not-found {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; height: 100vh; background: #03060F;
          color: #fff; gap: 20px; font-family: 'DM Sans', sans-serif;
        }
        .csd-not-found button {
          background: transparent; border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.5); padding: 10px 24px;
          border-radius: 100px; cursor: pointer; font-size: 14px;
          transition: all 0.2s ease;
        }
        .csd-not-found button:hover { background: rgba(255,255,255,0.06); color: #fff; }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .csd-topbar { padding: 18px 22px; }
          .csd-topbar-name { display: none; }
          .csd-stage { padding: 88px 24px 100px 24px; }
          .csd-nav-dots { display: none; }
          .csd-tech-grid { grid-template-columns: 1fr; }
          .csd-counter { right: 22px; bottom: 28px; }
          .csd-cover-title { font-size: clamp(48px, 12vw, 72px); }
          .csd-geo-1, .csd-geo-2, .csd-geo-3 { display: none; }
        }
      `}</style>

      <div
        className={`csd-root ${cursorZone === "left" ? "cursor-left" : cursorZone === "right" ? "cursor-right" : ""}`}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      >
        {/* ── Background ── */}
        <div className="csd-bg">
          {prevBgImg && (
            <div className="csd-bg-img" style={{ backgroundImage: `url(${prevBgImg})`, opacity: 0 }} />
          )}
          <div
            className="csd-bg-img"
            style={{
              backgroundImage: `url(${bgImage})`,
              opacity: imgLoaded[currentSlide] ? 1 : 0,
              transform: `translate(${px * 0.4}px, ${py * 0.4}px) scale(1.08)`,
            }}
          />
          <div className="csd-bg-glow" />
          <div className="csd-grain" />
        </div>

        {/* ── Geometric parallax elements ── */}
        <div className="csd-geo csd-geo-1" />
        <div className="csd-geo csd-geo-2" />
        <div className="csd-geo csd-geo-3" />
        <div className="csd-geo csd-geo-4" />
        <div className="csd-geo csd-geo-5" />

        {/* ── Click zone hints ── */}
        <div
          className={`csd-click-zone csd-click-zone-left ${currentSlide === 0 ? "disabled" : ""}`}
          onClick={() => goTo(currentSlide - 1)}
          style={{ pointerEvents: currentSlide === 0 ? "none" : "none" }}
        >
          <div className="csd-zone-arrow">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div
          className={`csd-click-zone csd-click-zone-right ${currentSlide === SLIDES.length - 1 ? "disabled" : ""}`}
          onClick={() => goTo(currentSlide + 1)}
          style={{ pointerEvents: currentSlide === SLIDES.length - 1 ? "none" : "none" }}
        >
          <div className="csd-zone-arrow">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* ── Top bar ── */}
        <div className="csd-topbar">
          <button className="csd-back-btn" onClick={() => navigate(-1)}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M9 2L4 6.5 9 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
          <span className="csd-topbar-name">{project.name}</span>
          <button className="csd-arch-toggle" onClick={(e) => { e.stopPropagation(); setArchMode(v => !v); }}>
            {archMode ? (
              <>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M9 2L4 6.5 9 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to Story
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <rect x="1" y="4.5" width="4" height="4" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
                  <rect x="4.5" y="1" width="4" height="4" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
                  <rect x="8" y="4.5" width="4" height="4" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
                  <line x1="6.5" y1="5" x2="6.5" y2="4.5" stroke="currentColor" strokeWidth="1.3" />
                  <line x1="5" y1="6.5" x2="4.5" y2="6.5" stroke="currentColor" strokeWidth="1.3" />
                  <line x1="8" y1="6.5" x2="8" y2="6.5" stroke="currentColor" strokeWidth="1.3" />
                </svg>
                Architecture View
              </>
            )}
          </button>
        </div>

        {/* ── Flip wrapper ── */}
        <div className="csd-flip-wrapper">
          <div className={`csd-flip-inner ${archMode ? "flipped" : ""}`}>

            {/* Front: story */}
            <div className="csd-flip-front">

              {/* Side nav dots */}
              <div className="csd-nav-dots">
                {SLIDES.map((slide, i) => (
                  <div
                    key={slide.id}
                    className={`csd-dot-row ${i === currentSlide ? "active" : ""}`}
                    onClick={(e) => { e.stopPropagation(); goTo(i); }}
                  >
                    <span className="csd-dot-lbl">{slide.label}</span>
                    <span className="csd-dot" />
                  </div>
                ))}
              </div>

              {/* Slide stage */}
              <div className="csd-stage">
                {animating && prevSlide !== null && (
                  <div className={direction === "next" ? "csd-exit-next" : "csd-exit-prev"}>
                    {renderSlide(prevSlide, animKey - 1)}
                  </div>
                )}
                <div className={animating ? (direction === "next" ? "csd-enter-next" : "csd-enter-prev") : ""}>
                  {renderSlide(currentSlide, animKey)}
                </div>
              </div>

              {/* Slide counter (auto-hide) */}
              <div
                className={`csd-counter ${counterVisible ? "visible" : ""}`}
                onMouseEnter={() => setCounterVisible(true)}
                onMouseLeave={() => setCounterVisible(false)}
              >
                <span className="csd-counter-current">{String(currentSlide + 1).padStart(2, "0")}</span>
                <span className="csd-counter-sep">/</span>
                <span className="csd-counter-total">{String(SLIDES.length).padStart(2, "0")}</span>
              </div>

              {/* Progress track */}
              <div className="csd-progress-track">
                <div
                  className="csd-progress-fill"
                  style={{ width: `${((currentSlide + 1) / SLIDES.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Back: architecture */}
            <div className="csd-flip-back">
              {project.architectureComponent
                ? <project.architectureComponent />
                : <ArchitecturePlaceholder project={project} />
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}