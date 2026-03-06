"use client";

import React from "react";
import { useExplorerContext } from "../contexts/ExplorerContext";

export default function CollapsibleSidePanel({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isPanelOpen } = useExplorerContext();

  if (!isPanelOpen) return null;

  return <>{children}</>;
}
