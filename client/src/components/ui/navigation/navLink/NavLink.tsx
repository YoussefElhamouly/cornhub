"use client";

import React from "react";
import styles from "./navLink.module.scss";
import Button from "../../control/button/Button";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface navLinkProps {
  path: string;
  variant?: "secondary" | "drawer";
  displayName?: string;
  icon?: string;
  className?: string;
  tabIndex?: number;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
}
const NavLink = ({
  path,
  variant = "secondary",
  displayName,
  icon,
  className = "",
  tabIndex = 0,
  onClick,
}: navLinkProps) => {
  const pathname = usePathname() || "";
  const searchParams = useSearchParams();

  const variantStyles = {
    secondary: styles.secondary_link,
    drawer: styles.drawer_link,
  };

  // Determine if this link is active
  const checkIsActive = () => {
    // Helper: convert a pathname pattern with :param segments to a regex
    const toPathnameRegex = (p: string) => {
      const pattern = p
        .split("/")
        .map((segment) => {
          if (segment.startsWith(":")) {
            return "[^/]+";
          }
          return segment === "" ? "" : segment;
        })
        .join("/");
      return new RegExp(`^${pattern}$`);
    };

    // If path has query params, match pathname via regex and search params literally
    if (path.includes("?")) {
      const [linkPathname, linkSearch] = path.split("?");
      const pathnameMatches = toPathnameRegex(linkPathname).test(pathname);
      if (!pathnameMatches) return false;

      const currentSearch = searchParams?.toString() || "";

      // If there are no current search params, treat ?tab=overview as the default active tab
      if (!currentSearch) {
        const linkParams = new URLSearchParams(linkSearch);
        return linkParams.get("tab") === "overview";
      }

      return currentSearch === linkSearch;
    }

    // No query params — match pathname only via regex
    return toPathnameRegex(path).test(pathname);
  };

  const isActive = checkIsActive();

  // Handle click if provided
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Link
      href={path}
      className={`${variantStyles[variant]} ${isActive ? styles.active : ""} ${className}`}
      tabIndex={-1}
    >
      <Button
        icon={icon}
        title={displayName}
        variant="transparent"
        className={`${styles.nav_btn} ${styles[`btn_${variant}`]}`}
        onClick={handleClick}
      />
      {variant === "secondary" && (
        <div className={styles.link_highlighter}></div>
      )}
    </Link>
  );
};

export default NavLink;
