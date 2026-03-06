import type { Branch, Commit, ExplorerNode } from "../types/fileExplorer";

// ─── Mock Trees ──────────────────────────────────────────────────────────────

const mainTree: ExplorerNode[] = [
  {
    _id: "src",
    title: "src",
    parentId: "root",
    type: "directory",
    path: "src",
    commitHash: "c3f9a1e",
    branch: "main",
    children: [
      {
        _id: "app-tsx",
        title: "App.tsx",
        parentId: "src",
        type: "file",
        path: "src/App.tsx",
        commitHash: "c3f9a1e",
        branch: "main",
        content:
          'import React from "react";\n\nexport default function App() {\n  return (\n    <div className="app">\n      <h1>Hello World</h1>\n    </div>\n  );\n}',
        metaData: {
          extension: "tsx",
          language: "TypeScript",
          mimeType: "text/typescript",
          size: 1200,
          lines: 9,
          linesHightlight: {},
        },
      } as ExplorerNode,
      {
        _id: "utils-ts",
        title: "utils.ts",
        parentId: "src",
        type: "file",
        path: "src/utils.ts",
        commitHash: "c3f9a1e",
        branch: "main",
        content:
          "export const sum = (a: number, b: number): number => a + b;\n\nexport const capitalize = (s: string): string =>\n  s.charAt(0).toUpperCase() + s.slice(1);",
        metaData: {
          extension: "ts",
          language: "TypeScript",
          mimeType: "text/typescript",
          size: 300,
          lines: 4,
          linesHightlight: {},
        },
      } as ExplorerNode,
      {
        _id: "assets",
        title: "assets",
        parentId: "src",
        type: "directory",
        path: "src/assets",
        commitHash: "c3f9a1e",
        branch: "main",
        children: [
          {
            _id: "logo-img",
            title: "logo.png",
            parentId: "assets",
            type: "file",
            path: "src/assets/logo.png",
            commitHash: "c3f9a1e",
            branch: "main",
            metaData: {
              mimeType: "image/png" as const,
              width: 512,
              height: 512,
              format: "png",
              size: 84532,
              src: "/files/assets/logo.png",
            },
          } as ExplorerNode,
          {
            _id: "intro-video",
            title: "intro.mp4",
            parentId: "assets",
            type: "file",
            path: "src/assets/intro.mp4",
            commitHash: "c3f9a1e",
            branch: "main",
            metaData: {
              mimeType: "video/mp4" as const,
              duration: 42,
              width: 1920,
              height: 1080,
              codec: "h264",
              frameRate: 30,
              size: 5242880,
              src: "/files/assets/intro.mp4",
            },
          } as ExplorerNode,
        ],
      },
    ],
  },
  {
    _id: "public",
    title: "public",
    parentId: "root",
    type: "directory",
    path: "public",
    commitHash: "c3f9a1e",
    branch: "main",
    children: [
      {
        _id: "index-html",
        title: "index.html",
        parentId: "public",
        type: "file",
        path: "public/index.html",
        commitHash: "c3f9a1e",
        branch: "main",
        content:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8" />\n  <title>My Project</title>\n</head>\n<body>\n  <div id="root"></div>\n</body>\n</html>',
        metaData: {
          mimeType: "text/html",
          size: 600,
        },
      } as ExplorerNode,
    ],
  },
  {
    _id: "package-json",
    title: "package.json",
    parentId: "root",
    type: "file",
    path: "package.json",
    commitHash: "c3f9a1e",
    branch: "main",
    content: '{\n  "name": "my-project",\n  "version": "1.0.0"\n}',
    metaData: {
      mimeType: "application/json",
      size: 420,
    },
  },
  {
    _id: "readme",
    title: "README.md",
    parentId: "root",
    type: "file",
    path: "README.md",
    commitHash: "c3f9a1e",
    branch: "main",
    content:
      "# My Project\n\nA sample project for testing the file explorer.\n\n## Getting Started\n\n```bash\nnpm install\nnpm run dev\n```\n\n## Features\n\n- Server-side rendering\n- File explorer\n- Code editor",
    metaData: {
      extension: "md",
      language: "Markdown",
      mimeType: "text/markdown",
      size: 120,
      lines: 15,
      linesHightlight: {},
    },
  },
];

