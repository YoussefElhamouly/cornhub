import React from "react";
import Filter from "@/components/ui/control/filter/Filter";
import Icon from "@/components/ui/media/icon/Icon";
import styles from "./work-item.module.scss";
interface WorkItemLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    username: string;
    project: string;
    type: string;
    id: string;
  }>;
}

export default async function WorkItemLayout({
  children,
  params,
}: WorkItemLayoutProps) {
  const resolvedParams = await params;
  const { username, project, type, id } = resolvedParams;

  const isPR = type === "pulls";
  const itemTitle = isPR
    ? "Fix: Update navigation styles"
    : "Bug: Navigation menu not closing";
  const status = "open";

  const basePath = `/${username}/${project}/${type}/${id}`;

  const navOptions = [
    { displayName: "Conversation", path: `${basePath}/conversation` },
    { displayName: "Commits", path: `${basePath}/commits` },
    { displayName: "Changes", path: `${basePath}/changes` },
  ];

  const initialPath = `/${username}/${project}`;

  return (
    <div className={styles.workItem_container}>
      <div className={styles.workItem_header}>
        <div className={styles.header_top}>
          <h1 className={styles.title}>{itemTitle}</h1>
          <span className={styles.id}>#{id}</span>
        </div>

        <div className={styles.header_meta}>
          <div className={`${styles.status_badge} ${styles[status]}`}>
            <Icon
              icon={isPR ? "GitPullRequest" : "CircleDot"}
              size={16}
              stroke={"var(--text-primary)"}
            />
            <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
          </div>
          <div className={styles.meta_info}>
            <span>{username}</span> {status === "open" ? "opened" : "merged"}{" "}
            this {isPR ? "pull request" : "issue"} 2 hours ago
          </div>
        </div>
      </div>

      <div className={styles.sub_navbar}>
        <Filter options={navOptions} id="work-item-nav" />
      </div>
      {children}
    </div>
  );
}
