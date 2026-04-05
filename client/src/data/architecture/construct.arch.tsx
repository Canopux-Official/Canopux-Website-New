import type { ArchitectureData } from "../../components/architecture/ProjectArchitectureView";

export const constructArchitecture: ArchitectureData = {
    title: "Tech Architecture",
    description: "Unified React Frontend · Feature Modules · Tailwind CSS · Chart.js · TypeScript",
    nodes: [
        { id: "ui_project", type: "input", label: "Project Management Module", desc: "Tasks, timelines, Gantt charts" },
        { id: "ui_resource", type: "input", label: "Resource & Inventory Module", desc: "Stock, orders, alerts" },
        { id: "ui_labor", type: "input", label: "Labor Management Module", desc: "Attendance, payroll, tasks" },
        { id: "ui_document", type: "input", label: "Document & Compliance Module", desc: "Contracts, blueprints, approvals" },
        { id: "ui_client", type: "input", label: "Client Communication Module", desc: "Milestones, chat, notifications" },
        { id: "ui_budget", type: "input", label: "Cost & Budget Module", desc: "Expenses, charts, live updates" },
        { id: "api_chart", type: "default", label: "Chart.js Engine", desc: "Render interactive charts for all modules" },
    ],
    edges: [
        { id: "e1", from: "ui_project", to: "api_chart" },
        { id: "e2", from: "ui_resource", to: "api_chart" },
        { id: "e3", from: "ui_labor", to: "api_chart" },
        { id: "e4", from: "ui_document", to: "api_chart" },
        { id: "e5", from: "ui_client", to: "api_chart" },
        { id: "e6", from: "ui_budget", to: "api_chart" },
    ],
}