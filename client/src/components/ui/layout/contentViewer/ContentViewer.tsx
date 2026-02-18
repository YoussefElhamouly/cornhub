import React from "react";
import styles from "./contentViewer.module.scss";

interface contentViewerProps {
  children: React.ReactNode;
  customStyles?: React.CSSProperties;
  className?: string;
}
const ContentViewer = ({
  children,
  customStyles = {},
  className = "",
}: contentViewerProps) => {
  return (
    <div
      className={`${styles.itemViewer_container} ${className}`}
      style={customStyles}
    >
      {children}
    </div>
  );
};

ContentViewer.Header = function Header({
  children,
}: {
  children: React.ReactNode;
}) {
  return <header className={styles.itemViewer_header}>{children}</header>;
};

ContentViewer.Body = function Body({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.itemViewer_content}>{children}</div>;
};

export default ContentViewer;
