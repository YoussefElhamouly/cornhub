import React from "react";
import styles from "./icon.module.scss";

const Icon = ({
  icon: IconComponent,
  className,
  size = 16,
  stroke = "var(--icon-primary)",
}) => {
  if (!IconComponent) return null;

  return (
    <IconComponent
      className={`${styles.icon} ${className}`}
      size={size}
      stroke={stroke}
    />
  );
};

export default Icon;
