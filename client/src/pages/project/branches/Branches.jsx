import React from "react";
import Navbar from "../../../components/layouts/navbar/Navbar.jsx";
import SecondaryNavbar from "../../../components/layouts/navbar/SecondaryNavbar.jsx";
import Wrapper from "../../../components/layouts/wrapper/Wrapper.jsx";
import Main from "../../../components/layouts/main/Main.jsx";
import Filter from "../../../components/ui/control/filter/Filter.jsx";
import SearchBar from "../../../components/ui/control/searchBar/SearchBar.jsx";
import ContentViewer from "../../../components/ui/layout/contentViewer/ContentViewer.jsx";
import Table from "../../../components/ui/layout/table/Table.jsx";
import Item from "../../../components/ui/collection/item/Item.jsx";
import styles from "./branches.module.scss";
import { GitBranch, User, Clock } from "lucide-react";

import { SECONDARY_NAV_LINKS } from "../Project.jsx";
// Table columns and mock data for both tables
const columns = [
  { key: "branch", render: (val) => val },
  { key: "message", render: (val) => val },
  { key: "author", render: (val) => val },
  { key: "updated", render: (val) => val },
];

const data1 = [
  {
    branch: <Item name={"main"} type="folder" />,
    message: "Default branch",
    author: "Youssef Elhamouly",
    updated: "2 days ago",
  },
];

const data2 = [
  {
    branch: <Item name={"deploy-button-better-descriptions"} type="folder" />,
    message: "Better deploy descriptions",
    author: "Alex Martinez",
    updated: "3 days ago",
  },
  {
    branch: <Item name={"deploy-button-input-descriptions"} type="folder" />,
    message: "Input descriptions",
    author: "Jordan Lee",
    updated: "3 days ago",
  },
  {
    branch: <Item name={"add-deploy-button"} type="folder" />,
    message: "Add deploy button",
    author: "Youssef Elhamouly",
    updated: "3 days ago",
  },
];

const filterOptions = [
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
const Branches = () => {
  return (
    <>
      <Navbar>
        <SecondaryNavbar links={SECONDARY_NAV_LINKS} />
      </Navbar>
      <Wrapper className={styles.branches_wrapper}>
        <Main className={styles.branches_main}>
          <h1
            className={styles.branch_group_title}
            style={{ fontSize: "1.4rem" }}
          >
            Branches
          </h1>
          <Filter options={filterOptions} />
          <SearchBar placeHolder="Search branches..." />
          <h2 className={styles.branch_group_title}>Default</h2>
          <ContentViewer className={styles.branch_table}>
            <ContentViewer.Body>
              <Table columns={columns} data={data1} />
            </ContentViewer.Body>
          </ContentViewer>
          <h2 className={styles.branch_group_title}>Active</h2>
          <ContentViewer className={styles.branch_table}>
            <ContentViewer.Body>
              <Table columns={columns} data={data2} />
            </ContentViewer.Body>
          </ContentViewer>
        </Main>
      </Wrapper>
    </>
  );
};

export default Branches;
