"use client";

import React, { createContext, useContext } from "react";
import type { Branch } from "../../types/fileExplorer";

interface ExplorerDataContextType {
  branches: Branch[];
  username: string;
  project: string;
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
  return (
    <ExplorerDataContext.Provider value={{ branches, username, project }}>
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
