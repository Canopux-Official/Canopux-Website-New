import type { ArchitectureData } from "../../components/architecture/ProjectArchitectureView";

export const jjClassesArchitecture: ArchitectureData = {
  title: "Tech Architecture",
  description: "PWA · React frontend · Node.js backend · Cloud storage",
  nodes: [
    { id: "frontend",   type: "input",   label: "Client (PWA)",   desc: "React + Vite (MUI/Framer)" },
    { id: "auth",       type: "default", label: "Security Layer", desc: "OAuth 2.0 & OTP Verification" },
    { id: "backend",    type: "default", label: "API Server",     desc: "Node.js / Express.js Logic" },
    { id: "db",         type: "output",  label: "MongoDB",        desc: "Persistent Data (Users/Sessions)" },
    { id: "cloudinary", type: "output",  label: "Cloudinary",     desc: "Image & Asset Hosting" },
    { id: "gdrive",     type: "output",  label: "Google Drive",   desc: "Educational Materials & Files" },
  ],
  edges: [
    { id: "e1", from: "frontend", to: "auth"      },
    { id: "e2", from: "auth",     to: "backend"   },
    { id: "e3", from: "backend",  to: "db"        },
    { id: "e4", from: "backend",  to: "cloudinary"},
    { id: "e5", from: "backend",  to: "gdrive"    },
  ],
};