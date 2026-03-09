import React from "react";
import FileExplorer from "@/components/features/fileExplorer/FileExplorer";
import { redirect } from "next/navigation";
import { mockBranches } from "@/components/features/fileExplorer/data/mockData";

export default async function WorkSpace({
  params,
}: {
  params: Promise<{ username: string; project: string; path?: string[] }>;
}) {
  const { username, project, path } = await params;

  if (!path || path.length === 0) {
    const defaultBranch = mockBranches[0]?.name ?? "main";
    redirect(`/${username}/${project}/tree/${defaultBranch}`);
  }

  return <FileExplorer />;
}
