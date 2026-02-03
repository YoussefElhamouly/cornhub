import React, { useState, useRef, useCallback } from "react";
import styles from "./dropdown.module.scss";
import Menu from "../menu/Menu";

const Dropdown = ({
  title = "Select an option",
  icon = null,
  options = [],
  defaultValue = null,
  onChange = () => {},
  buttonStyle,
  wrapperStyle,
  menuStyle,
}) => {
  const menuRef = useRef(null);

  const displayTitle = () => {
    return defaultValue
      ? options.find((option) => option.value == defaultValue)?.displayName ||
          title
      : title;
  };

  const handleOptionClick = (value, e) => {
    onChange(value);
    if (menuRef.current) {
      setTimeout(() => {
        menuRef.current.close();
      }, 10);
    }
  };

  return (
    <Menu
      ref={menuRef}
      title={displayTitle()}
      leftIcon={icon}
      closeOnSelect={true}
      buttonStyle={{
        display: "flex",
        alignItems: "center",
        padding: "0.5rem 0.8rem",
        border: "1px solid var(--border)",
        borderRadius: "0.2rem",
        fontSize: "0.9rem",
        cursor: "pointer",
        color: "var(--text-primary)",
        backgroundColor: "transparent",
        width: "fit-content",
        maxWidth: "fit-content",
        minWidth: "120px",
        minHeight: "32px",
        gap: "0.5rem",
        position: "relative",
        boxSizing: "border-box",
        transition: "all 0.2s ease",
        ...buttonStyle,
      }}
      menuStyle={{
        width: "120px",
        maxHeight: "110px",
        overflow: "auto",
        ...menuStyle,
      }}
    >
      {options.map((option) => (
        <div
          key={option.value}
          data-close-on-select
          className={`${styles.dropdown_item} ${
            defaultValue === option.value ? styles.dropdown_item_active : ""
          }`}
          onClick={(e) => handleOptionClick(option.value, e)}
        >
          {option.displayName}
        </div>
      ))}
    </Menu>
  );
};

export default Dropdown;
