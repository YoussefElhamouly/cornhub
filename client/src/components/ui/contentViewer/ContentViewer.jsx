import React from "react";
import styles from "./contentViewer.module.scss";

const ContentViewer = ({ children }) => {
  return <div className={styles.itemViewer_container}>{children}</div>;
};

ContentViewer.Header = function Header({ children }) {
  return <header className={styles.itemViewer_header}>{children}</header>;
};

ContentViewer.Body = function Body({ children }) {
  return <div className={styles.itemViewer_content}>{children}</div>;
};

export default ContentViewer;
