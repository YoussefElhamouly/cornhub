"use client";

import React, { useState } from "react";
import ExplorerTree from "../explorerTree/ExplorerTree";
import styles from "./fileExplorer.module.scss";
import Aside from "../../../layouts/aside/Aside";
import Menu from "../../../ui/control/menu/Menu";
import ExplorerContent from "../explorerContent/ExplorerContent";
import Button from "../../../ui/control/button/Button";
import Main from "../../../layouts/main/Main";
import Wrapper from "../../../layouts/wrapper/Wrapper";

import Breadcrumb from "../../../ui/navigation/breadcrumb/Breadcrumb";
const FileExplorer = () => {
  const [leftPanel, setLeftPanel] = useState(true);

  return (
    <Wrapper>
      {leftPanel && (
        <Aside>
          <header className={styles.explorer_tree_header}>
            <Button
              icon={"panel-left-close"}
              onClick={() => {
                setLeftPanel(false);
              }}
            />
            <h1>Files</h1>
          </header>
          <div className={styles.fileExplorer_filter_container}>
            <Menu
              title="Main"
              leftIcon={"git-branch"}
              wrapperStyle={{ width: "100%" }}
              buttonStyle={{ padding: "15px" }}
            />
          </div>
          <ExplorerTree />
        </Aside>
      )}
      <Main>
        <header className={styles.explorer_content_nav}>
          {!leftPanel && (
            <Button
              icon={"panel-left-open"}
              onClick={() => {
                setLeftPanel(true);
              }}
              customStyles={{}}
            />
          )}
          <Breadcrumb />
          <Menu
            icon={"menu"}
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
        <ExplorerContent />
      </Main>
    </Wrapper>
  );
};

export default FileExplorer;
