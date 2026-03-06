import React from "react";
import TreeNode from "@/components/ui/navigation/treeNode/TreeNode";
import FileTreeSearch from "./FileTreeSearch";
import styles from "./explorerTree.module.scss";
import type { ExplorerNode } from "../../types/fileExplorer";

interface ExplorerTreeProps {
  tree: ExplorerNode[];
  activePath: string;
  basePath: string;
}

const ExplorerTree = ({ tree, activePath, basePath }: ExplorerTreeProps) => {
  return (
    <>
      <FileTreeSearch tree={tree} basePath={basePath} />
      <div className={styles.explorerTree_container}>
        {tree.map((node) => (
          <TreeNode
            key={node._id}
            {...node}
            activePath={activePath}
            basePath={basePath}
          />
        ))}
      </div>
    </>
  );
};

export default ExplorerTree;
