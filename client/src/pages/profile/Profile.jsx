import React, { useState, useEffect } from "react";

import Button from "../../components/ui/button/Button";

import Wrapper from "../../components/layouts/wrapper/Wrapper";
import Aside from "../../components/layouts/aside/Aside";
import Main from "../../components/layouts/main/Main";
import styles from "./profile.module.scss";
import Navbar from "../../components/layouts/navbar/Navbar";
import SecondaryNavbar from "../../components/layouts/navbar/SecondaryNavbar";
import Overview from "./overview/Overview";
import Repositories from "./repositories/Repositories.jsx";
import Posts from "./posts/Posts.jsx";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  AtSign,
  BookOpen,
  Box,
  UserRoundPlus,
  UserRoundMinus,
} from "lucide-react";

import Avatar from "../../components/ui/avatar/Avatar";

const TABS = {
  overview: {
    label: "Overview",
    icon: BookOpen,
    component: <Overview />,
  },
  repos: {
    label: "Repositories",
    icon: Box,
    component: <Repositories />,
  },
  posts: {
    label: "Posts",
    icon: AtSign,
    component: <Posts />,
  },
};

const Profile = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const tabKey = params.get("tab") || "overview";
  const tab = TABS[tabKey] || TABS.overview;

  // Build nav links for tabs
  const SECONDARY_NAV_LINKS = Object.entries(TABS).map(
    ([key, { label, icon }]) => ({
      displayName: label,
      path: `/profile?tab=${key}`,
      icon,
    }),
  );
  const ProfileInfoSection = () => {
    return (
      <div className={styles.profile_info}>
        <div className={styles.profile_picture_container}>
          <Avatar editable={true} src={"/images/amity.jpg"} />
        </div>
        <h1 className={styles.profile_name}>Youssef Elhamouly</h1>
        <p className={styles.profile_username}>YoussefElhamouly</p>
        <Button
          className={styles.edit_profile_btn}
          customStyles={{
            width: "100%",
          }}
          onClick={() => console.log("Edit profile")}
          title="Edit profile"
        />

        <Button
          className={styles.edit_profile_btn}
          customStyles={{
            width: "100%",
          }}
          onClick={() => console.log("Edit profile")}
          title="Follow"
          icon={UserRoundPlus}
        />
        <Button
          className={styles.edit_profile_btn}
          customStyles={{
            width: "100%",
          }}
          onClick={() => console.log("Edit profile")}
          title="Unfollow"
          icon={UserRoundMinus}
        />
        <div className={styles.profile_stats}>
          <span>2 followers</span>
          <span>·</span>
          <span>1 following</span>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (!params.get("tab")) {
      navigate("/profile?tab=overview", { replace: true });
    }
  }, [params, navigate]);

  return (
    <>
      <Navbar>
        <SecondaryNavbar links={SECONDARY_NAV_LINKS} />
      </Navbar>
      <Wrapper className={styles.profile_wrapper}>
        <Aside className={styles.profile_aside}>
          <ProfileInfoSection />
        </Aside>
        <Main className={styles.profile_main}>{tab.component}</Main>
      </Wrapper>
    </>
  );
};

export default Profile;
