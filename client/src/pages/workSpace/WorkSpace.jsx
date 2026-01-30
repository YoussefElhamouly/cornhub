import React, { useState } from "react";
import Navbar from "../../components/layouts/navbar/Navbar.jsx";
import FileExplorer from "../../components/features/fileExplorer/fileExplorer/FileExplorer.jsx";
import styles from "./workSpace.module.scss";
import SecondaryNavbar from "../../components/layouts/navbar/SecondaryNavbar.jsx";
import {
  AtSign,
  Webhook,
  Code,
  GitPullRequest,
  Popcorn,
  Settings,
  GitBranch,
  Blend,
  SearchAlert as ErrorIcon,
} from "lucide-react";
const WorkSpace = () => {
  const SECONDARY_NAV_LINKS = [
    { displayName: "Code", path: "/", icon: Code },
    { displayName: "Branches", path: "/Project", icon: GitBranch },
    { displayName: "Rooms", path: "/Profile", icon: Popcorn },
    { displayName: "Pull requests", path: "/posts", icon: GitPullRequest },
    { displayName: "Issues", path: "/posts", icon: ErrorIcon },
    { displayName: "Wiki", path: "/wiki", icon: AtSign },
    { displayName: "Settings", path: "/posts", icon: Settings },
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
