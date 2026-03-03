import React from "react";
import Link from "next/link";
import styles from "../rooms.module.scss";
import SearchBar from "@/components/ui/control/searchBar/SearchBar";
import Dropdown from "@/components/ui/control/dropdown/Dropdown";
import Icon from "@/components/ui/media/icon/Icon";

interface RoomControlsProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const SORT_OPTIONS = [
  { displayName: "Newest", value: "newest" },
  { displayName: "Oldest", value: "oldest" },
];

const TYPE_OPTIONS = [
  { displayName: "All", value: "all" },
  { displayName: "Active", value: "active" },
  { displayName: "Closed", value: "closed" },
];

const RoomControls = ({ searchParams }: RoomControlsProps) => {
  const currentState = searchParams?.state || "active";

  // Helper to preserve other query params when switching tabs
  const getTabHref = (state: string) => {
    const params = new URLSearchParams();
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value && typeof value === "string") params.set(key, value);
      });
    }
    params.set("state", state);
    return `?${params.toString()}`;
  };

  return (
    <div className={styles.controls_wrapper}>
      <div className={styles.left_controls}>
        <div className={styles.tabs}>
          <Link
            href={getTabHref("active")}
            className={`${styles.tab_item} ${currentState === "active" ? styles.active : ""}`}
            scroll={false}
          >
            <Icon icon="Radio" size={16} />
            <span>Active</span>
            <span className={styles.count_badge}>4</span>
          </Link>
          <Link
            href={getTabHref("closed")}
            className={`${styles.tab_item} ${currentState === "closed" ? styles.active : ""}`}
            scroll={false}
          >
            <Icon icon="Archive" size={16} />
            <span>Closed</span>
            <span className={styles.count_badge}>12</span>
          </Link>
        </div>
      </div>
      <div className={styles.right_controls}>
        <SearchBar
          placeHolder="Search rooms..."
          query="search"
          customStyles={{ width: "250px", height: "32px", fontSize: "0.85rem" }}
        />
        <Dropdown
          title="Sort"
          options={SORT_OPTIONS}
          defaultValue={(searchParams?.sort as string) || "newest"}
          query="sort"
          buttonStyle={{ border: "none", gap: "0.25rem" }}
        />
        <Dropdown
          title="Type"
          options={TYPE_OPTIONS}
          defaultValue={(searchParams?.type as string) || "all"}
          query="type"
          buttonStyle={{ border: "none", gap: "0.25rem" }}
        />
      </div>
    </div>
  );
};

export default RoomControls;
