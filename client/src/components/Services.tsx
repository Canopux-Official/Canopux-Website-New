import '../styles/Services.css'
import { useState, useEffect, useRef } from "react"

const SERVICES = [
  {
    id: 0,
    num: "01",
    title: "Web Development",
    short: "Blazing-fast, conversion-optimised web experiences",
    desc: "We craft pixel-perfect, performance-first web applications using the modern stack. From marketing sites to complex SaaS dashboards — every pixel ships with purpose.",
    tags: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind", "PostgreSQL"],
    outcomes: ["3× faster load times", "99+ Lighthouse score", "SEO-first architecture"],
    accent: "#2dd4bf",
    accentB: "#3b82f6",
    icon: (c: string) => (
      <svg viewBox="0 0 56 56" fill="none" width="100%" height="100%">
        <rect x="4" y="10" width="48" height="34" rx="5" stroke={c} strokeWidth="1.4" />
        <path d="M4 18h48" stroke={c} strokeWidth="1.4" />
        <circle cx="11" cy="14" r="1.8" fill={c} opacity=".5" />
        <circle cx="17" cy="14" r="1.8" fill={c} opacity=".5" />
        <path d="M16 28l-5 5 5 5M22 26l6 12M28 28l5 5-5 5" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 1,
    num: "02",
    title: "AI & Machine Learning",
    short: "Intelligent systems that learn, adapt, and deliver",
    desc: "From custom LLM pipelines to computer vision and predictive analytics — we build AI that solves real business problems, not demos. Models that integrate deeply into your product.",
    tags: ["Python", "PyTorch", "LangChain", "OpenAI", "HuggingFace", "MLflow"],
    outcomes: ["Custom-trained models", "Real-time inference APIs", "RAG & LLM pipelines"],
    accent: "#3b82f6",
    accentB: "#6366f1",
    icon: (c: string) => (
      <svg viewBox="0 0 56 56" fill="none" width="100%" height="100%">
        <circle cx="28" cy="28" r="9" stroke={c} strokeWidth="1.4" />
        <circle cx="28" cy="28" r="3" fill={c} />
        {[[28, 6], [46, 17], [46, 39], [28, 50], [10, 39], [10, 17]].map(([x, y], i) => (
          <g key={i}>
            <line x1="28" y1="28" x2={x} y2={y} stroke={c} strokeWidth=".8" opacity=".3" />
            <circle cx={x} cy={y} r="3.5" stroke={c} strokeWidth="1.2" fill="none" />
            <circle cx={x} cy={y} r="1.2" fill={c} opacity=".6" />
          </g>
        ))}
        <circle cx="28" cy="28" r="18" stroke={c} strokeWidth=".5" strokeDasharray="3 5" fill="none" opacity=".25" />
      </svg>
    ),
  },
  {
    id: 2,
    num: "03",
    title: "Automation & RPA",
    short: "Eliminate repetition. Multiply your team's output",
    desc: "We design and deploy intelligent automation workflows that eliminate manual work — from document processing to multi-system orchestration and beyond.",
    tags: ["n8n", "Zapier", "Python", "Selenium", "Playwright", "REST APIs"],
    outcomes: ["80% reduction in manual tasks", "24/7 autonomous workflows", "Zero-error data pipelines"],
    accent: "#2dd4bf",
    accentB: "#10b981",
    icon: (c: string) => (
      <svg viewBox="0 0 56 56" fill="none" width="100%" height="100%">
        <rect x="4" y="18" width="14" height="10" rx="3" stroke={c} strokeWidth="1.4" />
        <rect x="21" y="26" width="14" height="10" rx="3" stroke={c} strokeWidth="1.4" />
        <rect x="38" y="18" width="14" height="10" rx="3" stroke={c} strokeWidth="1.4" />
        <rect x="21" y="8" width="14" height="10" rx="3" stroke={c} strokeWidth="1.4" />
        <rect x="21" y="38" width="14" height="10" rx="3" stroke={c} strokeWidth="1.4" />
        <path d="M11 23h10M35 31h3M28 18v8M28 36v2" stroke={c} strokeWidth="1.1" strokeLinecap="round" />
        <circle cx="11" cy="23" r="1.5" fill={c} opacity=".7" />
        <circle cx="45" cy="23" r="1.5" fill={c} opacity=".7" />
      </svg>
    ),
  },
  {
    id: 3,
    num: "04",
    title: "Cloud & DevOps",
    short: "Resilient infrastructure that scales with your ambition",
    desc: "Cloud-native infrastructure with CI/CD pipelines, container orchestration, and infrastructure-as-code — ship more, worry less, scale infinitely.",
    tags: ["AWS", "GCP", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
    outcomes: ["Auto-scaling infrastructure", "CI/CD in < 5 min", "Cost-optimised cloud spend"],
    accent: "#6366f1",
    accentB: "#3b82f6",
    icon: (c: string) => (
      <svg viewBox="0 0 56 56" fill="none" width="100%" height="100%">
        <ellipse cx="28" cy="20" rx="17" ry="8" stroke={c} strokeWidth="1.4" />
        <path d="M11 20v18c0 4.4 7.6 8 17 8s17-3.6 17-8V20" stroke={c} strokeWidth="1.4" />
        <ellipse cx="28" cy="38" rx="17" ry="8" stroke={c} strokeWidth=".8" strokeDasharray="3 3" opacity=".4" />
        <ellipse cx="28" cy="29" rx="17" ry="8" stroke={c} strokeWidth=".7" strokeDasharray="3 4" opacity=".3" />
        <circle cx="28" cy="20" r="3" fill={c} opacity=".8" />
      </svg>
    ),
  },
  {
    id: 4,
    num: "05",
    title: "Data Engineering",
    short: "Turn data chaos into a competitive advantage",
    desc: "Robust data platforms — pipelines, warehouses, dashboards — that transform raw data into executive-level decisions. Real-time analytics that make teams genuinely data-driven.",
    tags: ["Apache Spark", "dbt", "Snowflake", "Airflow", "Kafka", "Looker"],
    outcomes: ["Real-time data pipelines", "Unified data warehouse", "Executive dashboards"],
    accent: "#f59e0b",
    accentB: "#3b82f6",
    icon: (c: string) => (
      <svg viewBox="0 0 56 56" fill="none" width="100%" height="100%">
        <path d="M6 44h44" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
        <rect x="8" y="32" width="7" height="12" rx="2" fill={c} opacity=".4" />
        <rect x="18" y="24" width="7" height="20" rx="2" fill={c} opacity=".55" />
        <rect x="28" y="16" width="7" height="28" rx="2" fill={c} opacity=".7" />
        <rect x="38" y="8" width="7" height="36" rx="2" fill={c} opacity=".9" />
        <path d="M11.5 32 L21.5 24 L31.5 16 L41.5 8" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        {[11.5, 21.5, 31.5, 41.5].map((x, i) => (
          <circle key={i} cx={x} cy={[32, 24, 16, 8][i]} r="2.5" fill="white" stroke={c} strokeWidth="1.4" />
        ))}
      </svg>
    ),
  },
  {
    id: 5,
    num: "06",
    title: "Cybersecurity",
    short: "Protect every layer before threats find the gaps",
    desc: "We audit, harden, and monitor your digital assets — from application penetration testing to compliance frameworks and incident response. Security that's proactive, not reactive.",
    tags: ["OWASP", "Pen Testing", "SOC 2", "ISO 27001", "SIEM", "Zero Trust"],
    outcomes: ["Zero critical vulnerabilities", "Compliance-ready posture", "24/7 threat monitoring"],
    accent: "#10b981",
    accentB: "#2dd4bf",
    icon: (c: string) => (
      <svg viewBox="0 0 56 56" fill="none" width="100%" height="100%">
        <path d="M28 6L46 14v18c0 11-9 18-18 23C9 50 2 43 2 32V14L28 6z" stroke={c} strokeWidth="1.4" />
        <path d="M28 14l12 5.5v13c0 7-6 12-12 14-6-2-12-7-12-14V19.5L28 14z" stroke={c} strokeWidth=".8" opacity=".35" />
        <path d="M21 28l5 5 10-9" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 6,
    num: "07",
    title: "Mobile App Development",
    short: "Native-quality apps for iOS & Android that users love",
    desc: "We build cross-platform and native mobile apps that feel buttery smooth — from consumer apps to enterprise tools. Performance, offline support, and app-store polish baked in from day one.",
    tags: ["React Native", "Flutter", "Swift", "Kotlin", "Expo", "Firebase"],
    outcomes: ["iOS & Android from one codebase", "60fps buttery animations", "App Store ready in 6 weeks"],
    accent: "#e879f9",
    accentB: "#6366f1",
    icon: (c: string) => (
      <svg viewBox="0 0 56 56" fill="none" width="100%" height="100%">
        <rect x="16" y="4" width="24" height="48" rx="5" stroke={c} strokeWidth="1.4" />
        <path d="M16 12h24M16 44h24" stroke={c} strokeWidth="1.1" opacity=".45" />
        <circle cx="28" cy="48" r="2" fill={c} opacity=".6" />
        <rect x="21" y="19" width="14" height="9" rx="2.5" stroke={c} strokeWidth="1.1" opacity=".5" />
        <path d="M23 32h10M23 36h7" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity=".55" />
        <circle cx="28" cy="8" r="1.5" fill={c} opacity=".5" />
      </svg>
    ),
  },
  {
    id: 7,
    num: "08",
    title: "UI/UX Design",
    short: "Interfaces that delight users and drive conversion",
    desc: "Strategy-led design that bridges business goals and user needs. We go from research and wireframes to pixel-perfect Figma files and interactive prototypes — fully ready for dev handoff.",
    tags: ["Figma", "Prototyping", "User Research", "Design Systems", "Framer", "A/B Testing"],
    outcomes: ["40% higher conversion rates", "Full design system delivered", "Dev-ready in Figma"],
    accent: "#f472b6",
    accentB: "#a855f7",
    icon: (c: string) => (
      <svg viewBox="0 0 56 56" fill="none" width="100%" height="100%">
        <circle cx="20" cy="18" r="8" stroke={c} strokeWidth="1.4" />
        <circle cx="36" cy="18" r="8" stroke={c} strokeWidth="1.4" />
        <circle cx="20" cy="34" r="8" stroke={c} strokeWidth="1.4" />
        <circle cx="36" cy="34" r="8" stroke={c} strokeWidth="1.4" />
        <circle cx="20" cy="18" r="3.5" fill={c} opacity=".7" />
        <circle cx="36" cy="18" r="3.5" fill={c} opacity=".5" />
        <circle cx="20" cy="34" r="3.5" fill={c} opacity=".5" />
        <circle cx="36" cy="34" r="3.5" fill="white" stroke={c} strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    id: 8,
    num: "09",
    title: "Blockchain & Web3",
    short: "Decentralised products built for the open internet",
    desc: "From smart contracts and DeFi protocols to NFT platforms and DAO tooling — we architect and audit blockchain systems that are secure, gas-optimised, and built to last.",
    tags: ["Solidity", "Ethereum", "Hardhat", "IPFS", "Wagmi", "The Graph"],
    outcomes: ["Gas-optimised smart contracts", "Full audit reports", "EVM & L2 deployment"],
    accent: "#fb923c",
    accentB: "#f59e0b",
    icon: (c: string) => (
      <svg viewBox="0 0 56 56" fill="none" width="100%" height="100%">
        <polygon points="28,6 44,16 44,36 28,46 12,36 12,16" stroke={c} strokeWidth="1.4" fill="none" />
        <polygon points="28,14 38,20 38,32 28,38 18,32 18,20" stroke={c} strokeWidth=".8" fill="none" opacity=".4" />
        <circle cx="28" cy="6" r="2.5" fill={c} opacity=".8" />
        <circle cx="44" cy="16" r="2.5" fill={c} opacity=".8" />
        <circle cx="44" cy="36" r="2.5" fill={c} opacity=".8" />
        <circle cx="28" cy="46" r="2.5" fill={c} opacity=".8" />
        <circle cx="12" cy="36" r="2.5" fill={c} opacity=".8" />
        <circle cx="12" cy="16" r="2.5" fill={c} opacity=".8" />
        <circle cx="28" cy="26" r="4" fill={c} opacity=".6" />
        <line x1="28" y1="6" x2="28" y2="22" stroke={c} strokeWidth=".7" opacity=".3" />
        <line x1="44" y1="16" x2="32" y2="22" stroke={c} strokeWidth=".7" opacity=".3" />
        <line x1="44" y1="36" x2="32" y2="30" stroke={c} strokeWidth=".7" opacity=".3" />
        <line x1="28" y1="46" x2="28" y2="30" stroke={c} strokeWidth=".7" opacity=".3" />
        <line x1="12" y1="36" x2="24" y2="30" stroke={c} strokeWidth=".7" opacity=".3" />
        <line x1="12" y1="16" x2="24" y2="22" stroke={c} strokeWidth=".7" opacity=".3" />
      </svg>
    ),
  },
];

function useInView(threshold = 0.08) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true)
    }, { threshold })

    if (ref.current) obs.observe(ref.current)

    return () => obs.disconnect()
  }, [threshold])

  return [ref, visible] as const
}


