import React, { useState, useRef, useCallback } from "react";
import styles from "./menu.module.scss";
import useOutsideClick from "../../../hooks/useOutsideClick";

const DEFAULT_ICON = (
  <svg
    clipRule="evenodd"
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={2}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z" />
  </svg>
);

const Menu = ({
  title = null,
  icon = null,
  leftIcon = null,
  className = "",
  wrapperStyle = {},
  buttonStyle = {},
  menuStyle = {},
  menuClassName = "",
  menuWidth = null,
  menuHeight = null,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const buttonRef = useRef();
  const menuRef = useRef();

  const closeMenu = useCallback(() => {
    setIsExpanded(false);
  }, []);

  useOutsideClick([buttonRef, menuRef], closeMenu);

  const toggleMenu = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const menuIcon = icon || DEFAULT_ICON;
  const menuContainerClass = `${styles.menu_container} ${
    isExpanded ? styles.menu_container_visible : ""
  } ${menuClassName}`.trim();

  const combinedMenuStyle = {
    ...(menuWidth && { width: menuWidth }),
    ...(menuHeight && { height: menuHeight }),
    ...menuStyle,
  };

  return (
    <div className={styles.menu_wrapper} style={wrapperStyle}>
      <div
        ref={buttonRef}
        className={styles.menu_toggle_btn}
        style={buttonStyle}
        onClick={toggleMenu}
      >
        {leftIcon && <span className={styles.left_icon}>{leftIcon}</span>}
        {title && <h1>{title}</h1>}
        <span className={styles.right_icon}>{menuIcon}</span>
      </div>

      <div
        ref={menuRef}
        className={menuContainerClass}
        style={combinedMenuStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Menu;
