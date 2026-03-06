"use client";

import React from "react";
import Button from "@/components/ui/control/button/Button";
import { useExplorerContext } from "../contexts/ExplorerContext";

const SidePanelActions = () => {
  const { togglePanel } = useExplorerContext();

  return <Button icon={"PanelLeftClose"} onClick={togglePanel} />;
};

export default SidePanelActions;
