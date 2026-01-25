import React, { useState } from "react";
import styles from "./treeNode.module.scss";
import Icon from "../icon/Icon.jsx";
import {
  File,
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
const FOLDER_CLOSED = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M3 6.5C3 5.67 3.67 5 4.5 5H9.17C9.7 5 10.2 5.21 10.56 5.59L11.83 7H19.5C20.33 7 21 7.67 21 8.5V17.5C21 18.33 20.33 19 19.5 19H4.5C3.67 19 3 18.33 3 17.5V6.5Z" />
  </svg>
);

const FOLDER_OPEN = (
  <svg xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.5 9.5C2.5 8.67 3.17 8 4 8H20C20.83 8 21.5 8.67 21.5 9.5L19.7 17.2C19.53 17.94 18.87 18.5 18.11 18.5H5.89C5.13 18.5 4.47 17.94 4.3 17.2L2.5 9.5Z"
      fill="currentColor"
    />
    <path
      d="M4 6C4 5.45 4.45 5 5 5H9.2C9.55 5 9.88 5.15 10.12 5.41L11.4 6.8H19C19.55 6.8 20 7.25 20 7.8V8H4V6Z"
      fill="currentColor"
      opacity="0.85"
    />
  </svg>
);

const FILE_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    style={{ width: "20px", height: "20px" }}
  >
    <path d="M19.949,5.536,16.465,2.05A6.958,6.958,0,0,0,11.515,0H7A5.006,5.006,0,0,0,2,5V19a5.006,5.006,0,0,0,5,5H17a5.006,5.006,0,0,0,5-5V10.485A6.951,6.951,0,0,0,19.949,5.536ZM18.535,6.95A4.983,4.983,0,0,1,19.316,8H15a1,1,0,0,1-1-1V2.684a5.01,5.01,0,0,1,1.051.78ZM20,19a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V5A3,3,0,0,1,7,2h4.515c.164,0,.323.032.485.047V7a3,3,0,0,0,3,3h4.953c.015.162.047.32.047.485Z" />
  </svg>
);

const TreeNode = ({ name, type = "folder", children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isFolder = type === "folder";

  const renderIcon = () =>
    isFolder ? (isExpanded ? FOLDER_OPEN : FOLDER_CLOSED) : FILE_ICON;

  return (
    <div className={styles.treeNode_wrapper}>
      <div className={styles.treeNode_btn_wrapper}>
        <div
          className={`${styles.treeNode_expander} ${
            !isFolder ? styles.disabled : ""
          }`}
          onClick={() => isFolder && setIsExpanded((prev) => !prev)}
        >
          <div
            style={{
              transform:
                isExpanded && isFolder ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
              display: "flex",
            }}
          >
            <Icon icon={ChevronRight} />
          </div>
        </div>
        <div className={styles.treeNode_btn}>
          {renderIcon()}
          <h1 className={styles.treeNode_name}>{name}</h1>
        </div>
      </div>
      {isFolder && isExpanded && (
        <div className={styles.treeNode_children_container}>
          {children?.map((child, i) => (
            <TreeNode key={i} {...child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
