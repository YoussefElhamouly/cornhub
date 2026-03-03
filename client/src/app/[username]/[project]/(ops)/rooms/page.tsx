import React, { Suspense } from "react";
import ContentViewer from "@/components/ui/layout/contentViewer/ContentViewer";
import RoomControls from "./_components/controls/RoomControls";
import RoomList from "./_components/lists/RoomList";
import styles from "./_components/rooms.module.scss";

export default async function RoomsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  return (
    <div style={{ padding: "1rem" }}>
      <div className={styles.identity_header}>
        <h1 className={styles.title}>Rooms</h1>
        <span className={styles.count}>#4</span>
      </div>
      <ContentViewer>
        <ContentViewer.Header>
          <RoomControls searchParams={resolvedSearchParams} />
        </ContentViewer.Header>
        <ContentViewer.Body>
          <RoomList />
        </ContentViewer.Body>
      </ContentViewer>
    </div>
  );
}
