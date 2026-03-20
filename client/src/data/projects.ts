import type { Node, Edge } from '@xyflow/react'
import { indocryptArchitecture } from "./architecture/indocrypt.arch";
import { jjClassesArchitecture } from './architecture/jjclasses.arch';
import { atsArchitecture } from './architecture/ats.arch';
import type { ArchitectureData } from "../components/architecture/ProjectArchitectureView";

export type ProjectArchitectureData = {
  nodes: Node[]
  edges: Edge[]
} | undefined

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TechDetail {
  name: string;
  role: string; // why this tech was chosen
}

export interface ImpactDetail {
  metric: string; // e.g. "40%"
  label: string;  // e.g. "reduction in downtime"
}

export interface Project {
  // ── Identity
  id: number;
  slug: string;           // used in URL: /case-studies/:slug
  name: string;
  tagline: string;        // short — used on card
  category: string;
  icon: string;

  // ── Theme
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;

  // ── Card fields (existing)
  techStack: string[];    // plain names for card tags
  impact: string;   
  liveURL: string;      // single-line for card

  // ── Detail view fields (new)
  purpose: string;        // Slide 2 — what it does and why it was built
  techDetails: TechDetail[]; // Slide 3 — tech with context
  uniqueness: string;     // Slide 4 — what makes it different
  impactDetails: ImpactDetail[]; // Slide 5 — richer metrics

  // ── Visuals
  // Use real image URLs when available. Placeholder gradient strings as fallback.
  images: string[];       // [0] = cover, [1-4] = per slide backgrounds

  // ── Architecture (injected by team later)
  architectureData?: ArchitectureData;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: 1,
    slug: "student-management-system",
    name: "Student Management System",
    tagline: "In the pursuit of excellence",
    category: "Education & Management",
    icon: "🎓",
    accentColor: "#3B82F6",
    gradientFrom: "#3B82F6",
    gradientTo: "#2563EB",

    techStack: [
      "React", 
      "Vite", 
      "TypeScript", 
      "Material UI", 
      "Framer Motion", 
      "Node.js", 
      "Express.js", 
      "MongoDB", 
      "OAuth", 
      "Cloudinary", 
      "Google Drive Integration"
    ],

    impact: "A comprehensive and dynamic educational management system enhancing student and admin experiences",

    liveURL: "https://www.jjinstitute.in/",

    purpose:
      "Student Management System project is designed to streamline educational administration while providing students with easy access to learning materials and personal academic records. The system enables super admins to control features, admins to manage students and sessions, and students to track their performance in a secure, progressive web application.",

    techDetails: [
      { name: "React + Vite + TypeScript", role: "For building a fast, dynamic, and type-safe frontend" },
      { name: "Material UI", role: "For consistent and responsive UI components" },
      { name: "Framer Motion", role: "To implement smooth animations and transitions" },
      { name: "Node.js + Express.js", role: "Backend server for handling requests, authentication, and business logic" },
      { name: "MongoDB", role: "Database to store student, session, attendance, and notice data" },
      { name: "OAuth", role: "For secure authentication and login systems" },
      { name: "Cloudinary", role: "For storing and managing images" },
      { name: "Google Drive Integration", role: "For uploading and managing class materials" },
    ],

    uniqueness:
      "Student Management System platform is a full-fledged education management system that combines dynamic content rendering, session management, secure OTP-based signups, and progressive web app capabilities. It empowers super admins to control features, ensures smooth student and admin interactions, and integrates third-party services like Drive and Cloudinary for enhanced functionality.",

