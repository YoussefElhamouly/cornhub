"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import TreeNode from "../../../ui/navigation/treeNode/TreeNode";
import SearchBar from "../../../ui/control/searchBar/SearchBar";
import styles from "./explorerTree.module.scss";
import type { FileTreeNode, ExplorerTreeProps } from "../types/fileExplorer";

/** Convert a FileTreeNode to the shape expected by TreeNode UI component */
function toTreeNodeProps(
  node: FileTreeNode,
  activePath: string,
  onNavigate: (path: string) => void,
): React.ComponentProps<typeof TreeNode> {
  const treeNodeType = (() => {
    switch (node.status) {
      case "added":
        return "file-added";
      case "modified":
        return "file-modified";
      case "removed":
        return "file-minus";
      default:
        return node.type === "folder" ? "folder" : "file";
    }
  })();

  return {
    name: node.name,
    path: node.path,
    type: treeNodeType,
    activePath,
    onNavigate,
    children: node.children?.map((child) =>
      toTreeNodeProps(child, activePath, onNavigate),
    ),
  };
}

const ExplorerTree = ({ tree, activePath, basePath }: ExplorerTreeProps) => {
  const router = useRouter();

  const handleNavigate = (nodePath: string) => {
    const href = nodePath ? `${basePath}/${nodePath}` : basePath;
    router.push(href);
  };

  return (
    <>
      <SearchBar placeHolder={"Go To File"} />
      <div className={styles.explorerTree_container}>
        {tree.map((node, i) => (
          <TreeNode
            key={i}
            {...toTreeNodeProps(node, activePath, handleNavigate)}
          />
        ))}
      </div>
    </>
  );
};

export default ExplorerTree;
