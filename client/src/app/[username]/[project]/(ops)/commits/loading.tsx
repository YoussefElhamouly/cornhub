import React from "react";
import Skeleton from "@/components/ui/feedback/skeleton/Skeleton";
import ContentViewer from "@/components/ui/layout/contentViewer/ContentViewer";
import styles from "./_components/commits.module.scss";

export default function CommitsLoading() {
  return (
    <div style={{ padding: "1rem" }}>
      <h1 style={{ color: "transparent", marginBottom: "1.5rem" }}>
        <Skeleton
          customStyles={{ width: "150px", height: "32px", borderRadius: "6px" }}
        />
      </h1>

      <div className={styles.controls_section}>
        <div className={styles.left_controls}>
          <Skeleton
            customStyles={{
              width: "120px",
              height: "32px",
              borderRadius: "6px",
            }}
          />
        </div>
        <div className={styles.right_controls}>
          <Skeleton
            customStyles={{
              width: "250px",
              height: "32px",
              borderRadius: "6px",
            }}
          />
          <Skeleton
            customStyles={{
              width: "100px",
              height: "32px",
              borderRadius: "6px",
            }}
          />
          <Skeleton
            customStyles={{
              width: "120px",
              height: "32px",
              borderRadius: "6px",
            }}
          />
        </div>
      </div>

      <div className={styles.commits_container}>
        {[1, 2].map((group) => (
          <div key={group} className={styles.commit_group}>
            <div className={styles.group_header}>
              <div className={styles.group_icon} style={{ left: "-2.2rem" }}>
                <Skeleton
                  customStyles={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <Skeleton
                customStyles={{
                  width: "120px",
                  height: "18px",
                  borderRadius: "4px",
                }}
              />
            </div>
            <div className={styles.commits_list}>
              {[1, 2, 3].map((card) => (
                <div
                  key={card}
                  className={styles.commit_card}
                  style={{ height: "64px" }}
                >
                  <div className={styles.commit_main}>
                    <Skeleton
                      customStyles={{
                        width: "60%",
                        height: "18px",
                        marginBottom: "8px",
                        borderRadius: "4px",
                      }}
                    />
                    <div style={{ display: "flex", gap: "8px" }}>
                      <Skeleton
                        customStyles={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                        }}
                      />
                      <Skeleton
                        customStyles={{
                          width: "150px",
                          height: "14px",
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "4px" }}>
                    <Skeleton
                      customStyles={{
                        width: "60px",
                        height: "28px",
                        borderRadius: "6px",
                      }}
                    />
                    <Skeleton
                      customStyles={{
                        width: "60px",
                        height: "28px",
                        borderRadius: "6px",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
