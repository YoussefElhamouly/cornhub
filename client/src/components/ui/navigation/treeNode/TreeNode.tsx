"use client";

import React, { useState } from "react";
import styles from "./treeNode.module.scss";
import Icon from "../../media/icon/Icon";
import Item from "../../collection/item/Item";

interface TreeNodeData {
  name: string;
  path?: string;
  type?:
    | "folder"
    | "file"
    | "file-added"
    | "file-modified"
    | "file-minus"
    | "image"
    | "video";
  children?: TreeNodeData[];
  activePath?: string;
  onNavigate?: (path: string) => void;
}

const TreeNode = ({
  name,
  path = "",
  type = "folder",
  children,
  activePath = "",
  onNavigate,
}: TreeNodeData) => {
  const isCurrentActive = activePath === path && path !== "";
  const isAncestorOfActive = activePath.startsWith(path + "/") && path !== "";

  const [isExpanded, setIsExpanded] = useState(
    isCurrentActive || isAncestorOfActive,
  );

  const isFolder = type === "folder";

  // Map image/video to generic "file" for Item's icon set
  const itemType = (
    type === "image" || type === "video" ? "file" : type
  ) as React.ComponentProps<typeof Item>["type"];

  // Chevron: toggle expand/collapse only
  const handleChevronClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFolder) setIsExpanded((prev) => !prev);
  };

  // Name click: navigate (and for folders also expand)
  const handleNameClick = () => {
    if (isFolder) setIsExpanded((prev) => !prev);
    if (onNavigate && path) onNavigate(path);
  };

  return (
    <div className={styles.treeNode_wrapper}>
      <div
        className={`${styles.treeNode_btn_wrapper} ${isCurrentActive ? styles.active : ""}`}
      >
        {/* Chevron — expand/collapse only, no navigation */}
        <div
          className={`${styles.treeNode_expander} ${!isFolder ? styles.disabled : ""}`}
          onClick={handleChevronClick}
        >
          <div
            style={{
              transform:
                isExpanded && isFolder ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
              display: "flex",
            }}
          >
            <Icon icon={"ChevronRight"} size={14} />
          </div>
        </div>

        {/* Item — icon is decorative, only the name text is the click target */}
        <Item
          name={name}
          type={itemType}
          isExpanded={isExpanded}
          onClick={handleNameClick}
        />
      </div>

      {isFolder && isExpanded && (
        <div className={styles.treeNode_children_container}>
          {children?.map((child, i) => (
            <TreeNode
              key={i}
              {...child}
              activePath={activePath}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
