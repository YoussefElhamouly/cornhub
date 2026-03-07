"use client";

import React, { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import styles from "./treeNode.module.scss";
import Icon from "../../media/icon/Icon";
import Item from "../../collection/item/Item";

interface TreeNodeProps {
  title: string;
  path?: string;
  type?: "directory" | "file";
  status?: "added" | "modified" | "removed" | "unchanged";

  children?: TreeNodeProps[];
  activePath?: string;
  basePath?: string;
  onNavigate?: (path: string) => void;
}

const TreeNode = ({
  title,
  path = "",
  type = "directory",
  status = "unchanged",
  children,
  activePath = "",
  basePath = "",
}: TreeNodeProps) => {
  const pathname = usePathname();

  // Derive the active node path from the current URL.
  // Falls back to the server-provided `activePath` for initial render or
  // if the pathname is outside this tree's basePath.
  const effectiveActivePath = useMemo(() => {
    if (!pathname || !basePath || !pathname.startsWith(basePath)) {
      return activePath ?? "";
    }

    const afterBase = pathname.slice(basePath.length).replace(/^\//, "");
    return afterBase;
  }, [pathname, basePath, activePath]);

  const isCurrentActive = effectiveActivePath === path && path !== "";
  const isAncestorOfActive =
    path !== "" && effectiveActivePath.startsWith(path + "/");

  const [isExpanded, setIsExpanded] = useState(
    isCurrentActive || isAncestorOfActive,
  );

  useEffect(() => {
    if (isCurrentActive || isAncestorOfActive) {
      setIsExpanded(true);
    }
  }, [isCurrentActive, isAncestorOfActive]);

  const isDirectory = type === "directory";

  // Build the href for this node
  const href = basePath ? `${basePath}/${path}` : undefined;

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
          href={isCurrentActive ? undefined : href}
          onClick={isDirectory ? handleNameClick : undefined}
        />
      </div>

      {isDirectory && isExpanded && (
        <div className={styles.treeNode_children_container}>
          {children?.map((child, i) => (
            <TreeNode
              key={child.path || `__index_${i}`}
              {...child}
              activePath={activePath}
              basePath={basePath}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
