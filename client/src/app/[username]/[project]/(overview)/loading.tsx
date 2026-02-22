import React from "react";
import Skeleton from "@/components/ui/feedback/skeleton/Skeleton";
import styles from "./project.module.scss";

const PageLoading = () => {
  return (
    <div className={styles.project_main}>
      {/* Main Controls Skeleton */}
      <div className={styles.main_controls}>
        <Skeleton
          customStyles={{ width: "100px", height: "32px", borderRadius: "6px" }}
        />
        <Skeleton
          customStyles={{ width: "80px", height: "32px", borderRadius: "6px" }}
        />
        <Skeleton
          customStyles={{ width: "100px", height: "32px", borderRadius: "6px" }}
        />
        <Skeleton
          customStyles={{
            flex: 1,
            maxWidth: "250px",
            marginLeft: "auto",
            height: "32px",
            borderRadius: "6px",
          }}
        />
        <Skeleton
          customStyles={{ width: "80px", height: "32px", borderRadius: "6px" }}
        />
        <Skeleton
          customStyles={{ width: "80px", height: "32px", borderRadius: "6px" }}
        />
      </div>

      {/* Table Skeleton */}
      <div
        style={{
          marginTop: "1rem",
          border: "1px solid var(--border)",
          borderRadius: "6px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "12px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            gap: "1rem",
            backgroundColor: "var(--tertiary-bg)",
          }}
        >
          <Skeleton customStyles={{ width: "15%", height: "20px" }} />
          <Skeleton customStyles={{ width: "60%", height: "20px" }} />
          <Skeleton
            customStyles={{ width: "15%", height: "20px", marginLeft: "auto" }}
          />
        </div>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{
              padding: "12px",
              borderBottom: i === 4 ? "none" : "1px solid var(--border)",
              display: "flex",
              gap: "1rem",
            }}
          >
            <Skeleton
              customStyles={{
                width: "150px",
                height: "20px",
                borderRadius: "4px",
              }}
            />
            <Skeleton
              customStyles={{
                width: "300px",
                height: "20px",
                borderRadius: "4px",
              }}
            />
            <Skeleton
              customStyles={{
                width: "80px",
                height: "20px",
                marginLeft: "auto",
                borderRadius: "4px",
              }}
            />
          </div>
        ))}
      </div>

      {/* ReadMe Skeleton */}
      <div
        style={{
          marginTop: "2rem",
          border: "1px solid var(--border)",
          borderRadius: "6px",
          padding: "1.5rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <Skeleton
          customStyles={{
            width: "120px",
            height: "24px",
            marginBottom: "1.5rem",
          }}
        />
        <Skeleton
          customStyles={{ width: "40%", height: "32px", marginBottom: "1rem" }}
        />
        <Skeleton
          customStyles={{
            width: "100%",
            height: "16px",
            marginBottom: "0.5rem",
            borderRadius: "4px",
          }}
        />
        <Skeleton
          customStyles={{
            width: "90%",
            height: "16px",
            marginBottom: "0.5rem",
            borderRadius: "4px",
          }}
        />
        <Skeleton
          customStyles={{
            width: "95%",
            height: "16px",
            marginBottom: "1.5rem",
            borderRadius: "4px",
          }}
        />

        <Skeleton
          customStyles={{ width: "30%", height: "24px", marginBottom: "1rem" }}
        />
        <Skeleton
          customStyles={{ width: "100%", height: "150px", borderRadius: "6px" }}
        />
      </div>
    </div>
  );
};

export default PageLoading;
