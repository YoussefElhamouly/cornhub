"use client";

import React, { useState } from "react";
import styles from "./navbar.module.scss";
import Button from "../../ui/control/button/Button";
import SearchBar from "../../ui/control/searchBar/SearchBar";
import Menu from "../../ui/control/menu/Menu";
import BaseDrawer from "@/components/ui/layout/drawer/BaseDrawer";
import NavLink from "@/components/ui/navigation/navLink/NavLink";
import Avatar from "../../ui/media/avatar/Avatar";

const Navbar = ({ children }: { children: React.ReactNode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div className={styles.navbar}>
      <BaseDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        position="left"
        className={styles.side_drawer_override}
      >
        <Button
          variant="transparent"
          className={styles.close_btn}
          onClick={() => setDrawerOpen(false)}
          icon={"X"}
        />

        <div className={styles.drawer_content}>
          <nav className={styles.drawer_nav_links}>
            <NavLink
              path="/profile"
              variant="drawer"
              displayName="Profile"
              icon={"Home"}
              tabIndex={drawerOpen ? 0 : -1}
            />
            <NavLink
              path="/issues"
              variant="drawer"
              displayName="Issues"
              icon={"Circle"}
              tabIndex={drawerOpen ? 0 : -1}
            />
            <NavLink
              path="/pulls"
              variant="drawer"
              displayName="Pull requests"
              icon={"GitPullRequest"}
              tabIndex={drawerOpen ? 0 : -1}
            />
            <NavLink
              path="/repositories"
              variant="drawer"
              displayName="Repositories"
              icon={"SquareStack"}
              tabIndex={drawerOpen ? 0 : -1}
            />

            <NavLink
              path="/feed"
              variant="drawer"
              displayName="Feed"
              icon={"AtSign"}
              tabIndex={drawerOpen ? 0 : -1}
            />
            <NavLink
              path="/codespaces"
              variant="drawer"
              displayName="Codespaces"
              icon={"Rocket"}
              tabIndex={drawerOpen ? 0 : -1}
            />

            <hr className={styles.drawer_divider} />

            <NavLink
              path="/explore"
              variant="drawer"
              displayName="Explore"
              icon={"Compass"}
              tabIndex={drawerOpen ? 0 : -1}
            />
            <NavLink
              path="/marketplace"
              variant="drawer"
              displayName="Marketplace"
              icon={"Tag"}
              tabIndex={drawerOpen ? 0 : -1}
            />
            <NavLink
              path="/mcp-registry"
              variant="drawer"
              displayName="MCP registry"
              icon={"GitBranch"}
              tabIndex={drawerOpen ? 0 : -1}
            />
            <hr className={styles.drawer_divider} />
            <h2 className={styles.drawer_section_title}>Top repositories</h2>

            <NavLink
              path="/YoussefElhamouly/Mittens"
              variant="drawer"
              displayName="YoussefElhamouly/Mittens"
              icon={"CircleUser"}
              tabIndex={drawerOpen ? 0 : -1}
            />
            <NavLink
              path="/YoussefElhamouly/Walkers"
              variant="drawer"
              displayName="YoussefElhamouly/Walkers"
              icon={"CircleUser"}
              tabIndex={drawerOpen ? 0 : -1}
            />
            <NavLink
              path="/YoussefElhamouly/cornhub"
              variant="drawer"
              displayName="YoussefElhamouly/cornhub"
              icon={"CircleUser"}
              tabIndex={drawerOpen ? 0 : -1}
            />
          </nav>
        </div>
      </BaseDrawer>
      <div className={styles.globalBar}>
        <Button
          icon={"Menu"}
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
          icon={"BookOpen"}
          variant="transparent"
          customStyles={{
            border: "1px solid var(--border)",
            width: "30px",
            height: "30px",
            padding: "0px !important",
          }}
        />

        {/* <Button
          icon={BookOpen}
          variant="transparent"
          customStyles={{
            border: "1px solid var(--border)",
            width: "30px",
            height: "30px",
            padding: "0px !important",
          }}
        /> */}
        <Menu
          icon={"GitPullRequestCreate"}
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
          icon={"Bell"}
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
          src={"/images/logo.png"}
          customStyles={{ width: "37px", height: "37px" }}
        />
      </div>
      {children}
    </div>
  );
};

export default Navbar;
