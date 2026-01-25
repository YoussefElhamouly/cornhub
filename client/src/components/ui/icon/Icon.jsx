import React from "react";
import styles from "./icon.module.scss";

const Icon = ({ icon: IconComponent, className }) => {
  if (!IconComponent) return null;

  return <IconComponent className={`${styles.icon} ${className}`} />;
};

export default Icon;
