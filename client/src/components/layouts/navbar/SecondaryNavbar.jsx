import { NavLink, useLocation } from "react-router-dom";
import styles from "./navbar.module.scss";
import Icon from "../../ui/icon/Icon.jsx";

const getTabFromPath = (path) => {
  // Extract ?tab=... from path
  const match = path.match(/tab=([^&]+)/);
  return match ? match[1] : null;
};

const SecondaryNavbar = ({ links = [] }) => {
  const location = useLocation();
  const currentTab = new URLSearchParams(location.search).get("tab");
  return (
    <nav className={styles.secondaryNavbar}>
      {links.map(({ displayName, path, icon }) => {
        const linkTab = getTabFromPath(path);
        // If linkTab exists, highlight if matches currentTab (or overview if no tab)
        const isActive = linkTab
          ? (currentTab || "overview") === linkTab
          : location.pathname === path;
        return (
          <div className={styles.link_wrapper} key={path}>
            <NavLink
              key={path}
              to={path}
              className={`${styles.link} ${isActive ? styles.active : ""}`}
              end
            >
              {icon && <Icon className={styles.icon} icon={icon} />}
              <span>{displayName}</span>
            </NavLink>
            <div className={styles.link_highlighter}></div>
          </div>
        );
      })}
    </nav>
  );
};

export default SecondaryNavbar;
