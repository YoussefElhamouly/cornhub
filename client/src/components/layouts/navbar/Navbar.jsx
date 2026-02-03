import React, { useState } from "react";
import styles from "./navbar.module.scss";
import Button from "../../ui/control/button/Button";
import SearchBar from "../../ui/control/searchBar/SearchBar";
import Logo from "/images/logo.png";
import Menu from "../../ui/control/menu/Menu.jsx";
import { GitPullRequestCreate, Menu as MenuIcon } from "lucide-react";
import SideDrawer from "./SideDrawer";
import Avatar from "../../ui/media/avatar/Avatar.jsx";
import { Bell, BookOpen } from "lucide-react";

const Navbar = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div className={styles.navbar}>
      <SideDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {/* TODO: Add nav content here */}
        <div
          style={{
            color: "#fff",
            fontWeight: 600,
            fontSize: "1.2rem",
            marginBottom: "1.5rem",
          }}
        >
          Menu
        </div>
        <div style={{ color: "#fff", opacity: 0.7 }}>
          Add navigation links here...
        </div>
      </SideDrawer>
      <div className={styles.globalBar}>
        <Button
          icon={MenuIcon}
          customStyles={{
            backgroundColor: "transparent",
            width: "30px",
            height: "30px",
          }}
          onClick={() => setDrawerOpen(true)}
        />
        <div className={styles.user_info_wrapper}>
          <Avatar
            editable={false}
            src={"/images/amity.jpg"}
            customStyles={{ width: "37px", height: "37px" }}
          />
          <div className={styles.user_info_container}>
            <h1 className={styles.userName}>Youssef Elhamouly</h1>
            {/* <h2 className={styles.userTag}>CoDEx</h2> */}
          </div>
        </div>

        <SearchBar
          placeHolder={"Search for smth"}
          customStyles={{ width: "350px", marginLeft: "auto" }}
          id="global_search_bar"
        />
        <Button
          icon={BookOpen}
          variant="transparent"
          customStyles={{
            border: "1px solid var(--border)",
            width: "30px",
            height: "30px",
            padding: "0px !important",
          }}
        />

        <Button
          icon={BookOpen}
          variant="transparent"
          customStyles={{
            border: "1px solid var(--border)",
            width: "30px",
            height: "30px",
            padding: "0px !important",
          }}
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
            backgroundColor: "transparent",
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
            backgroundColor: "transparent",
          }}
        />
        <Avatar
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
