import type { ExplorerNode } from "../types/fileExplorer";

/**
 * Walk a node tree by path segments and return the matching node,
 * or `undefined` if the path is not found.
 */
export function resolveNode(
  tree: ExplorerNode[],
  nodePath: string,
): ExplorerNode | undefined {
  if (!nodePath) return undefined;

  const segments = nodePath.split("/").filter(Boolean);
  let current: ExplorerNode | undefined;
  let children: ExplorerNode[] = tree;

  for (const segment of segments) {
    current = children.find((n) => n.title === segment);
    if (!current) return undefined;
    if (current.type === "directory") {
      children = (current.children ?? []) as ExplorerNode[];
    }
  }

  return current;
}
