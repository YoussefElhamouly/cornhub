import React from "react";
import styles from "./breadcrumb.module.scss";
import Link from "next/link";
import Button from "../../control/button/Button";

interface BreadcrumbProps {
  path: string;
}

const Breadcrumb = ({ path }: BreadcrumbProps) => {
  return (
    <div className={styles.breadcrumb_container}>
      <nav className={styles.path_nav}>
        <Link href="/about">Client</Link>
        <span>/</span>
        <Link href="/about">Hooks</Link>
        <span>/</span>
        <Link href="/about">Yourmom.jsx</Link>
      </nav>
      <Button className={styles.copy_path_btn} icon={"CopySlash"} />
    </div>
  );
};

export default Breadcrumb;
