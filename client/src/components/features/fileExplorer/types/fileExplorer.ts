// ─── Node Types ───────────────────────────────────────────────────────────────

export type FileNodeType = "folder" | "file" | "image" | "video";

export type TreeNodeStatus = "default" | "added" | "modified" | "removed";

export interface FileTreeNode {
  /** Display name of the node */
  name: string;
  /** Full path from repository root, e.g. "src/components/Button.tsx" */
  path: string;
  type: FileNodeType;
  /** File size in bytes (undefined for folders) */
  size?: number;
  /** Programming language for syntax highlighting (files only) */
  language?: string;
  /** Inline content for text/code files */
  content?: string;
  /** Public URL for image/video assets */
  src?: string;
  /** Child nodes (folders only) */
  children?: FileTreeNode[];
  /** Git status indicator for sidebar colouring */
  status?: TreeNodeStatus;
}

// ─── Git / Commit ─────────────────────────────────────────────────────────────

export interface Commit {
  hash: string;
  shortHash: string;
  message: string;
  author: string;
  /** ISO-8601 date string */
  date: string;
}

// ─── Branch ───────────────────────────────────────────────────────────────────

export interface Branch {
  name: string;
  latestCommit: Commit;
  commits: Commit[];
  /** Root-level tree nodes for this branch */
  tree: FileTreeNode[];
}

// ─── Component Props ──────────────────────────────────────────────────────────

export interface FileExplorerProps {
  /** The username segment from the URL */
  username: string;
  /** The project segment from the URL */
  project: string;
  /** Active branch name (defaults to "main") */
  branch?: string;
  /** Specific commit hash to pin (defaults to branch latest) */
  commit?: string;
  /** Joined wildcard path from the URL, e.g. "src/components/Button.tsx" */
  nodePath?: string;
}

export interface ExplorerTreeProps {
  tree: FileTreeNode[];
  activePath: string;
  /** Base href: "/<username>/<project>/tree" */
  basePath: string;
}

export interface ExplorerContentProps {
  node: FileTreeNode | undefined;
  commit: Commit;
  branch: string;
  nodePath: string;
  /** All children of the current node (folders only) */
  children?: FileTreeNode[];
  /** Base href for breadcrumb links */
  basePath: string;
}
