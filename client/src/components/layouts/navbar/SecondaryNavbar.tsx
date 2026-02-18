import NavLink from "../../ui/navigation/navLink/NavLink";
import styles from "./navbar.module.scss";
interface navbarProps {
  links: { displayName?: string; path?: string; icon?: string }[];
}
const SecondaryNavbar = ({ links = [] }: navbarProps) => {
  return (
    <nav className={styles.secondaryNavbar}>
      {links.map(({ displayName, path, icon }) => (
        <NavLink
          key={path}
          path={path || ""}
          variant="secondary"
          displayName={displayName}
          icon={icon}
        />
      ))}
    </nav>
  );
};

export default SecondaryNavbar;
