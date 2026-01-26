import React from "react";
import styles from "./icon.module.scss";

const Icon = ({ icon: IconComponent, className, size = 16 }) => {
  if (!IconComponent) return null;

  return (
    <IconComponent
      className={`${styles.icon} ${className}`}
      size={size}
      stroke={"var(--icon-primary)"}
    />
  );
};

export default Icon;
