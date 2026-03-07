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
      color: Math.random() > 0.5 ? "45,212,191" : "59,130,246",
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
            ctx.strokeStyle = `rgba(59,130,246,${0.06 * (1 - d / 110)})`;
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


export default function HeroSection() {
  const canvasRef = useParticles(60);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [activeService, setActiveService] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const t = setInterval(() => setActiveService(p => (p + 1) % 4), 2600);
    return () => clearInterval(t);
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

const scrollToCaseStudies = () => {
  const section = document.getElementById("case-studies");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};
  const services = [
    { icon: "🌐", label: "Web Development", color: "#2dd4bf" },
    { icon: "🤖", label: "AI & ML", color: "#3b82f6" },
    { icon: "📱", label: "App Development", color: "#6366f1" },
    { icon: "☁️", label: "Cloud & DevOps", color: "#2dd4bf" },
  ];

  const px = (mouse.x - 0.5) * 22;
  const py = (mouse.y - 0.5) * 14;

  return (
    <>

      <section id="home" className="hero" ref={heroRef} >
        {/* Canvas particles */}
        <canvas className="hero-canvas" ref={canvasRef} />

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
            <circle key={i} cx={cx} cy={cy} r="5" fill={i % 2 === 0 ? "#2dd4bf" : "#3b82f6"} opacity="0.35" />
          ))}
          <defs>
            <linearGradient id="hexG1" x1="0" y1="0" x2="700" y2="700" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="hexG2" x1="700" y1="0" x2="0" y2="700" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>

        {/* ── FLOATING GLASS CARDS ── */}
        <div className="float-card fc-left" style={{ transform: `translate(${-px * 0.3}px, ${-py * 0.25}px)` }}>
          <div className="fc-title"><span className="fc-title-dot" />Performance</div>
          <div className="fc-value">99.97%</div>
          <div className="fc-bar-bg"><div className="fc-bar-fill" /></div>
          <div style={{ fontSize: "0.68rem", color: "#94a3b8", marginTop: "6px" }}>Platform uptime SLA</div>
        </div>

        <div className="float-card fc-right" style={{ transform: `translate(${px * 0.35}px, ${py * 0.2}px)` }}>
          <div className="fc-title"><span className="fc-title-dot" />Activity</div>
          <div className="fc-pulse-row">
            {["fc-pb-1", "fc-pb-2", "fc-pb-3", "fc-pb-4", "fc-pb-5", "fc-pb-6"].map(c => (
              <div key={c} className={`fc-pulse-bar ${c}`} />
            ))}
          </div>
          <div className="fc-tag-row" style={{ marginTop: "10px" }}>
            <span className="fc-tag">Websites</span>
            <span className="fc-tag">App</span>
            <span className="fc-tag">AI/ML</span>
          </div>
        </div>

        <div className="float-card fc-top" style={{ transform: `translate(${px * 0.2}px, ${-py * 0.3}px)` }}>
          <div className="fc-title"><span className="fc-title-dot" />Client Rating</div>
          <div className="fc-number">4.9 ★</div>
          <div className="fc-online">Based on 60+ reviews</div>
          <div className="fc-online">12 online now</div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="hero-body">

          {/* Status pill */}
          <div className="status-pill">
            <div className="pill-dot-wrap"><div className="pill-dot" /></div>
            60+ successful projects delivered         </div>

          {/* Headline */}
          <div className="headline-wrap">
            <span className="h-pre">Powering startups and enterprises</span>
            <span className="h-main">
              <span className="word-outline">Build</span>
              {" "}
              <span className="word-grad">Smarter.</span>
            </span>
            <span className="h-sub-line">
              Ship Faster.&nbsp;
              <span className="h-rotating">
                <span className="h-rotating-inner">
                  {["Grow Bigger.", "Scale Better.", "Lead Markets.", "Win Always."][activeService]}
                </span>
              </span>
            </span>
          </div>

          {/* Description */}
          <p className="hero-desc">
            We engineer <strong>AI systems, web platforms, and intelligent automation</strong> that
            give ambitious businesses a measurable edge - from first line of code to launch and beyond.
          </p>

          {/* CTAs */}
          <div className="cta-wrap">
            <button className="btn-primary" onClick={scrollToContact}>
              <span>
                Let's Collaborate
                <span className="btn-arrow">→</span>
              </span>
            </button>

            <button className="btn-secondary" onClick={scrollToCaseStudies}>
              Explore Our Work
            </button>
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
                <span className="svc-tab-icon">{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>
        </div>

      </section>
    </>
  );
}