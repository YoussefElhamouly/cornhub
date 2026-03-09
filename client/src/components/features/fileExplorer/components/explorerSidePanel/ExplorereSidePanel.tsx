import React from "react";
import Aside from "@/components/layouts/aside/Aside";
import styles from "./explorerTree.module.scss";
import type { Branch } from "../../types/fileExplorer";
import BranchSwitcher from "./controls/BranchSwitcher";
import Button from "@/components/ui/control/button/Button";
import TreeNode from "@/components/ui/navigation/treeNode/TreeNode";
import FileTreeSearch from "./controls/FileTreeSearch";
import type { ExplorerNode } from "../../types/fileExplorer";
import { useExplorerData } from "../contexts/ExplorerDataContext";
interface ExplorereSidePanelProps {
  activeBranch: Branch;
  basePath: string;
  tree: ExplorerNode[];
  activePath: string;
}

const ExplorereSidePanel = ({
  activeBranch,
  basePath,
  tree,
  activePath,
}: ExplorereSidePanelProps) => {
  const { togglePanel } = useExplorerData();
  return (
    <Aside>
      <header className={styles.explorer_tree_header}>
        <Button icon={"PanelLeftClose"} onClick={togglePanel} />
        <h1>Files</h1>
      </header>
      <BranchSwitcher activeBranch={activeBranch} basePath={basePath} />
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
    </Aside>
  );
};

export default ExplorereSidePanel;
