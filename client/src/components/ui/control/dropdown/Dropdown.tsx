"use client";

import React, { useState, useRef, useCallback } from "react";
import styles from "./dropdown.module.scss";
import Menu, { MenuHandle } from "../menu/Menu";

import { useQuerySync } from "@/components/hooks/useQuerySync";

interface DropdownProps {
  title?: string;
  icon?: string;
  options?: { displayName: string; value: string }[];
  defaultValue?: string;
  query?: string | null;
  className?: string;
  onChange?: (value: string) => void;
  buttonStyle?: React.CSSProperties;
  wrapperStyle?: React.CSSProperties;
  menuStyle?: React.CSSProperties;
}

const Dropdown = ({
  title = "Select an option",
  icon,
  options = [],
  defaultValue,
  query,
  className,
  onChange = () => {},
  buttonStyle,
  wrapperStyle,
  menuStyle,
}: DropdownProps) => {
  const menuRef = useRef<MenuHandle>(null);
  const { updateQuery } = useQuerySync(query);
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  // Sync with defaultValue when it changes from props (e.g. server-side update)
  React.useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  const displayTitle = () => {
    return selectedValue
      ? options.find((option) => option.value == selectedValue)?.displayName ||
          title
      : title;
  };

  const handleOptionClick = (value: string, e: React.MouseEvent) => {
    setSelectedValue(value);
    onChange(value);
    updateQuery(value);
    if (menuRef.current) {
      setTimeout(() => {
        menuRef.current?.close();
      }, 10);
    }
  };

  return (
    <Menu
      ref={menuRef}
      title={displayTitle()}
      leftIcon={icon}
      closeOnSelect={true}
      className={className}
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
