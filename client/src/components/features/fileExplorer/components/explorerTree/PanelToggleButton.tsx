"use client";

import React from "react";
import Button from "@/components/ui/control/button/Button";
import { useExplorerContext } from "../contexts/ExplorerContext";

export default function PanelToggleButton() {
  const { isPanelOpen, togglePanel } = useExplorerContext();

  if (isPanelOpen) return null;

  return (
    <Button
      icon={"PanelLeftOpen"}
      onClick={togglePanel}
      customStyles={{
        padding: "8px",
        marginRight: "0.5rem",
        display: "flex",
      }}
    />
  );
}
