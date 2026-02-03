import React, { useState } from "react";
import styles from "./treeNode.module.scss";
import Icon from "../../media/icon/Icon.jsx";
import Item from "../../collection/item/Item.jsx";
import { ChevronRight } from "lucide-react";

const TreeNode = ({ name, type = "folder", children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isFolder = type === "folder";

  return (
    <div className={styles.treeNode_wrapper}>
      <div className={styles.treeNode_btn_wrapper}>
        <div
          className={`${styles.treeNode_expander} ${
            !isFolder ? styles.disabled : ""
          }`}
          onClick={() => isFolder && setIsExpanded((prev) => !prev)}
        >
          <div
            style={{
              transform:
                isExpanded && isFolder ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
              display: "flex",
            }}
          >
            <Icon icon={ChevronRight} size={14} />
          </div>
        </div>

        <Item name={name} type={type} isExpanded={isExpanded} />
      </div>
      {isFolder && isExpanded && (
        <div className={styles.treeNode_children_container}>
          {children?.map((child, i) => (
            <TreeNode key={i} {...child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
