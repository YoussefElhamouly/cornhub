import LayoutWrapper from "./_layoutStructure/LayoutWrapper";
import Navbar from "@/components/layouts/navbar/Navbar";
import ProjectNavbar from "@/components/layouts/navbar/ProjectNavbar";

export default async function ProjectLayout({
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
      <LayoutWrapper>{children}</LayoutWrapper>
    </>
  );
}
