import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { useShowcaseAutoplay } from "../hooks/useShowcaseAutoplay";
import type { FeaturedProduct } from "../data/featuredProducts";
import "../styles/FeaturedProducts.css";

type FeaturedProductsProps = {
  projects: FeaturedProduct[];
};

const EASE_IN_OUT: [number, number, number, number] = [0.42, 0, 0.58, 1];

const imageVariants = {
  initial: { opacity: 0, x: 56, scale: 0.985 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -56, scale: 0.96 },
};

const detailsVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

function BrowserFrame({ project }: { project: FeaturedProduct }) {
  return (
    <div className="fp-browser" aria-live="polite" aria-label="Product showcase browser window">
      <div className="fp-browser-top">
        <div className="fp-browser-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="fp-browser-body">
        <AnimatePresence mode="wait">
          <motion.figure
            key={project.id}
            className="fp-image-wrap"
            variants={imageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1.05, ease: EASE_IN_OUT }}
          >
            <img src={project.image} alt={project.imageAlt} className="fp-image" loading="eager" />
          </motion.figure>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function FeaturedProducts({ projects }: FeaturedProductsProps) {
  const { activeIndex } = useShowcaseAutoplay({
    itemCount: projects.length,
    enabled: true,
    intervalMs: 6200,
  });

  const activeProject = useMemo(() => projects[activeIndex], [projects, activeIndex]);

  if (!activeProject) return null;

  return (
    <section id="featured-products" className="fp-section" aria-label="Featured products showcase">
      <div className="fp-container">
        <header className="fp-header">
          <div className="fp-eyebrow">Featured Products</div>
          <h2 className="fp-title">Built to Solve Real Problems</h2>
          <p className="fp-tagline">Real products. Real solutions. Real impact.</p>
          <p className="fp-description">
            Every product we build is designed around real users, real workflows, and measurable business outcomes.
          </p>
        </header>

        <BrowserFrame project={activeProject} />

        <div className="fp-details-wrap">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeProject.id}-details`}
              className="fp-details"
              variants={detailsVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.85, ease: EASE_IN_OUT }}
            >
              <h3 className="fp-project-name">{activeProject.name}</h3>
              <p className="fp-project-description">{activeProject.description}</p>
              {!!activeProject.techStack?.length && (
                <div className="fp-tech-list" aria-label="Technology stack">
                  {activeProject.techStack.map((tech) => (
                    <span className="fp-tech-chip" key={`${activeProject.id}-${tech}`}>
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
