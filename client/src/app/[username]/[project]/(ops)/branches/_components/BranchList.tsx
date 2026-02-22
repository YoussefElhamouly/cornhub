import React from "react";
import ContentViewer from "../../../../../../components/ui/layout/contentViewer/ContentViewer";
import Table from "../../../../../../components/ui/layout/table/Table";
import Item from "../../../../../../components/ui/collection/item/Item";
import styles from "./branches.module.scss";

// Table columns and mock data for both tables
const columns = [
  { key: "branch" },
  { key: "message" },
  { key: "author" },
  { key: "updated" },
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

const BranchList = () => {
  return (
    <>
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
    </>
  );
};

export default BranchList;
