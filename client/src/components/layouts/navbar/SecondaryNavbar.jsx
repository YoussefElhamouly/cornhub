import { NavLink } from "react-router-dom";
import styles from "./navbar.module.scss";
import Icon from "../../ui/icon/Icon.jsx";

const SecondaryNavbar = ({ links = [] }) => {
  return (
    <nav className={styles.secondaryNavbar}>
      {links.map(({ displayName, path, icon }) => (
        <div className={styles.link_wrapper} key={path}>
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
            end
          >
            {icon && <Icon className={styles.icon} icon={icon} />}
            <span>{displayName}</span>
          </NavLink>
          <div className={styles.link_highlighter}></div>
        </div>
      ))}
    </nav>
  );
};

export default SecondaryNavbar;
