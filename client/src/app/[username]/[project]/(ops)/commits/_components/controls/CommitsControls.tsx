import React from "react";
import styles from "../commits.module.scss";
import Dropdown from "@/components/ui/control/dropdown/Dropdown";
import DatePicker from "@/components/ui/control/datePicker/DatePicker";
import SearchBar from "@/components/ui/control/searchBar/SearchBar";

interface CommitsControlsProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const BRANCH_OPTIONS = [
  { displayName: "master", value: "master" },
  { displayName: "main", value: "main" },
  { displayName: "develop", value: "develop" },
];

const AUTHOR_OPTIONS = [
  { displayName: "All users", value: "all" },
  { displayName: "Me", value: "me" },
];

const CommitsControls = ({ searchParams }: CommitsControlsProps) => {
  return (
    <div className={styles.controls_section}>
      <div className={styles.left_controls}>
        <Dropdown
          title="master"
          icon="GitBranch"
          options={BRANCH_OPTIONS}
          defaultValue={(searchParams?.branch as string) || "master"}
          query="branch"
          className={styles.control_dropdown}
          buttonStyle={{ border: "none" }}
        />
      </div>
      <div className={styles.right_controls}>
        <SearchBar
          placeHolder="Search commits..."
          query="search"
          customStyles={{ width: "250px", height: "32px" }}
        />
        <Dropdown
          title="All users"
          icon="Users"
          options={AUTHOR_OPTIONS}
          defaultValue={(searchParams?.author as string) || "all"}
          query="author"
          className={styles.control_dropdown}
          buttonStyle={{ border: "none" }}
        />
        <DatePicker
          placeholder="All time"
          query="date"
          buttonStyle={{
            backgroundColor: "#212830",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            height: "32px",
          }}
        />
      </div>
    </div>
  );
};

export default CommitsControls;
