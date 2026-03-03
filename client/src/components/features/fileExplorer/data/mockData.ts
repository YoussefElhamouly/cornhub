import type { Branch, Commit, FileTreeNode } from "../types/fileExplorer";

// ─── Commits ──────────────────────────────────────────────────────────────────

const mainCommits: Commit[] = [
  {
    hash: "a1b2c3d4e5f6789012345678901234567890abcd",
    shortHash: "a1b2c3d",
    message: "feat: add video player integration with Plyr",
    author: "Youssef Elhamouly",
    date: "2026-02-28T14:22:00Z",
  },
  {
    hash: "b2c3d4e5f678901234567890123456789012bcde",
    shortHash: "b2c3d4e",
    message: "refactor: migrate ExplorerContent to typed props",
    author: "Youssef Elhamouly",
    date: "2026-02-25T10:05:00Z",
  },
  {
    hash: "c3d4e5f67890123456789012345678901234cdef",
    shortHash: "c3d4e5f",
    message: "chore: add README and repo boilerplate",
    author: "Youssef Elhamouly",
    date: "2026-02-20T08:00:00Z",
  },
];

const developCommits: Commit[] = [
  {
    hash: "d4e5f6789012345678901234567890123456defa",
    shortHash: "d4e5f67",
    message: "feat: implement wildcard routing for file explorer",
    author: "Youssef Elhamouly",
    date: "2026-03-02T09:15:00Z",
  },
  {
    hash: "e5f678901234567890123456789012345678efab",
    shortHash: "e5f6789",
    message: "wip: redesign ExplorerContent header metadata",
    author: "Youssef Elhamouly",
    date: "2026-03-01T17:40:00Z",
  },
  {
    hash: "f6789012345678901234567890123456789fabcd",
    shortHash: "f678901",
    message: "fix: breadcrumb path normalization edge cases",
    author: "Youssef Elhamouly",
    date: "2026-02-28T12:30:00Z",
  },
];

// ─── Mock File Content ────────────────────────────────────────────────────────

const buttonContent = `import React from "react";
import styles from "./Button.module.scss";
import Icon from "@/components/ui/media/icon/Icon";

interface ButtonProps {
  title?: string;
  icon?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button = ({
  title,
  icon,
  onClick,
  disabled = false,
  className = "",
}: ButtonProps) => {
  return (
    <button
      className={\`\${styles.btn} \${className}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <Icon icon={icon} size={16} />}
      {title && <span>{title}</span>}
    </button>
  );
};

export default Button;
`;

const useAuthContent = `import { useState, useEffect, useCallback } from "react";

interface AuthState {
  user: { id: string; username: string; email: string } | null;
  isLoading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  const login = useCallback(async (email: string, password: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Invalid credentials");
      const user = await res.json();
      setState({ user, isLoading: false, error: null });
    } catch (err: any) {
      setState({ user: null, isLoading: false, error: err.message });
    }
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setState({ user: null, isLoading: false, error: null });
  }, []);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((user) => setState({ user, isLoading: false, error: null }))
      .catch(() => setState({ user: null, isLoading: false, error: null }));
  }, []);

  return { ...state, login, logout };
};
`;

const indexCssContent = `/* ─── Global Reset ─────────────────────────── */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ─── CSS Custom Properties ─────────────────── */
:root {
  --primary-bg: #0d1117;
  --secondary-bg: #161b22;
  --tertiary-bg: #21262d;
  --border: #30363d;
  --text-primary: #e6edf3;
  --text-secondary: #8b949e;
  --accent: #eba537;
  --accent-hover: #f0b83d;
  --success: #22c55e;
  --danger: #ef4444;
  --font-mono: "JetBrains Mono", "Fira Code", monospace;
}

/* ─── Base ───────────────────────────────────── */
body {
  background-color: var(--primary-bg);
  color: var(--text-primary);
  font-family: "Inter", system-ui, sans-serif;
  min-height: 100dvh;
  line-height: 1.6;
}
`;

const serverJsContent = `import express from "express";
import cors from "cors";
import helmet from "helmet";
import { mongoConnect } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(helmet());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

mongoConnect().then(() => {
  app.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
  });
});
`;

