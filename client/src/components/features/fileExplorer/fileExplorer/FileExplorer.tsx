"use client";

import React, { useState } from "react";
import ExplorerTree from "../explorerTree/ExplorerTree";
import ExplorerContent from "../explorerContent/ExplorerContent";
import styles from "./fileExplorer.module.scss";
import Aside from "../../../layouts/aside/Aside";
import Menu from "../../../ui/control/menu/Menu";
import Button from "../../../ui/control/button/Button";
import Dropdown from "../../../ui/control/dropdown/Dropdown";
import Main from "../../../layouts/main/Main";
import Wrapper from "../../../layouts/wrapper/Wrapper";
import Breadcrumb from "../../../ui/navigation/breadcrumb/Breadcrumb";

import type { FileExplorerProps } from "../types/fileExplorer";
import {
  BRANCHES,
  DEFAULT_BRANCH,
  getLatestCommit,
  getCommitByHash,
  getNodeByPath,
} from "../data/mockData";

const FileExplorer = ({
  username,
  project,
  branch: branchProp,
  commit: commitHashProp,
  nodePath = "",
}: FileExplorerProps) => {
  const [leftPanel, setLeftPanel] = useState(true);

  // ── Resolve branch ─────────────────────────────────────────────────────────
  const initBranchName =
    branchProp && BRANCHES[branchProp] ? branchProp : DEFAULT_BRANCH;

  // Local state to support branch switching
  const [activeBranch, setActiveBranch] = useState(initBranchName);

  const branchData = BRANCHES[activeBranch];

  // Options for Dropdown
  const branchOptions = Object.keys(BRANCHES).map((b) => ({
    displayName: b,
    value: b,
  }));

  // ── Resolve commit ─────────────────────────────────────────────────────────
  const activeCommit = commitHashProp
    ? getCommitByHash(activeBranch, commitHashProp)
    : getLatestCommit(activeBranch);

  // ── Resolve active node ────────────────────────────────────────────────────
  const activeNode = getNodeByPath(activeBranch, nodePath);

  // Children: for folder nodes pass their children; for root pass top-level tree
  const activeChildren =
    activeNode?.type === "folder" ? (activeNode.children ?? []) : [];

  // ── Base path used everywhere for URL generation ───────────────────────────
  const basePath = `/${username}/${project}/tree`;

  return (
    <Wrapper>
      {leftPanel && (
        <Aside>
          <header className={styles.explorer_tree_header}>
            <Button
              icon={"PanelLeftClose"}
              onClick={() => setLeftPanel(false)}
            />
            <h1>Files</h1>
          </header>

          <div className={styles.fileExplorer_filter_container}>
            <Dropdown
              title={activeBranch}
              icon={"GitBranch"}
              options={branchOptions}
              defaultValue={activeBranch}
              onChange={(newBranch) => setActiveBranch(newBranch)}
              wrapperStyle={{ width: "100%" }}
              buttonStyle={{
                padding: "15px",
                width: "100%",
                justifyContent: "space-between",
              }}
              menuStyle={{ width: "100%" }}
            />
          </div>

          <ExplorerTree
            tree={branchData.tree}
            activePath={nodePath}
            basePath={basePath}
          />
        </Aside>
      )}

      <Main>
        <header className={styles.explorer_content_nav}>
          {!leftPanel && (
            <Button
              icon={"PanelLeftOpen"}
              onClick={() => setLeftPanel(true)}
              customStyles={{}}
            />
          )}
          <Breadcrumb nodePath={nodePath} basePath={basePath} />
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
          node={activeNode}
          commit={activeCommit}
          branch={activeBranch}
          nodePath={nodePath}
          children={activeChildren}
          basePath={basePath}
        />
      </Main>
    </Wrapper>
  );
};

export default FileExplorer;
