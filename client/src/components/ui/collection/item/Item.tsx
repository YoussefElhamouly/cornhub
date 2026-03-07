"use client";

import React from "react";
import Link from "next/link";
import styles from "./item.module.scss";
import Icon from "../../media/icon/Icon";

const FOLDER_CLOSED = (
  <svg
    className={styles.folder_icon}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="3 5 18 14"
    fill="currentColor"
  >
    <path d="M3 6.5C3 5.67 3.67 5 4.5 5H9.17C9.7 5 10.2 5.21 10.56 5.59L11.83 7H19.5C20.33 7 21 7.67 21 8.5V17.5C21 18.33 20.33 19 19.5 19H4.5C3.67 19 3 18.33 3 17.5V6.5Z" />
  </svg>
);

const FOLDER_OPEN = (
  <svg
    className={styles.folder_icon}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="2.5 5 19 14.5"
    fill="currentColor"
  >
    <path d="M2.5 9.5C2.5 8.67 3.17 8 4 8H20C20.83 8 21.5 8.67 21.5 9.5L19.7 17.2C19.53 17.94 18.87 18.5 18.11 18.5H5.89C5.13 18.5 4.47 17.94 4.3 17.2L2.5 9.5Z" />
    <path
      d="M4 6C4 5.45 4.45 5 5 5H9.2C9.55 5 9.88 5.15 10.12 5.41L11.4 6.8H19C19.55 6.8 20 7.25 20 7.8V8H4V6Z"
      opacity="0.85"
    />
  </svg>
);

export interface ItemProps {
  title: string;
  type?: "directory" | "file";
  isExpanded?: boolean;
  status?: "added" | "modified" | "removed" | "unchanged";
  href?: string;

  onClick?: () => void;
}

const Item = ({
  title,
  type = "directory",
  isExpanded = false,
  status = "unchanged",
  href,
  onClick,
}: ItemProps) => {
  const getIconColor = () => {
    switch (status) {
      case "added":
        return "#22c55e";
      case "removed":
        return "#ef4444";
      case "modified":
        return "#eba537";
      default:
        return undefined;
    }
  };

  const iconColor = getIconColor();

  const getIcon = () => {
    if (type === "directory") {
      return (
        <div
          style={{ color: iconColor, display: "flex", alignItems: "center" }}
        >
          {isExpanded ? FOLDER_OPEN : FOLDER_CLOSED}
        </div>
      );
    }

    switch (status) {
      case "added":
        return <Icon icon={"FilePlus"} stroke={iconColor} size={19} />;
      case "removed":
        return <Icon icon={"FileMinus"} stroke={iconColor} size={19} />;
      case "modified":
        return <Icon icon={"FileDiff"} stroke={iconColor} size={19} />;
      default:
        return <Icon icon={"File"} stroke={iconColor} size={19} />;
    }
  };

  const IconComponent = getIcon();

  // Use Next.js <Link> for navigation so the router handles it properly
  const nameNode = href ? (
    <Link href={href} className={styles.item_name_link}>
      {title}
    </Link>
  ) : onClick ? (
    <span
      className={`${styles.item_name} ${styles.item_name_clickable}`}
      onClick={onClick}
    >
      {title}
    </span>
  ) : (
    <span className={styles.item_name}>{title}</span>
  );

  return (
    <div className={styles.item_container}>
      {IconComponent}
      {nameNode}
    </div>
  );
};

export default Item;