const readmeContent = `# CornHub

A GitHub-inspired collaborative code hosting platform built with Next.js and Express.

## Features
- Repository management
- File explorer with deep linking
- Commit history
- Branch management
- Code review with diff highlighting

## Stack
- **Frontend**: Next.js 15, TypeScript, SCSS Modules
- **Backend**: Node.js, Express, MongoDB
- **Code Editor**: Monaco Editor
- **Video**: Plyr.js

## Getting Started

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.
`;

// ─── Main Branch Tree ─────────────────────────────────────────────────────────

const mainTree: FileTreeNode[] = [
  {
    name: "src",
    path: "src",
    type: "folder",
    children: [
      {
        name: "components",
        path: "src/components",
        type: "folder",
        children: [
          {
            name: "Button.tsx",
            path: "src/components/Button.tsx",
            type: "file",
            size: 892,
            language: "typescript",
            content: buttonContent,
            status: "modified",
          },
          {
            name: "Card.tsx",
            path: "src/components/Card.tsx",
            type: "file",
            size: 430,
            language: "typescript",
            content: `import React from "react";\n\nconst Card = ({ children }: { children: React.ReactNode }) => (\n  <div className="card">{children}</div>\n);\n\nexport default Card;\n`,
          },
          {
            name: "Modal.tsx",
            path: "src/components/Modal.tsx",
            type: "file",
            size: 544,
            language: "typescript",
            content: `import React from "react";\n\nconst Modal = ({ isOpen, onClose, children }: any) => {\n  if (!isOpen) return null;\n  return (\n    <div className="modal-overlay" onClick={onClose}>\n      <div className="modal" onClick={(e) => e.stopPropagation()}>\n        {children}\n      </div>\n    </div>\n  );\n};\n\nexport default Modal;\n`,
          },
          {
            name: "banner.jpg",
            path: "src/components/banner.jpg",
            type: "image",
            size: 245120,
            src: "/images/amity.jpg",
          },
        ],
      },
      {
        name: "hooks",
        path: "src/hooks",
        type: "folder",
        children: [
          {
            name: "useAuth.ts",
            path: "src/hooks/useAuth.ts",
            type: "file",
            size: 1240,
            language: "typescript",
            content: useAuthContent,
          },
          {
            name: "useOutsideClick.ts",
            path: "src/hooks/useOutsideClick.ts",
            type: "file",
            size: 380,
            language: "typescript",
            content: `import { useEffect, RefObject } from "react";\n\nexport const useOutsideClick = <T extends HTMLElement>(\n  ref: RefObject<T>,\n  handler: () => void\n) => {\n  useEffect(() => {\n    const listener = (e: MouseEvent) => {\n      if (!ref.current || ref.current.contains(e.target as Node)) return;\n      handler();\n    };\n    document.addEventListener("mousedown", listener);\n    return () => document.removeEventListener("mousedown", listener);\n  }, [ref, handler]);\n};\n`,
            status: "modified",
          },
        ],
      },
      {
        name: "index.css",
        path: "src/index.css",
        type: "file",
        size: 1890,
        language: "css",
        content: indexCssContent,
        status: "modified",
      },
      {
        name: "App.tsx",
        path: "src/App.tsx",
        type: "file",
        size: 620,
        language: "typescript",
        content: `import React from "react";\nimport { BrowserRouter, Routes, Route } from "react-router-dom";\nimport HomePage from "./pages/HomePage";\n\nconst App = () => (\n  <BrowserRouter>\n    <Routes>\n      <Route path="/" element={<HomePage />} />\n    </Routes>\n  </BrowserRouter>\n);\n\nexport default App;\n`,
      },
    ],
  },
  {
    name: "server",
    path: "server",
    type: "folder",
    children: [
      {
        name: "routes",
        path: "server/routes",
        type: "folder",
        children: [
          {
            name: "auth.js",
            path: "server/routes/auth.js",
            type: "file",
            size: 760,
            language: "javascript",
            content: `import { Router } from "express";\nimport { login, logout, me } from "../controllers/auth.js";\nimport { protect } from "../middleware/protect.js";\n\nconst router = Router();\n\nrouter.post("/login", login);\nrouter.post("/logout", logout);\nrouter.get("/me", protect, me);\n\nexport default router;\n`,
          },
          {
            name: "projects.js",
            path: "server/routes/projects.js",
            type: "file",
            size: 540,
            language: "javascript",
            content: `import { Router } from "express";\nimport { getProjects, createProject } from "../controllers/projects.js";\nimport { protect } from "../middleware/protect.js";\n\nconst router = Router();\n\nrouter.get("/", protect, getProjects);\nrouter.post("/", protect, createProject);\n\nexport default router;\n`,
          },
        ],
      },
      {
        name: "server.js",
        path: "server/server.js",
        type: "file",
        size: 720,
        language: "javascript",
        content: serverJsContent,
      },
      {
        name: "demo.mp4",
        path: "server/demo.mp4",
        type: "video",
        size: 8_500_000,
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
        status: "added",
      },
    ],
  },
  {
    name: "README.md",
    path: "README.md",
    type: "file",
    size: 870,
    language: "markdown",
    content: readmeContent,
  },
  {
    name: "preview.png",
    path: "preview.png",
    type: "image",
    size: 512000,
    src: "/images/amity.jpg",
    status: "added",
  },
];

