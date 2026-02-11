import React from "react";
import styles from "./sideDrawer.module.scss";
import {
  X,
  Home,
  Circle,
  GitBranch,
  GitPullRequest,
  SquareStack,
  Users,
  Inbox,
  MessageCircle,
  Rocket,
  Compass,
  Tag,
  CircleUser,
  AtSign,
} from "lucide-react";
import Button from "../../ui/control/button/Button";
import NavLink from "../../ui/navigation/navLink/NavLink";

const SideDrawer = ({ open, onClose, children }) => {
  return (
    <div
      className={`${styles.drawer_overlay} ${open ? styles.open : ""}`}
      onClick={onClose}
      tabIndex={-1}
      aria-hidden={!open}
    >
      <aside
        className={`${styles.drawer} ${open ? styles.open : ""}`}
        onClick={(e) => e.stopPropagation()}
        tabIndex={0}
        aria-modal="true"
        role="dialog"
      >
        <Button
          variant="transparent"
          className={styles.close_btn}
          onClick={onClose}
          icon={X}
        />

        <div className={styles.drawer_content}>
          <nav className={styles.drawer_nav_links}>
            <NavLink
              path="/profile"
              variant="drawer"
              displayName="Profile"
              icon={Home}
              tabIndex={open ? 0 : -1}
            />
            <NavLink
              path="/issues"
              variant="drawer"
              displayName="Issues"
              icon={Circle}
              tabIndex={open ? 0 : -1}
            />
            <NavLink
              path="/pulls"
              variant="drawer"
              displayName="Pull requests"
              icon={GitPullRequest}
              tabIndex={open ? 0 : -1}
            />
            <NavLink
              path="/repositories"
              variant="drawer"
              displayName="Repositories"
              icon={SquareStack}
              tabIndex={open ? 0 : -1}
            />

            <NavLink
              path="/feed"
              variant="drawer"
              displayName="Feed"
              icon={AtSign}
              tabIndex={open ? 0 : -1}
            />
            <NavLink
              path="/codespaces"
              variant="drawer"
              displayName="Codespaces"
              icon={Rocket}
              tabIndex={open ? 0 : -1}
            />

            <hr className={styles.drawer_divider} />

            <NavLink
              path="/explore"
              variant="drawer"
              displayName="Explore"
              icon={Compass}
              tabIndex={open ? 0 : -1}
            />
            <NavLink
              path="/marketplace"
              variant="drawer"
              displayName="Marketplace"
              icon={Tag}
              tabIndex={open ? 0 : -1}
            />
            <NavLink
              path="/mcp-registry"
              variant="drawer"
              displayName="MCP registry"
              icon={GitBranch}
              tabIndex={open ? 0 : -1}
            />
            <hr className={styles.drawer_divider} />
            <h2 className={styles.drawer_section_title}>Top repositories</h2>

            <NavLink
              path="/YoussefElhamouly/Mittens"
              variant="drawer"
              displayName="YoussefElhamouly/Mittens"
              icon={CircleUser}
              tabIndex={open ? 0 : -1}
            />
            <NavLink
              path="/YoussefElhamouly/Walkers"
              variant="drawer"
              displayName="YoussefElhamouly/Walkers"
              icon={CircleUser}
              tabIndex={open ? 0 : -1}
            />
            <NavLink
              path="/YoussefElhamouly/cornhub"
              variant="drawer"
              displayName="YoussefElhamouly/cornhub"
              icon={CircleUser}
              tabIndex={open ? 0 : -1}
            />
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default SideDrawer;