const devTree: ExplorerNode[] = [
  {
    _id: "src-dev",
    title: "src",
    parentId: "root-dev",
    type: "directory",
    path: "src",
    commitHash: "a7b2d4f",
    branch: "dev",
    children: [
      {
        _id: "app-tsx-dev",
        title: "App.tsx",
        parentId: "src-dev",
        type: "file",
        path: "src/App.tsx",
        commitHash: "a7b2d4f",
        branch: "dev",
        content:
          'import React from "react";\nimport Dashboard from "./Dashboard";\n\nexport default function App() {\n  return (\n    <div className="app">\n      <Dashboard />\n    </div>\n  );\n}',
        metaData: {
          extension: "tsx",
          language: "TypeScript",
          mimeType: "text/typescript",
          size: 1400,
          lines: 10,
          linesHightlight: {},
        },
      } as ExplorerNode,
      {
        _id: "dashboard-tsx",
        title: "Dashboard.tsx",
        parentId: "src-dev",
        type: "file",
        path: "src/Dashboard.tsx",
        commitHash: "a7b2d4f",
        branch: "dev",
        status: "added",
        content:
          'import React from "react";\n\nexport default function Dashboard() {\n  return (\n    <div className="dashboard">\n      <h2>Dashboard</h2>\n      <p>Welcome to the dashboard.</p>\n    </div>\n  );\n}',
        metaData: {
          extension: "tsx",
          language: "TypeScript",
          mimeType: "text/typescript",
          size: 900,
          lines: 10,
          linesHightlight: {},
        },
      } as ExplorerNode,
      {
        _id: "utils-ts-dev",
        title: "utils.ts",
        parentId: "src-dev",
        type: "file",
        path: "src/utils.ts",
        commitHash: "a7b2d4f",
        branch: "dev",
        content:
          "export const sum = (a: number, b: number): number => a + b;\n\nexport const capitalize = (s: string): string =>\n  s.charAt(0).toUpperCase() + s.slice(1);\n\nexport const formatCurrency = (n: number): string =>\n  `$${n.toFixed(2)}`;",
        metaData: {
          extension: "ts",
          language: "TypeScript",
          mimeType: "text/typescript",
          size: 450,
          lines: 7,
          linesHightlight: {},
        },
      } as ExplorerNode,
    ],
  },
  {
    _id: "package-json-dev",
    title: "package.json",
    parentId: "root-dev",
    type: "file",
    path: "package.json",
    commitHash: "a7b2d4f",
    branch: "dev",
    content: '{\n  "name": "my-project",\n  "version": "1.1.0-dev"\n}',
    metaData: {
      mimeType: "application/json",
      size: 440,
    },
  },
  {
    _id: "readme-dev",
    title: "README.md",
    parentId: "root-dev",
    type: "file",
    path: "README.md",
    commitHash: "a7b2d4f",
    branch: "dev",
    content:
      "# My Project (dev)\n\nDevelopment branch with new dashboard feature.\n\n## What's New\n\n- Added `Dashboard` component\n- Updated `utils.ts` with `formatCurrency`",
    metaData: {
      extension: "md",
      language: "Markdown",
      mimeType: "text/markdown",
      size: 140,
      lines: 8,
      linesHightlight: {},
    },
  },
];

// ─── Mock Commits ────────────────────────────────────────────────────────────

export const mockCommits: Record<string, Commit> = {
  c3f9a1e: {
    _id: "c3f9a1e",
    message: "Initial project structure",
    author: "Youssef",
    createdAt: new Date("2026-03-01T10:00:00Z"),
    branch: "main",
    parentCommitId: undefined,
    rootNodeId: "root",
  },
  a7b2d4f: {
    _id: "a7b2d4f",
    message: "Add dashboard feature",
    author: "Youssef",
    createdAt: new Date("2026-03-03T09:30:00Z"),
    branch: "dev",
    parentCommitId: "c3f9a1e",
    rootNodeId: "root-dev",
  },
};

// ─── Mock Branches (with tree embedded) ──────────────────────────────────────

export const mockBranches: Branch[] = [
  {
    _id: "branch-main",
    name: "main",
    headCommitId: "c3f9a1e",
    commits: ["c3f9a1e"],
    createdAt: new Date("2026-03-01T10:00:00Z"),
    updatedAt: new Date("2026-03-01T10:00:00Z"),
    tree: mainTree,
  },
  {
    _id: "branch-dev",
    name: "dev",
    headCommitId: "a7b2d4f",
    commits: ["a7b2d4f"],
    createdAt: new Date("2026-03-02T14:00:00Z"),
    updatedAt: new Date("2026-03-03T09:30:00Z"),
    tree: devTree,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Walk a node tree by path segments and return the matching node,
 * or `undefined` if the path is not found.
 */
export function resolveNode(
  tree: ExplorerNode[],
  nodePath: string,
): ExplorerNode | undefined {
  if (!nodePath) return undefined;

  const segments = nodePath.split("/").filter(Boolean);
  let current: ExplorerNode | undefined;
  let children: ExplorerNode[] = tree;

  for (const segment of segments) {
    current = children.find((n) => n.title === segment);
    if (!current) return undefined;
    if (current.type === "directory") {
      children = (current.children ?? []) as ExplorerNode[];
    }
  }

  return current;
}
