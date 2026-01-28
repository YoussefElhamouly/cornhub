import React from "react";
import CodeEditor from "../codeEditor/CodeEditor";
import Picture from "../../../ui/picture/Picture";
import Button from "../../../ui/button/Button";
import Menu from "../../../ui/menu/Menu";
import Table from "../../../ui/table/Table";
import styles from "./itemViewr.module.scss";
import { Sprout, ArrowDownToLine, Popcorn } from "lucide-react";
import Video from "../../../ui/Video/Video";
import Item from "../../../ui/folder/Item";
const ItemViewer = ({
  type = "code",
  name = "",
  content = "",
  ext = "javascript",
  imageSrc = "",
  onChange = null,
  fileInfo = null,
  fileOptions = null,
  fileSize = "0 KB", // File size prop
}) => {
  const ItemActions = () => {
    return (
      <div className={styles.itemViewer_actions}>
        <Button icon={Popcorn} />
        <Button icon={ArrowDownToLine} />
        <Menu
          title={"Seeders"}
          leftIcon={Sprout}
          wrapperStyle={{
            width: "fit-content",
            padding: "0rem",
            marginLeft: "auto",
          }}
          buttonStyle={{
            padding: "16px 7px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          menuStyle={{ right: "0px", left: "unset" }}
        >
          {fileOptions}
        </Menu>
      </div>
    );
  };

  return (
    <div className={styles.itemViewer_container}>
      <header className={styles.itemViewer_header}>
        <div className={styles.itemViewer_info}>
          {fileInfo || <div></div>}

          <span className={styles.file_size}>{fileSize}</span>
        </div>
        <ItemActions />
      </header>

      <div className={styles.itemViewer_content}>
        {/* <Picture
          src={"/images/logo6.png"}
          customStyles={{
            width: "100%",
            height: "100%",
            flex: "1",
          }}
        /> */}
        {/* <CodeEditor
          code={content}
          language={"javascript"}
          onChange={onChange}
        /> */}
        <Table
          columns={[
            { key: "item", header: "Name" },
            { key: "commit", header: "Description" },
            { key: "timestamp", header: "Time" },
          ]}
          data={[
            {
              item: <Item name={"Client"} />,
              commit: "webrtc exp",
              timestamp: "7 months ago",
            },
            {
              item: <Item name={"Server"} />,
              commit: "webrtc exp",
              timestamp: "7 months ago",
            },
            {
              item: <Item name={".cornignore"} type="file" />,
              commit: "webrtc exp",
              timestamp: "7 months ago",
            },
            {
              item: <Item name={"readme.md"} type="file" />,
              commit: "webrtc exp",
              timestamp: "7 months ago",
            },
          ]}
        />

        {/* <Video src={"/videos/5.mp4"} maxHeight={666} /> */}
      </div>
    </div>
  );
};

export default ItemViewer;
