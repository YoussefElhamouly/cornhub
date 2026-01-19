import React from "react";
import styles from "./button.module.scss";
const Button = ({
  variant = "workSpace",
  onClick = () => {},
  customStyles = {},
  title,
  children,
  className,
}) => {
  const selectedClass = styles[`${variant}_btn`];
  return (
    <button
      className={`${selectedClass} ${className}`}
      style={customStyles}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {title && <span>{title}</span>}
      {children}
    </button>
  );
};

export default Button;
