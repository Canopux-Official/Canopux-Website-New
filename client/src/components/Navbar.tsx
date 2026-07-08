import "../styles/Navbar.css";
import logo from "../assets/logo-black.png";
import { Phone } from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";

const SCROLL_THRESHOLD = 50;
const PHONE_NUMBER = "+918260783152";
const PHONE_DISPLAY = "+91 82607 83152";

const NAV_CONFIG: { label: string; sectionId?: string; href?: string }[] = [
  { label: "Home", sectionId: "home" },
  { label: "Services", sectionId: "services" },
  { label: "Case Studies", sectionId: "case-studies" },
  { label: "About Us", sectionId: "about-us" },
  { label: "Contact Us", sectionId: "contact" },
];

const getNavOffset = () => {
  const height = getComputedStyle(document.documentElement)
    .getPropertyValue("--navbar-height")
    .trim();
  if (height.includes("calc")) {
    const top = parseInt(
      getComputedStyle(document.documentElement)
        .getPropertyValue("--navbar-top-offset")
        .trim(),
      10
    ) || 14;
    const bar = parseInt(
      getComputedStyle(document.documentElement)
        .getPropertyValue("--navbar-bar-height")
        .trim(),
      10
    ) || 72;
    return top + bar;
  }
  return parseInt(height, 10) || 86;
};

const scrollToSection = (sectionId: string) => {
  const target = document.getElementById(sectionId);
  if (!target) return;

  const offset =
    target.getBoundingClientRect().top + window.scrollY - getNavOffset();

  window.scrollTo({ top: offset, behavior: "smooth" });
};

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const barHeight = scrolled ? "60px" : "72px";
    const topOffset = scrolled ? "10px" : "14px";
    document.documentElement.style.setProperty("--navbar-bar-height", barHeight);
    document.documentElement.style.setProperty("--navbar-top-offset", topOffset);
    document.documentElement.style.setProperty(
      "--navbar-height",
      `calc(${topOffset} + ${barHeight})`
    );
  }, [scrolled]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const updateActiveSection = () => {
      if (window.scrollY < 80) {
        setActiveItem("Home");
        return;
      }

      const scrollPos = window.scrollY + getNavOffset() + 32;
      let active = NAV_CONFIG[0].label;

      for (const item of NAV_CONFIG) {
        if (!item.sectionId) continue;
        const el = document.getElementById(item.sectionId);
        if (el && el.offsetTop <= scrollPos) {
          active = item.label;
        }
      }

      setActiveItem(active);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [scrolled]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, item: (typeof NAV_CONFIG)[number]) => {
      if (item.href) return;
      e.preventDefault();
      setActiveItem(item.label);
      setMenuOpen(false);
      if (item.sectionId) scrollToSection(item.sectionId);
    },
    []
  );

  const handleCtaClick = useCallback(() => {
    setMenuOpen(false);
    scrollToSection("contact");
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <div className="navbar-root">
      <header
        className={`navbar-header${scrolled ? " scrolled" : ""}${menuOpen ? " menu-open" : ""}`}
      >
        <nav aria-label="Primary navigation" id="main-navigation">
          <div className="navbar-inner">
            <a href="/" className="logo-wrap" aria-label="Canopux home">
              <img
                src={logo}
                alt="Canopux"
                className="logo-img"
                loading="eager"
              />
            </a>

            <ul className="nav-list" role="list">
              {NAV_CONFIG.map((item) => (
                <li key={item.label} className="nav-item">
                  <a
                    href={item.href ?? `#${item.sectionId}`}
                    className={activeItem === item.label ? "active" : undefined}
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

            <div className="navbar-right">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="phone-wrap"
                aria-label={`Call us at ${PHONE_DISPLAY}`}
              >
                <span className="phone-icon-ring" aria-hidden="true">
                  <Phone size={16} strokeWidth={2} />
                </span>
              </a>

              <button
                type="button"
                className="cta-btn"
                onClick={handleCtaClick}
              >
                Let&apos;s Build
              </button>
            </div>

            <button
              type="button"
              className={`hamburger${menuOpen ? " open" : ""}`}
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

      <button
        type="button"
        className={`mobile-backdrop${menuOpen ? " open" : ""}`}
        aria-label="Close menu"
        aria-hidden={!menuOpen}
        tabIndex={menuOpen ? 0 : -1}
        onClick={closeMenu}
      />

      <aside
        id="mobile-navigation"
        className={`mobile-menu${menuOpen ? " open" : ""}`}
        aria-hidden={!menuOpen}
        aria-label="Mobile navigation"
      >
        <div className="mobile-menu-header">
          <span className="mobile-menu-label">Menu</span>
          <button
            type="button"
            className="mobile-close"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <span />
            <span />
          </button>
        </div>

        <ul className="mobile-nav-list" role="list">
          {NAV_CONFIG.map((item) => (
            <li key={item.label}>
              <a
                href={item.href ?? `#${item.sectionId}`}
                className={activeItem === item.label ? "active" : undefined}
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
            href={`tel:${PHONE_NUMBER}`}
            className="mobile-phone"
            aria-label={`Call us at ${PHONE_DISPLAY}`}
          >
            <span className="phone-icon-ring" aria-hidden="true">
              <Phone size={18} strokeWidth={2} />
            </span>
          </a>

          <button
            type="button"
            className="cta-btn cta-btn--full"
            onClick={handleCtaClick}
          >
            Let&apos;s Build
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Navbar;
