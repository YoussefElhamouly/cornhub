import React from "react";
import Navbar from "@/components/layouts/navbar/Navbar";
import ProjectNavbar from "@/components/layouts/navbar/ProjectNavbar";
import styles from "./workSpace.module.scss";
import FileExplorer from "@/components/features/fileExplorer/FileExplorer";
import type { Branch } from "@/components/features/fileExplorer/types/fileExplorer";
import branchesData from "@/components/features/fileExplorer/data/branches.json";

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
  // Runs ONCE when the /tree layout mounts. It is NOT re-triggered
  // when the user navigates deeper into /tree/... paths because the
  // layout stays mounted — only page.tsx re-renders.
  const branches = branchesData as unknown as Branch[];

  return (
    <div className={styles.workspace}>
      <Navbar>
        <ProjectNavbar initialPath={initialPath} />
      </Navbar>
      <FileExplorer branches={branches} username={username} project={project}>
        {children}
      </FileExplorer>
    </div>
  );
}
