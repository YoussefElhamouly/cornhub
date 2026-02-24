import React, { useEffect, useCallback } from "react";
import styles from "./baseDrawer.module.scss";

export interface BaseDrawerProps {
  isOpen: boolean;
  onClose?: () => void;
  position?: "left" | "right" | "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const BaseDrawer = ({
  isOpen,
  onClose,
  position = "left",
  className = "",
  style,
  children,
}: BaseDrawerProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && onClose) {
        onClose();
      }
    },
    [isOpen, onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent scrolling when open if desired, but maybe let's just add event listener
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  const overlayClasses = [styles.drawer_overlay, isOpen ? styles.open : ""]
    .filter(Boolean)
    .join(" ");

  const drawerClasses = [
    styles.base_drawer,
    styles[`position_${position}`],
    isOpen ? styles.open : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={overlayClasses}
      onClick={onClose}
      tabIndex={-1}
      aria-hidden={!isOpen}
    >
      <div
        className={drawerClasses}
        onClick={(e) => e.stopPropagation()}
        tabIndex={0}
        aria-modal="true"
        role="dialog"
        style={style}
      >
        {children}
      </div>
    </div>
  );
};

export default BaseDrawer;
