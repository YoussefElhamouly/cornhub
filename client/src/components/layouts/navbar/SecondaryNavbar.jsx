import { NavLink } from "react-router-dom";
import styles from "./navbar.module.scss";
import Icon from "../../ui/icon/Icon.jsx";

const SecondaryNavbar = ({ links = [] }) => {
  return (
    <nav className={styles.secondaryNavbar}>
      {links.map(({ displayName, path, icon }) => (
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
      ))}
    </nav>
  );
};

export default SecondaryNavbar;
