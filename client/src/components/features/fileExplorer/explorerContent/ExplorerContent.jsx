import React, { useEffect, useState } from "react";
import ContentViewer from "../../../ui/layout/contentViewer/ContentViewer.jsx";
import styles from "./explorerContent.module.scss";
import CodeEditor from "../codeEditor/CodeEditor.jsx";
import { History } from "lucide-react";
import Avatar from "../../../ui/media/avatar/Avatar.jsx";
import Button from "../../../ui/control/button/Button.jsx";
import { Sprout, ArrowDownToLine, Popcorn } from "lucide-react";
import Menu from "../../../ui/control/menu/Menu.jsx";
import InputField from "../../../ui/control/inputField/InputField.jsx";
const ExplorerContent = () => {
  const testCode = `// Welcome to CodeEditor with Highlights!
function calculateSum(a, b) {
  return a + b;
}

function multiply(x, y) {
  const result = x * y;
  return result;
}

const greeting = "Hello, World!";
console.log(greeting);

function subtract(a, b) {
  return a - b;
}
  const greeting = "Hello, World!";
console.log(greeting);

function subtract(a, b) {
  return a - b;
}const greeting = "Hello, World!";
console.log(greeting);

function subtract(a, b) {
  return a - b;
}const greeting = "Hello, World!";
console.log(greeting);

function subtract(a, b) {
  return a - b;
}const greeting = "Hello, World!";
console.log(greeting);

function subtract(a, b) {
  return a - b;
}

export { calculateSum, multiply, subtract };`;

  const [code, setCode] = useState(testCode);

  // Test highlights object: line numbers map to "+" (added), "-" (removed), or "" (none)
  // const testHighlights = {
  //   1: "",
  //   2: "+",
  //   3: "+",
  //   // 4: "",
  //   // 5: "",
  //   6: "+",
  //   7: "+",
  //   8: "+",
  //   // 9: "",
  //   // 10: "",
  //   11: "-",
  //   // 12: "",
  //   // 13: "",
  //   14: "-",
  //   15: "-",
  //   // 16: "",
  //   17: "+",
  //   18: "+",
  // };

  useEffect(() => {
    console.log(code);
  }, [code]);

  const ItemActions = ({ fileOptions = null }) => {
    return (
      <div className={styles.itemViewer_actions}>
        <h1>yourmom.jsx</h1>
        <h1>0.3kb</h1>
        <Button icon={Popcorn} />
        <Button icon={ArrowDownToLine} />
        <Menu
          title={"Seeders"}
          leftIcon={Sprout}
          wrapperStyle={{
            width: "fit-content",
            padding: "0rem",
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
    <>
      <div className={styles.author_info}>
        <Avatar
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

      <ContentViewer customStyles={{ minHeight: "50%" }}>
        {/* <ContentViewer.Header>
          <ItemActions />
        </ContentViewer.Header>
        <ContentViewer.Body>
          <Table columns={tableKeys} data={tableData} />
        </ContentViewer.Body> */}

        <ContentViewer.Header>
          <ItemActions />
        </ContentViewer.Header>
        <ContentViewer.Body>
          <CodeEditor code={code} onChange={setCode} highlights={{}} />
        </ContentViewer.Body>
      </ContentViewer>
    </>
  );
};

export default ExplorerContent;
