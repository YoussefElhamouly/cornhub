"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ExplorerContextType {
  isPanelOpen: boolean;
  togglePanel: () => void;
}

const ExplorerContext = createContext<ExplorerContextType | undefined>(
  undefined,
);

export const ExplorerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  // Load from local storage on initial mount
  useEffect(() => {
    const saved = localStorage.getItem("file-explorer-panel-open");
    if (saved !== null) {
      setIsPanelOpen(saved === "true");
    }
  }, []);

  // Save to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("file-explorer-panel-open", String(isPanelOpen));
  }, [isPanelOpen]);

  const togglePanel = () => setIsPanelOpen((prev) => !prev);

  return (
    <ExplorerContext.Provider value={{ isPanelOpen, togglePanel }}>
      {children}
    </ExplorerContext.Provider>
  );
};

export const useExplorerContext = () => {
  const context = useContext(ExplorerContext);
  if (!context) {
    throw new Error(
      "useExplorerContext must be used within an ExplorerProvider",
    );
  }
  return context;
};
