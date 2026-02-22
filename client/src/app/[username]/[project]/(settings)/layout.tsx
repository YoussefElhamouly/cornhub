"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Wrapper from "@/components/layouts/wrapper/Wrapper";
import Main from "@/components/layouts/main/Main";
import Aside from "@/components/layouts/aside/Aside";
import Navbar from "@/components/layouts/navbar/Navbar";
import ProjectNavbar from "@/components/layouts/navbar/ProjectNavbar";
import Icon from "@/components/ui/media/icon/Icon";
import styles from "./settings.module.scss";

interface Params {
  username: string;
  project: string;
}

const SIDEBAR_LINKS = [
  { displayName: "General", path: "/settings", icon: "Settings" },
  { displayName: "Collaborators", path: "/settings/access", icon: "Users" },
  { displayName: "Branches", path: "/settings/branches", icon: "GitBranch" },
  { displayName: "Webhooks", path: "/settings/hooks", icon: "Webhook" },
  { displayName: "Pages", path: "/settings/pages", icon: "Globe" },
];

export default function SettingsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<Params>;
}) {
  const pathname = usePathname();
  const resolvedParams = React.use(params);
  const baseUrl = `/${resolvedParams.username}/${resolvedParams.project}`;

  return (
    <>
      <Navbar>
        <ProjectNavbar initialPath={baseUrl} />
      </Navbar>
      <Wrapper className={styles.settings_wrapper}>
        <Aside className={styles.sidebar_aside}>
          <nav className={styles.sidebar_nav}>
            {SIDEBAR_LINKS.map((link) => {
              const fullPath = `${baseUrl}${link.path}`;
              const isActive = pathname === fullPath;

              return (
                <Link
                  key={link.path}
                  href={fullPath}
                  className={`${styles.sidebar_item} ${isActive ? styles.active : ""}`}
                >
                  <Icon icon={link.icon} size={16} />
                  <span>{link.displayName}</span>
                </Link>
              );
            })}
          </nav>
        </Aside>
        <Main className={styles.settings_main}>{children}</Main>
      </Wrapper>
    </>
  );
}
