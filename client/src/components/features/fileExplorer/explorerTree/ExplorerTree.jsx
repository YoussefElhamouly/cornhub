import React from "react";
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
