import React, { useState, useEffect } from "react";
import '../styles/Navbar.css';
import logo from '../assets/logo-black.png';

// Map nav items to their section IDs (or external paths)
const NAV_CONFIG: { label: string; sectionId?: string; href?: string }[] = [
  { label: "Home", sectionId: "home" },
  { label: "Services", sectionId: "services" },
  { label: "Case Studies", href: "/case-studies" },   // opens new page
  { label: "About Us", sectionId: "about-us" },
  { label: "Contact", sectionId: "contact" },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: (typeof NAV_CONFIG)[number]
  ) => {
    // Case Studies → navigate to a new page, let default behavior work
    if (item.href) return;

    e.preventDefault();
    setActiveItem(item.label);
    setMenuOpen(false);

    if (!item.sectionId) return;

    const target = document.getElementById(item.sectionId);
    if (target) {
      // 68px = navbar height
      const offset = target.getBoundingClientRect().top + window.scrollY - 68;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  const handleCtaClick = () => {
    setMenuOpen(false);
    const target = document.getElementById("contact");
    if (target) {
      const offset = target.getBoundingClientRect().top + window.scrollY - 68;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="navbar-root">
      <header className={`navbar-header ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-inner">

          {/* Logo */}
          <div className="logo-wrap">
            <img src={logo} alt="Logo" className="logo-img" />
          </div>

          {/* Desktop Nav */}
          <nav>
            <ul className="nav-list">
              {NAV_CONFIG.map((item) => (
                <li key={item.label} className="nav-item">
                  <a
                    href={item.href ?? `#${item.sectionId}`}
                    className={activeItem === item.label ? "active" : ""}
                    onClick={(e) => handleNavClick(e, item)}
                    {...(item.href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Right */}
          <div className="navbar-right">
            <a href="tel:+918260783152" className="phone-wrap" style={{ textDecoration: "none" }}>
              <div className="phone-icon-ring">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="url(#phoneGrad)" strokeWidth="2.2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <defs>
                    <linearGradient id="phoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2dd4bf" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 010 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.52a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <span>+91 82607 83152</span>
            </a>

            <div className="divider" />

            <button className="cta-btn" onClick={handleCtaClick}>
              <span>Let's Build</span>
            </button>
          </div>

          {/* Hamburger (mobile only) */}
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>

        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <ul className="mobile-nav-list">
          {NAV_CONFIG.map((item) => (
            <li key={item.label}>
              <a
                href={item.href ?? `#${item.sectionId}`}
                className={activeItem === item.label ? "active" : ""}
                onClick={(e) => handleNavClick(e, item)}
                {...(item.href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mobile-bottom">
          <a href="tel:+918260783152" className="mobile-phone">
            <div className="phone-icon-ring">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="url(#phoneGradMobile)" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round">
                <defs>
                  <linearGradient id="phoneGradMobile" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2dd4bf" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 010 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.52a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <span>+91 82607 83152</span>
          </a>

          <div className="mobile-cta">
            <button className="cta-btn" onClick={handleCtaClick}>
              <span>Let's Build</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;