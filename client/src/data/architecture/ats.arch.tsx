import type { ArchitectureData } from "../../components/architecture/ProjectArchitectureView";

export const atsArchitecture: ArchitectureData = {
  title: "Tech Architecture",
  description: "Dual portal · NestJS backend · NLP scoring · PostgreSQL",
  nodes: [
    { id: "ui_seeker",    type: "input",   label: "Job Seeker Portal",   desc: "Frontend" },
    { id: "ui_recruiter", type: "input",   label: "Recruiter Portal",    desc: "Frontend" },
    { id: "api_nest",     type: "default", label: "NestJS Server",       desc: "Backend" },
    { id: "ai_engine",    type: "default", label: "NLP Scoring Model",   desc: "AI/ML" },
    { id: "db_pg",        type: "output",  label: "PostgreSQL (Prisma)", desc: "Database" },
  ],
  edges: [
    { id: "e1", from: "ui_seeker",    to: "api_nest"  },
    { id: "e2", from: "ui_recruiter", to: "api_nest"  },
    { id: "e3", from: "api_nest",     to: "ai_engine" },
    { id: "e4", from: "api_nest",     to: "db_pg"     },
    { id: "e5", from: "ai_engine",    to: "db_pg"     },
  ],
};