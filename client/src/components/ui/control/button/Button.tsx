"use client";

import React from "react";
import styles from "./button.module.scss";
import Icon from "../../media/icon/Icon";

interface ButtonProps {
  className?: string;
  title?: string;
  variant?: "workSpace" | "transparent";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  customStyles?: React.CSSProperties;
  children?: React.ReactNode;
  icon?: string; // That's it!
  disabled?: boolean;
}
const Button = ({
  variant = "workSpace",
  onClick = () => {},
  customStyles = {},
  title,
  children,
  className,
  icon,
  disabled,
}: ButtonProps) => {
  const selectedClass = styles[`${variant}_btn`];
  return (
    <button
      form={"null"}
      className={`${selectedClass} ${className}`}
      style={customStyles}
      onClick={(e) => {
        // e.preventDefault();
        onClick(e);
      }}
      disabled={disabled}
    >
      {icon && <Icon icon={icon} />}
      {title && <span>{title}</span>}
      {children}
    </button>
  );
};

export default Button;
