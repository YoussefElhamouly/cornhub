import React from "react";
import FileExplorer from "@/components/features/fileExplorer/FileExplorer";

import { redirect } from "next/navigation";

export default async function WorkSpace({
  params,
}: {
  params: Promise<{ username: string; project: string; path?: string[] }>;
}) {
  const { username, project, path = [] } = await params;

  if (path.length === 0) {
    redirect(`/${username}/${project}/tree/main`);
  }

  return <FileExplorer />;
}
