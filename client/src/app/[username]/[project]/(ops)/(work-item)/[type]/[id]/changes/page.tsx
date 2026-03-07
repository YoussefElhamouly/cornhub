import React from "react";
import FileExplorer from "@/components/features/fileExplorer/FileExplorer";
import branchesData from "@/components/features/fileExplorer/data/branches.json";
import type { Branch } from "@/components/features/fileExplorer/types/fileExplorer";

interface ChangesPageProps {
  params: Promise<{ username: string; project: string }>;
}

export default async function ChangesPage({ params }: ChangesPageProps) {
  const { username, project } = await params;
  const branches = branchesData as unknown as Branch[];

  return (
    <FileExplorer branches={branches} username={username} project={project}>
      {/* Changes content goes here */}
      <div />
    </FileExplorer>
  );
}
