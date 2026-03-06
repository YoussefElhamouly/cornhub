import React from "react";
import ExplorerTree from "./components/explorerTree/ExplorerTree";
import ExplorerContent from "./components/explorerContent/ExplorerContent";
import ExplorereSidePanel from "./components/explorerTree/ExplorereSidePanel";
import styles from "./fileExplorer.module.scss";
import Menu from "@/components/ui/control/menu/Menu";
import Main from "@/components/layouts/main/Main";
import Wrapper from "@/components/layouts/wrapper/Wrapper";
import Breadcrumb from "@/components/ui/navigation/breadcrumb/Breadcrumb";
import type { Branch, ExplorerNode } from "./types/fileExplorer";
import { resolveNode, mockCommits } from "./data/mockData";
import { ExplorerProvider } from "./components/contexts/ExplorerContext";
import CollapsibleSidePanel from "./components/explorerTree/CollapsibleSidePanel";
import PanelToggleButton from "./components/explorerTree/PanelToggleButton";

interface FileExplorerProps {
  branches: Branch[];
  activeBranchName: string;
  nodePath: string;
  basePath: string;
}

const FileExplorer = ({
  branches,
  activeBranchName,
  nodePath,
  basePath,
}: FileExplorerProps) => {
  // ── Resolve active branch ────────────────────────────────────────────────
  const activeBranch =
    branches.find((b) => b.name === activeBranchName) ?? branches[0];

  const tree = activeBranch.tree ?? [];

  // ── Resolve the commit from the branch ───────────────────────────────────
  const commit = mockCommits[activeBranch.headCommitId];

  // ── Resolve the active node from the URL path ────────────────────────────
  const activeNode = nodePath ? resolveNode(tree, nodePath) : undefined;

  const displayNode: ExplorerNode = activeNode ?? {
    _id: "root",
    title: activeBranch.name,
    parentId: null,
    type: "directory",
    path: "",
    commitHash: activeBranch.headCommitId,
    branch: activeBranch.name,
    children: tree,
  };

  const treePath = `${basePath}/${activeBranch.name}`;

  return (
    <ExplorerProvider>
      <Wrapper>
        <CollapsibleSidePanel>
          <ExplorereSidePanel
            activeBranch={activeBranch}
            allBranches={branches}
            basePath={basePath}
          >
            <ExplorerTree
              tree={tree}
              activePath={nodePath}
              basePath={treePath}
            />
          </ExplorereSidePanel>
        </CollapsibleSidePanel>
        <Main>
          <header className={styles.explorer_content_nav}>
            <PanelToggleButton />
            <Breadcrumb nodePath={nodePath} basePath={treePath} />
            <Menu
              icon={"Menu"}
              wrapperStyle={{
                width: "fit-content",
                padding: "0rem",
                marginLeft: "auto",
              }}
              buttonStyle={{
                padding: "13px 7px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
              menuStyle={{ right: "0px", left: "unset" }}
            />
          </header>

          <ExplorerContent
            node={displayNode}
            commit={commit}
            branch={activeBranch}
            basePath={treePath}
          />
        </Main>
      </Wrapper>
    </ExplorerProvider>
  );
};

export default FileExplorer;
