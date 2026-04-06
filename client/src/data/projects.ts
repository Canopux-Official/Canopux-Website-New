import type { Node, Edge } from '@xyflow/react'
import { indocryptArchitecture } from "./architecture/indocrypt.arch";
import { jjClassesArchitecture } from './architecture/jjclasses.arch';
import { atsArchitecture } from './architecture/ats.arch';
import type { ArchitectureData } from "../components/architecture/ProjectArchitectureView";
import { autoCheckArchitecture } from './architecture/autocheck.arch';
import { beatyxArchitecture } from './architecture/beatyx.arch';
import { constructArchitecture } from './architecture/construct.arch';

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

    liveURL: "https://sms-canopux-18ui.vercel.app/",

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
    slug: "BuildCentral",
    name: "BuildCentral",
    tagline: "All Construction Project Management in One Place",
    category: "Construction & Management",
    icon: "🏗️",
    accentColor: "#2563EB",
    gradientFrom: "#3B82F6",
    gradientTo: "#1E40AF",

    techStack: [
      "React",
      "Tailwind CSS",
      "Chart.js",
      "TypeScript",
    ],

    impact: "A centralized platform consolidating project, resource, labor, document, client communication, and budget management dashboards for construction projects.",

    liveURL: "https://buildmaster-hub.vercel.app/",

    purpose:
      "Unified Construction Dashboard merges six core modules—Project Management, Resource & Inventory, Labor Management, Document & Compliance, Client Communication, and Cost & Budget Management—into a single cohesive platform. Each module is a feature, accessible via the navbar, enabling seamless construction project oversight and decision-making.",

    techDetails: [
      { name: "React + TypeScript", role: "For a dynamic and type-safe frontend" },
      { name: "Tailwind CSS", role: "For consistent, responsive UI styling" },
      { name: "Chart.js", role: "Interactive charts for data visualization across modules" },
    ],

    uniqueness:
      "Unlike separate dashboards, this platform unifies all major construction management aspects under one interface. Each module is feature-driven, ensuring smooth transitions, centralized control, and modular scalability.",

    impactDetails: [
      { metric: "Project Management", label: "Track tasks, milestones, and timelines with interactive cards and Gantt charts" },
      { metric: "Resource Management", label: "Monitor materials, stock levels, and low-stock alerts efficiently" },
      { metric: "Labor Management", label: "Manage attendance, payroll, and task assignments with real-time updates" },
      { metric: "Document Management", label: "Track contracts, blueprints, and compliance documents with version control" },
      { metric: "Client Communication", label: "Provide real-time updates, milestone tracking, and secure document sharing" },
      { metric: "Cost & Budget Management", label: "Visualize expenses, budgets, and live updates with interactive charts" },
    ],

    images: [
      "https://images.unsplash.com/photo-1581090700227-6ec12d449f4c?w=1600&q=80",
      "https://images.unsplash.com/photo-1581091870622-8122b8030f6c?w=1600&q=80",
      "https://images.unsplash.com/photo-1581090469130-2b0a04f3f23f?w=1600&q=80",
      "https://images.unsplash.com/photo-1581091870296-fb28fefaa1a4?w=1600&q=80",
      "https://images.unsplash.com/photo-1581090469152-6b4e1f8b1f88?w=1600&q=80",
    ],

    architectureData: constructArchitecture,
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
    slug: "auto-check",
    name: "Auto Check",
    tagline: "Smart Vehicle Verification, Simplified",
    category: "Automobile & Safety",
    icon: "🚗",
    accentColor: "#EF4444",
    gradientFrom: "#EF4444",
    gradientTo: "#B91C1C",

    techStack: [
      "React",
      "Vite",
      "TypeScript",
      "Supabase",
      // Google Sign-In to be added later
    ],

    impact: "A platform to detect scams, tampered odometers, and hidden accidents before buying a used vehicle.",

    liveURL: "https://auto-check-theta.vercel.app/",

    purpose:
      "Auto Check allows users to upload a vehicle ID to retrieve detailed information about the vehicle, including accident history, actual market price (AI-based, under development), and registration details. Users can also register new vehicles securely.",

    techDetails: [
      { name: "React + Vite + TypeScript", role: "For building a fast, type-safe, and dynamic frontend" },
      { name: "Supabase", role: "Backend as a service for database, authentication, and hosting" },
      { name: "Google Sign-In (coming)", role: "Future integration for secure and fast user login" },
    ],

    uniqueness:
      "Auto Check uniquely combines vehicle ID verification with AI-powered market price predictions (under development), accident history detection, and tamper detection in a user-friendly Progressive Web App interface.",

    impactDetails: [
      { metric: "Vehicle Verification", label: "Get detailed vehicle history using uploaded ID" },
      { metric: "Accident Detection", label: "Detect hidden accidents and tampered odometers" },
      { metric: "AI Price Estimation", label: "Predicts current market value of the vehicle (under development)" },
      { metric: "Vehicle Registration", label: "Users can register new vehicles securely" },
    ],
    images: [
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=1600&q=80",
      "https://images.unsplash.com/photo-1585852125037-9a3b1f07b5f5?w=1600&q=80",
      "https://images.unsplash.com/photo-1616627562486-fd65f8230a19?w=1600&q=80",
      "https://images.unsplash.com/photo-1606813903372-0db69eb2a5b3?w=1600&q=80",
      "https://images.unsplash.com/photo-1563720224438-507c2a9e9886?w=1600&q=80",
    ],

    architectureData: autoCheckArchitecture
  },
  {
    id: 5,
    slug: "beatyx",
    name: "Beatyx - Beat The Bits",
    tagline: "Elevate your music streaming experience 🎵",
    category: "Music & Entertainment",
    icon: "🎧",
    accentColor: "#1DB954",
    gradientFrom: "#1DB954",
    gradientTo: "#14833b",

    techStack: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6)",
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Spotify Web API",
      "OAuth 2.0"
    ],

    impact: "A full-stack music streaming platform allowing users to explore playlists, stream tracks seamlessly, and discover trending songs in real-time.",

    liveURL: "https://beatyx.vercel.app/",

    purpose:
      "Beatyx enables users to stream music, manage playlists, and search for tracks, albums, and artists via Spotify integration. It provides a secure login using OAuth 2.0 and a smooth backend-to-frontend communication with REST APIs.",

    techDetails: [
      { name: "React", role: "Frontend framework for interactive UI" },
      { name: "Node.js + Express.js", role: "Backend server handling routes, APIs, and authentication" },
      { name: "MongoDB", role: "Database for user and playlist management" },
      { name: "Spotify Web API", role: "Fetches and manages music, playlists, and artist data" },
      { name: "OAuth 2.0", role: "Secure authentication for user login and session management" },
    ],

    uniqueness:
      "Beatyx combines real-time trending music, secure Spotify integration, dynamic playlist management, and offline-ready streaming, offering a personalized and immersive music experience.",

    impactDetails: [
      { metric: "Dynamic Streaming", label: "Seamlessly stream music globally without interruptions or ads" },
      { metric: "Trending Songs", label: "Access real-time trending music in India and worldwide" },
      { metric: "Search & Discovery", label: "Powerful search to discover artists, albums, and playlists" },
      { metric: "Secure OAuth Login", label: "Safe authentication and session persistence" },
      { metric: "REST APIs", label: "Smooth communication between frontend and backend" },
    ],

    images: [
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1600&q=80",
      "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=1600&q=80",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1600&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&q=80",
      "https://images.unsplash.com/photo-1511671782779-1f9f7d2e7f8e?w=1600&q=80",
    ],

    architectureData: beatyxArchitecture,
  },
  {
    id: 6,
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
]



// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectById(id: number): Project | undefined {
  return projects.find((p) => p.id === id);
}