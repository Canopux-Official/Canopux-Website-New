// import { useState, useRef, useEffect } from "react";
// import '../styles/CaseStudy.css';

// // ─── Types ───────────────────────────────────────────────────────────────────
// interface Project {
//   id: number;
//   name: string;
//   tagline: string;
//   category: string;
//   techStack: string[];
//   impact: string;
//   accentColor: string;
//   gradientFrom: string;
//   gradientTo: string;
//   icon: string;
// }

// // ─── Data ────────────────────────────────────────────────────────────────────
// const projects: Project[] = [
//   {
//     id: 1,
//     name: "NeuralOps",
//     tagline: "AI-powered infrastructure monitoring with predictive failure detection",
//     category: "AI & ML",
//     techStack: ["Python", "TensorFlow", "Kubernetes", "Grafana"],
//     impact: "40% reduction in downtime",
//     accentColor: "#0ECFB0",
//     gradientFrom: "#0ECFB0",
//     gradientTo: "#0891B2",
//     icon: "⬡",
//   },
//   {
//     id: 2,
//     name: "FlowCart",
//     tagline: "High-conversion e-commerce platform built for scale and speed",
//     category: "Web Development",
//     techStack: ["Next.js", "Node.js", "PostgreSQL", "Redis"],
//     impact: "3.2× increase in conversions",
//     accentColor: "#6366F1",
//     gradientFrom: "#6366F1",
//     gradientTo: "#8B5CF6",
//     icon: "◈",
//   },
//   {
//     id: 3,
//     name: "PulseHR",
//     tagline: "Intelligent HR automation suite with real-time workforce analytics",
//     category: "App Development",
//     techStack: ["React Native", "FastAPI", "MongoDB", "AWS"],
//     impact: "60% faster hiring cycle",
//     accentColor: "#F59E0B",
//     gradientFrom: "#F59E0B",
//     gradientTo: "#EF4444",
//     icon: "◎",
//   },
//   {
//     id: 4,
//     name: "VaultSync",
//     tagline: "Zero-trust cloud data pipeline with end-to-end encryption",
//     category: "Cloud & DevOps",
//     techStack: ["Go", "Terraform", "Vault", "GCP"],
//     impact: "99.99% data integrity SLA",
//     accentColor: "#10B981",
//     gradientFrom: "#10B981",
//     gradientTo: "#0ECFB0",
//     icon: "⬡",
//   },
// ];

// // ─── Animated Counter ─────────────────────────────────────────────────────────
// function useInView(ref: React.RefObject<Element>) {
//   const [inView, setInView] = useState(false);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const observer = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) setInView(true); },
//       { threshold: 0.15 }
//     );
//     observer.observe(el);
//     return () => observer.disconnect();
//   }, [ref]);
//   return inView;
// }

// // ─── Project Card ─────────────────────────────────────────────────────────────
// function ProjectCard({ project, index }: { project: Project; index: number }) {
//   const [hovered, setHovered] = useState(false);
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
//   const cardRef = useRef<HTMLDivElement>(null);

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const rect = cardRef.current?.getBoundingClientRect();
//     if (!rect) return;
//     setMousePos({
//       x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
//       y: ((e.clientY - rect.top) / rect.height - 0.5) * -20,
//     });
//   };

//   return (
//     <div
//       ref={cardRef}
//       className="cs-card"
//       style={{ animationDelay: `${index * 0.12}s` }}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => { setHovered(false); setMousePos({ x: 0, y: 0 }); }}
//       onMouseMove={handleMouseMove}
//     >
//       {/* Tilt wrapper */}
//       <div
//         className="cs-card-inner"
//         style={{
//           transform: hovered
//             ? `perspective(800px) rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg) translateY(-6px)`
//             : "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)",
//           transition: hovered ? "transform 0.1s ease-out" : "transform 0.5s cubic-bezier(0.23,1,0.32,1)",
//         }}
//       >
//         {/* Glow on hover */}
//         <div
//           className="cs-card-glow"
//           style={{
//             background: `radial-gradient(circle at 50% 0%, ${project.accentColor}30, transparent 70%)`,
//             opacity: hovered ? 1 : 0,
//           }}
//         />

