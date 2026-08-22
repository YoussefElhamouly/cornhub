import React from "react";
import FileExplorer from "@/components/features/fileExplorer/FileExplorerClient";
import { ExplorerDataProvider } from "@/components/features/fileExplorer/components/contexts/ExplorerDataContext";
import {
  Branch,
  Commit,
} from "@/components/features/fileExplorer/types/fileExplorer";
import Wrapper from "@/components/layouts/wrapper/Wrapper";
interface ChangesPageProps {
  params: Promise<{
    username: string;
    project: string;
    type: string;
    id: string;
  }>;
}

export default async function ChangesPage({ params }: ChangesPageProps) {
  const { username, project, type, id } = await params;

  const res = await new Promise<{ branches: Branch[]; commits: Commit[] }>(
    (resolve) => {
      setTimeout(() => {
        resolve({
          branches: [
            {
              _id: "branch-main",
              name: "main",
              headCommitId: "c9f1eaa",
              createdAt: new Date("2026-03-01T10:00:00.000Z"),
              updatedAt: new Date("2026-03-05T12:00:00.000Z"),
            },
            {
              _id: "branch-dev",
              name: "dev",
              headCommitId: "d12ab77",
              createdAt: new Date("2026-03-02T14:00:00.000Z"),
              updatedAt: new Date("2026-03-06T16:20:00.000Z"),
            },
          ],

          commits: [
            {
              _id: "c9f1eaa",
              message: "Fullstack base setup (client + server + shared)",
              author: "Youssef",
              createdAt: new Date("2026-03-05T12:00:00.000Z"),
              parentCommitId: null,
              rootNodeId: "root",
              tree: [
                {
                  _id: "src",
                  title: "src",
                  parentId: "root",
                  type: "directory",
                  path: "src",
                  commitHash: "c9f1eaa",
                  branch: "main",
                  children: [
                    // ================= CLIENT =================
                    {
                      _id: "client",
                      title: "client",
                      parentId: "src",
                      type: "directory",
                      path: "src/client",
                      commitHash: "c9f1eaa",
                      branch: "main",
                      children: [
                        {
                          _id: "app",
                          title: "App.tsx",
                          parentId: "client",
                          type: "file",
                          path: "src/client/App.tsx",
                          commitHash: "c9f1eaa",
                          branch: "main",
                          content: `
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
                        `,
                          metaData: {
                            extension: "tsx",
                            language: "TypeScript",
                            mimeType: "text/typescript",
                          },
                        },
                        {
                          _id: "pages",
                          title: "pages",
                          parentId: "client",
                          type: "directory",
                          path: "src/client/pages",
                          commitHash: "c9f1eaa",
                          branch: "main",
                          children: [
                            {
                              _id: "home",
                              title: "Home.tsx",
                              parentId: "pages",
                              type: "file",
                              path: "src/client/pages/Home.tsx",
                              commitHash: "c9f1eaa",
                              branch: "main",
                              content: `
export default function Home() {
  return <h1>Home Page</h1>;
}
                            `,
                              metaData: {
                                extension: "tsx",
                                language: "TypeScript",
                                mimeType: "text/typescript",
                              },
                            },
                            {
                              _id: "dashboard",
                              title: "Dashboard.tsx",
                              parentId: "pages",
                              type: "file",
                              path: "src/client/pages/Dashboard.tsx",
                              commitHash: "c9f1eaa",
                              branch: "main",
                              content: `
import { useEffect, useState } from "react";
import { getStats } from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getStats().then(setStats);
  }, []);

  return <pre>{JSON.stringify(stats, null, 2)}</pre>;
}
                            `,
                              metaData: {
                                extension: "tsx",
                                language: "TypeScript",
                                mimeType: "text/typescript",
                              },
                            },
                          ],
                        },
                        {
                          _id: "services",
                          title: "services",
                          parentId: "client",
                          type: "directory",
                          path: "src/client/services",
                          commitHash: "c9f1eaa",
                          branch: "main",
                          children: [
                            {
                              _id: "api",
                              title: "api.ts",
                              parentId: "services",
                              type: "file",
                              path: "src/client/services/api.ts",
                              commitHash: "c9f1eaa",
                              branch: "main",
                              content: `
export async function getStats() {
  const res = await fetch("/api/stats");
  return res.json();
}
                            `,
                              metaData: {
                                extension: "ts",
                                language: "TypeScript",
                                mimeType: "text/typescript",
                              },
                            },
                          ],
                        },
                      ],
                    },

                    // ================= SERVER =================
                    {
                      _id: "server",
                      title: "server",
                      parentId: "src",
                      type: "directory",
                      path: "src/server",
                      commitHash: "c9f1eaa",
                      branch: "main",
                      children: [
                        {
                          _id: "index",
                          title: "index.ts",
                          parentId: "server",
                          type: "file",
                          path: "src/server/index.ts",
                          commitHash: "c9f1eaa",
                          branch: "main",
                          content: `
import express from "express";
import statsRouter from "./routes/stats";

const app = express();
app.use(express.json());

app.use("/api/stats", statsRouter);

app.listen(3000, () => console.log("Server running"));
                        `,
                          metaData: {
                            extension: "ts",
                            language: "TypeScript",
                            mimeType: "text/typescript",
                          },
                        },
                        {
                          _id: "routes",
                          title: "routes",
                          parentId: "server",
                          type: "directory",
                          path: "src/server/routes",
                          commitHash: "c9f1eaa",
                          branch: "main",
                          children: [
                            {
                              _id: "statsRoute",
                              title: "stats.ts",
                              parentId: "routes",
                              type: "file",
                              path: "src/server/routes/stats.ts",
                              commitHash: "c9f1eaa",
                              branch: "main",
                              content: `
import { Router } from "express";
import { getStatsService } from "../services/statsService";

const router = Router();

router.get("/", async (_, res) => {
  const data = await getStatsService();
  res.json(data);
});

export default router;
                            `,
                              metaData: {
                                extension: "ts",
                                language: "TypeScript",
                                mimeType: "text/typescript",
                              },
                            },
                          ],
                        },
                        {
                          _id: "services-server",
                          title: "services",
                          parentId: "server",
                          type: "directory",
                          path: "src/server/services",
                          commitHash: "c9f1eaa",
                          branch: "main",
                          children: [
                            {
                              _id: "statsService",
                              title: "statsService.ts",
                              parentId: "services-server",
                              type: "file",
                              path: "src/server/services/statsService.ts",
                              commitHash: "c9f1eaa",
                              branch: "main",
                              content: `
export async function getStatsService() {
  return {
    users: 120,
    active: 87,
    revenue: 5300,
  };
}
                            `,
                              metaData: {
                                extension: "ts",
                                language: "TypeScript",
                                mimeType: "text/typescript",
                              },
                            },
                          ],
                        },
                      ],
                    },

                    // ================= SHARED =================
                    {
                      _id: "shared",
                      title: "shared",
                      parentId: "src",
                      type: "directory",
                      path: "src/shared",
                      commitHash: "c9f1eaa",
                      branch: "main",
                      children: [
                        {
                          _id: "types",
                          title: "types.ts",
                          parentId: "shared",
                          type: "file",
                          path: "src/shared/types.ts",
                          commitHash: "c9f1eaa",
                          branch: "main",
                          content: `
export interface Stats {
  users: number;
  active: number;
  revenue: number;
}
                        `,
                          metaData: {
                            extension: "ts",
                            language: "TypeScript",
                            mimeType: "text/typescript",
                          },
                        },
                        {
                          _id: "utils",
                          title: "format.ts",
                          parentId: "shared",
                          type: "file",
                          path: "src/shared/format.ts",
                          commitHash: "c9f1eaa",
                          branch: "main",
                          content: `
export function formatCurrency(n: number) {
  return "$" + n.toFixed(2);
}
                        `,
                          metaData: {
                            extension: "ts",
                            language: "TypeScript",
                            mimeType: "text/typescript",
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            {
              _id: "d12ab77",
              message: "Add auth + middleware + DB layer",
              author: "Youssef",
              createdAt: new Date("2026-03-06T16:20:00.000Z"),
              parentCommitId: "c9f1eaa",
              rootNodeId: "root-dev",
              tree: [
                {
                  _id: "src-dev",
                  title: "src",
                  parentId: "root-dev",
                  type: "directory",
                  path: "src",
                  commitHash: "d12ab77",
                  branch: "dev",
                  children: [
                    {
                      _id: "auth",
                      title: "auth.ts",
                      parentId: "src-dev",
                      type: "file",
                      path: "src/server/middleware/auth.ts",
                      commitHash: "d12ab77",
                      branch: "dev",
                      status: "added",
                      content: `
import { Request, Response, NextFunction } from "express";

export function auth(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized");
  }
  next();
}
                    `,
                      metaData: {
                        extension: "ts",
                        language: "TypeScript",
                        mimeType: "text/typescript",
                      },
                    },
                    {
                      _id: "db",
                      title: "db.ts",
                      parentId: "src-dev",
                      type: "file",
                      path: "src/server/db.ts",
                      commitHash: "d12ab77",
                      branch: "dev",
                      status: "added",
                      content: `
export const db = {
  users: [],
  stats: [],
};
                    `,
                      metaData: {
                        extension: "ts",
                        language: "TypeScript",
                        mimeType: "text/typescript",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        });
      }, 1000);
    },
  );

  const { branches, commits } = res;
  const basePath = `/${username}/${project}/${type}/${id}/changes/tree`;
  return (
    <ExplorerDataProvider
      branches={branches}
      commits={commits}
      basePath={basePath}
    >
      <FileExplorer>
        <FileExplorer.Header />

        <Wrapper>
          <FileExplorer.SidePanel></FileExplorer.SidePanel>

          <FileExplorer.ExplorerContent />
        </Wrapper>
      </FileExplorer>
    </ExplorerDataProvider>
  );
}
