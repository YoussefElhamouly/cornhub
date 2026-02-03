import React from "react";
import styles from "./main.module.scss";
const Main = ({ children, className = "", customStyles = {} }) => {
  return (
    <main className={`${styles.main} ${className}`} style={customStyles}>
      {children}
    </main>
  );
};

export default Main;
