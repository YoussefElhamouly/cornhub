"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { Branch, Commit } from "../../types/fileExplorer";

interface ExplorerDataContextType {
  branches: Branch[];
  commits: Commit[];
  basePath: string;

  isPanelOpen?: boolean;
  togglePanel?: () => void;
}

const ExplorerDataContext = createContext<ExplorerDataContextType | undefined>(
  undefined,
);

export const ExplorerDataProvider = ({
  branches,
  commits,
  basePath,
  children,
}: ExplorerDataContextType & { children: React.ReactNode }) => {
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(true);

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
  return (
    <ExplorerDataContext.Provider
      value={{
        branches,
        basePath,
        isPanelOpen,
        togglePanel,
        commits,
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
