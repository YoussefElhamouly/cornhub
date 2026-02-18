import React from "react";
import styles from "./wrapper.module.scss";

interface wrapperProps {
  children: React.ReactNode;
  className?: string;
  customStyles?: React.CSSProperties;
}
const Wrapper = ({
  children,
  className = "",
  customStyles = {},
}: wrapperProps) => {
  return (
    <div
      className={`${styles.universal_wrapper} ${className}`}
      style={customStyles}
    >
      {children}
    </div>
  );
};

export default Wrapper;
