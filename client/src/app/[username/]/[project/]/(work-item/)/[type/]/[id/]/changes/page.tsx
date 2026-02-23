import React from "react";
import Wrapper from "@/components/layouts/wrapper/Wrapper";
import Main from "@/components/layouts/main/Main";
import FileExplorer from "@/components/features/fileExplorer/fileExplorer/FileExplorer";

export default function ChangesPage() {
  return (
    <Wrapper style={{ marginTop: "1rem" }}>
      <Main>
        <FileExplorer />
      </Main>
    </Wrapper>
  );
}
