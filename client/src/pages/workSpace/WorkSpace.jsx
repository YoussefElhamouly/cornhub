import React, { useState } from "react";
import Navbar from "../../components/layouts/navbar/Navbar.jsx";
import FileExplorer from "../../components/features/fileExplorer/fileExplorer/FileExplorer.jsx";
import styles from "./workSpace.module.scss";

const WorkSpace = () => {
  return (
    <div className={styles.workspace}>
      <Navbar />
      <FileExplorer />
    </div>
  );
};

export default WorkSpace;
