import NavLink from "../../ui/navigation/navLink/NavLink";
import styles from "./navbar.module.scss";

const SecondaryNavbar = ({ links = [] }) => {
  return (
    <nav className={styles.secondaryNavbar}>
      {links.map(({ displayName, path, icon }) => (
        <NavLink
          key={path}
          path={path}
          variant="secondary"
          displayName={displayName}
          icon={icon}
        />
      ))}
    </nav>
  );
};

export default SecondaryNavbar;
