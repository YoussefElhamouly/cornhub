"use client";

import React from "react";
import styles from "./breadcrumb.module.scss";
import Link from "next/link";
import Button from "../../control/button/Button";

interface BreadcrumbProps {
  /** Joined node path, e.g. "src/components/Button.tsx" */
  nodePath?: string;
  /** Base URL for the tree, e.g. "/alice/my-project/tree" */
  basePath?: string;
}

const Breadcrumb = ({ nodePath = "", basePath = "" }: BreadcrumbProps) => {
  // Split path into non-empty segments
  const segments = nodePath.split("/").filter(Boolean);

  // Copy current full path to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(nodePath);
  };

  return (
    <div className={styles.breadcrumb_container}>
      <nav className={styles.path_nav}>
        {/* Root always links to the tree base */}
        {/* <Link href={basePath || "/"}>/</Link> */}

        {segments.map((segment, index) => {
          const href = `${basePath}/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;
          return (
            <React.Fragment key={href}>
              <span className={styles.separator}>/</span>
              {isLast ? (
                <span className={styles.current}>{segment}</span>
              ) : (
                <Link href={href}>{segment}</Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>

      <Button
        className={styles.copy_path_btn}
        icon={"Copy"}
        onClick={handleCopy}
      />
    </div>
  );
};

export default Breadcrumb;
