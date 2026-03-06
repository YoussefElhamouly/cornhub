import React from "react";
import Table from "@/components/ui/layout/table/Table";
import Item from "@/components/ui/collection/item/Item";
import type { ExplorerNode, Commit } from "../../types/fileExplorer";

import { formatFileSize, formatDate } from "@/utils/helperFunctions";
import styles from "./explorerContent.module.scss";

interface FolderViewProps {
  children: ExplorerNode[];
  commit: Commit;
  basePath: string;
}

const FolderView = ({ children, commit, basePath }: FolderViewProps) => {
  const columns = [
    {
      displayName: "Name",
      key: "name",
      render: (_: any, row: ExplorerNode) => (
        <Item
          title={row.title}
          type={row.type === "directory" ? "directory" : "file"}
          status={row.status || "unchanged"}
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
        <span className={styles.folderRow_date}>
          {formatDate(commit.createdAt)}
        </span>
      ),
    },
    {
      displayName: "Size",
      key: "size",
      render: (_: any, row: ExplorerNode) => (
        <span className={styles.folderRow_size}>
          {row.type === "file" && row.metaData?.size != null
            ? formatFileSize(row.metaData.size)
            : "—"}
        </span>
      ),
    },
  ];

  const sorted = [...children].sort((a, b) => {
    if (a.type === "directory" && b.type !== "directory") return -1;
    if (a.type !== "directory" && b.type === "directory") return 1;
    return a.title.localeCompare(b.title);
  });

  return <Table columns={columns} data={sorted} />;
};

export default FolderView;
