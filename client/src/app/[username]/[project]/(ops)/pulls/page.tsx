import React from "react";
import ContentViewer from "@/components/ui/layout/contentViewer/ContentViewer";
import PullRequestControls from "./_components/PullRequestControls";
import PullRequestList from "./_components/PullRequestList";
import styles from "./_components/pulls.module.scss";

export default async function PullRequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  return (
    <div style={{ padding: "1rem" }}>
      <div className={styles.identity_header}>
        <h1 className={styles.title}>Pull Requests</h1>
        <span className={styles.count}>#4</span>
      </div>
      <ContentViewer>
        <ContentViewer.Header>
          <PullRequestControls searchParams={resolvedSearchParams} />
        </ContentViewer.Header>
        <ContentViewer.Body>
          <PullRequestList />
        </ContentViewer.Body>
      </ContentViewer>
    </div>
  );
}
