import '../styles/About.css'
import { useState, useEffect, useRef } from "react"

function useInView(threshold = 0.08) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold });

    if (ref.current) obs.observe(ref.current);

    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible] as const;
}

const VALUES = [
  {
    num: "01",
    title: "Precision First",
    desc: "We don't ship until it's right. Every line of code, every pixel, every deployment is reviewed with an engineer's eye and a designer's soul.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
        <circle cx="20" cy="20" r="14" stroke="url(#vg1)" strokeWidth="1.4"/>
        <circle cx="20" cy="20" r="5" stroke="url(#vg1)" strokeWidth="1.2"/>
        <line x1="20" y1="4" x2="20" y2="10" stroke="url(#vg1)" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="20" y1="30" x2="20" y2="36" stroke="url(#vg1)" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="4" y1="20" x2="10" y2="20" stroke="url(#vg1)" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="30" y1="20" x2="36" y2="20" stroke="url(#vg1)" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="20" cy="20" r="2" fill="url(#vg1)"/>
        <defs>
          <linearGradient id="vg1" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2dd4bf"/><stop offset="100%" stopColor="#3b82f6"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Move Fast, Break Nothing",
    desc: "Speed without stability is just chaos. We move at startup velocity while maintaining enterprise-grade reliability across every system we build.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
        <path d="M22 4L8 22h12l-2 14 14-18H20L22 4z" stroke="url(#vg2)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <defs>
          <linearGradient id="vg2" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2dd4bf"/><stop offset="100%" stopColor="#3b82f6"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    num: "03",
    title: "Radical Transparency",
    desc: "No black boxes. You see every decision, every trade-off, every reason. We treat clients as intelligent partners, not stakeholders to manage.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
        <path d="M20 8C12 8 5 14 5 20s7 12 15 12 15-6 15-12S28 8 20 8z" stroke="url(#vg3)" strokeWidth="1.4"/>
        <circle cx="20" cy="20" r="5" stroke="url(#vg3)" strokeWidth="1.4"/>
        <circle cx="20" cy="20" r="1.5" fill="url(#vg3)"/>
        <defs>
          <linearGradient id="vg3" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2dd4bf"/><stop offset="100%" stopColor="#3b82f6"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    num: "04",
    title: "Ownership Mentality",
    desc: "We think like co-founders, not contractors. Your problems become our problems. Your wins are celebrated like our own milestones.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
        <path d="M20 4l4 8h9l-7 6 3 9-9-5-9 5 3-9-7-6h9L20 4z" stroke="url(#vg4)" strokeWidth="1.4" strokeLinejoin="round"/>
        <defs>
          <linearGradient id="vg4" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2dd4bf"/><stop offset="100%" stopColor="#3b82f6"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
];


export default function About() {
  const [rootRef, visible] = useInView(0.05);
  const [activeVal, setActiveVal] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveVal(p => (p + 1) % VALUES.length), 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <>

      {/* PART 1: DARK HERO  */}
      <section id="about-us" className="ab-hero" ref={rootRef}>

        {/* Background layers */}
        <div className="ab-hero-mesh" />
        <div className="ab-hero-dots" />
        <div className="ab-hero-aurora ab-hero-aurora-1" />
        <div className="ab-hero-aurora ab-hero-aurora-2" />
        <div className="ab-hero-aurora ab-hero-aurora-3" />
        <div className="ab-hero-noise" />
        <div className="ab-hero-topline" />
        <div className="ab-hero-topglow" />

        <div className="ab-hero-wrap">

          {/* Eyebrow pill */}
          <div className="ab-hero-pill-row">
            <div className={`ab-hero-pill${visible ? " in" : ""}`}>
              <div className="ab-hero-pill-dot">✦</div>
              <span className="ab-hero-pill-text">About Canopux</span>
              <span className="ab-hero-pill-badge">EST. 2023</span>
            </div>
          </div>

          {/* Split body */}
          <div className="ab-hero-body">

            {/* LEFT */}
            <div className={`ab-hero-left${visible ? " in" : ""}`}>
              <h1 className="ab-hero-h1">
                We <span className="dim">don't just</span><br/>
                <span className="grad">build software.</span><br/>
                We build leverage.
              </h1>

              <p className="ab-hero-p">
                Canopux is a <strong>digital engineering firm</strong> — we partner with ambitious founders and enterprises to design, build, and scale systems that actually matter.
              </p>
            </div>

            {/* RIGHT — What we do */}
            <div className={`ab-hero-right${visible ? " in" : ""}`}>
              <div className="ab-caps-label">What we do</div>

              {[
                { name: "AI & ML Systems",       tags: ["LLMs", "Pipelines"] },
                { name: "Cloud & DevOps",        tags: ["AWS", "GCP", "CI/CD"] },
                { name: "UI/UX Design",          tags: ["Systems", "Prototyping"] },
                { name: "Data Engineering",      tags: ["Pipelines", "Analytics"] },
              ].map((cap, i) => (
                <div className="ab-cap-row" key={i} style={{ transitionDelay: `${0.25 + i * 0.06}s` }}>
                  <span className="ab-cap-name">{cap.name}</span>
                  <div className="ab-cap-right">
                    <div className="ab-cap-tags">
                      {cap.tags.map((t, j) => <span className="ab-cap-tag" key={j}>{t}</span>)}
                    </div>
                    <span className="ab-cap-arrow">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>



        </div>

      </section>


      {/*  PARTS 2 & 3: LIGHT SECTIONS */}
      <section className="ab-root">
        <div className="ab-bg-base" />
        <div className="ab-noise" />
        <div className="ab-aurora ab-aurora-1" />
        <div className="ab-aurora ab-aurora-2" />
        <div className="ab-aurora ab-aurora-3" />
        <div className="ab-aurora ab-aurora-4" />

        {/* VALUES */}
        <div className="ab-values">
          <div className={`ab-values-left${visible ? " in" : ""}`}>
            <div className="ab-section-label">
              <div className="ab-section-label-line" />
              <span className="ab-section-label-text">Our Principles</span>
            </div>
            <h2 className="ab-values-heading">
              The way we<br/>think and work
            </h2>
            <p className="ab-values-sub">
              Four principles we refuse to compromise on — no matter the deadline, the budget, or the ask.
            </p>
            <div className="ab-active-value">
              <div className="ab-av-num">{VALUES[activeVal].num} / 04</div>
              <div className="ab-av-title">{VALUES[activeVal].title}</div>
              <div className="ab-av-desc">{VALUES[activeVal].desc}</div>
            </div>
          </div>

          <div className={`ab-values-right${visible ? " in" : ""}`}>
            {VALUES.map((v, i) => (
              <div
                key={i}
                className={`ab-value-row${activeVal === i ? " active" : ""}`}
                onClick={() => setActiveVal(i)}
                onMouseEnter={() => setActiveVal(i)}
              >
                <div className="ab-val-icon-box">{v.icon}</div>
                <div className="ab-val-body">
                  <div className="ab-val-title">{v.title}</div>
                  <div className="ab-val-desc">{v.desc}</div>
                </div>
                <div className="ab-val-num-badge">{v.num}</div>
              </div>
            ))}
          </div>
        </div>

        {/* MISSION STRIP */}
        <div className={`ab-mission${visible ? " in" : ""}`}>
          <div className="ab-mission-inner">
            <div className="ab-mission-left">
              <div className="ab-mission-left-label">Our Mission</div>
              <div className="ab-mission-left-title">
                Build things<br/>
                <span className="mg">that last.</span>
              </div>
            </div>
            <div className="ab-mission-right">
              <div className="ab-mission-quote">
                "We exist to close the gap between what companies <span className="mq-accent">imagine</span> and what technology can actually deliver — with precision, speed, and zero compromise."
              </div>
              <p className="ab-mission-body">
                At Canopux, we believe every ambitious company deserves engineering partners who take their vision seriously — who question assumptions, push back when needed, and always ship with purpose. We don't pad timelines or pad invoices. We just build.
              </p>
              <div className="ab-mission-author">
                <div className="ab-mission-avatar">PS</div>
                <div>
                  <div className="ab-mission-author-name">Pratik Sourav Panda</div>
                  <div className="ab-mission-author-title">Founder, Canopux</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ab-light-bottom" />
      </section>
    </>
  );
}