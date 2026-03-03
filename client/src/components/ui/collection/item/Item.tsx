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
  name: string;
  type?: "folder" | "file" | "file-added" | "file-modified" | "file-minus";
  isExpanded?: boolean;
  status?: string | null;
  /**
   * If provided, wraps ONLY the name text in a <Link>.
   * The icon stays outside the link so the clickable area is strictly the title.
   */
  href?: string;
  /**
   * If provided (and no href), calls this when the name text is clicked.
   */
  onClick?: () => void;
}

const Item = ({
  name,
  type = "folder",
  isExpanded = false,
  status = null,
  href,
  onClick,
}: ItemProps) => {
  const getIconColor = () => {
    switch (type) {
      case "file-added":
        return "#22c55e";
      case "file-minus":
        return "#ef4444";
      case "file-modified":
        return "#eba537";
      default:
        return undefined;
    }
  };

  const iconColor = getIconColor();

  const getIcon = () => {
    switch (type) {
      case "folder":
        return isExpanded ? FOLDER_OPEN : FOLDER_CLOSED;
      case "file-added":
        return <Icon icon={"FilePlus"} stroke={iconColor} size={19} />;
      case "file-minus":
        return <Icon icon={"FileMinus"} stroke={iconColor} size={19} />;
      case "file-modified":
        return <Icon icon={"FileDiff"} stroke={iconColor} size={19} />;
      case "file":
      default:
        return <Icon icon={"File"} stroke={iconColor} size={19} />;
    }
  };

  const IconComponent = getIcon();

  // The name node: plain span, clickable span, or Link — only the text is interactive
  const nameNode = href ? (
    <Link href={href} className={styles.item_name_link}>
      {name}
    </Link>
  ) : onClick ? (
    <span
      className={`${styles.item_name} ${styles.item_name_clickable}`}
      onClick={onClick}
    >
      {name}
    </span>
  ) : (
    <span className={styles.item_name}>{name}</span>
  );

  return (
    <div className={styles.item_container}>
      {IconComponent}
      {nameNode}
    </div>
  );
};

export default Item;
