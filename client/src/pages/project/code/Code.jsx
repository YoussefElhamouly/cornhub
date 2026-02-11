import React from "react";
import styles from "../project.module.scss";
import ContentViewer from "../../../components/ui/layout/contentViewer/ContentViewer.jsx";
import Item from "../../../components/ui/collection/item/Item.jsx";
import ReadMe from "../../../components/ui/media/readMe/ReadMe.jsx";
import Table from "../../../components/ui/layout/table/Table.jsx";
import Dropdown from "../../../components/ui/control/dropdown/Dropdown.jsx";
import Button from "../../../components/ui/control/button/Button.jsx";
import Menu from "../../../components/ui/control/menu/Menu.jsx";
import SearchBar from "../../../components/ui/control/searchBar/SearchBar.jsx";
import DatePicker from "../../../components/ui/control/datePicker/DatePicker.jsx";
import {
  Plus,
  GitBranch,
  Code as CodeIcon,
  GitCommitVertical,
} from "lucide-react";

const Code = () => {
  const tableKeys = [{ key: "item" }, { key: "message" }, { key: "timestamp" }];

  const tableData = [
    {
      item: <Item name={"assets"} type={"folder"} />,
      message: "Icons",
      timestamp: "2 hours ago",
    },
    {
      item: <Item name={"client"} type={"folder"} />,
      message: "Refactor component structure",
      timestamp: "2 hours ago",
    },
    {
      item: <Item name={"server"} type={"folder"} />,
      message: "Add utility functions",
      timestamp: "5 hours ago",
    },
    {
      item: <Item name={".cornignore"} type={"file"} />,
      message: "Implement custom React hooks",
      timestamp: "1 day ago",
    },
    {
      item: <Item name={"readme.md"} type={"file"} />,
      message: "Create new page templates",
      timestamp: "2 days ago",
    },
  ];

  const branchOptions = [
    { displayName: "main", value: "main" },
    { displayName: "develop", value: "develop" },
    { displayName: "feature", value: "feature" },
  ];

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
      <DatePicker />
      {/* <Button title="1 Branch" variant="transparent" icon={GitBranch} /> */}
      {/* <Button
        title="2 Commits"
        variant="transparent"
        icon={GitCommitVertical}
      /> */}

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
        leftIcon={CodeIcon}
        title="Code"
        wrapperStyle={{ width: "fit-content" }}
        buttonStyle={{
          height: "32px",
        }}
      ></Menu>
    </div>
  );
  return (
    <>
      <MainControls />
      <ContentViewer>
        <ContentViewer.Body>
          <Table columns={tableKeys} data={tableData} />
        </ContentViewer.Body>
      </ContentViewer>
      <ReadMe title="README" content={projectData.readmeContent} />
    </>
  );
};

export default Code;
