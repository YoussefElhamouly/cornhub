import React from "react";
import Skeleton from "@/components/ui/feedback/skeleton/Skeleton";
import styles from "./_components/commits.module.scss";
import cardStyles from "@/components/ui/cards/commitCard/commitCard.module.scss";

export default function CommitsLoading() {
  return (
    <div style={{ padding: "1rem" }}>
      <div className={styles.identity_header}>
        <Skeleton
          customStyles={{ width: "150px", height: "32px", borderRadius: "6px" }}
        />
      </div>

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
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <Skeleton
                customStyles={{
                  width: "160px",
                  height: "20px",
                  borderRadius: "4px",
                  marginLeft: "0.5rem",
                }}
              />
            </div>
            <div className={styles.commits_list}>
              {[1, 2, 3].map((card) => (
                <div
                  key={card}
                  className={cardStyles.commit_card}
                  style={{ height: "76px" }}
                >
                  <div className={cardStyles.commit_main}>
                    <Skeleton
                      customStyles={{
                        width: "60%",
                        height: "18px",
                        marginBottom: "4px",
                        borderRadius: "4px",
                      }}
                    />
                    <div className={cardStyles.commit_meta}>
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
                  <div className={cardStyles.commit_actions}>
                    <Skeleton
                      customStyles={{
                        width: "70px",
                        height: "28px",
                        borderRadius: "6px",
                      }}
                    />
                    <Skeleton
                      customStyles={{
                        width: "32px",
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
