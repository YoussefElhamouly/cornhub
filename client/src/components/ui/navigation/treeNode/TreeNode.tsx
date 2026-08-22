"use client";

import React, { useState } from "react";
import styles from "./treeNode.module.scss";
import Icon from "../../media/icon/Icon";
import Item from "../../collection/item/Item";
import { usePathname } from "next/navigation";
interface TreeNodeProps {
  title: string;
  path?: string;
  type?: "directory" | "file";
  status?: "added" | "modified" | "removed" | "unchanged";

  children?: TreeNodeProps[];

  basePath?: string;
  onNavigate?: (path: string) => void;
}

const TreeNode = ({
  title,
  path = "",
  type = "directory",
  status = "unchanged",
  children,

  basePath = "",
}: TreeNodeProps) => {
  const current_path = usePathname();
  const fullPath = `${basePath}/${path}`;

  const isCurrentActive = current_path === fullPath;

  const isAncestorOfActive =
    current_path === fullPath || current_path.startsWith(fullPath + "/");

  const [isExpanded, setIsExpanded] = useState(
    isCurrentActive || isAncestorOfActive,
  );

  const isDirectory = type === "directory";

  const handleChevronClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDirectory) setIsExpanded((prev) => !prev);
  };

  const handleNameClick = () => {
    if (isDirectory) setIsExpanded((prev) => !prev);
  };

  return (
    <div className={styles.treeNode_wrapper}>
      <div
        className={`${styles.treeNode_btn_wrapper} ${isCurrentActive ? styles.active : ""}`}
      >
        <div
          className={`${styles.treeNode_expander} ${!isDirectory ? styles.disabled : ""}`}
          onClick={handleChevronClick}
        >
          {isExpanded && isDirectory ? (
            <Icon icon={"ChevronRight"} size={14} />
          ) : (
            <Icon icon={"ChevronDown"} size={14} />
          )}
        </div>

        <Item
          title={title}
          type={type}
          status={status}
          isExpanded={isExpanded}
          href={`${basePath}/${path}`}
          onClick={isDirectory ? handleNameClick : undefined}
        />
      </div>

      {isDirectory && isExpanded && (
        <div className={styles.treeNode_children_container}>
          {children?.map((child, i) => (
            <TreeNode
              key={child.path || `__index_${i}`}
              {...child}
              basePath={basePath}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
