// export type FileNodeType = "directory" | "file";

// export type TreeNodeStatus = "unchanged" | "added" | "modified" | "removed";

// export interface FileTreeNode {
//   /** Display name of the node */
//   name: string;
//   /** Full path from repository root, e.g. "src/components/Button.tsx" */
//   path: string;
//   type: FileNodeType;
//   /** File size in bytes (undefined for folders) */
//   size?: number;
//   /** Programming language for syntax highlighting (files only) */
//   language?: string;
//   /** Inline content for text/code files */
//   content?: string;
//   /** Public URL for image/video assets */
//   src?: string;
//   /** Child nodes (folders only) */
//   children?: FileTreeNode[];
//   /** Git status indicator for sidebar colouring */
//   status?: TreeNodeStatus;
// }

// // ─── Git / Commit ─────────────────────────────────────────────────────────────

// export interface Commit {
//   hash: string;
//   shortHash: string;
//   message: string;
//   author: string;
//   /** ISO-8601 date string */
//   date: string;
// }

// // ─── Branch ───────────────────────────────────────────────────────────────────

// export interface Branch {
//   name: string;
//   latestCommit: Commit;
//   commits: Commit[];
//   /** Root-level tree nodes for this branch */
//   tree: FileTreeNode[];
// }

// // ─── Component Props ──────────────────────────────────────────────────────────

// export interface FileExplorerProps {
//   /** The username segment from the URL */
//   username: string;
//   /** The project segment from the URL */
//   project: string;
//   /** Active branch name (defaults to "main") */
//   branch?: string;
//   /** Specific commit hash to pin (defaults to branch latest) */
//   commit?: string;
//   /** Joined wildcard path from the URL, e.g. "src/components/Button.tsx" */
//   nodePath?: string;
// }

// export interface ExplorerTreeProps {
//   tree: FileTreeNode[];
//   activePath: string;
//   /** Base href: "/<username>/<project>/tree" */
//   basePath: string;
// }

// export interface ExplorerContentProps {
//   node: FileTreeNode | undefined;
//   commit: Commit;
//   branch: string;
//   nodePath: string;
//   /** All children of the current node (folders only) */
//   children?: FileTreeNode[];
//   /** Base href for breadcrumb links */
//   basePath: string;
// }

////////////////////////////////////////////////////

export type NodeType = "file" | "directory";

export type NodeStatus = "added" | "modified" | "removed" | "unchanged";

export interface FileSystemNode {
  _id: string;
  title: string;
  parentId: string | null;

  type: NodeType;
  status?: NodeStatus; // defaults to "unchanged"

  path: string; // resolved in backend
  commitHash: string;
  branch: string;
}

export interface DirectoryNode extends FileSystemNode {
  type: "directory";
  children?: FileSystemNode[];
}
/**
 * File-only interface (extends global)
 */
export interface FileNode extends FileSystemNode {
  type: "file";
  content?: string;
  metaData: CodeMeta | ImageMeta | VideoMeta | GenericFileMeta;
}

/*
 * Commit
 */
export interface Commit {
  _id: string; // commit hash or ObjectId
  message: string;
  author: string;
  createdAt: Date;

  branch: string; // branch name reference
  parentCommitId?: string; // previous commit (for history chain)

  rootNodeId: string; // points to root FileSystemNode _id
}

/**
 * Branch
 */
export interface Branch {
  _id: string;
  name: string; // e.g. "main", "dev", "feature-auth"

  headCommitId: string; // latest commit
  commits: string[]; // list of commit _ids (history)

  createdAt: Date;
  updatedAt: Date;
  tree?: ExplorerNode[];
}

export interface CodeMeta {
  extension: string;
  language: string;
  mimeType: string;
  size?: number;
  lines?: number;
  linesHightlight: {};
}

/** Metadata for image files */
export interface ImageMeta {
  mimeType: `image/${string}`;
  width: number;
  height: number;
  format: string; // png, jpg, webp, etc.
  size?: number;
  src?: string;
}

/** Metadata for video files */
export interface VideoMeta {
  mimeType: `video/${string}`;
  duration: number;
  width: number;
  height: number;
  codec: string;
  frameRate: number;
  size?: number;
  src?: string;
}
export interface GenericFileMeta {
  mimeType: string;
  size?: number;
}

export type ExplorerNode = DirectoryNode | FileNode;
