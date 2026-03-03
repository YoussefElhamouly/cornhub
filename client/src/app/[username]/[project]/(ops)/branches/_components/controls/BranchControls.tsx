import React from "react";
import Filter from "@/components/ui/control/filter/Filter";
import SearchBar from "@/components/ui/control/searchBar/SearchBar";
import styles from "./branches.module.scss";

interface BranchControlsProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const FILTER_OPTIONS = [
  {
    value: "overview",
    displayName: "Overview",
    default: true,
  },
  {
    value: "active",
    displayName: "Active",
    default: false,
  },
  {
    value: "stale",
    displayName: "Stale",
    default: false,
  },
  {
    value: "all",
    displayName: "All",
    default: false,
  },
];

const BranchControls = ({ searchParams }: BranchControlsProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginBottom: "1.5rem",
      }}
    >
      <Filter options={FILTER_OPTIONS} query="filter" />
      <SearchBar placeHolder="Search branches..." query="search" />
    </div>
  );
};

export default BranchControls;
