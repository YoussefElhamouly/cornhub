import React from "react";
import styles from "./aside.module.scss";

interface asideProps {
  children: React.ReactNode;
  customStyles?: React.CSSProperties;
  className?: string | null;
}
const Aside = ({
  children,
  customStyles = {},
  className = null,
}: asideProps) => {
  return (
    <div className={`${styles.global_aside} ${className}`} style={customStyles}>
      {children}
    </div>
  );
};

export default Aside;
