import React from "react";
import FileExplorer from "@/components/features/fileExplorer/fileExplorer/FileExplorer";

interface ChangesPageProps {
  params: Promise<{ username: string; project: string }>;
}

export default async function ChangesPage({ params }: ChangesPageProps) {
  const { username, project } = await params;
  return (
    <FileExplorer
      username={username}
      project={project}
      branch="main"
      nodePath=""
    />
  );
}
