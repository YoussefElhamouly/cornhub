import React, { Suspense } from "react";
import ContentViewer from "@/components/ui/layout/contentViewer/ContentViewer";
import RoomControls from "./_components/RoomControls";
import RoomList from "./_components/RoomList";
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
          <Suspense fallback={<RoomsLoadingContent />}>
            <RoomList />
          </Suspense>
        </ContentViewer.Body>
      </ContentViewer>
    </div>
  );
}

function RoomsLoadingContent() {
  return (
    <>
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            borderBottom: "1px solid var(--border)",
            padding: "0.75rem 1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "4px",
                backgroundColor: "var(--border)",
                opacity: 0.5,
              }}
            ></div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  width: "40%",
                  height: "18px",
                  borderRadius: "4px",
                  backgroundColor: "var(--border)",
                  opacity: 0.5,
                  marginBottom: "8px",
                }}
              ></div>
              <div
                style={{
                  width: "20%",
                  height: "14px",
                  borderRadius: "4px",
                  backgroundColor: "var(--border)",
                  opacity: 0.5,
                }}
              ></div>
            </div>
            <div
              style={{
                width: "60px",
                height: "20px",
                borderRadius: "10px",
                backgroundColor: "var(--border)",
                opacity: 0.5,
              }}
            ></div>
          </div>
        </div>
      ))}
    </>
  );
}
