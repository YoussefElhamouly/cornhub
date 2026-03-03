"use client";

import React from "react";
import Table from "@/components/ui/layout/table/Table";
import Item from "@/components/ui/collection/item/Item";
import type { FileTreeNode, Commit } from "../types/fileExplorer";
import { formatFileSize, formatRelativeDate } from "../data/mockData";
import styles from "./explorerContent.module.scss";

interface FolderViewProps {
  children: FileTreeNode[];
  commit: Commit;
  /** basePath e.g. "/alice/my-project/tree" */
  basePath: string;
}

/** Map our data types to the Item component's type prop */
function toItemType(
  nodeType: FileTreeNode["type"],
  status?: FileTreeNode["status"],
): React.ComponentProps<typeof Item>["type"] {
  if (status === "added") return "file-added";
  if (status === "modified") return "file-modified";
  if (status === "removed") return "file-minus";
  return nodeType === "folder" ? "folder" : "file";
}

const FolderView = ({ children, commit, basePath }: FolderViewProps) => {
  const columns = [
    {
      displayName: "Name",
      key: "name",
      render: (_: any, row: FileTreeNode) => (
        <Item
          name={row.name}
          type={toItemType(row.type, row.status)}
          href={`${basePath}/${row.path}`}
        />
      ),
    },
    {
      displayName: "Last commit",
      render: () => (
        <span className={styles.folderRow_commitMsg}>{commit.message}</span>
      ),
    },
    {
      displayName: "Date",
      render: () => (
        <span className={styles.folderRow_date} title={commit.date}>
          {formatRelativeDate(commit.date)}
        </span>
      ),
    },
    {
      displayName: "Size",
      key: "size",
      render: (_: any, row: FileTreeNode) => (
        <span className={styles.folderRow_size}>
          {row.size != null ? formatFileSize(row.size) : "—"}
        </span>
      ),
    },
  ];

  const sorted = [...children].sort((a, b) => {
    if (a.type === "folder" && b.type !== "folder") return -1;
    if (a.type !== "folder" && b.type === "folder") return 1;
    return a.name.localeCompare(b.name);
  });

  return <Table columns={columns} data={sorted} />;
};

export default FolderView;
