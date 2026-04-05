import type { ArchitectureData } from "../../components/architecture/ProjectArchitectureView";

export const autoCheckArchitecture: ArchitectureData = {
  title: "Tech Architecture",
  description: "Vehicle verification portal · Supabase backend · AI price estimation · React + Vite frontend",
  nodes: [
    { id: "ui_user",       type: "input",   label: "User Portal",          desc: "Frontend (React + Vite)" },
    { id: "ui_admin",      type: "input",   label: "Admin Portal",         desc: "Frontend (React + Vite)" },
    { id: "api_supabase",  type: "default", label: "Supabase Server",      desc: "Backend & Auth" },
    { id: "ai_price",      type: "default", label: "AI Price Engine",      desc: "AI/ML (under development)" },
    { id: "db_supabase",   type: "output",  label: "Supabase Database",    desc: "Database & Vehicle Records" },
  ],
  edges: [
    { id: "e1", from: "ui_user",      to: "api_supabase" },
    { id: "e2", from: "ui_admin",     to: "api_supabase" },
    { id: "e3", from: "api_supabase", to: "ai_price"     },
    { id: "e4", from: "api_supabase", to: "db_supabase"  },
    { id: "e5", from: "ai_price",     to: "db_supabase"  },
  ],
};