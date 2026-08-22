"use client";

import React from "react";
import ExplorerContent from "./components/explorerContent/ExplorerContent";
import ExplorereSidePanel from "./components/explorerSidePanel/ExplorereSidePanel";
import { useExplorerData } from "./components/contexts/ExplorerDataContext";

export default function FileExplorerBase({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <>{children}</>;
}

export const Header = function ({ children }: { children?: React.ReactNode }) {
  return children;
};

export const SidePanel = function ({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { isPanelOpen } = useExplorerData();

  if (!isPanelOpen) return null;

  return <ExplorereSidePanel>{children}</ExplorereSidePanel>;
};

export const ExplorerContentSection = function ({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <>
      <ExplorerContent />
      {children}
    </>
  );
};