export default function Services() {
  const [active, setActive] = useState(0);
  const [rootRef, visible] = useInView(0.05);
  const cur = SERVICES[active];

  return (
    <>
      <section id="services" className="sv-root" ref={rootRef}>

        {/* Background */}
        <div className="sv-bg-base" />
        <div className="sv-noise" />
        <div className="sv-aurora sv-aurora-1" />
        <div className="sv-aurora sv-aurora-2" />
        <div className="sv-aurora sv-aurora-3" />

        {/* ── Section Intro ── */}
        <div className={`sv-intro${visible ? " in" : ""}`}>
          <div className="sv-intro-left">
            <div className="sv-eyebrow">
              <div className="sv-eyebrow-line" />
              <span className="sv-eyebrow-text">Canopux Services</span>
            </div>
            <h2 className="sv-intro-heading">
              Everything your product<br />
              <span className="sv-intro-grad">needs to ship.</span>
            </h2>
          </div>
          <p className="sv-intro-sub">
            Nine disciplines. One team. Whether you're building from scratch or scaling what's already working - we cover, end to end.
          </p>
        </div>

        {/* ── Bento ── */}
        <div className={`sv-bento${visible ? " in" : ""}`}>

          {/* Featured panel */}
          <div className="sv-featured">
            <div
              className="sv-feat-glow"
              style={{ background: `radial-gradient(ellipse 280px 220px at 65% 35%, ${cur.accent}14 0%, transparent 65%)` }}
            />
            <div className="sv-feat-top">
              <div className="sv-feat-num">{cur.num} / 09 — {cur.title}</div>

              <div className="sv-feat-visual">
                <div className="sv-feat-ring" style={{ width: 200, height: 200, borderColor: `${cur.accent}22`, transform: "translate(-50%,-50%)" }} />
                <div className="sv-feat-ring sv-feat-ring-2" style={{ width: 140, height: 140, borderColor: `${cur.accentB}18`, transform: "translate(-50%,-50%)" }} />
                <div className="sv-feat-icon-box" key={active} style={{ boxShadow: `0 12px 40px ${cur.accent}1a` }}>
                  {cur.icon(cur.accent)}
                </div>
              </div>

              <div className="sv-feat-name">{cur.title}</div>
              <div className="sv-feat-short">{cur.short}</div>
              <div className="sv-feat-desc">{cur.desc}</div>

              <div className="sv-feat-outcomes">
                {cur.outcomes.map((o, i) => (
                  <div className="sv-feat-outcome" key={i}>
                    <div className="sv-feat-check">✓</div>
                    {o}
                  </div>
                ))}
              </div>
            </div>

            <div className="sv-feat-bottom">
              <div className="sv-feat-tags">
                {cur.tags.slice(0, 4).map((t, i) => (
                  <span className="sv-feat-tag" key={i}>{t}</span>
                ))}
              </div>
              <div className="sv-dots">
                {SERVICES.map((_, i) => (
                  <div key={i} className={`sv-dot${active === i ? " active" : ""}`} onClick={() => setActive(i)} />
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="sv-right">
            {/* Stats */}
            <div className="sv-stats">
              {[
                { icon: "🚀", num: "60+", label: "Projects Delivered" },
                { icon: "⭐", num: "99.97%", label: "Client Retention" },
                { icon: "🌍", num: "10+", label: "Industries Served" },
              ].map((m, i) => (
                <div className="sv-stat-cell" key={i}>
                  <div className="sv-stat-icon">{m.icon}</div>
                  <div>
                    <div className="sv-stat-num">{m.num}</div>
                    <div className="sv-stat-label">{m.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* 9 service cards in 3×3 */}
            <div className="sv-cards">
              {SERVICES.map((s, i) => {
                const isActive = active === i;
                return (
                  <div
                    key={s.id}
                    className={`sv-card${isActive ? " active" : ""}`}
                    onClick={() => setActive(i)}
                  >
                    <div
                      className="sv-card-glow"
                      style={{ background: `radial-gradient(ellipse 120px 80px at 80% 10%, ${s.accent}10 0%, transparent 70%)` }}
                    />
                    <div className="sv-card-top">
                      <span className="sv-card-num">{s.num}</span>
                      <div className="sv-card-icon">
                        {s.icon(isActive ? s.accent : "#cbd5e1")}
                      </div>
                    </div>
                    <div className="sv-card-name">{s.title}</div>
                    <div className="sv-card-short">{s.short}</div>
                    <div className="sv-card-bottom">
                      <span className="sv-card-tags-mini">
                        {s.tags.slice(0, 2).join(" · ")}
                      </span>
                      <div className="sv-card-arrow">→</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </section>
    </>
  );
}