import "../styles/Navbar.css";
import logo from "../assets/logo-black.png";
import React, { useState, useEffect } from "react";


// Navigation configuration.
const NAV_CONFIG: { label: string; sectionId?: string; href?: string }[] = [
  { label: "Home", sectionId: "home" },
  { label: "Services", sectionId: "services" },
  { label: "Case Studies", sectionId: "case-studies" },
  { label: "About Us", sectionId: "about-us" },
  { label: "Contact Us", sectionId: "contact" },
];


const Navbar: React.FC = () => {

  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);


  // Add shadow when scrolling.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [])


  // Close mobile menu on desktop resize.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);


  // Prevent body scroll when menu open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);


  // Highlight active nav item based on scroll position.
  useEffect(() => {
    const sections = NAV_CONFIG
      .map((item) => item.sectionId)
      .filter(Boolean)
      .map((id) => document.getElementById(id!));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const activeSection = NAV_CONFIG.find(
              (item) => item.sectionId === entry.target.id
            );

            if (activeSection) {
              setActiveItem(activeSection.label);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);


  // Navigation click handler.
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: (typeof NAV_CONFIG)[number]
  ) => {
    if (item.href) return;

    e.preventDefault();
    setActiveItem(item.label);
    setMenuOpen(false);

    if (!item.sectionId) return;

    const target = document.getElementById(item.sectionId);

    if (target) {
      const offset = target.getBoundingClientRect().top + window.scrollY - 68;

      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };


  // CTA button scroll.
  const handleCtaClick = () => {
    setMenuOpen(false);

    const target = document.getElementById("contact");

    if (target) {
      const offset = target.getBoundingClientRect().top + window.scrollY - 68;

      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="navbar-root">
      <header className={`navbar-header ${scrolled ? "scrolled" : ""}`}>
        <nav aria-label="Primary Navigation" id="main-navigation">
          <div className="navbar-inner">

            {/* Logo */}
            <a href="/" className="logo-wrap" aria-label="Go to homepage">
              <img
                src={logo}
                alt="Canopux - IT & Web Solutions Agency"
                className="logo-img"
                loading="eager"
              />
            </a>

            {/* Desktop Navigation */}
            <ul className="nav-list" role="list">
              {NAV_CONFIG.map((item) => (
                <li key={item.label} className="nav-item">
                  <a
                    href={item.href ?? `#${item.sectionId}`}
                    className={activeItem === item.label ? "active" : ""}
                    aria-current={
                      activeItem === item.label ? "page" : undefined
                    }
                    onClick={(e) => handleNavClick(e, item)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Right side (phone + CTA) */}
            <div className="navbar-right">
              <a
                href="tel:+918260783152"
                className="phone-wrap"
                aria-label="Call us at +91 82607 83152"
                style={{ textDecoration: "none" }}
              >
                <div className="phone-icon-ring">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="url(#phoneGrad)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <defs>
                      <linearGradient
                        id="phoneGrad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
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

            {/* Hamburger Menu */}
            <button
              className={`hamburger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-controls="mobile-navigation"
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>

          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        id="mobile-navigation"
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <ul className="mobile-nav-list" role="list">
          {NAV_CONFIG.map((item) => (
            <li key={item.label}>
              <a
                href={item.href ?? `#${item.sectionId}`}
                className={activeItem === item.label ? "active" : ""}
                aria-current={activeItem === item.label ? "page" : undefined}
                onClick={(e) => handleNavClick(e, item)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mobile-bottom">
          <a
            href="tel:+918260783152"
            className="mobile-phone"
            aria-label="Call us at +91 82607 83152"
          >
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