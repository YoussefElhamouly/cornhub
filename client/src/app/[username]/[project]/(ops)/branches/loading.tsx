import React from "react";
import Skeleton from "@/components/ui/feedback/skeleton/Skeleton";
import ContentViewer from "@/components/ui/layout/contentViewer/ContentViewer";
import Wrapper from "@/components/layouts/wrapper/Wrapper";
import Main from "@/components/layouts/main/Main";
import styles from "./_components/branches.module.scss";

export default function BranchesLoading() {
  return (
    <Wrapper className={styles.branches_wrapper}>
      <Main className={styles.branches_main}>
        <div className={styles.identity_header}>
          <Skeleton
            customStyles={{
              width: "150px",
              height: "32px",
              borderRadius: "6px",
            }}
          />
        </div>

        <div className={styles.skeleton_controls}>
          <Skeleton
            customStyles={{
              width: "250px",
              height: "32px",
              borderRadius: "6px",
            }}
          />
          <Skeleton
            customStyles={{
              width: "100%",
              height: "32px",
              borderRadius: "6px",
            }}
          />
        </div>

        <h2 className={styles.branch_group_title}>Default</h2>
        <ContentViewer className={styles.branch_table}>
          <ContentViewer.Body>
            <div className={styles.skeleton_table_row}>
              <Skeleton
                customStyles={{
                  width: "150px",
                  height: "18px",
                  borderRadius: "4px",
                }}
              />
              <Skeleton
                customStyles={{
                  width: "200px",
                  height: "18px",
                  borderRadius: "4px",
                }}
              />
              <Skeleton
                customStyles={{
                  width: "120px",
                  height: "18px",
                  borderRadius: "4px",
                }}
              />
              <Skeleton
                customStyles={{
                  width: "80px",
                  height: "18px",
                  borderRadius: "4px",
                }}
              />
            </div>
          </ContentViewer.Body>
        </ContentViewer>

        <h2 className={styles.branch_group_title}>Active</h2>
        <ContentViewer className={styles.branch_table}>
          <ContentViewer.Body>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.skeleton_table_row}>
                <Skeleton
                  customStyles={{
                    width: "150px",
                    height: "18px",
                    borderRadius: "4px",
                  }}
                />
                <Skeleton
                  customStyles={{
                    width: "200px",
                    height: "18px",
                    borderRadius: "4px",
                  }}
                />
                <Skeleton
                  customStyles={{
                    width: "120px",
                    height: "18px",
                    borderRadius: "4px",
                  }}
                />
                <Skeleton
                  customStyles={{
                    width: "80px",
                    height: "18px",
                    borderRadius: "4px",
                  }}
                />
              </div>
            ))}
          </ContentViewer.Body>
        </ContentViewer>
      </Main>
    </Wrapper>
  );
}
