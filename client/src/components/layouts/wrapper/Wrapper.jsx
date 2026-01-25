import React from "react";
import styles from "./wrapper.module.scss";
const Wrapper = ({ children, className, customStyles }) => {
  return <div className={`${styles.universal_wrapper} ${className}`} style={customStyles || {}}>{children}</div>;
};

export default Wrapper;
