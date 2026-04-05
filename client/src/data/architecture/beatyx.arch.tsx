import type { ArchitectureData } from "../../components/architecture/ProjectArchitectureView";

export const beatyxArchitecture: ArchitectureData = {
    title: "Tech Architecture",
    description: "Frontend React · Backend Node.js/Express · MongoDB · Spotify Web API · OAuth 2.0",
    nodes: [
        { id: "ui_user", type: "input", label: "User Portal", desc: "Frontend (React)" },
        { id: "api_backend", type: "default", label: "Node.js + Express Server", desc: "Backend handling APIs and auth" },
        { id: "spotify_api", type: "default", label: "Spotify Web API", desc: "Fetches music, playlists, and artist data" },
        { id: "auth_oauth", type: "default", label: "OAuth 2.0", desc: "Secure authentication system" },
        { id: "db_mongo", type: "output", label: "MongoDB", desc: "Stores user, playlist, and session data" },
    ],
    edges: [
        { id: "e1", from: "ui_user", to: "api_backend" },
        { id: "e2", from: "api_backend", to: "spotify_api" },
        { id: "e3", from: "api_backend", to: "auth_oauth" },
        { id: "e4", from: "api_backend", to: "db_mongo" },
        { id: "e5", from: "spotify_api", to: "db_mongo" },
    ],
}