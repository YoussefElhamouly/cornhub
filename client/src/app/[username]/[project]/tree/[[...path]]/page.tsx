import React from "react";
import Main from "@/components/layouts/main/Main";
import Breadcrumb from "@/components/ui/navigation/breadcrumb/Breadcrumb";
import Menu from "@/components/ui/control/menu/Menu";
import ExplorerContent from "@/components/features/fileExplorer/components/explorerContent/ExplorerContent";
import PanelToggleButton from "@/components/features/fileExplorer/components/explorerTree/PanelToggleButton";
import styles from "@/components/features/fileExplorer/fileExplorer.module.scss";
import type { ExplorerNode } from "@/components/features/fileExplorer/types/fileExplorer";
import branchesData from "@/components/features/fileExplorer/data/branches.json";
import mockCommitsData from "@/components/features/fileExplorer/data/commits.json";
import { resolveNode } from "@/components/features/fileExplorer/utils/fileExplorerUtils";
import type {
  Branch,
  Commit,
} from "@/components/features/fileExplorer/types/fileExplorer";

export default async function TreePage({
  params,
}: {
  params: Promise<{ username: string; project: string; path?: string[] }>;
}) {
  const { username, project, path: pathSegments } = await params;
  const branches = branchesData as unknown as Branch[];
  const mockCommits = mockCommitsData as unknown as Record<string, Commit>;

  // ── Derive active branch + node path from URL segments ──────────────────
  const knownBranchNames = branches.map((b) => b.name);
  const segments = pathSegments ?? [];

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
  const tree = (activeBranch.tree ?? []) as ExplorerNode[];
  const base = `/${username}/${project}/tree`;
  const treePath = `${base}/${activeBranch.name}`;

  // ── Resolve the commit from the branch ──────────────────────────────────
  const commit = mockCommits[activeBranch.headCommitId];

  // ── Resolve the active node from the URL path ───────────────────────────
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
  );
}
