import React, { useEffect, useState } from "react";
import ItemViewer from "../itemViewer/ItemViewer";
import styles from "./explorerContent.module.scss";
import Menu from "../../../ui/menu/Menu.jsx";
import Breadcrumb from "../../../ui/breadcrumb/Breadcrumb.jsx";
import { Menu as MenuIcon, History } from "lucide-react";
import Pfp from "../../../ui/pfp/Pfp.jsx";
import Button from "../../../ui/button/Button.jsx";
const ExplorerContent = () => {
  const reactCode = `import React from "react";
import TreeNode from "../../../ui/treeNode/TreeNode.jsx";
import SearchBar from "../../../ui/searchBar/SearchBar.jsx";
import styles from "./explorerTree.module.scss";
const ExplorerTree = () => {
  const mockTree = [
    {
      type: "folder",
      name: "client",
      children: [
        {
          type: "folder",
          name: "src",
          children: [
            {
              type: "folder",
              name: "components",
              children: [
                {
                  type: "folder",
                  name: "layouts",
                  children: [
                    { type: "file", name: "Navbar.jsx" },
                    { type: "file", name: "Footer.jsx" },
                    { type: "file", name: "Sidebar.jsx" },
                  ],
                },
                {
                  type: "folder",
                  name: "ui",
                  children: [
                    { type: "file", name: "Button.jsx" },
                    { type: "file", name: "Input.jsx" },
                    { type: "file", name: "Modal.jsx" },
                  ],
                },
              ],
            },
            {
              type: "folder",
              name: "pages",
              children: [
                { type: "file", name: "Home.jsx" },
                { type: "file", name: "About.jsx" },
                { type: "file", name: "Contact.jsx" },
              ],
            },
            {
              type: "folder",
              name: "hooks",
              children: [
                { type: "file", name: "useAuth.js" },
                { type: "file", name: "useOutsideClick.js" },
              ],
            },
            { type: "file", name: "App.jsx" },
            { type: "file", name: "main.jsx" },
          ],
        },
        {
          type: "folder",
          name: "public",
          children: [
            {
              type: "folder",
              name: "images",
              children: [
                { type: "file", name: "logo.png" },
                { type: "file", name: "favicon.ico" },
              ],
            },
          ],
        },
        {
          type: "folder",
          name: "node_modules",
          children: [],
        },
        { type: "file", name: "package.json" },
        { type: "file", name: ".gitignore" },
        { type: "file", name: "README.md" },
        { type: "file", name: ".cornignore" },
      ],
    },
    {
      type: "folder",
      name: "server",
      children: [
        {
          type: "folder",
          name: "controllers",
          children: [
            { type: "file", name: "auth.js" },
            { type: "file", name: "user.js" },
            { type: "file", name: "file.js" },
          ],
        },
        {
          type: "folder",
          name: "routes",
          children: [
            { type: "file", name: "auth.js" },
            { type: "file", name: "user.js" },
            { type: "file", name: "file.js" },
          ],
        },
        {
          type: "folder",
          name: "models",
          children: [
            { type: "file", name: "User.js" },
            { type: "file", name: "File.js" },
            { type: "file", name: "Project.js" },
          ],
        },
        {
          type: "folder",
          name: "middlewares",
          children: [
            { type: "file", name: "auth.js" },
            { type: "file", name: "errorHandler.js" },
            { type: "file", name: "validation.js" },
          ],
        },
        {
          type: "folder",
          name: "config",
          children: [
            { type: "file", name: "database.js" },
            { type: "file", name: "redis.js" },
          ],
        },
        {
          type: "folder",
          name: "utils",
          children: [
            { type: "file", name: "logger.js" },
            { type: "file", name: "errors.js" },
          ],
        },
        { type: "file", name: "server.js" },
        { type: "file", name: "socket.js" },
        { type: "file", name: "package.json" },
        { type: "file", name: ".env" },
        { type: "file", name: "README.md" },
        { type: "file", name: ".cornignore" },
      ],
    },
    { type: "file", name: "README.md" },
    { type: "file", name: ".cornignore" },
  ];


  return (
    <>
      <SearchBar placeHolder={"Go To File"} />
      <div className={styles.explorerTree_container}>
        {mockTree.map((tree, i) => (
          <TreeNode {...tree} key={i} />
        ))}
      </div>
    </>
  );
};

export default ExplorerTree;
`;

  const [code, setCode] = useState(reactCode);

  useEffect(() => {
    console.log(code);
  }, [code]);

  return (
    <>
      <header className={styles.explorerContent_header}>
        <Breadcrumb />
        <Menu
          icon={MenuIcon}
          wrapperStyle={{
            width: "fit-content",
            padding: "0rem",
            marginLeft: "auto",
          }}
          buttonStyle={{
            padding: "13px 7px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          menuStyle={{ right: "0px", left: "unset" }}
        />
      </header>

      <div className={styles.author_info}>
        <Pfp
          editable={false}
          src={"/images/amity.jpg"}
          customStyles={{ width: "35px", height: "35px" }}
        />
        <h2>Youssef Elhamouly</h2>

        <span className={styles.last_modified}>7 months ago</span>
        <Button
          title={"History"}
          icon={History}
          className={styles.history_btn}
        />
      </div>
      <ItemViewer content={code} language="javascript" onChange={setCode} />
    </>
  );
};

export default ExplorerContent;
