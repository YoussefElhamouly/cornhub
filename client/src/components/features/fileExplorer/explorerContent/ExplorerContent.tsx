"use client";

import React from "react";
import ContentViewer from "../../../ui/layout/contentViewer/ContentViewer";
import CodeEditor from "../codeEditor/CodeEditor";
import Picture from "@/components/ui/media/picture/Picture";
import Video from "@/components/ui/media/Video/Video";
import FolderView from "./FolderView";
import FolderContentHeader from "./FolderContentHeader";
import FileContentHeader from "./FileContentHeader";
import type { ExplorerContentProps } from "../types/fileExplorer";
import { inferLanguage } from "../data/mockData";
import styles from "./explorerContent.module.scss";

const ExplorerContent = ({
  node,
  commit,
  branch,
  nodePath,
  children = [],
  basePath,
}: ExplorerContentProps) => {
  // ── Node not found ────────────────────────────────────────────────────────
  if (!node) {
    return (
      <div className={styles.notFound}>
        <h2>404 — Path not found</h2>
        <p>
          The path <code>{nodePath || "/"}</code> does not exist on branch{" "}
          <strong>{branch}</strong>.
        </p>
      </div>
    );
  }

  // ── Folder ────────────────────────────────────────────────────────────────
  if (node.type === "folder") {
    return (
      <ContentViewer>
        <ContentViewer.Header>
          <FolderContentHeader node={node} branch={branch} />
        </ContentViewer.Header>
        <ContentViewer.Body>
          <FolderView children={children} commit={commit} basePath={basePath} />
        </ContentViewer.Body>
      </ContentViewer>
    );
  }

  // ── Image ─────────────────────────────────────────────────────────────────
  if (node.type === "image") {
    return (
      <ContentViewer>
        <ContentViewer.Header>
          <FileContentHeader node={node} commit={commit} branch={branch} />
        </ContentViewer.Header>
        <ContentViewer.Body>
          <Picture src={node.src ?? ""} alt={node.name} />
        </ContentViewer.Body>
      </ContentViewer>
    );
  }

  // ── Video ─────────────────────────────────────────────────────────────────
  if (node.type === "video") {
    return (
      <ContentViewer>
        <ContentViewer.Header>
          <FileContentHeader node={node} commit={commit} branch={branch} />
        </ContentViewer.Header>
        <ContentViewer.Body>
          <Video src={node.src ?? ""} />
        </ContentViewer.Body>
      </ContentViewer>
    );
  }

  // ── Code / Text File ──────────────────────────────────────────────────────
  const language = node.language ?? inferLanguage(node.name);

  return (
    <ContentViewer>
      <ContentViewer.Header>
        <FileContentHeader node={node} commit={commit} branch={branch} />
      </ContentViewer.Header>
      <ContentViewer.Body>
        <CodeEditor
          code={node.content ?? ""}
          language={language}
          // Read-only: no onChange
        />
      </ContentViewer.Body>
    </ContentViewer>
  );
};

export default ExplorerContent;
