import React, { useState } from "react";
import ExplorerTree from "../explorerTree/ExplorerTree";
import styles from "./fileExplorer.module.scss";
import Aside from "../../../layouts/aside/Aside";
import Menu from "../../../ui/menu/Menu";
import ExplorerContent from "../explorerContent/ExplorerContent";
import Button from "../../../ui/button/Button";
import Main from "../../../layouts/main/Main";
import Wrapper from "../../../layouts/wrapper/Wrapper";
const FileExplorer = () => {
  return (
    <Wrapper>
      <Aside>
        <header className={styles.explorer_tree_header}>
          <Button>
            <svg viewBox="0 0 16 16" overflow="visible">
              <path d="m4.177 7.823 2.396-2.396A.25.25 0 0 1 7 5.604v4.792a.25.25 0 0 1-.427.177L4.177 8.177a.25.25 0 0 1 0-.354Z"></path>
              <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25H9.5v-13Zm12.5 13a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25H11v13Z"></path>
            </svg>
          </Button>
          <h1>Files</h1>
        </header>
        <div className={styles.fileExplorer_filter_container}>
          <Menu
            title="Main"
            leftIcon={
              <svg viewBox="0 0 16 16">
                <path d="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"></path>
              </svg>
            }
            wrapperStyle={{ width: "100%" }}
            buttonStyle={{ padding: "15px" }}
          />
        </div>
        <ExplorerTree />
      </Aside>
      <Main>
        <ExplorerContent />
      </Main>
    </Wrapper>
  );
};

export default FileExplorer;
