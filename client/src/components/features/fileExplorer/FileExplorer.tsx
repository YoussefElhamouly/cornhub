import React from "react";
import { headers } from "next/headers";
import ExplorerTree from "./components/explorerTree/ExplorerTree";
import ExplorereSidePanel from "./components/explorerTree/ExplorereSidePanel";
import Wrapper from "@/components/layouts/wrapper/Wrapper";
import type { Branch, ExplorerNode } from "./types/fileExplorer";
import { ExplorerProvider } from "./components/contexts/ExplorerContext";
import CollapsibleSidePanel from "./components/explorerTree/CollapsibleSidePanel";

// ─── Props ───────────────────────────────────────────────────────────────────

export interface FileExplorerProps {
  branches: Branch[];
  username: string;
  project: string;
  children: React.ReactNode;
}

// ─── Server Component ────────────────────────────────────────────────────────

export default async function FileExplorer({
  branches,
  username,
  project,
  children,
}: FileExplorerProps) {
  // Read the current URL from the incoming request headers
  const headersList = await headers();
  const pathname =
    headersList.get("x-next-url") ??
    headersList.get("x-invoke-path") ??
    headersList.get("x-matched-path") ??
    "";

  const base = `/${username}/${project}/tree`;

  // ── Derive active branch + node path from the URL ─────────────────────
  const afterBase = pathname.startsWith(base)
    ? pathname.slice(base.length).replace(/^\//, "")
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
  const tree = (activeBranch.tree ?? []) as ExplorerNode[];
  const treePath = `${base}/${activeBranch.name}`;

  return (
    <ExplorerProvider>
      <Wrapper>
        <CollapsibleSidePanel>
          <ExplorereSidePanel
            activeBranch={activeBranch}
            allBranches={branches}
            basePath={base}
          >
            <ExplorerTree
              tree={tree}
              activePath={nodePath}
              basePath={treePath}
            />
          </ExplorereSidePanel>
        </CollapsibleSidePanel>
        {children}
      </Wrapper>
    </ExplorerProvider>
  );
}
