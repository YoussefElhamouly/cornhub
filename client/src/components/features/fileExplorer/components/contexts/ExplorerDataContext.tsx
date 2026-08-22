"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { usePathname } from "next/navigation";
import type { Branch, Commit, ExplorerNode } from "../../types/fileExplorer";

interface ExplorerDataContextType {
  branches: Branch[];
  commits: Commit[];
  basePath: string;

  isPanelOpen?: boolean;
  togglePanel?: () => void;

  activeBranch: Branch;
  commit: Commit;
  tree: ExplorerNode[];
  nodePath: string;
  treePath: string;
  displayNode: ExplorerNode | undefined;
}

const ExplorerDataContext = createContext<ExplorerDataContextType | undefined>(
  undefined,
);

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

export const ExplorerDataProvider = ({
  branches,
  commits,
  basePath,
  children,
}: {
  branches: Branch[];
  commits: Commit[];
  basePath: string;
  children: React.ReactNode;
}) => {
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(true);
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem("file-explorer-panel-open");
    if (saved !== null) {
      setIsPanelOpen(saved === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("file-explorer-panel-open", String(isPanelOpen));
  }, [isPanelOpen]);

  const togglePanel = () => setIsPanelOpen((prev) => !prev);

  const computed = useMemo(() => {
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

    return {
      activeBranch,
      commit,
      tree,
      nodePath,
      treePath,
      displayNode,
    };
  }, [pathname, basePath, branches, commits]);

  return (
    <ExplorerDataContext.Provider
      value={{
        branches,
        basePath,
        isPanelOpen,
        togglePanel,
        commits,
        ...computed,
      }}
    >
      {children}
    </ExplorerDataContext.Provider>
  );
};

export const useExplorerData = () => {
  const ctx = useContext(ExplorerDataContext);
  if (!ctx) {
    throw new Error(
      "useExplorerData must be used within an ExplorerDataProvider",
    );
  }
  return ctx;
};