//         {/* Top row */}
//         <div className="cs-card-top">
//           <span className="cs-category">{project.category}</span>
//           <span
//             className="cs-icon"
//             style={{ color: project.accentColor }}
//           >
//             {project.icon}
//           </span>
//         </div>

//         {/* Name */}
//         <h3 className="cs-name">
//           {project.name}
//           <span
//             className="cs-name-line"
//             style={{ background: `linear-gradient(90deg, ${project.gradientFrom}, ${project.gradientTo})` }}
//           />
//         </h3>

//         {/* Tagline */}
//         <p className="cs-tagline">{project.tagline}</p>

//         {/* Tech stack */}
//         <div className="cs-stack">
//           {project.techStack.map((tech) => (
//             <span key={tech} className="cs-tech">{tech}</span>
//           ))}
//         </div>

//         {/* Divider */}
//         <div className="cs-divider" style={{ background: `linear-gradient(90deg, ${project.accentColor}50, transparent)` }} />

//         {/* Impact + CTA */}
//         <div className="cs-footer">
//           <div className="cs-impact">
//             <span className="cs-impact-dot" style={{ background: project.accentColor }} />
//             <span className="cs-impact-text">{project.impact}</span>
//           </div>
//           <button
//             className="cs-cta"
//             style={{
//               background: hovered
//                 ? `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`
//                 : "transparent",
//               borderColor: project.accentColor,
//               color: hovered ? "#fff" : project.accentColor,
//             }}
//           >
//             View Case Study →
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Main Section ─────────────────────────────────────────────────────────────
// export default function CaseStudy() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const inView = useInView(sectionRef as React.RefObject<Element>);

//   return (
//     <>

//       <section className="cs-section" ref={sectionRef}>
//         <div className="cs-container">

//           {/* Header */}
//           <div className={`cs-header ${inView ? "visible" : ""}`}>
//             <div className="cs-eyebrow">Case Studies</div>
//             <h2 className="cs-title">
//               Work that <span className="cs-title-accent">speaks</span> for itself
//             </h2>
//             <p className="cs-subtitle">
//               From concept to deployment — a look at the products we've engineered and the problems we've solved.
//             </p>
//           </div>

//           {/* Cards grid */}
//           <div className="cs-grid">
//             {projects.map((project, i) => (
//               <ProjectCard key={project.id} project={project} index={i} />
//             ))}
//           </div>

//           {/* Bottom CTA */}
//           <div className={`cs-bottom ${inView ? "visible" : ""}`}>
//             <button className="cs-all-btn">
//               Explore all projects
//               <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
//                 <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             </button>
//           </div>

//         </div>
//       </section>
//     </>
//   );
// }


