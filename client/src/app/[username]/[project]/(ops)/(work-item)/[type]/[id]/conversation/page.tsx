"use client";

import React from "react";
import Wrapper from "@/components/layouts/wrapper/Wrapper";
import Main from "@/components/layouts/main/Main";
import Aside from "@/components/layouts/aside/Aside";
import Post from "@/components/features/feed/post/Post";
import Icon from "@/components/ui/media/icon/Icon";
import Avatar from "@/components/ui/media/avatar/Avatar";
import styles from "./conversation.module.scss";

export default function ConversationPage() {
  const author = {
    name: "Youssef Elhamouly",
    username: "YoussefElhamouly",
    pfp: "/images/amity.jpg",
    timestamp: "2 hours ago",
  };

  const postBody = {
    text: "This PR updates the navigation styles to match the new design system. It includes changes to the navbar, breadcrumbs, and sidemenu components.",
    image: null,
    video: null,
  };

  return (
    <Wrapper className={styles.conversation_wrapper}>
      <Main className={styles.conversation_main}>
        <Post author={author} postBody={postBody} />

        <div className={styles.status_box}>
          <div className={styles.status_header}>
            <Icon icon="CheckCircle2" size={20} color="#238636" />
            <span className={styles.status_title}>
              This branch has no conflicts with the base branch
            </span>
          </div>
          <p className={styles.status_desc}>
            Merging can be performed automatically.
          </p>
        </div>
      </Main>

      <Aside className={styles.conversation_aside}>
        <div className={styles.aside_section}>
          <h4 className={styles.section_title}>Reviewers</h4>
          <div className={styles.user_list}>
            <div className={styles.user_item}>
              <Avatar
                src="/images/amity.jpg"
                customStyles={{ width: "24px", height: "24px" }}
              />
              <span>octocat</span>
              <Icon icon="Check" size={14} color="#238636" />
            </div>
          </div>
        </div>

        <div className={styles.aside_section}>
          <h4 className={styles.section_title}>Assignees</h4>
          <div className={styles.user_list}>
            <div className={styles.user_item}>
              <Avatar
                src="/images/amity.jpg"
                customStyles={{ width: "24px", height: "24px" }}
              />
              <span>YoussefElhamouly</span>
            </div>
          </div>
        </div>

        <div className={styles.aside_section}>
          <h4 className={styles.section_title}>Labels</h4>
          <div className={styles.label_list}>
            <span
              className={styles.label_badge}
              style={{ backgroundColor: "#d73a4a" }}
            >
              bug
            </span>
            <span
              className={styles.label_badge}
              style={{ backgroundColor: "#0075ca" }}
            >
              enhancement
            </span>
          </div>
        </div>

        <div className={styles.aside_section}>
          <h4 className={styles.section_title}>Development</h4>
          <div className={styles.dev_info}>
            <div className={styles.branch_info}>
              <Icon icon="GitBranch" size={14} />
              <span>main</span>
            </div>
            <p>1 successful check</p>
          </div>
        </div>
      </Aside>
    </Wrapper>
  );
}
