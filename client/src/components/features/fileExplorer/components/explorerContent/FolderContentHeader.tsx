import React from "react";
import Icon from "@/components/ui/media/icon/Icon";
import type { ExplorerNode } from "../../types/fileExplorer";
import styles from "./explorerContent.module.scss";

interface FolderContentHeaderProps {
  node: ExplorerNode;
  branch: string;
}

const FolderContentHeader = ({ node, branch }: FolderContentHeaderProps) => {
  const displayName = node.path === "" ? "root" : node.title;

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
