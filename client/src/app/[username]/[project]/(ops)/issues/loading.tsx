import React from "react";
import Skeleton from "@/components/ui/feedback/skeleton/Skeleton";
import ContentViewer from "@/components/ui/layout/contentViewer/ContentViewer";
import styles from "./_components/issues.module.scss";

export default function IssuesLoading() {
  return (
    <div style={{ padding: "1rem" }}>
      <Skeleton
        customStyles={{
          width: "200px",
          height: "32px",
          marginBottom: "1.5rem",
          borderRadius: "6px",
        }}
      />
      <ContentViewer>
        <ContentViewer.Header>
          <div className={styles.controls_wrapper}>
            <div className={styles.left_controls}>
              <div style={{ display: "flex", gap: "1rem" }}>
                <Skeleton
                  customStyles={{
                    width: "60px",
                    height: "18px",
                    borderRadius: "4px",
                  }}
                />
                <Skeleton
                  customStyles={{
                    width: "60px",
                    height: "18px",
                    borderRadius: "4px",
                  }}
                />
              </div>
            </div>
            <div className={styles.right_controls}>
              <Skeleton
                customStyles={{
                  width: "300px",
                  height: "32px",
                  borderRadius: "6px",
                }}
              />
              <Skeleton
                customStyles={{
                  width: "80px",
                  height: "32px",
                  borderRadius: "6px",
                }}
              />
            </div>
          </div>
        </ContentViewer.Header>
        <ContentViewer.Body>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={styles.skeleton_card}>
              <div className={styles.skeleton_main}>
                <Skeleton
                  customStyles={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    marginTop: "4px",
                  }}
                />
                <div className={styles.skeleton_info}>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <Skeleton
                      customStyles={{
                        width: "60%",
                        height: "18px",
                        borderRadius: "4px",
                      }}
                    />
                    <Skeleton
                      customStyles={{
                        width: "60px",
                        height: "20px",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <Skeleton
                    customStyles={{
                      width: "40%",
                      height: "14px",
                      borderRadius: "4px",
                    }}
                  />
                </div>
              </div>
              <div className={styles.skeleton_indicators}>
                <Skeleton
                  customStyles={{
                    width: "28px",
                    height: "20px",
                    borderRadius: "4px",
                  }}
                />
              </div>
            </div>
          ))}
        </ContentViewer.Body>
      </ContentViewer>
    </div>
  );
}
