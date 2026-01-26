import Skeleton from "../../ui/skeleton/Skeleton";
import styles from "./navbar.module.scss";
import Picture from "../../ui/picture/Picture";
import SearchBar from "../../ui/searchBar/SearchBar";
import Button from "../../ui/button/Button";
import Logo from "/images/logo.png";
import Menu from "../../ui/menu/Menu.jsx";
import { GitPullRequestCreate, Menu as MenuIcon } from "lucide-react";
import Pfp from "../../ui/pfp/Pfp";
import { Bell } from "lucide-react";

const Navbar = ({ children }) => {
  return (
    <div className={styles.navbar}>
      <div className={styles.globalBar}>
        <Button
          icon={MenuIcon}
          customStyles={{
            backgroundColor: "transparent",
            width: "30px",
            height: "30px",
          }}
        />
        <div className={styles.user_info_wrapper}>
          <Pfp
            editable={false}
            src={"/images/amity.jpg"}
            customStyles={{ width: "37px", height: "37px" }}
          />
          <div className={styles.user_info_container}>
            <h1 className={styles.userName}>Youssef Elhamouly</h1>
            <h2 className={styles.userTag}>CoDEx</h2>
          </div>
        </div>

        <SearchBar
          placeholder={"Search for smth"}
          customStyles={{ width: "350px", marginLeft: "auto" }}
        />

        <Menu
          icon={GitPullRequestCreate}
          menuStyle={{ right: "0px", left: "unset" }}
          wrapperStyle={{ width: "fit-content" }}
          buttonStyle={{
            width: "30px",
            height: "30px",
            display: "flex",
            justifyContent: "center",
          }}
        />
        <Menu
          icon={Bell}
          menuStyle={{ right: "0px", left: "unset" }}
          wrapperStyle={{ width: "fit-content" }}
          buttonStyle={{
            width: "30px",
            height: "30px",
            display: "flex",
            justifyContent: "center",
          }}
        />
        <Pfp
          editable={false}
          src={Logo}
          customStyles={{ width: "37px", height: "37px" }}
        />
      </div>
      {children}
    </div>
  );
};

export default Navbar;