import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { projects, type Project } from "../data/projects";

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
            onClick={(e) => { e.stopPropagation(); navigate(`/case-studies/${project.slug}`); console.log("button clicked"); }}
          >
            View Case Study →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudy() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef as React.RefObject<Element>);
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .cs-section {
          position: relative; padding: 120px 0 140px;
          background: #F8FFFE; overflow: hidden;
          font-family: 'DM Sans', 'Sora', sans-serif;
        }
        .cs-section::before {
          content: ''; position: absolute; inset: 0;
          background-image: radial-gradient(circle, #0ECFB020 1px, transparent 1px);
          background-size: 36px 36px; pointer-events: none;
        }
        .cs-section::after {
          content: ''; position: absolute; top: -120px; left: -120px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, #0ECFB015 0%, transparent 70%);
          pointer-events: none;
        }
        .cs-container { max-width: 1200px; margin: 0 auto; padding: 0 32px; position: relative; z-index: 1; }
        .cs-header {
          text-align: center; margin-bottom: 72px;
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .cs-header.visible { opacity: 1; transform: translateY(0); }
        .cs-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
          color: #0ECFB0; background: #0ECFB012; border: 1px solid #0ECFB030;
          border-radius: 100px; padding: 6px 16px; margin-bottom: 20px;
        }
        .cs-eyebrow::before {
          content: ''; width: 6px; height: 6px; border-radius: 50%;
          background: #0ECFB0; animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
        .cs-title { font-size: clamp(36px, 5vw, 54px); font-weight: 700; color: #0F172A; line-height: 1.15; margin: 0 0 16px; letter-spacing: -0.02em; }
        .cs-title-accent { background: linear-gradient(135deg, #0ECFB0, #0891B2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .cs-subtitle { font-size: 17px; color: #64748B; max-width: 480px; margin: 0 auto; line-height: 1.65; }
        .cs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
        @media (max-width: 768px) { .cs-grid { grid-template-columns: 1fr; } }
        .cs-card { opacity: 0; transform: translateY(40px); animation: cardIn 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
        @keyframes cardIn { to { opacity: 1; transform: translateY(0); } }
        .cs-card-inner {
          background: #ffffff; border: 1px solid #E2F4F2; border-radius: 20px; padding: 32px;
          position: relative; overflow: hidden;
          box-shadow: 0 2px 20px rgba(14, 207, 176, 0.06), 0 1px 3px rgba(0,0,0,0.04);
          will-change: transform;
        }
        .cs-card-glow { position: absolute; inset: -1px; border-radius: 20px; pointer-events: none; transition: opacity 0.4s ease; }
        .cs-card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .cs-category { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #94A3B8; background: #F1F5F9; padding: 4px 12px; border-radius: 100px; }
        .cs-icon { font-size: 26px; line-height: 1; opacity: 0.8; }
        .cs-name { font-size: 28px; font-weight: 700; color: #0F172A; margin: 0 0 10px; letter-spacing: -0.02em; position: relative; display: inline-block; }
        .cs-name-line { position: absolute; bottom: -2px; left: 0; height: 2px; width: 0; border-radius: 2px; transition: width 0.4s cubic-bezier(0.23,1,0.32,1); }
        .cs-card-inner:hover .cs-name-line { width: 100%; }
        .cs-tagline { font-size: 14px; color: #64748B; line-height: 1.6; margin: 0 0 20px; }
        .cs-stack { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
        .cs-tech { font-size: 12px; font-weight: 500; color: #475569; background: #F8FAFC; border: 1px solid #E2E8F0; padding: 4px 10px; border-radius: 6px; }
        .cs-divider { height: 1px; margin-bottom: 20px; border-radius: 1px; }
        .cs-footer { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .cs-impact { display: flex; align-items: center; gap: 8px; }
        .cs-impact-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
        .cs-impact-text { font-size: 13px; font-weight: 600; color: #334155; }
        .cs-cta { font-size: 13px; font-weight: 600; padding: 8px 18px; border-radius: 100px; border: 1.5px solid; cursor: pointer; transition: all 0.3s ease; white-space: nowrap; }
        .cs-bottom { text-align: center; margin-top: 56px; opacity: 0; transform: translateY(20px); transition: opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s; }
        .cs-bottom.visible { opacity: 1; transform: translateY(0); }
        .cs-all-btn { display: inline-flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 600; color: #0F172A; background: #ffffff; border: 1.5px solid #E2E8F0; padding: 14px 32px; border-radius: 100px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
        .cs-all-btn:hover { border-color: #0ECFB0; color: #0ECFB0; box-shadow: 0 4px 20px rgba(14, 207, 176, 0.15); transform: translateY(-2px); }
        .cs-all-btn svg { transition: transform 0.3s ease; }
        .cs-all-btn:hover svg { transform: translateX(4px); }
      `}</style>

      <section className="cs-section" ref={sectionRef} id="case-studies">
        <div className="cs-container">
          <div className={`cs-header ${inView ? "visible" : ""}`}>
            <div className="cs-eyebrow">Case Studies</div>
            <h2 className="cs-title">Work that <span className="cs-title-accent">speaks</span> for itself</h2>
            <p className="cs-subtitle">From concept to deployment — a look at the products we've engineered and the problems we've solved.</p>
          </div>
          <div className="cs-grid">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
          <div className={`cs-bottom ${inView ? "visible" : ""}`}>
            <button className="cs-all-btn" onClick={() => navigate("/case-studies")}>
              Explore all projects
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}