import Icon from "@/components/ui/media/icon/Icon";
import type { FileNode, Commit } from "../../types/fileExplorer";
import { formatFileSize } from "@/utils/helperFunctions";
import styles from "./explorerContent.module.scss";

interface FileContentHeaderProps {
  node: FileNode;
  commit: Commit;
  branch: string;
}

const FileContentHeader = ({
  node,
  commit,
  branch,
}: FileContentHeaderProps) => {
  return (
    <div className={styles.nodeHeader}>
      <span className={styles.nodeHeader_name}>{node.title}</span>

      <span className={styles.nodeHeader_divider}>—</span>

      <span className={styles.nodeHeader_commit} title={commit._id}>
        {commit.message}
      </span>

      <span className={styles.nodeHeader_divider}>—</span>

      <span className={styles.nodeHeader_branch}>
        <Icon icon={"GitBranch"} size={13} />
        {branch}
      </span>

      {node.metaData.size != null && (
        <>
          <span className={styles.nodeHeader_divider}>—</span>
          <span className={styles.nodeHeader_size}>
            {formatFileSize(node.metaData.size)}
          </span>
        </>
      )}
    </div>
  );
};

export default FileContentHeader;
