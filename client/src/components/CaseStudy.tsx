import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { projects, type Project } from "../data/projects";
import '../styles/CaseStudy.css'

function useInView(ref: React.RefObject<Element>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * -20,
    });
  };

  return (
    <div
      ref={cardRef}
      className="cs-card"
      style={{ animationDelay: `${index * 0.12}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMousePos({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
      onClick={() => navigate(`/case-studies/${project.slug}`)}
    >
      <div
        className="cs-card-inner"
        style={{
          transform: hovered
            ? `perspective(800px) rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg) translateY(-6px)`
            : "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)",
          transition: hovered ? "transform 0.1s ease-out" : "transform 0.5s cubic-bezier(0.23,1,0.32,1)",
          cursor: "pointer",
        }}
      >
        <div
          className="cs-card-glow"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${project.accentColor}30, transparent 70%)`,
            opacity: hovered ? 1 : 0,
          }}
        />
        <div className="cs-card-top">
          <span className="cs-category">{project.category}</span>
          <span className="cs-icon" style={{ color: project.accentColor }}>{project.icon}</span>
        </div>
        <h3 className="cs-name">
          {project.name}
          <span className="cs-name-line" style={{ background: `linear-gradient(90deg, ${project.gradientFrom}, ${project.gradientTo})` }} />
        </h3>
        <p className="cs-tagline">{project.tagline}</p>
        <div className="cs-stack">
          {project.techStack.map((tech) => (
            <span key={tech} className="cs-tech">{tech}</span>
          ))}
        </div>
        <div className="cs-divider" style={{ background: `linear-gradient(90deg, ${project.accentColor}50, transparent)` }} />
        <div className="cs-footer">
          <div className="cs-impact">
            <span className="cs-impact-dot" style={{ background: project.accentColor }} />
            <span className="cs-impact-text">{project.impact}</span>
          </div>
          <button
            className="cs-cta"
            style={{
              background: hovered ? `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})` : "transparent",
              borderColor: project.accentColor,
              color: hovered ? "#fff" : project.accentColor,
            }}
            onClick={(e) => { e.stopPropagation(); navigate(`/case-studies/${project.slug}`); }}
          >
            View Case Study →
          </button>
        </div>
      </div>
    </div>
  );
}

const PAGE_SIZE = 4;

export default function CaseStudy() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef as React.RefObject<Element>);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleProjects = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;

  const handleLoadMore = () => {
    const next = visibleCount + PAGE_SIZE;
    if (next >= projects.length) {
      // Show remaining then hide button on next render
      setVisibleCount(projects.length);
    } else {
      setVisibleCount(next);
    }
  };

  return (
    <>

      <section className="cs-section" ref={sectionRef} id="case-studies">
        <div className="cs-container">
          <div className={`cs-header ${inView ? "visible" : ""}`}>
            <div className="cs-eyebrow">Case Studies</div>
            <h2 className="cs-title">Work that <span className="cs-title-accent">speaks</span> for itself</h2>
            <p className="cs-subtitle">From concept to deployment — a look at the products we've engineered and the problems we've solved.</p>
          </div>
          <div className="cs-grid">
            {visibleProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
          {hasMore && (
            <div className={`cs-bottom ${inView ? "visible" : ""}`}>
              <button className="cs-all-btn" onClick={handleLoadMore}>
                Show more projects
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}