import React from "react";
import Navbar from "@/components/layouts/navbar/Navbar";
import FileExplorer from "@/components/features/fileExplorer/fileExplorer/FileExplorer";
import styles from "./workSpace.module.scss";
import ProjectNavbar from "@/components/layouts/navbar/ProjectNavbar";

interface WorkSpaceProps {
  params: {
    username: string;
    project: string;
  };
}

const WorkSpace = ({ params }: WorkSpaceProps) => {
  const initialPath = `/${params.username}/${params.project}`;

  return (
    <div className={styles.workspace}>
      <Navbar>
        <ProjectNavbar initialPath={initialPath} />
      </Navbar>
      <FileExplorer />
    </div>
  );
};

export default WorkSpace;
