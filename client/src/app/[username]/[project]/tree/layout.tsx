import React from "react";
import Navbar from "@/components/layouts/navbar/Navbar";
import ProjectNavbar from "@/components/layouts/navbar/ProjectNavbar";
import styles from "./workSpace.module.scss";
import LayoutWrapper from "./_components/layoutStructure/LayoutWrapper";

export default async function TreeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ username: string; project: string; path?: string[] }>;
}) {
  const { username, project, path } = await params;
  const initialPath = `/${username}/${project}`;

  return (
    <div className={styles.workspace}>
      <Navbar>
        <ProjectNavbar initialPath={initialPath} />
      </Navbar>
      <LayoutWrapper params={params}>{children}</LayoutWrapper>
    </div>
  );
}
