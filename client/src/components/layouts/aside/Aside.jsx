import React from "react";
import styles from "./aside.module.scss";
const Aside = ({ children, customStyles }) => {
  return (
    <div className={styles.global_aside} style={customStyles || {}}>
      {children}
    </div>
  );
};

export default Aside;
