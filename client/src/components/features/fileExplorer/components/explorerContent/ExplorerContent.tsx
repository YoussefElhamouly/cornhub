import React from "react";
import ContentViewer from "@/components/ui/layout/contentViewer/ContentViewer";
import CodeEditor from "../codeEditor/CodeEditor";
import Picture from "@/components/ui/media/picture/Picture";
import Video from "@/components/ui/media/Video/Video";
import ReadMe from "@/components/ui/media/readMe/ReadMe";
import FolderView from "./FolderView";
import FolderContentHeader from "./FolderContentHeader";
import FileContentHeader from "./FileContentHeader";
import type { ExplorerNode, Commit, Branch } from "../../types/fileExplorer";

import styles from "./explorerContent.module.scss";

interface ExplorerContentProps {
  node?: ExplorerNode;
  commit: Commit;
  branch: Branch;
  basePath: string;
}

const ExplorerContent = ({
  node,
  commit,
  branch,
  basePath,
}: ExplorerContentProps) => {
  const NotFoundBlock = () => (
    <div className={styles.notFound}>
      <h2>404 — Path not found</h2>
      <p>
        The requested path does not exist on branch{" "}
        <strong>{branch.name}</strong>.
      </p>
    </div>
  );

  switch (node?.type) {
    case "directory":
      return (
        <ContentViewer className={styles.folderHeader}>
          <ContentViewer.Header>
            <FolderContentHeader node={node} branch={branch.name} />
          </ContentViewer.Header>
          <ContentViewer.Body>
            <FolderView
              children={(node.children ?? []) as ExplorerNode[]}
              commit={commit}
              basePath={basePath}
            />
          </ContentViewer.Body>
        </ContentViewer>
      );

    case "file": {
      const meta = node.metaData;

      // ── Image ─────────────────────────────────────────────────────────
      if (meta?.mimeType?.startsWith("image/") && "src" in meta) {
        return (
          <ContentViewer>
            <ContentViewer.Header>
              <FileContentHeader
                node={node}
                commit={commit}
                branch={branch.name}
              />
            </ContentViewer.Header>
            <ContentViewer.Body>
              <Picture src={meta.src ?? ""} alt={node.title} />
            </ContentViewer.Body>
          </ContentViewer>
        );
      }

      // ── Video ─────────────────────────────────────────────────────────
      if (meta?.mimeType?.startsWith("video/") && "src" in meta) {
        return (
          <ContentViewer>
            <ContentViewer.Header>
              <FileContentHeader
                node={node}
                commit={commit}
                branch={branch.name}
              />
            </ContentViewer.Header>
            <ContentViewer.Body>
              <Video src={meta.src ?? ""} />
            </ContentViewer.Body>
          </ContentViewer>
        );
      }

      // ── Markdown ──────────────────────────────────────────────────────
      if (meta?.mimeType === "text/markdown") {
        return (
          // // <ContentViewer>
          //   {/* <ContentViewer.Header>
          //     <FileContentHeader
          //       node={node}
          //       commit={commit}
          //       branch={branch.name}
          //     />
          //   </ContentViewer.Header> */}
          //   {/* <ContentViewer.Body> */}

          //   {/* </ContentViewer.Body> */}
          // // </ContentViewer>
          <ReadMe content={node.content ?? ""} title={node.title} />
        );
      }

      // ── Code / generic text ───────────────────────────────────────────
      let language = "plaintext";
      if (meta && "language" in meta && meta.language) {
        language = meta.language.toLowerCase();
      }

      return (
        <ContentViewer>
          <ContentViewer.Header>
            <FileContentHeader
              node={node}
              commit={commit}
              branch={branch.name}
            />
          </ContentViewer.Header>
          <ContentViewer.Body>
            <CodeEditor code={node.content ?? ""} language={language} />
          </ContentViewer.Body>
        </ContentViewer>
      );
    }

    default:
      return (
        <ContentViewer>
          <ContentViewer.Body>
            <NotFoundBlock />
          </ContentViewer.Body>
        </ContentViewer>
      );
  }
};

export default ExplorerContent;
