import React from "react";
import styles from "./breadcrumb.module.scss";
import { Link } from "react-router-dom";
import Button from "../../control/button/Button.jsx";
import { CopySlash } from "lucide-react";
const Breadcrumb = ({ path }) => {
  return (
    <div className={styles.breadcrumb_container}>
      <nav className={styles.path_nav}>
        <Link to="/about">Client</Link>
        <span>/</span>
        <Link to="/about">Hooks</Link>
        <span>/</span>
        <Link to="/about">Yourmom.jsx</Link>
      </nav>
      <Button className={styles.copy_path_btn} icon={CopySlash} />
    </div>
  );
};

export default Breadcrumb;
