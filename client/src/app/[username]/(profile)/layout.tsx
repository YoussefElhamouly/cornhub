import React from "react";

import Button from "@/components/ui/control/button/Button";
import Wrapper from "@/components/layouts/wrapper/Wrapper";
import Aside from "@/components/layouts/aside/Aside";
import Main from "@/components/layouts/main/Main";
import Navbar from "@/components/layouts/navbar/Navbar";
import SecondaryNavbar from "@/components/layouts/navbar/SecondaryNavbar";
import Avatar from "@/components/ui/media/avatar/Avatar";

import styles from "./profile.module.scss";

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
        title="Edit profile"
      />

      <Button
        className={styles.edit_profile_btn}
        customStyles={{
          width: "100%",
        }}
        title="Follow"
        icon={"UserRoundPlus"}
      />
      <Button
        className={styles.edit_profile_btn}
        customStyles={{
          width: "100%",
        }}
        title="Unfollow"
        icon={"UserRoundMinus"}
      />
      <div className={styles.profile_stats}>
        <span>2 followers</span>
        <span>·</span>
        <span>1 following</span>
      </div>
    </div>
  );
};

export default async function ProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const SECONDARY_NAV_LINKS = [
    {
      displayName: "Overview",
      path: `/${username}?tab=overview`,
      icon: "BookOpen",
    },
    {
      displayName: "Repositories",
      path: `/${username}?tab=repos`,
      icon: "Box",
    },
    { displayName: "Posts", path: `/${username}?tab=posts`, icon: "AtSign" },
  ];

  return (
    <>
      <Navbar>
        <SecondaryNavbar links={SECONDARY_NAV_LINKS} />
      </Navbar>
      <Wrapper className={styles.profile_wrapper}>
        <Aside className={styles.profile_aside}>
          <ProfileInfoSection />
        </Aside>
        <Main className={styles.profile_main}>{children}</Main>
      </Wrapper>
    </>
  );
}
