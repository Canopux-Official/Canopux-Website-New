import type { ArchitectureData } from "../../components/architecture/ProjectArchitectureView";

export const indocryptArchitecture: ArchitectureData = {
  title: "Tech Architecture",
  description: "Frontend-only · React SPA · Data flow",
  nodes: [
    {
      id: "fe_core",
      type: "input",
      label: "React Core",
      desc: "Main application logic and components",
    },
    {
      id: "anim_fm",
      type: "input",
      label: "Framer Motion",
      desc: "Controls the interactive feel of the site",
    },
    {
      id: "seo_layer",
      type: "default",
      label: "SEO Optimization",
      desc: "Meta tags and SSR/SSG for Google ranking",
    },
    {
      id: "assets",
      type: "default",
      label: "Static Assets",
      desc: "Optimized images and research paper links",
    },
    {
      id: "deploy",
      type: "output",
      label: "Live URL",
      desc: "indocrypt2025.in endpoint",
    },
  ],
  edges: [
    { id: "e1", from: "fe_core",   to: "seo_layer" },
    { id: "e2", from: "fe_core",   to: "assets"    },
    { id: "e3", from: "anim_fm",   to: "fe_core"   },
    { id: "e4", from: "seo_layer", to: "deploy"    },
    { id: "e5", from: "assets",    to: "deploy"    },
  ],
};