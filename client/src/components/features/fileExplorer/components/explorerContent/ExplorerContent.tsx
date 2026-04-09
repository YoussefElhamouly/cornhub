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
import { useExplorerData } from "../contexts/ExplorerDataContext";
import Button from "@/components/ui/control/button/Button";
import Breadcrumb from "@/components/ui/navigation/breadcrumb/Breadcrumb";
import Menu from "@/components/ui/control/menu/Menu";
import Main from "@/components/layouts/main/Main";

interface ExplorerContentProps {
  node?: ExplorerNode;
  commit: Commit;
  branch: Branch;
  basePath: string;
  nodePath: string;
}

const ExplorerContent = ({
  node,
  commit,
  branch,
  basePath,
  nodePath,
}: ExplorerContentProps) => {
  const { togglePanel, isPanelOpen } = useExplorerData();
  const NotFoundBlock = () => (
    <div className={styles.notFound}>
      <h2>404 — Path not found</h2>
      <p>
        The requested path does not exist on branch{" "}
        <strong>{branch.name}</strong>.
      </p>
    </div>
  );

  function RenderContent() {
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
          return <ReadMe content={node.content ?? ""} title={node.title} />;
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
  }
  return (
    <Main>
      <header className={styles.explorer_content_nav}>
        <Button
          icon={isPanelOpen ? "PanelLeftOpen" : "PanelRightOpen"}
          onClick={togglePanel}
          customStyles={{
            padding: "8px",
            marginRight: "0.5rem",
            display: "flex",
          }}
        />
        <Breadcrumb nodePath={nodePath} basePath={basePath} />
        <Menu
          icon={"Menu"}
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
      <RenderContent />
    </Main>
  );
};

export default ExplorerContent;
