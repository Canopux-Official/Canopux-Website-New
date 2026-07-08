import { useState, useEffect, useRef } from "react";
import '../styles/HeroSection.css'

type Particle = {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  alpha: number
  color: string
}

/* ─── tiny particle hook ─── */
function useParticles(count = 55) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);
  const particles = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      alpha: Math.random() * 0.5 + 0.15,
      color: Math.random() > 0.5 ? "156,187,203" : "92,122,138",
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pts = particles.current;

      // draw connection lines
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(156,187,203,${0.04 * (1 - d / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return ref;
}


const AUDIENCE_WORDS = [
  "Startups",
  "Founders",
  "Enterprises",
  "Creators",
  "Brands",
];

export default function HeroSection() {
  const canvasRef = useParticles(60);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [activeService, setActiveService] = useState(0);
  const [audienceIndex, setAudienceIndex] = useState(0);
  const [audienceVisible, setAudienceVisible] = useState(true);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const t = setInterval(() => setActiveService(p => (p + 1) % 4), 2600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAudienceVisible(false);
      window.setTimeout(() => {
        setAudienceIndex((index) => (index + 1) % AUDIENCE_WORDS.length);
        setAudienceVisible(true);
      }, 320);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const r = heroRef.current.getBoundingClientRect();
      setMouse({
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top) / r.height,
      });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const scrollToContact = () => {
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    { label: "React", color: "#5F86A5" },
    { label: "Next.js", color: "#5F86A5" },
    { label: "NestJS", color: "#5F86A5" },
    { label: "Python", color: "#5F86A5" },
    { label: "AWS", color: "#5F86A5" },
  ];

  const px = (mouse.x - 0.5) * 22;
  const py = (mouse.y - 0.5) * 14;

  return (
    <>

      <section
        id="home"
        className="hero"
        ref={heroRef}
        aria-label="Hero section introducing Canopux web development AI and cloud services"
      >        {/* Canvas particles */}

        <p className="sr-only">
          Web development services, AI solutions, mobile app development and cloud engineering by Canopux.
        </p>
        <canvas
          className="hero-canvas"
          ref={canvasRef}
          aria-hidden="true"
        />
        {/* Blobs */}
        <div className="blob blob-1" style={{ transform: `translate(${px * 0.4}px, ${py * 0.3}px)` }} />
        <div className="blob blob-2" style={{ transform: `translate(${-px * 0.3}px, ${-py * 0.2}px)` }} />
        <div className="blob blob-3" />
        <div className="hero-grid" />

        {/* Decorative SVG hex behind headline */}
        <svg className="hex-bg" viewBox="0 0 700 700" fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{ transform: `translate(-50%,-50%) translate(${px * 0.15}px, ${py * 0.1}px)` }}>
          <polygon points="350,40 630,198 630,514 350,672 70,514 70,198"
            stroke="url(#hexG1)" strokeWidth="1" fill="none" strokeDasharray="6 10" opacity="0.4" />
          <polygon points="350,110 568,230 568,470 350,590 132,470 132,230"
            stroke="url(#hexG2)" strokeWidth="0.8" fill="none" opacity="0.25" />
          <polygon points="350,180 506,262 506,426 350,508 194,426 194,262"
            stroke="url(#hexG1)" strokeWidth="0.6" fill="none" opacity="0.15" />
          {/* Corner glow dots */}
          {[[350, 40], [630, 198], [630, 514], [350, 672], [70, 514], [70, 198]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="5" fill={i % 2 === 0 ? "#5F86A5" : "#5F86A5"} opacity="0.28" />
          ))}
          <defs>
            <linearGradient id="hexG1" x1="0" y1="0" x2="700" y2="700" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#5F86A5" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#5F86A5" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="hexG2" x1="700" y1="0" x2="0" y2="700" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#5F86A5" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#5F86A5" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>

        {/* ── MAIN CONTENT ── */}
        <div className="hero-body">

          {/* Headline */}
          <div className="headline-wrap">
            <p className="h-pre">
              <span className="h-pre-fixed">Powering</span>
              <span
                className="h-pre-rotator"
                aria-live="polite"
                aria-atomic="true"
              >
                <span
                  className={`h-pre-word${audienceVisible ? " is-visible" : " is-hidden"}`}
                >
                  {AUDIENCE_WORDS[audienceIndex]}
                </span>
              </span>
            </p>
            <h1 className="h-main">
              We Build{" "}
              <span className="word-grad">Digital Products</span>
            </h1>
            <span className="h-sub-line h-love-word">That People Actually Love!</span>
          </div>

          {/* Description */}
          <p className="hero-desc">
            We design, build, and scale software that solves real business problems—from AI-powered platforms to modern web applications and enterprise systems.
          </p>

          {/* CTAs */}
          <div className="cta-wrap">
            <a
              href="#contact"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                scrollToContact();
              }}
            >              <span>
                Start Your Project
                <span className="btn-arrow">→</span>
              </span>
            </a>
          </div>

          {/* Service tabs */}
          <div className="service-tabs">
            {services.map((s, i) => (
              <button
                key={i}
                className={`svc-tab${activeService === i ? " active" : ""}`}
                onClick={() => setActiveService(i)}
                onMouseEnter={() => setActiveService(i)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

      </section>
    </>
  );
}