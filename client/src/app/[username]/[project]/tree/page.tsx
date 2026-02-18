import React from "react";
import Navbar from "@/components/layouts/navbar/Navbar";
import FileExplorer from "@/components/features/fileExplorer/fileExplorer/FileExplorer";
import styles from "./workSpace.module.scss";
import SecondaryNavbar from "@/components/layouts/navbar/SecondaryNavbar";

const WorkSpace = () => {
  const SECONDARY_NAV_LINKS = [
    { displayName: "Code", path: "/:user/:project", icon: "Code" },
    {
      displayName: "Branches",
      path: "/:user/:project/branches",
      icon: "GitBranch",
    },
    { displayName: "Rooms", path: "/:user/:project/rooms", icon: "Popcorn" },
    {
      displayName: "Pull requests",
      path: "/:user/:project/pulls",
      icon: "GitPullRequest",
    },
    { displayName: "Issues", path: "/posts", icon: "ErrorIcon" },
    { displayName: "Wiki", path: "/:user/:project/wiki", icon: "AtSign" },
    {
      displayName: "Settings",
      path: "/:user/:project/settings",
      icon: "Settings",
    },
  ];
  return (
    <div className={styles.workspace}>
      <Navbar>
        <SecondaryNavbar links={SECONDARY_NAV_LINKS} />
      </Navbar>
      <FileExplorer />
    </div>
  );
};

export default WorkSpace;
