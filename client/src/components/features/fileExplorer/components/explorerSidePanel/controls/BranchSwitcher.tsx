"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/ui/control/dropdown/Dropdown";
import { useExplorerData } from "../../contexts/ExplorerDataContext";

const BranchSwitcher = () => {
  const { branches, activeBranch, basePath } = useExplorerData();
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
        backgroundColor: "var(--tertiary-bg)",
      }}
      menuStyle={{ width: "100%" }}
    />
  );
};

export default BranchSwitcher;
