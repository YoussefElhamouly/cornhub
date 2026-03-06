import React from "react";
import Aside from "@/components/layouts/aside/Aside";
import styles from "../../fileExplorer.module.scss";
import type { Branch } from "../../types/fileExplorer";
import BranchSwitcher from "./BranchSwitcher";
import SidePanelActions from "./SidePanelActions";

interface ExplorereSidePanelProps {
  activeBranch: Branch;
  allBranches: Branch[];
  basePath: string;
  children: React.ReactNode;
}

const ExplorereSidePanel = ({
  activeBranch,
  allBranches,
  basePath,
  children,
}: ExplorereSidePanelProps) => {
  return (
    <Aside>
      <header className={styles.explorer_tree_header}>
        <SidePanelActions />
        <h1>Files</h1>
      </header>

      <div className={styles.fileExplorer_filter_container}>
        <BranchSwitcher
          branches={allBranches}
          activeBranch={activeBranch}
          basePath={basePath}
        />
      </div>

      {children}
    </Aside>
  );
};

export default ExplorereSidePanel;
