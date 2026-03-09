"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { Branch } from "../../types/fileExplorer";

interface ExplorerDataContextType {
  branches: Branch[];
  username: string;
  project: string;
  isPanelOpen?: boolean;
  togglePanel?: () => void;
}

const ExplorerDataContext = createContext<ExplorerDataContextType | undefined>(
  undefined,
);

export const ExplorerDataProvider = ({
  branches,
  username,
  project,
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
      value={{ branches, username, project, isPanelOpen, togglePanel }}
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