// ─── Develop Branch Tree (different structure) ────────────────────────────────

const developTree: FileTreeNode[] = [
  {
    name: "client",
    path: "client",
    type: "folder",
    children: [
      {
        name: "src",
        path: "client/src",
        type: "folder",
        children: [
          {
            name: "app",
            path: "client/src/app",
            type: "folder",
            children: [
              {
                name: "page.tsx",
                path: "client/src/app/page.tsx",
                type: "file",
                size: 310,
                language: "typescript",
                content: `import React from "react";\n\nexport default function Home() {\n  return (\n    <main>\n      <h1>Welcome to CornHub</h1>\n    </main>\n  );\n}\n`,
                status: "modified",
              },
              {
                name: "layout.tsx",
                path: "client/src/app/layout.tsx",
                type: "file",
                size: 480,
                language: "typescript",
                content: `import type { Metadata } from "next";\nimport "./globals.css";\n\nexport const metadata: Metadata = {\n  title: "CornHub",\n  description: "A collaborative code hosting platform",\n};\n\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang="en">\n      <body>{children}</body>\n    </html>\n  );\n}\n`,
              },
            ],
          },
          {
            name: "components",
            path: "client/src/components",
            type: "folder",
            children: [
              {
                name: "FileExplorer",
                path: "client/src/components/FileExplorer",
                type: "folder",
                children: [
                  {
                    name: "FileExplorer.tsx",
                    path: "client/src/components/FileExplorer/FileExplorer.tsx",
                    type: "file",
                    size: 2200,
                    language: "typescript",
                    content: `// New wildcard-routing FileExplorer\n"use client"\nimport React from "react";\n// ... (develop branch version)\nexport default function FileExplorer() {\n  return <div>FileExplorer (develop)</div>;\n}\n`,
                    status: "modified",
                  },
                ],
              },
            ],
          },
          {
            name: "globals.css",
            path: "client/src/globals.css",
            type: "file",
            size: 620,
            language: "css",
            content: `@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap");\n\nbody {\n  font-family: "Inter", sans-serif;\n  background: #0d1117;\n  color: #e6edf3;\n}\n`,
          },
        ],
      },
      {
        name: "package.json",
        path: "client/package.json",
        type: "file",
        size: 820,
        language: "json",
        content: `{\n  "name": "cornhub-client",\n  "version": "0.2.0",\n  "scripts": {\n    "dev": "next dev",\n    "build": "next build",\n    "start": "next start"\n  },\n  "dependencies": {\n    "next": "15.0.0",\n    "react": "^18.0.0",\n    "@monaco-editor/react": "^4.6.0"\n  }\n}\n`,
        status: "modified",
      },
    ],
  },
  {
    name: "server",
    path: "server",
    type: "folder",
    children: [
      {
        name: "index.js",
        path: "server/index.js",
        type: "file",
        size: 800,
        language: "javascript",
        content: serverJsContent,
      },
    ],
  },
  {
    name: "assets",
    path: "assets",
    type: "folder",
    children: [
      {
        name: "logo.png",
        path: "assets/logo.png",
        type: "image",
        size: 98304,
        src: "/images/amity.jpg",
        status: "added",
      },
      {
        name: "walkthrough.mp4",
        path: "assets/walkthrough.mp4",
        type: "video",
        size: 12_000_000,
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
        status: "added",
      },
    ],
  },
  {
    name: "CONTRIBUTING.md",
    path: "CONTRIBUTING.md",
    type: "file",
    size: 530,
    language: "markdown",
    content: `# Contributing to CornHub\n\n## How to Contribute\n\n1. Fork the repository\n2. Create a feature branch: \`git checkout -b feat/your-feature\`\n3. Commit your changes: \`git commit -m "feat: add your feature"\`\n4. Push and open a Pull Request\n\n## Code Style\n- TypeScript strict mode\n- ESLint + Prettier\n- SCSS Modules for styling\n`,
  },
  {
    name: "README.md",
    path: "README.md",
    type: "file",
    size: 870,
    language: "markdown",
    content: readmeContent,
  },
];

