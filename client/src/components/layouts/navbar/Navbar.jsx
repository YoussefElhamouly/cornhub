import Skeleton from "../../ui/skeleton/Skeleton";
import styles from "./navbar.module.scss";
import Picture from "../../ui/picture/Picture";
const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.globalBar}>
        <img className="logo" src="images/logo6.png" />
      </div>
    </div>
  );
};

export default Navbar;
