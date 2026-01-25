import React from "react";
import styles from "./aside.module.scss";
const Aside = ({ children, customStyles, className }) => {
  return (
    <div className={`${styles.global_aside} ${className}`} style={customStyles || {}}>
      {children}
    </div>
  );
};

export default Aside;
