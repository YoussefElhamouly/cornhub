import React from "react";
import Link from "next/link";
import styles from "../pulls.module.scss";
import SearchBar from "@/components/ui/control/searchBar/SearchBar";
import Dropdown from "@/components/ui/control/dropdown/Dropdown";
import Icon from "@/components/ui/media/icon/Icon";

interface PullRequestControlsProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const FILTER_OPTIONS = [
  { displayName: "Open PRs", value: "is:open" },
  { displayName: "Your PRs", value: "author:me" },
  { displayName: "Everything assigning you", value: "assignee:me" },
  { displayName: "Everything mentioning you", value: "mentions:me" },
];

const PullRequestControls = ({ searchParams }: PullRequestControlsProps) => {
  const currentState = searchParams?.state || "open";

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
            href={getTabHref("open")}
            className={`${styles.tab_item} ${currentState === "open" ? styles.active : ""}`}
            scroll={false}
          >
            <Icon icon="CircleDot" size={16} />
            <span>Open</span>
            <span className={styles.count_badge}>4</span>
          </Link>
          <Link
            href={getTabHref("closed")}
            className={`${styles.tab_item} ${currentState === "closed" ? styles.active : ""}`}
            scroll={false}
          >
            <Icon icon="Check" size={16} />
            <span>Closed</span>
            <span className={styles.count_badge}>12</span>
          </Link>
        </div>
      </div>
      <div className={styles.right_controls}>
        <SearchBar
          placeHolder="is:pr is:open"
          query="search"
          customStyles={{ width: "300px", height: "32px", fontSize: "0.85rem" }}
        />
        <Dropdown
          title="Filters"
          options={FILTER_OPTIONS}
          defaultValue={(searchParams?.filters as string) || "is:open"}
          query="filters"
          className={styles.filter_dropdown}
          buttonStyle={{ border: "none", gap: "0.25rem" }}
        />
      </div>
    </div>
  );
};

export default PullRequestControls;
