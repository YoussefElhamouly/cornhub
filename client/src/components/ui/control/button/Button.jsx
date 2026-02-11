import React from "react";
import styles from "./button.module.scss";
import Icon from "../../media/icon/Icon";
const Button = ({
  variant = "workSpace",
  onClick = () => {},
  customStyles = {},
  title,
  children,
  className,
  icon,
}) => {
  const selectedClass = styles[`${variant}_btn`];
  return (
    <button
      form={null}
      className={`${selectedClass} ${className}`}
      style={customStyles}
      onClick={(e) => {
        // e.preventDefault();
        onClick(e);
      }}
    >
      {icon && <Icon icon={icon} />}
      {title && <span>{title}</span>}
      {children}
    </button>
  );
};

export default Button;
