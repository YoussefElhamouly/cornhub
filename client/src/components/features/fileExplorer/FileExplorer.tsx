"use client";

import React, { useMemo, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ExplorerTree from "./components/explorerTree/ExplorerTree";
import ExplorerContent from "./components/explorerContent/ExplorerContent";
import ExplorereSidePanel from "./components/explorerTree/ExplorereSidePanel";
import styles from "./fileExplorer.module.scss";
import Menu from "@/components/ui/control/menu/Menu";
import Main from "@/components/layouts/main/Main";
import Wrapper from "@/components/layouts/wrapper/Wrapper";
import Breadcrumb from "@/components/ui/navigation/breadcrumb/Breadcrumb";
import type { ExplorerNode } from "./types/fileExplorer";
import { resolveNode, mockCommits } from "./data/mockData";
import { ExplorerProvider } from "./components/contexts/ExplorerContext";
import { useExplorerData } from "./components/contexts/ExplorerDataContext";
import CollapsibleSidePanel from "./components/explorerTree/CollapsibleSidePanel";
import PanelToggleButton from "./components/explorerTree/PanelToggleButton";

const FileExplorer = () => {
  const { branches, username, project } = useExplorerData();

  // usePathname gives the server-rendered path, but history.pushState doesn't
  // update it. We track the pathname ourselves and sync on popstate events
  // so that intra-tree navigation never triggers a server refetch.
  const serverPathname = usePathname();
  const [pathname, setPathname] = useState(serverPathname);

  useEffect(() => {
    // Keep our local pathname in sync with the SSR value on mount
    setPathname(window.location.pathname);

    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Also update if the Next.js router legitimately changes the pathname
  // (e.g. branch switch, which IS a real navigation)
  useEffect(() => {
    setPathname(serverPathname);
  }, [serverPathname]);

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
