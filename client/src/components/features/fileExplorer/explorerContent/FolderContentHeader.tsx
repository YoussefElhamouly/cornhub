"use client";

import React from "react";
import Icon from "@/components/ui/media/icon/Icon";
import type { FileTreeNode, Commit } from "../types/fileExplorer";
import styles from "./explorerContent.module.scss";

interface FolderContentHeaderProps {
  node: FileTreeNode;
  branch: string;
}

/**
 * Header for directory nodes.
 * Layout: Directory Name — Branch Name
 */
const FolderContentHeader = ({ node, branch }: FolderContentHeaderProps) => {
  const displayName = node.path === "" ? "root" : node.name;

  return (
    <div className={styles.nodeHeader}>
      <span className={styles.nodeHeader_name}>{displayName}</span>
      <span className={styles.nodeHeader_divider}>—</span>
      <span className={styles.nodeHeader_branch}>
        <Icon icon={"GitBranch"} size={13} />
        {branch}
      </span>
    </div>
  );
};

export default FolderContentHeader;
