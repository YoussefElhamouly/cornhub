import React from "react";
import Navbar from "@/components/layouts/navbar/Navbar";
import FileExplorer from "@/components/features/fileExplorer/FileExplorer";
import ProjectNavbar from "@/components/layouts/navbar/ProjectNavbar";
import styles from "../workSpace.module.scss";
import { mockBranches } from "@/components/features/fileExplorer/data/mockData";

interface WorkSpaceProps {
  params: Promise<{
    username: string;
    project: string;
    path?: string[];
  }>;
}

const WorkSpace = async ({ params }: WorkSpaceProps) => {
  const { username, project, path } = await params;

  // ── Resolve branch name & node path from wildcard segments ──────────────
  // URL: /{username}/{project}/tree/{branchName}/{...nodePath}
  const knownBranchNames = mockBranches.map((b) => b.name);

  let branchName = "main";
  let nodePath = "";

  if (path && path.length > 0) {
    if (knownBranchNames.includes(path[0])) {
      branchName = path[0];
      nodePath = path.slice(1).join("/");
    } else {
      nodePath = path.join("/");
    }
  }

  const basePath = `/${username}/${project}/tree`;
  const initialPath = `/${username}/${project}`;

  return (
    <div className={styles.workspace}>
      <Navbar>
        <ProjectNavbar initialPath={initialPath} />
      </Navbar>
      <FileExplorer
        branches={mockBranches}
        activeBranchName={branchName}
        nodePath={nodePath}
        basePath={basePath}
      />
    </div>
  );
};

export default WorkSpace;
