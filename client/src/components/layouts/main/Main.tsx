import React from "react";
import styles from "./main.module.scss";

interface mainProps {
  children?: React.ReactNode;
  customStyles?: React.CSSProperties;
  className?: string;
}
const Main = ({ children, className = "", customStyles = {} }: mainProps) => {
  return (
    <main className={`${styles.main}  ${className}`} style={customStyles}>
      {children}
    </main>
  );
};

export default Main;
