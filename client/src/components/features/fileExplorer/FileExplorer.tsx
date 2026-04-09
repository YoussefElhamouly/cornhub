"use client";

import React from "react";
import { usePathname } from "next/navigation";
import ExplorerContent from "./components/explorerContent/ExplorerContent";
import ExplorereSidePanel from "./components/explorerSidePanel/ExplorereSidePanel";
import styles from "./fileExplorer.module.scss";
import Wrapper from "@/components/layouts/wrapper/Wrapper";
import Main from "@/components/layouts/main/Main";
import type { ExplorerNode } from "./types/fileExplorer";

import { useExplorerData } from "./components/contexts/ExplorerDataContext";

const FileExplorer = () => {
  function resolveNode(
    tree: ExplorerNode[],
    nodePath: string,
  ): ExplorerNode | undefined {
    if (!nodePath) return undefined;

    const segments = nodePath.split("/").filter(Boolean);
    let current: ExplorerNode | undefined;
    let children: ExplorerNode[] = tree;

    for (const segment of segments) {
      current = children.find((n) => n.title === segment);
      if (!current) return undefined;
      if (current.type === "directory") {
        children = (current.children ?? []) as ExplorerNode[];
      }
    }

    return current;
  }

  const { branches, commits, isPanelOpen, basePath } = useExplorerData();

  const pathname = usePathname();

  const afterBase = pathname.startsWith(basePath)
    ? pathname.slice(basePath.length).replace(/^\//, "")
    : "";
  const segments = afterBase ? afterBase.split("/") : [];

  const knownBranchNames = branches.map((b) => b.name);
  let activeBranchName = branches[0]?.name ?? "main";
  let nodePath = "";

  if (segments.length > 0) {
    if (knownBranchNames.includes(segments[0])) {
      activeBranchName = segments[0];
      nodePath = segments.slice(1).join("/");
    } else {
      nodePath = segments.join("/");
    }
  }

  const activeBranch =
    branches.find((b) => b.name === activeBranchName) ?? branches[0];
  const treePath = `${basePath}/${activeBranch?.name}`;

  const commit =
    commits.find((c) => c._id === activeBranch.headCommitId) ?? commits[0];
  const tree = commit?.tree ?? [];

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

      <ExplorerContent
        node={displayNode}
        commit={commit}
        branch={activeBranch}
        basePath={treePath}
        nodePath={nodePath}
      />
    </Wrapper>
  );
};

FileExplorer.Header = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.explorer_header}> {children}</div>;
};

FileExplorer.SidePanel = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.explorer_sidePanel}> {children}</div>;
};
FileExplorer.ExplorerContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <Main className={styles.explorer_content}> {children}</Main>;
};
export default FileExplorer;
