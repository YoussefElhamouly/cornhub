import Skeleton from "../../ui/skeleton/Skeleton";
import styles from "./navbar.module.scss";
import Picture from "../../ui/picture/Picture";
const Navbar = ({ children }) => {
  return (
    <div className={styles.navbar}>
      <div className={styles.globalBar}>
        <img className="logo" src="images/logo6.png" />
      </div>
      {children}
    </div>
  );
};

export default Navbar;
