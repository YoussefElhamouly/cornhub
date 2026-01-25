import React, { useState } from "react";
import ExplorerTree from "../explorerTree/ExplorerTree";
import styles from "./fileExplorer.module.scss";
import Aside from "../../../layouts/aside/Aside";
import Menu from "../../../ui/menu/Menu";
import ExplorerContent from "../explorerContent/ExplorerContent";
import Button from "../../../ui/button/Button";
import Main from "../../../layouts/main/Main";
import Wrapper from "../../../layouts/wrapper/Wrapper";
import { GitBranch, PanelLeftClose } from "lucide-react";
const FileExplorer = () => {
  return (
    <Wrapper>
      <Aside>
        <header className={styles.explorer_tree_header}>
          <Button icon={PanelLeftClose} />
          <h1>Files</h1>
        </header>
        <div className={styles.fileExplorer_filter_container}>
          <Menu
            title="Main"
            leftIcon={GitBranch}
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
