import React from "react";
import { NavLink } from "react-router-dom";
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
              to="/profile"
              className={({ isActive }) => (isActive ? styles.active : "")}
              tabIndex={open ? 0 : -1}
            >
              <Button
                icon={Home}
                title="Profile"
                variant="transparent"
                className={styles.drawer_btn}
                onClick={(e) => {
                  e.preventDefault();
                }}
              />
            </NavLink>
            <NavLink
              to="/issues"
              className={({ isActive }) => (isActive ? styles.active : "")}
              tabIndex={open ? 0 : -1}
            >
              <Button
                icon={Circle}
                title="Issues"
                variant="transparent"
                className={styles.drawer_btn}
              />
            </NavLink>
            <NavLink
              to="/pulls"
              className={({ isActive }) => (isActive ? styles.active : "")}
              tabIndex={open ? 0 : -1}
            >
              <Button
                icon={GitPullRequest}
                title="Pull requests"
                variant="transparent"
                className={styles.drawer_btn}
              />
            </NavLink>
            <NavLink
              to="/repositories"
              className={({ isActive }) => (isActive ? styles.active : "")}
              tabIndex={open ? 0 : -1}
            >
              <Button
                icon={SquareStack}
                title="Repositories"
                variant="transparent"
                className={styles.drawer_btn}
              />
            </NavLink>

            <NavLink
              to="/feed"
              className={({ isActive }) => (isActive ? styles.active : "")}
              tabIndex={open ? 0 : -1}
            >
              <Button
                icon={AtSign}
                title="Feed"
                variant="transparent"
                className={styles.drawer_btn}
              />
            </NavLink>
            <NavLink
              to="/codespaces"
              className={({ isActive }) => (isActive ? styles.active : "")}
              tabIndex={open ? 0 : -1}
            >
              <Button
                icon={Rocket}
                title="Codespaces"
                variant="transparent"
                className={styles.drawer_btn}
              />
            </NavLink>
            {/* <NavLink
              to="/copilot"
              className={({ isActive }) => (isActive ? styles.active : "")}
              tabIndex={open ? 0 : -1}
            >
              <Button
                icon={CircleUser}
                title="Copilot"
                variant="transparent"
                className={styles.drawer_btn}
              />
            </NavLink> */}

            <hr className={styles.drawer_divider} />

            <NavLink
              to="/explore"
              className={({ isActive }) => (isActive ? styles.active : "")}
              tabIndex={open ? 0 : -1}
            >
              <Button
                icon={Compass}
                title="Explore"
                variant="transparent"
                className={styles.drawer_btn}
              />
            </NavLink>
            <NavLink
              to="/marketplace"
              className={({ isActive }) => (isActive ? styles.active : "")}
              tabIndex={open ? 0 : -1}
            >
              <Button
                icon={Tag}
                title="Marketplace"
                variant="transparent"
                className={styles.drawer_btn}
              />
            </NavLink>
            <NavLink
              to="/mcp-registry"
              className={({ isActive }) => (isActive ? styles.active : "")}
              tabIndex={open ? 0 : -1}
            >
              <Button
                icon={GitBranch}
                title="MCP registry"
                variant="transparent"
                className={styles.drawer_btn}
              />
            </NavLink>
            <hr className={styles.drawer_divider} />
            <h2 className={styles.drawer_section_title}>Top repositories</h2>

            <NavLink
              to="/YoussefElhamouly/Mittens"
              className={({ isActive }) => (isActive ? styles.active : "")}
              tabIndex={open ? 0 : -1}
            >
              <Button
                icon={CircleUser}
                title="YoussefElhamouly/Mittens"
                variant="transparent"
                className={styles.drawer_btn}
              />
            </NavLink>
            <NavLink
              to="/YoussefElhamouly/Walkers"
              className={({ isActive }) => (isActive ? styles.active : "")}
              tabIndex={open ? 0 : -1}
            >
              <Button
                icon={CircleUser}
                title="YoussefElhamouly/Walkers"
                variant="transparent"
                className={styles.drawer_btn}
              />
            </NavLink>
            <NavLink
              to="/YoussefElhamouly/cornhub"
              className={({ isActive }) => (isActive ? styles.active : "")}
              tabIndex={open ? 0 : -1}
            >
              <Button
                icon={CircleUser}
                title="YoussefElhamouly/cornhub"
                variant="transparent"
                className={styles.drawer_btn}
              />
            </NavLink>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default SideDrawer;
