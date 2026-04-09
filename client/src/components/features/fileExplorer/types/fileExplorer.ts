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
  children?: ExplorerNode[];
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
  parentCommitId?: string | null; // previous commit (for history chain)
  tree?: ExplorerNode[];

  rootNodeId: string; // points to root FileSystemNode _id
}

/**
 * Branch
 */
export interface Branch {
  _id: string;
  name: string;
  headCommitId: string;
  createdAt: Date;
  updatedAt: Date;
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
