import React, {
  useState,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import styles from "./menu.module.scss";
import useOutsideClick from "../../../hooks/useOutsideClick";
import Icon from "../icon/Icon.jsx";
import { ChevronDown } from "lucide-react";

const Menu = forwardRef(
  (
    {
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
      onClose = null,
      closeOnSelect = false,
    },
    ref,
  ) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const buttonRef = useRef();
    const menuRef = useRef();

    const closeMenu = useCallback(() => {
      setIsExpanded(false);
      if (onClose) onClose();
    }, [onClose]);

    // Expose closeMenu via ref
    useImperativeHandle(ref, () => ({
      close: closeMenu,
    }));

    useOutsideClick([buttonRef, menuRef], closeMenu);

    const toggleMenu = useCallback(() => {
      setIsExpanded((prev) => !prev);
    }, []);

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
          {leftIcon && (
            <span className={styles.left_icon}>
              <Icon icon={leftIcon} />
            </span>
          )}
          {title && <h1>{title}</h1>}
          <span className={styles.right_icon}>
            {<Icon icon={icon || ChevronDown} size={icon ? 16 : 12} />}
          </span>
        </div>

        <div
          ref={menuRef}
          className={menuContainerClass}
          style={combinedMenuStyle}
          onClick={(e) => {
            e.stopPropagation();
            // Check if clicked element or its parent has data-close-on-select
            if (closeOnSelect) {
              const target = e.target;
              const closeElement = target.closest("[data-close-on-select]");
              if (closeElement) {
                // Use requestAnimationFrame to ensure the click handler fires first
                requestAnimationFrame(() => {
                  closeMenu();
                });
              }
            }
          }}
        >
          {children}
        </div>
      </div>
    );
  },
);

Menu.displayName = "Menu";

export default Menu;
