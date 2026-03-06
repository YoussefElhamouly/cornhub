import React from "react";
import Navbar from "@/components/layouts/navbar/Navbar";
import ProjectNavbar from "@/components/layouts/navbar/ProjectNavbar";
import styles from "./workSpace.module.scss";
import { mockBranches } from "@/components/features/fileExplorer/data/mockData";
import type { Branch } from "@/components/features/fileExplorer/types/fileExplorer";
import { ExplorerDataProvider } from "@/components/features/fileExplorer/components/contexts/ExplorerDataContext";

export default async function TreeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ username: string; project: string }>;
}) {
  const { username, project } = await params;
  const initialPath = `/${username}/${project}`;

  // ── Data fetch ────────────────────────────────────────────────────────────
  // In production this would be an API call with network latency.
  // It runs ONCE when the /tree layout mounts and is NOT re-triggered
  // when the user navigates deeper into /tree/... paths.
  const branches = mockBranches as Branch[];

  return (
    <div className={styles.workspace}>
      <Navbar>
        <ProjectNavbar initialPath={initialPath} />
      </Navbar>
      <ExplorerDataProvider
        branches={branches}
        username={username}
        project={project}
      >
        {children}
      </ExplorerDataProvider>
    </div>
  );
}