    impactDetails: [
      { metric: "Dynamic Content", label: "Landing page updates automatically based on super admin inputs" },
      { metric: "Full Access Control", label: "Super admin can grant admin-specific access to features" },
      { metric: "Secure Signup", label: "OTP-based registration ensures high security for students" },
      { metric: "PWA Experience", label: "Smooth and responsive usage across devices as a Progressive Web App" },
    ],

    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80", // cover — server room
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1600&q=80", // purpose
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80", // tech
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1600&q=80", // uniqueness
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1600&q=80", // impact
    ],

    architectureData: jjClassesArchitecture,
  },

  {
    id: 2,
    slug: "ai-ats-resume-screening",
    name: "AI ATS",
    tagline: "AI-powered resume screening and job matching platform for smarter hiring",
    category: "AI & ML",
    icon: "◈",
    accentColor: "#10B981",
    gradientFrom: "#10B981",
    gradientTo: "#06B6D4",

    techStack: [
      "React",
      "Tailwind CSS",
      "NestJS",
      "PostgreSQL",
      "NLP"
    ],

    impact: "Automated resume scoring and intelligent job recommendations",

    liveURL: "https://ats-orpin.vercel.app/",

    purpose:
      "Recruiters often spend hours manually reviewing resumes while candidates struggle to understand why their applications fail ATS systems. This platform was built to bridge that gap by using AI to analyze resumes, generate ATS scores, and recommend relevant jobs, helping recruiters identify strong candidates faster while guiding job seekers toward better opportunities.",

    techDetails: [
      {
        name: "React + Tailwind CSS",
        role: "Responsive frontend interface for job seekers and recruiters with clean UI and smooth UX"
      },
      {
        name: "Framer Motion",
        role: "Used for smooth animations and transitions across the platform to enhance user experience"
      },
      {
        name: "NestJS",
        role: "Backend framework handling authentication, APIs, job posting, resume uploads, and ATS scoring workflows"
      },
      {
        name: "Prisma",
        role: "Type-safe ORM used to manage database models and queries"
      },
      {
        name: "PostgreSQL",
        role: "Primary relational database storing users, resumes, jobs, and ATS scoring data"
      },
      {
        name: "AI Resume Scoring Model",
        role: "Analyzes uploaded resumes and job descriptions to calculate ATS compatibility scores and recommend relevant job roles"
      }
    ],

    uniqueness:
      "The platform combines AI-based resume evaluation with a full hiring workflow. Recruiters can post jobs and automatically receive ranked candidate resumes based on ATS scores, while job seekers receive feedback on resume performance and job recommendations tailored to their skills and preferred fields.",

    impactDetails: [
      { metric: "AI", label: "resume screening and ATS score generation" },
      { metric: "Role-based", label: "authentication for recruiters and job seekers" },
      { metric: "Smart", label: "job recommendations based on resume analysis" },
      { metric: "Scalable solution", label: "can handle large volumes of resumes and jobs efficiently" },
    ],

    images: [
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=80",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1600&q=80",
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1600&q=80"
    ],

    architectureData: atsArchitecture
  },

  {
    id: 3,
    slug: "indocrypt2025",
    name: "IndoCrypt 2025",
    tagline: "Premier annual conference on cryptography and information security in India",
    category: "Cybersecurity & Events",
    icon: "🔒",
    accentColor: "#10B981",
    gradientFrom: "#10B981",
    gradientTo: "#059669",

    techStack: ["React", "Vite", "JavaScript", "Framer Motion"],
    impact: "Largest gathering of cryptography experts in India",

    liveURL: "https://www.indocrypt2025.in/",

    purpose:
      "IndoCrypt 2025 is designed to bring together researchers, practitioners, and enthusiasts in cryptography and information security. The conference facilitates knowledge sharing, networking, and collaboration, while highlighting cutting-edge research and emerging security technologies in India and worldwide.",

    techDetails: [
      { name: "React", role: "For building a responsive and interactive front-end" },
      { name: "Vite", role: "Lightning-fast build tool for development and production" },
      { name: "JavaScript", role: "Core programming language enabling dynamic content" },
      { name: "Framer Motion", role: "Adds smooth animations and transitions to UI elements" },
    ],

    uniqueness:
      "IndoCrypt 2025 is the flagship cryptography event in India, combining academic rigor with real-world application. It showcases the latest research papers, workshops, and keynote talks from international experts. With high visibility SEO, its website ensures global accessibility and maximized outreach for participants and sponsors alike.",

    impactDetails: [
      { metric: "Top SEO", label: "conference website ranks at the top of Google searches" },
      { metric: "Hundreds+", label: "research papers and projects showcased" },
      { metric: "500+", label: "participants including students, professionals, and researchers" },
    ],

    images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=80",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&q=80",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1600&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80",
    ],

    architectureData: indocryptArchitecture,
  },

  {
    id: 4,
    slug: "vaultsync",
    name: "VaultSync",
    tagline: "Zero-trust cloud data pipeline with end-to-end encryption",
    category: "Cloud & DevOps",
    icon: "⬡",
    accentColor: "#10B981",
    gradientFrom: "#10B981",
    gradientTo: "#0ECFB0",

    techStack: ["Go", "Terraform", "Vault", "GCP"],
    impact: "99.99% data integrity SLA",

    liveURL: "",

    purpose:
      "A fintech handling sensitive customer financial records needed to migrate 12TB of data across cloud providers with zero tolerance for breach or loss. VaultSync was built as a secure-by-default pipeline — every byte encrypted in transit and at rest, every transfer auditable end to end.",

    techDetails: [
      { name: "Go", role: "High-throughput pipeline workers with concurrent stream handling" },
      { name: "Terraform", role: "Infrastructure as code for reproducible multi-cloud deployment" },
      { name: "Vault", role: "Dynamic secrets and encryption-as-a-service for all data paths" },
      { name: "GCP", role: "Primary cloud target with CMEK and VPC Service Controls" },
    ],

    uniqueness:
      "VaultSync operates on a zero-trust model — no implicit trust between any services, every operation authenticated and logged. The pipeline is resumable: interrupted transfers pick up at byte-level without duplication. A full immutable audit trail is generated per transfer, accepted by financial regulators.",

    impactDetails: [
      { metric: "99.99%", label: "data integrity across all transfers" },
      { metric: "12 TB", label: "migrated with zero incidents" },
      { metric: "0", label: "security findings in third-party audit" },
    ],

    images: [
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1600&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&q=80",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80",
      "https://images.unsplash.com/photo-1560732488-6b0df240254a?w=1600&q=80",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1600&q=80",
    ],

    architectureData: undefined,
  },
];



// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectById(id: number): Project | undefined {
  return projects.find((p) => p.id === id);
}