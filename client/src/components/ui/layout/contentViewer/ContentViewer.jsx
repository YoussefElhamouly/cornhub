import React from "react";
import styles from "./contentViewer.module.scss";

const ContentViewer = ({ children, customStyles = {}, className = "" }) => {
  return (
    <div
      className={`${styles.itemViewer_container} ${className}`}
      style={customStyles}
    >
      {children}
    </div>
  );
};

ContentViewer.Header = function Header({ children }) {
  return <header className={styles.itemViewer_header}>{children}</header>;
};

ContentViewer.Body = function Body({ children }) {
  return <div className={styles.itemViewer_content}>{children}</div>;
};

export default ContentViewer;
