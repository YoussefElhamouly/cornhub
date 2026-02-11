import React from "react";
import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import styles from "./navLink.module.scss";
import Button from "../../control/button/Button";

const NavLink = ({
  path,
  variant = "secondary",
  displayName,
  icon,
  className = "",
  tabIndex = 0,
  onClick,
}) => {
  const location = useLocation();

  const variantStyles = {
    secondary: styles.secondary_link,
    drawer: styles.drawer_link,
  };

  // Determine if this link is active
  const checkIsActive = () => {
    // If path has query params, match both pathname and search
    if (path.includes("?")) {
      return location.pathname + location.search === path;
    }
    // Otherwise just match pathname
    return location.pathname === path;
  };

  const isActive = checkIsActive();

  return (
    <RouterNavLink
      to={path}
      className={`${variantStyles[variant]} ${isActive ? styles.active : ""} ${className}`}
      tabIndex={-1}
    >
      <Button
        icon={icon}
        title={displayName}
        variant="transparent"
        className={`${styles.nav_btn} ${styles[`btn_${variant}`]}`}
        tabIndex={tabIndex}
      />
      {variant === "secondary" && (
        <div className={styles.link_highlighter}></div>
      )}
    </RouterNavLink>
  );
};

export default NavLink;
