import React from "react";
import Navbar from "@/components/layouts/navbar/Navbar";

import ProjectNavbar from "@/components/layouts/navbar/ProjectNavbar";
import Wrapper from "@/components/layouts/wrapper/Wrapper";
import Main from "@/components/layouts/main/Main";

export default async function OpsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ username: string; project: string }>;
}) {
  const resolvedParams = await params;
  const initialPath = `/${resolvedParams.username}/${resolvedParams.project}`;

  return (
    <>
      <Navbar>
        <ProjectNavbar initialPath={initialPath} />
      </Navbar>
      <Wrapper>
        <Main>{children}</Main>
      </Wrapper>
    </>
  );
}
