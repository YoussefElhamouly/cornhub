import React from "react";
import TreeNode from "../../../ui/navigation/treeNode/TreeNode.jsx";
import SearchBar from "../../../ui/control/searchBar/SearchBar.jsx";
import styles from "./explorerTree.module.scss";
const ExplorerTree = () => {
  const mockTree = [
    {
      type: "folder",
      name: "src",
      children: [
        {
          type: "folder",
          name: "components",
          children: [
            { type: "file", name: "Button.jsx" },
            { type: "file-added", name: "NewComponent.jsx" },
            { type: "file-modified", name: "Card.jsx" },
            { type: "file-minus", name: "DeletedForm.jsx" },
            { type: "file", name: "Modal.jsx" },
          ],
        },
        {
          type: "folder",
          name: "hooks",
          children: [
            { type: "file", name: "useAuth.js" },
            { type: "file-added", name: "useCustom.js" },
            { type: "file-modified", name: "useOutsideClick.js" },
          ],
        },
        { type: "file", name: "App.jsx" },
        { type: "file-added", name: "main.jsx" },
        { type: "file-modified", name: "index.css" },
      ],
    },
    {
      type: "folder",
      name: "server",
      children: [
        {
          type: "folder",
          name: "routes",
          children: [
            { type: "file", name: "auth.js" },
            { type: "file-added", name: "upload.js" },
            { type: "file-modified", name: "user.js" },
            { type: "file-minus", name: "deprecated.js" },
          ],
        },
        {
          type: "folder",
          name: "models",
          children: [
            { type: "file", name: "User.js" },
            { type: "file-modified", name: "Project.js" },
            { type: "file-added", name: "Comment.js" },
          ],
        },
        { type: "file", name: "server.js" },
        { type: "file-modified", name: "config.js" },
      ],
    },
    { type: "file", name: "README.md" },
    { type: "file-added", name: ".env.example" },
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
