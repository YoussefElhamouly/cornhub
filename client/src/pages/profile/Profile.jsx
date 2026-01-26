import React, { useState } from "react";
import Pfp from "../../components/ui/pfp/Pfp";
import ProjectLink from "../../components/ui/projectLink/ProjectLink";
import ContributionGraph from "../../components/ui/contributionGraph/ContributionGraph";
import Button from "../../components/ui/button/Button";
import Dropdown from "../../components/ui/dropdown/Dropdown";
import Wrapper from "../../components/layouts/wrapper/Wrapper";
import Aside from "../../components/layouts/aside/Aside";
import Main from "../../components/layouts/main/Main";
import styles from "./profile.module.scss";
import Navbar from "../../components/layouts/navbar/Navbar";
import SecondaryNavbar from "../../components/layouts/navbar/SecondaryNavbar";
import {
  BookOpen,
  Box,
  Eye,
  CalendarDays,
  UserRoundPlus,
  UserRoundMinus,
  AtSign,
  Webhook,
} from "lucide-react";

const Profile = () => {
  const availableYears = [
    { displayName: "2026", value: 2026 },
    { displayName: "2025", value: 2025 },
    { displayName: "2024", value: 2024 },
  ]; // Latest year first
  const [selectedYear, setSelectedYear] = useState(
    availableYears[0]?.value || null,
  ); // Default to latest year

  const mockPinnedProjects = [
    {
      name: "Project 1",
      description: "This is a description of project 1",
      visibility: "Public",
      language: "JavaScript",
      stars: 2224,
    },
    {
      name: "Project 2",
      description: "This is a description of project 2",
      visibility: "Public",
      language: "PHP",
      stars: 224,
    },
    {
      name: "Project 3",
      description: "This is a description of project 3",
      visibility: "Private",
      language: "C++",
      stars: 21312312314,
    },
  ];

  const visibilityOptions = [
    { displayName: "All", value: "all" },
    { displayName: "Public", value: "public" },
    { displayName: "Private", value: "private" },
  ];
  const [profileVisibility, setProfileVisibility] = useState("public");

  // Example contribution data by year
  const contributionDataByYear = {
    2026: {
      "2026-01-01": 1,
      "2026-01-02": 2,
      "2026-01-03": 3,
    },
    2025: {
      // May contributions
      "2025-05-15": 3,
      // June contributions
      "2025-06-10": 5,
      "2025-06-11": 8,
      // July contributions
      "2025-07-05": 2,
      "2025-07-06": 4,
      "2025-07-07": 6,
      // December contributions
      "2025-12-01": 1,
      "2025-12-02": 3,
      "2025-12-03": 5,
      "2025-12-04": 2,
      "2025-12-05": 4,
      "2025-12-06": 6,
      "2025-12-07": 8,
      "2025-12-08": 10,
      "2025-12-09": 7,
      "2025-12-10": 5,
      "2025-12-11": 3,
      "2025-12-12": 4,
      "2025-12-13": 6,
      "2025-12-14": 9,
    },
    2024: {},
  };

  const contributionData = contributionDataByYear[selectedYear] || {};

  // Calculate total contributions
  const totalContributions = Object.values(contributionData).reduce(
    (sum, val) => sum + val,
    0,
  );

  const handleDayClick = (date, value) => {
    console.log(`Clicked ${date.toLocaleDateString()}: ${value} contributions`);
  };

  const SECONDARY_NAV_LINKS = [
    { displayName: "Overview", path: "/", icon: BookOpen },
    { displayName: "Repositories", path: "/profile", icon: Box },
    { displayName: "Contributions", path: "/contributions", icon: Webhook },
    { displayName: "Posts", path: "/posts", icon: AtSign },
  ];

  const ProfileInfoSection = () => {
    return (
      <div className={styles.profile_info}>
        <div className={styles.profile_picture_container}>
          <Pfp editable={true} src={"/images/amity.jpg"} />
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

  return (
    <>
      <Navbar>
        <SecondaryNavbar links={SECONDARY_NAV_LINKS} />
      </Navbar>
      <Wrapper className={styles.profile_wrapper}>
        <Aside className={styles.profile_aside}>
          <ProfileInfoSection />
        </Aside>
        <Main className={styles.profile_main}>
          <div className={styles.section}>
            <div className={styles.section_header}>
              <h2 className={styles.section_title}>Pinned</h2>
              <a
                href="#"
                className={styles.section_link}
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Customize pins");
                }}
              >
                Customize your pins
              </a>
            </div>
            <div className={styles.pinned_section}>
              {mockPinnedProjects.map((project) => (
                <ProjectLink
                  key={project.name}
                  name={project.name}
                  description={project.description}
                  visibility={project.visibility}
                  language={project.language}
                  stars={project.stars}
                />
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.contribution_section_header}>
              <h2 className={styles.contribution_title}>
                {totalContributions} contributions in {selectedYear}
              </h2>
              <div className={styles.contribution_settings}>
                <Dropdown
                  title="Visibility"
                  icon={Eye}
                  options={visibilityOptions}
                  defaultValue={profileVisibility}
                  onChange={(val) => {
                    setProfileVisibility(val);
                    console.log("Profile visibility changed to:", val);
                  }}
                />
                <Dropdown
                  icon={CalendarDays}
                  options={availableYears}
                  defaultValue={selectedYear}
                  onChange={(val) => {
                    setSelectedYear(val);
                  }}
                />
              </div>
            </div>
            <ContributionGraph
              data={contributionData}
              onDayClick={handleDayClick}
              showLegend={true}
              showLearnMore={true}
              startDate={new Date(selectedYear, 0, 1)}
              endDate={new Date(selectedYear, 11, 31)}
            />
          </div>

          {/* <div className={styles.section}>
            <h2 className={styles.section_title}>Contribution activity</h2>
            <div className={styles.contribution_activity_section}>
              <h3 className={styles.activity_month}>
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </h3>
            
            </div>
          </div> */}
        </Main>
      </Wrapper>
    </>
  );
};

export default Profile;
