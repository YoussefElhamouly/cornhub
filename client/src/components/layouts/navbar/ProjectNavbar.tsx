import React from "react";
import SecondaryNavbar from "./SecondaryNavbar";

interface ProjectNavbarProps {
  initialPath: string; // format: /:user/:project
}

const SECONDARY_NAV_LINKS = [
  { displayName: "Code", path: "", icon: "Code" },
  { displayName: "Branches", path: "/branches", icon: "GitBranch" },
  { displayName: "Rooms", path: "/rooms", icon: "Popcorn" },
  { displayName: "Pull requests", path: "/pulls", icon: "GitPullRequest" },
  { displayName: "Issues", path: "/issues", icon: "ErrorIcon" },
  { displayName: "Wiki", path: "/wiki", icon: "AtSign" },
  { displayName: "Settings", path: "/settings", icon: "Settings" },
];

const ProjectNavbar = ({ initialPath }: ProjectNavbarProps) => {
  const links = SECONDARY_NAV_LINKS.map((link) => ({
    ...link,
    path: `${initialPath}${link.path}`,
  }));

  return <SecondaryNavbar links={links} />;
};

export default ProjectNavbar;
