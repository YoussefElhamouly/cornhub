import React, { useState } from "react";
import Navbar from "../../components/layouts/navbar/Navbar.jsx";
import Wrapper from "../../components/layouts/wrapper/Wrapper.jsx";
import Aside from "../../components/layouts/aside/Aside.jsx";
import Main from "../../components/layouts/main/Main.jsx";
import Button from "../../components/ui/button/Button.jsx";
import Menu from "../../components/ui/menu/Menu.jsx";
import Dropdown from "../../components/ui/dropdown/Dropdown.jsx";
import SearchBar from "../../components/ui/searchBar/SearchBar.jsx";
import Pfp from "../../components/ui/pfp/Pfp.jsx";
import ItemViewer from "../../components/features/fileExplorer/itemViewer/ItemViewer.jsx";

import ReadMe from "../../components/ui/readMe/ReadMe.jsx";

import styles from "./project.module.scss";
import { Link } from "react-router-dom";
import SecondaryNavbar from "../../components/layouts/navbar/SecondaryNavbar.jsx";
import Icon from "../../components/ui/icon/Icon.jsx";
import Modal from "../../components/ui/modal/Modal.jsx";
import {
  Pin,
  Eye,
  Star,
  GitBranch,
  Plus,
  Code,
  Settings,
  ForkKnifeCrossed,
  AtSign,
  GitPullRequest,
  Popcorn,
  Activity,
  BookOpen,
  Webhook,
  SearchAlert as ErrorIcon,
} from "lucide-react";

