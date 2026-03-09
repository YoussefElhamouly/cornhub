"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/ui/control/dropdown/Dropdown";
import type { Branch } from "../../../types/fileExplorer";
import { useExplorerData } from "../../contexts/ExplorerDataContext";
interface BranchSwitcherProps {
  activeBranch: Branch;
  basePath: string;
}

const BranchSwitcher = ({ activeBranch, basePath }: BranchSwitcherProps) => {
  const { branches } = useExplorerData();
  const router = useRouter();

  const options = branches.map((b) => ({
    displayName: b.name,
    value: b.name,
  }));

  const handleBranchChange = (value: string) => {
    router.push(`${basePath}/${value}`);
  };

  return (
    <Dropdown
      title={activeBranch.name}
      icon={"GitBranch"}
      options={options}
      defaultValue={activeBranch.name}
      onChange={handleBranchChange}
      wrapperStyle={{ width: "100%" }}
      buttonStyle={{
        padding: "15px",
        width: "100%",
        justifyContent: "space-between",
      }}
      menuStyle={{ width: "100%" }}
    />
  );
};

export default BranchSwitcher;
