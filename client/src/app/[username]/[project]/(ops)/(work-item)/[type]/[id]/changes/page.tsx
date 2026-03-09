import React from "react";
import FileExplorer from "@/components/features/fileExplorer/FileExplorer";
import { mockBranches } from "@/components/features/fileExplorer/data/mockData";

interface ChangesPageProps {
  params: Promise<{ username: string; project: string }>;
}

export default async function ChangesPage({ params }: ChangesPageProps) {
  const { username, project } = await params;
  const basePath = `/${username}/${project}/tree`;

  return (
    // <FileExplorer

    //   activeBranchName="main"
    //   nodePath=""
    //   basePath={basePath}
    // />
    <></>
  );
}