// ─── Branches ─────────────────────────────────────────────────────────────────

export const BRANCHES: Record<string, Branch> = {
  main: {
    name: "main",
    latestCommit: mainCommits[0],
    commits: mainCommits,
    tree: mainTree,
  },
  develop: {
    name: "develop",
    latestCommit: developCommits[0],
    commits: developCommits,
    tree: developTree,
  },
};

export const DEFAULT_BRANCH = "main";

// ─── Helper Utilities ─────────────────────────────────────────────────────────

/**
 * Walk a tree to find the node at `nodePath`.
 * An empty / undefined path returns a virtual root node.
 */
export function getNodeByPath(
  branchName: string,
  nodePath: string,
): FileTreeNode | undefined {
  const branch = BRANCHES[branchName];
  if (!branch) return undefined;

  const cleaned = nodePath.replace(/^\/|\/$/g, "");
  if (!cleaned) {
    // Return a synthetic root node so callers can handle the root uniformly
    return {
      name: "root",
      path: "",
      type: "folder",
      children: branch.tree,
    };
  }

  const parts = cleaned.split("/");

  function walk(
    nodes: FileTreeNode[],
    depth: number,
  ): FileTreeNode | undefined {
    const target = nodes.find((n) => n.name === parts[depth]);
    if (!target) return undefined;
    if (depth === parts.length - 1) return target;
    if (target.type === "folder" && target.children) {
      return walk(target.children, depth + 1);
    }
    return undefined;
  }

  return walk(branch.tree, 0);
}

/** Get the latest commit for a branch */
export function getLatestCommit(
  branchName: string,
): import("../types/fileExplorer").Commit {
  const branch = BRANCHES[branchName] ?? BRANCHES[DEFAULT_BRANCH];
  return branch.latestCommit;
}

/** Get a commit by hash, or fall back to latest */
export function getCommitByHash(
  branchName: string,
  hash: string,
): import("../types/fileExplorer").Commit {
  const branch = BRANCHES[branchName] ?? BRANCHES[DEFAULT_BRANCH];
  return (
    branch.commits.find((c) => c.hash === hash || c.shortHash === hash) ??
    branch.latestCommit
  );
}

/** Format bytes into a human-readable string */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Infer language for Monaco Editor from file extension */
export function inferLanguage(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  const map: Record<string, string> = {
    ts: "typescript",
    tsx: "typescript",
    js: "javascript",
    jsx: "javascript",
    json: "json",
    css: "css",
    scss: "scss",
    md: "markdown",
    html: "html",
    py: "python",
    sh: "shell",
    yaml: "yaml",
    yml: "yaml",
    env: "plaintext",
  };
  return map[ext] ?? "plaintext";
}

/** Format an ISO date string to a relative human-readable label */
export function formatRelativeDate(isoDate: string): string {
  const now = new Date();
  const date = new Date(isoDate);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}