import Feed from "../../components/features/feed/feed/Feed.jsx";
const Project = () => {
  const [settingsModal, setSettingsModal] = useState(false);
  const projectData = {
    name: "Mittens",
    owner: "YoussefElhamouly",
    visibility: "Public",
    stats: {
      stars: 4,
      forks: 0,
      watchers: 12,
      language: "JavaScript",
      contributor: 0,
    },
    languages: [
      { name: "JavaScript", percentage: 22 },
      { name: "SCSS", percentage: 25 },
      { name: "Other", percentage: 53 },
    ],
    readme: "Social Media Platform",
    activity: "7 months ago",
    readmeContent: `# 😼 Mittens

Mittens is a comprehensive full-stack social media platform designed exclusively for cat enthusiasts. It provides a modern social experience with real-time features that allow users to share posts, engage interactively, and communicate instantly via chat—all within a thoughtfully curated, cat-themed environment.



## ⭐ Features

- 😺 **User Profiles** - Create and customize your cat enthusiast profile
- 📸 **Posts supporting Images, Videos, Polls, and Events** - Share your favorite moments
- ❤️ **Real-Time Interactions** - Likes, Saves, Remeows, and Comments
- 💬 **Real-Time Chat** - Instant messaging with other cat lovers
- 📞 **WebRtc Voice Calls** - Connect with fellow enthusiasts

## 📁 Project Structure

\`\`\`
client/
  └── src/
      ├── APIs/
      ├── components/
      ├── pages/
      └── Redux/

server/
  ├── controllers/
  ├── models/
  └── routes/
\`\`\`

---

## 🚀 Getting Started

**Prerequisites**: Node.js and npm installed

**Installation**:

\`\`\`bash
npm install
npm run dev
\`\`\`

**Building for Production**:

\`\`\`bash
npm run build
\`\`\`

---

## 📸 Screenshots

![Mittens Platform](https://images.panda.org/assets/images/pages/welcome/orangutan_1600x1000_279157.jpg)


## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

*Made with 🐱 for cat enthusiasts everywhere*`,
  };

  const branchOptions = [
    { displayName: "main", value: "main" },
    { displayName: "develop", value: "develop" },
    { displayName: "feature", value: "feature" },
  ];

  const ProjectHeader = () => (
    <div className={styles.project_header}>
      <div className={styles.header_left}>
        <Pfp
          editable={false}
          src={"/images/amity.jpg"}
          customStyles={{ width: "32px", height: "32px" }}
        />
        <div className={styles.project_info_text}>
          <h1 className={styles.project_name}>{projectData.name}</h1>
        </div>
        <span className={styles.visibility_badge}>
          {projectData.visibility}
        </span>
      </div>

      <div className={styles.header_right}>
        <Button
          icon={Pin}
          customStyles={{
            height: "32px",
          }}
          title={"Pin"}
        />
        <Dropdown
          icon={Eye}
          title="Watch"
          wrapperStyle={{ width: "fit-content" }}
          buttonStyle={{
            backgroundColor: "var(--tertiary-bg)",
          }}
        ></Dropdown>
        <Menu
          leftIcon={ForkKnifeCrossed}
          title="Fork"
          wrapperStyle={{ width: "fit-content" }}
          menuStyle={{ left: "unset", right: "0px" }}
          buttonStyle={{
            backgroundColor: "var(--tertiary-bg)",
            height: "32px",
          }}
        ></Menu>
        <Button
          icon={Star}
          title={"Star"}
          customStyles={{
            height: "32px",
          }}
        />
      </div>
    </div>
  );

  // Main content area with controls
  const MainControls = () => (
    <div className={styles.main_controls}>
      <Dropdown
        title="main"
        icon={GitBranch}
        options={branchOptions}
        defaultValue="main"
        buttonStyle={{
          backgroundColor: "var(--tertiary-bg)",
          height: "32px",
        }}
      />
      <Button
        title="1 Branch"
        // customStyles={{
        //   backgroundColor: "transparent",
        //   border: "none",

        // }}
        variant="transparent"
        icon={GitBranch}
      />

      <SearchBar
        placeHolder="Go to file"
        customStyles={{ flex: 1, maxWidth: "250px", marginLeft: "auto" }}
      />
      <Menu
        icon={Plus}
        title="Add file"
        wrapperStyle={{ width: "fit-content" }}
        buttonStyle={{
          height: "32px",
        }}
      ></Menu>
      <Menu
        leftIcon={Code}
        title="Code"
        wrapperStyle={{ width: "fit-content" }}
        buttonStyle={{
          height: "32px",
        }}
      ></Menu>
    </div>
  );

  const AboutSection = () => (
    <div className={styles.about_section}>
      <div className={styles.about_content}>
        {/* <div className={styles.about_stats}> */}
        <div className={styles.section_header}>
          <h3>About</h3>
          <Button
            icon={Settings}
            variant="transparent"
            customStyles={{ width: "25px", height: "25px", padding: "0px" }}
            onClick={() => {
              setSettingsModal(true);
            }}
          />
        </div>
        <p className={styles.about_description}>{projectData.readme}</p>
        <div className={styles.stat_item}>
          <Icon icon={BookOpen} size={16} />
          <span className={styles.stat_label}>Readme</span>
        </div>
        <div className={styles.stat_item}>
          <Icon icon={Activity} size={16} />

          <span className={styles.stat_value}>{projectData.activity}</span>
        </div>
        <div className={styles.stat_item}>
          <Icon size={16} icon={Star} />
          <span className={styles.stat_value}>
            {projectData.stats.stars} Stars
          </span>
        </div>
        <div className={styles.stat_item}>
          <Icon size={16} icon={Eye} />
          <span className={styles.stat_value}>
            {projectData.stats.watchers} Watching
          </span>
        </div>
        <div className={styles.stat_item}>
          <Icon size={16} icon={ForkKnifeCrossed} />
          <span className={styles.stat_value}>
            {projectData.stats.forks} Forks
          </span>
        </div>
        <div className={styles.stat_item}>
          <Icon size={16} icon={Webhook} />
          <span className={styles.stat_value}>
            {projectData.stats.contributor} Contributors
          </span>
        </div>
        {/* </div> */}
      </div>
    </div>
  );

  // Languages section for sidebar
  const LanguagesSection = () => (
    <div className={styles.languages_section}>
      <h3 className={styles.section_header}>Languages</h3>
      <div className={styles.languages_content}>
        <div className={styles.language_bar_container}>
          {projectData.languages.map((lang) => (
            <div
              key={lang.name}
              className={styles.language_bar_segment}
              style={{
                width: `${lang.percentage}%`,
                backgroundColor: getLanguageColor(lang.name),
              }}
            ></div>
          ))}
        </div>
        <div className={styles.language_bars}>
          {projectData.languages.map((lang) => (
            <div key={lang.name} className={styles.language_bar_item}>
              <div className={styles.language_bar_label}>
                <span
                  className={styles.language_dot}
                  style={{
                    backgroundColor: getLanguageColor(lang.name),
                  }}
                ></span>
                <span>{lang.name}</span>
              </div>
              <span className={styles.language_percentage}>
                {lang.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const getLanguageColor = (language) => {
    const languageColors = {
      JavaScript: "#f1e05a",
      TypeScript: "#2b7489",
      Python: "#3572A5",
      SCSS: "#c6538c",
      Other: "#858585",
    };
    return languageColors[language] || "#858585";
  };

  const SettingsModal = () => (
    <Modal
      title={"Settings"}
      onClose={() => {
        setSettingsModal(false);
      }}
    />
  );
  const SECONDARY_NAV_LINKS = [
    { displayName: "Code", path: "/", icon: Code },
    { displayName: "Branches", path: "/Project", icon: GitBranch },
    { displayName: "Rooms", path: "/Popcorn", icon: Popcorn },
    { displayName: "Pull requests", path: "/profile", icon: GitPullRequest },
    { displayName: "Issues", path: "/posts", icon: ErrorIcon },
    { displayName: "Wiki", path: "/posts", icon: AtSign },
    { displayName: "Settings", path: "/posts", icon: Settings },
  ];

  return (
    <>
      {settingsModal && <SettingsModal />}
      <Navbar>
        <SecondaryNavbar links={SECONDARY_NAV_LINKS} />
      </Navbar>
      <Wrapper className={styles.project_page}>
        <ProjectHeader />

        <Wrapper className={styles.project_content_wrapper}>
          <Main className={styles.project_main}>
            <MainControls />

            <ItemViewer
              type="table"
              fileInfo={
                <div className={styles.file_info}>
                  <span>YoussefElhamouly</span>
                  <span>v1.0</span>
                  <span>f248d41 · 7 months ago</span>
                </div>
              }
            />
            <ReadMe title="README" content={projectData.readmeContent} />
          </Main>

          <Aside className={styles.project_aside}>
            <AboutSection />
            <LanguagesSection />
          </Aside>
        </Wrapper>
      </Wrapper>
    </>
  );
};

export default Project;
