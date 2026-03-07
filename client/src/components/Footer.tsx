import '../styles/Footer.css'
import type { RefObject } from "react"
import logo from '../assets/logo-white.png'
import { useState, useEffect, useRef } from "react"

function useInView(threshold = 0.05): [RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold }
    );

    if (ref.current) obs.observe(ref.current);

    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

const NAV = [
  {
    heading: "Services",
    links: [
      "Full-Stack Dev",
      "AI / ML",
      "DevOps & Cloud",
      "UI/UX Design",
      "Mobile Apps"
    ],
  },
];

const SOCIALS = [
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.25 2.25h6.938l4.26 5.632 4.796-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label: "Dribbble",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
        <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.816zm-11.62-2.073c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.52-5.558-3.475-5.77C4.86 3.19 3.168 5.294 2.006 7.75c0 .087.004.173.004.26 0 .307.015.61.044.91zm8.93-7.595c-.15.195-1.986 2.693-3.642 5.73 3.412-.98 6.51-1.087 6.942-1.094C18.87 5.91 17.6 4.21 16.04 3.017z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [rootRef, visible] = useInView(0.04);
  const year = new Date().getFullYear();

  return (
    <footer className="ft-root" ref={rootRef}>
      <div className="ft-bg-mesh" />
      <div className="ft-dot-grid" />
      <div className="ft-noise" />
      <div className="ft-aurora ft-aurora-1" />
      <div className="ft-aurora ft-aurora-2" />
      <div className="ft-top-border" />
      <div className="ft-top-border-glow" />

      <div className="ft-wrap">

        {/* CTA */}
        <div className={`ft-cta-strip${visible ? " in" : ""}`}>
          <div>
            <div className="ft-cta-eyebrow">
              <div className="ft-cta-eyebrow-line" />
              <span className="ft-cta-eyebrow-text">Ready to start?</span>
            </div>

            <h2 className="ft-cta-heading">
              Your next product<br />
              <span className="grad">starts with a conversation.</span>
            </h2>

            <p className="ft-cta-sub">
              No commitment. No fluff. Just an honest chat about what you're building.
            </p>
          </div>

          <div className="ft-cta-actions">
            <button className="ft-btn-primary">
              <span>
                Start a Conversation                <span className="ft-btn-arr">→</span>
              </span>
            </button>
            <button className="ft-btn-ghost">See Our Work</button>
          </div>
        </div>

        {/* MAIN */}
        <div className={`ft-main${visible ? " in" : ""}`}>

          {/* Brand */}
          <div className="ft-brand">
            <div className="ft-logo">
              <img src={logo} alt="Logo" />
            </div>

            <div className="ft-socials">
              {SOCIALS.map(s => (
                <a key={s.label} className="ft-social-pill" href={s.href} title={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services (NO LINKS) */}
          <div className="ft-nav">
            <div className="ft-nav-links">
              {NAV[0].links.map(link => (
                <span key={link} className="ft-nav-link">
                  {link}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className={`ft-bottom${visible ? " in" : ""}`}>
          <p className="ft-copyright">
            © {year} <strong>Canopux Inc.</strong> All rights reserved.
          </p>

          <div className="ft-status-badge">
            <div className="ft-status-dot" />
            <span className="ft-status-text">All systems operational</span>
          </div>
        </div>

      </div>
    </footer>
  );
}