import { ComponentType } from "react";

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
  impact: string;         // single-line for card

  // ── Detail view fields (new)
  purpose: string;        // Slide 2 — what it does and why it was built
  techDetails: TechDetail[]; // Slide 3 — tech with context
  uniqueness: string;     // Slide 4 — what makes it different
  impactDetails: ImpactDetail[]; // Slide 5 — richer metrics

  // ── Visuals
  // Use real image URLs when available. Placeholder gradient strings as fallback.
  images: string[];       // [0] = cover, [1-4] = per slide backgrounds

  // ── Architecture (injected by team later)
  architectureComponent?: ComponentType;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: 1,
    slug: "neuralops",
    name: "NeuralOps",
    tagline: "AI-powered infrastructure monitoring with predictive failure detection",
    category: "AI & ML",
    icon: "⬡",
    accentColor: "#0ECFB0",
    gradientFrom: "#0ECFB0",
    gradientTo: "#0891B2",

    techStack: ["Python", "TensorFlow", "Kubernetes", "Grafana"],
    impact: "40% reduction in downtime",

    purpose:
      "Enterprise infrastructure teams were reacting to failures after they happened — losing hours to diagnostics and unplanned outages. NeuralOps was built to shift that posture from reactive to predictive, using ML models trained on historical metrics to surface failure signals before they cascade.",

    techDetails: [
      { name: "Python", role: "Core ML pipeline and data preprocessing" },
      { name: "TensorFlow", role: "LSTM models for time-series anomaly detection" },
      { name: "Kubernetes", role: "Orchestrates distributed monitoring agents across clusters" },
      { name: "Grafana", role: "Real-time alerting dashboards consumed by ops teams" },
    ],

    uniqueness:
      "Unlike threshold-based monitors, NeuralOps learns normal behaviour per service and flags deviations contextually. It correlates signals across layers — CPU, memory, network, and application logs — to pinpoint root cause rather than symptoms. The system self-improves with every resolved incident.",

    impactDetails: [
      { metric: "40%", label: "reduction in unplanned downtime" },
      { metric: "3.1×", label: "faster mean time to resolution" },
      { metric: "89%", label: "prediction accuracy on failure events" },
    ],

    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80", // cover — server room
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1600&q=80", // purpose
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80", // tech
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1600&q=80", // uniqueness
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1600&q=80", // impact
    ],

    architectureComponent: undefined,
  },

  {
    id: 2,
    slug: "flowcart",
    name: "FlowCart",
    tagline: "High-conversion e-commerce platform built for scale and speed",
    category: "Web Development",
    icon: "◈",
    accentColor: "#6366F1",
    gradientFrom: "#6366F1",
    gradientTo: "#8B5CF6",

    techStack: ["Next.js", "Node.js", "PostgreSQL", "Redis"],
    impact: "3.2× increase in conversions",

    purpose:
      "A mid-market retail brand was losing 60% of mobile visitors at checkout due to sluggish load times and a fragmented purchase flow. FlowCart was engineered from scratch as a headless commerce platform with sub-second page loads and a checkout experience reduced to three taps.",

    techDetails: [
      { name: "Next.js", role: "SSR and ISR for instant storefront page loads" },
      { name: "Node.js", role: "Order management and payment orchestration API" },
      { name: "PostgreSQL", role: "Transactional data with full ACID compliance" },
      { name: "Redis", role: "Session caching and cart state across devices" },
    ],

    uniqueness:
      "FlowCart's checkout is a single persistent drawer — never a redirect, never a page reload. Cart state syncs in real time across devices. The recommendation engine runs at the edge, personalising product order per visitor without a backend round-trip. PageSpeed Insights score: 98.",

    impactDetails: [
      { metric: "3.2×", label: "increase in completed purchases" },
      { metric: "0.8s", label: "average time to interactive on mobile" },
      { metric: "54%", label: "drop in cart abandonment rate" },
    ],

    images: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600&q=80",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1600&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80",
    ],

    architectureComponent: undefined,
  },

  {
    id: 3,
    slug: "pulsehr",
    name: "PulseHR",
    tagline: "Intelligent HR automation suite with real-time workforce analytics",
    category: "App Development",
    icon: "◎",
    accentColor: "#F59E0B",
    gradientFrom: "#F59E0B",
    gradientTo: "#EF4444",

    techStack: ["React Native", "FastAPI", "MongoDB", "AWS"],
    impact: "60% faster hiring cycle",

    purpose:
      "A 2,000-person organisation was managing hiring across spreadsheets, email threads, and three disconnected tools. PulseHR unified the full employee lifecycle — from job posting to offboarding — in a single cross-platform application with automated workflows and live analytics.",

    techDetails: [
      { name: "React Native", role: "Single codebase for iOS, Android, and web HR portal" },
      { name: "FastAPI", role: "High-throughput async API for workflow automation" },
      { name: "MongoDB", role: "Flexible document model for varied HR record structures" },
      { name: "AWS", role: "Lambda-based automations and S3 document management" },
    ],

    uniqueness:
      "PulseHR's workflow engine is no-code — HR teams build custom approval chains, onboarding sequences, and review cycles via a drag-and-drop canvas. The analytics layer detects attrition risk 90 days in advance using engagement signal modelling, giving managers time to act.",

    impactDetails: [
      { metric: "60%", label: "faster end-to-end hiring cycle" },
      { metric: "90 days", label: "advance attrition risk detection" },
      { metric: "4.8/5", label: "employee satisfaction with onboarding" },
    ],

    images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=80",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&q=80",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1600&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80",
    ],

    architectureComponent: undefined,
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

    architectureComponent: undefined,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectById(id: number): Project | undefined {
  return projects.find((p) => p.id === id);
}