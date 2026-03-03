import React from "react";
import Navbar from "@/components/layouts/navbar/Navbar";
import FileExplorer from "@/components/features/fileExplorer/fileExplorer/FileExplorer";
import ProjectNavbar from "@/components/layouts/navbar/ProjectNavbar";
import styles from "../workSpace.module.scss";

interface WorkSpaceProps {
  params: Promise<{
    username: string;
    project: string;
    path?: string[];
  }>;
}

const WorkSpace = async ({ params }: WorkSpaceProps) => {
  const { username, project, path } = await params;

  // Join wildcard segments back into a node path string.
  // e.g. ["src", "components", "Button.tsx"] → "src/components/Button.tsx"
  // e.g. undefined (root) → ""
  const nodePath = path ? path.join("/") : "";

  const initialPath = `/${username}/${project}`;

  return (
    <div className={styles.workspace}>
      <Navbar>
        <ProjectNavbar initialPath={initialPath} />
      </Navbar>
      <FileExplorer
        username={username}
        project={project}
        branch="main"
        nodePath={nodePath}
      />
    </div>
  );
};

export default WorkSpace;
