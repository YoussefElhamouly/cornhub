import React from "react";

import Wrapper from "@/components/layouts/wrapper/Wrapper";
import { redirect } from "next/navigation";
import BranchSwitcher from "@/components/features/fileExplorer/components/explorerSidePanel/controls/BranchSwitcher";
import FileExplorer from "@/components/features/fileExplorer/FileExplorerClient";

export default async function WorkSpace({
  params,
}: {
  params: Promise<{ username: string; project: string; path?: string[] }>;
}) {
  return (
    <FileExplorer>
      <FileExplorer.Header />

      <Wrapper>
        <FileExplorer.SidePanel>
          <BranchSwitcher />
        </FileExplorer.SidePanel>

        <FileExplorer.ExplorerContent />
      </Wrapper>
    </FileExplorer>
  );
}
