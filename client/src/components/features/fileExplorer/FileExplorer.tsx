"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";

import ExplorerContent from "./components/explorerContent/ExplorerContent";
import ExplorereSidePanel from "./components/explorerSidePanel/ExplorereSidePanel";
import styles from "./fileExplorer.module.scss";
import Menu from "@/components/ui/control/menu/Menu";
import Main from "@/components/layouts/main/Main";
import Wrapper from "@/components/layouts/wrapper/Wrapper";
import Breadcrumb from "@/components/ui/navigation/breadcrumb/Breadcrumb";
import type { ExplorerNode } from "./types/fileExplorer";
import { resolveNode, mockCommits } from "./data/mockData";

import { useExplorerData } from "./components/contexts/ExplorerDataContext";
import Button from "@/components/ui/control/button/Button";

const FileExplorer = () => {
  const { branches, username, project, isPanelOpen, togglePanel } =
    useExplorerData();

  const pathname = usePathname();

  // ── Derive active branch + node path from the current URL ───────────────
  const { activeBranch, nodePath, basePath, treePath } = useMemo(() => {
    const base = `/${username}/${project}/tree`;
    // Strip the base prefix from the pathname to get the raw path segments
    const afterBase = pathname.startsWith(base)
      ? pathname.slice(base.length).replace(/^\//, "")
      : "";
    const segments = afterBase ? afterBase.split("/") : [];

    const knownBranchNames = branches.map((b) => b.name);
    let activeBranchName = branches[0]?.name ?? "main";
    let nodePathResolved = "";

    if (segments.length > 0) {
      if (knownBranchNames.includes(segments[0])) {
        activeBranchName = segments[0];
        nodePathResolved = segments.slice(1).join("/");
      } else {
        nodePathResolved = segments.join("/");
      }
    }

    const branch =
      branches.find((b) => b.name === activeBranchName) ?? branches[0];
    const tree_ = `${base}/${branch.name}`;

    return {
      activeBranch: branch,
      nodePath: nodePathResolved,
      basePath: base,
      treePath: tree_,
    };
  }, [pathname, branches, username, project]);

  const tree = activeBranch.tree ?? [];

  // ── Resolve the commit from the branch ────────────────────────────────────
  const commit = mockCommits[activeBranch.headCommitId];

  // ── Resolve the active node from the URL path ─────────────────────────────
  const activeNode = nodePath ? resolveNode(tree, nodePath) : undefined;

  const displayNode: ExplorerNode | undefined = nodePath
    ? activeNode
    : {
        _id: "root",
        title: activeBranch.name,
        parentId: null,
        type: "directory",
        path: "",
        commitHash: activeBranch.headCommitId,
        branch: activeBranch.name,
        children: tree,
      };

  return (
    <Wrapper>
      {isPanelOpen && (
        <ExplorereSidePanel
          activeBranch={activeBranch}
          activePath={nodePath}
          basePath={basePath}
          treePath={treePath}
          tree={tree}
        />
      )}

      <Main>
        <header className={styles.explorer_content_nav}>
          <Button
            icon={isPanelOpen ? "PanelLeftOpen" : "PanelRightOpen"}
            onClick={togglePanel}
            customStyles={{
              padding: "8px",
              marginRight: "0.5rem",
              display: "flex",
            }}
          />
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
  );
};

export default FileExplorer;
