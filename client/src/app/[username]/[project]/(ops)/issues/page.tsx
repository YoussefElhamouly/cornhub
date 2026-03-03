import React from "react";
import ContentViewer from "@/components/ui/layout/contentViewer/ContentViewer";
import IssueControls from "./_components/controls/IssueControls";
import IssueList from "./_components/lists/IssueList";
import styles from "./_components/issues.module.scss";

export default async function IssuesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  return (
    <div style={{ padding: "1rem" }}>
      <div className={styles.identity_header}>
        <h1 className={styles.title}>Issues</h1>
        <span className={styles.count}>#3</span>
      </div>
      <ContentViewer>
        <ContentViewer.Header>
          <IssueControls searchParams={resolvedSearchParams} />
        </ContentViewer.Header>
        <ContentViewer.Body>
          <IssueList />
        </ContentViewer.Body>
      </ContentViewer>
    </div>
  );
}
