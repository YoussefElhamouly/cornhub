import React from "react";
import Wrapper from "../../components/layouts/wrapper/Wrapper";
import Main from "../../components/layouts/main/Main";
import Feed from "../../components/features/feed/feed/Feed";
import Navbar from "../../components/layouts/navbar/Navbar";
import SecondaryNavbar from "../../components/layouts/navbar/SecondaryNavbar";
import styles from "./wiki.module.scss";
import {
  AtSign,
  Code,
  GitPullRequest,
  Popcorn,
  Settings,
  GitBranch,
  SearchAlert as ErrorIcon,
} from "lucide-react";

const Wiki = () => {
  const SECONDARY_NAV_LINKS = [
    { displayName: "Code", path: "/", icon: Code },
    { displayName: "Branches", path: "/Project", icon: GitBranch },
    { displayName: "Rooms", path: "/Profile", icon: Popcorn },
    { displayName: "Pull requests", path: "/posts", icon: GitPullRequest },
    { displayName: "Issues", path: "/posts", icon: ErrorIcon },
    { displayName: "Wiki", path: "/wiki", icon: AtSign },
    { displayName: "Settings", path: "/posts", icon: Settings },
  ];

  return (
    <>
      <Navbar>
        <SecondaryNavbar links={SECONDARY_NAV_LINKS} />
      </Navbar>
      <Wrapper className={styles.wiki_wrapper}>
        <Main className={styles.wiki_main}>
          <Feed />
        </Main>
      </Wrapper>
    </>
  );
};

export default Wiki;
