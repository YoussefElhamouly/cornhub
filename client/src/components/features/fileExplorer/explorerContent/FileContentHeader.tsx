"use client";

import React from "react";
import Icon from "@/components/ui/media/icon/Icon";
import type { FileTreeNode, Commit } from "../types/fileExplorer";
import { formatFileSize } from "../data/mockData";
import styles from "./explorerContent.module.scss";

interface FileContentHeaderProps {
  node: FileTreeNode;
  commit: Commit;
  branch: string;
}

/**
 * Header for file nodes.
 * Layout: File Name — Last Commit Message — Branch Name — File Size
 */
const FileContentHeader = ({
  node,
  commit,
  branch,
}: FileContentHeaderProps) => {
  return (
    <div className={styles.nodeHeader}>
      <span className={styles.nodeHeader_name}>{node.name}</span>

      <span className={styles.nodeHeader_divider}>—</span>

      <span className={styles.nodeHeader_commit} title={commit.hash}>
        {commit.message}
      </span>

      <span className={styles.nodeHeader_divider}>—</span>

      <span className={styles.nodeHeader_branch}>
        <Icon icon={"GitBranch"} size={13} />
        {branch}
      </span>

      {node.size != null && (
        <>
          <span className={styles.nodeHeader_divider}>—</span>
          <span className={styles.nodeHeader_size}>
            {formatFileSize(node.size)}
          </span>
        </>
      )}
    </div>
  );
};

export default FileContentHeader;
