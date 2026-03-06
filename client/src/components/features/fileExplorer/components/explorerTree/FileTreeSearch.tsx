"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/ui/media/icon/Icon";
import styles from "./fileTreeSearch.module.scss";
import type { ExplorerNode } from "../../types/fileExplorer";
import useOutsideClick from "@/components/hooks/useOutsideClick";

interface FileTreeSearchProps {
  tree: ExplorerNode[];
  basePath: string;
}

interface FlatNode {
  id: string;
  title: string;
  path: string;
  type: "file" | "directory";
  node: ExplorerNode;
}

const FileTreeSearch = ({ tree, basePath }: FileTreeSearchProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useOutsideClick([containerRef], () => setIsOpen(false));

  // Flatten the tree for searching
  const flatNodes = useMemo(() => {
    const result: FlatNode[] = [];
    const flatten = (nodes: ExplorerNode[]) => {
      for (const node of nodes) {
        result.push({
          id: node._id,
          title: node.title,
          path: node.path,
          type: node.type,
          node,
        });
        if (node.type === "directory" && node.children) {
          flatten(node.children as ExplorerNode[]);
        }
      }
    };
    flatten(tree);
    return result;
  }, [tree]);

  // Filter nodes based on query
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return flatNodes
      .filter(
        (n) =>
          n.title.toLowerCase().includes(lowerQuery) ||
          n.path.toLowerCase().includes(lowerQuery),
      )
      .slice(0, 50); // Limit to 50 results
  }, [flatNodes, query]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchResults]);

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(`${basePath}/${path}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || searchResults.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % searchResults.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === 0 ? searchResults.length - 1 : prev - 1,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = searchResults[selectedIndex];
      if (selected) {
        handleNavigate(selected.path);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Helper to highlight matching text
  const renderHighlightedText = (text: string, highlight: string) => {
    if (!highlight.trim()) return <span>{text}</span>;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className={styles.highlight}>
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </span>
    );
  };

  return (
    <div className={styles.search_container} ref={containerRef}>
      <div className={styles.search_input_wrapper}>
        <Icon icon="Search" size={14} />
        <input
          type="text"
          placeholder="Go to file..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {isOpen && query.trim() && (
        <div className={styles.dropdown}>
          {searchResults.length > 0 ? (
            searchResults.map((item, index) => (
              <div
                key={item.id}
                className={`${styles.suggestion_item} ${
                  index === selectedIndex ? styles.selected : ""
                }`}
                onClick={() => handleNavigate(item.path)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <span className={styles.icon}>
                  <Icon
                    icon={item.type === "directory" ? "Folder" : "File"}
                    size={14}
                  />
                </span>
                <div className={styles.text_container}>
                  <div className={styles.title}>
                    {renderHighlightedText(item.title, query)}
                  </div>
                  <div className={styles.path}>
                    {renderHighlightedText(item.path, query)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.no_results}>No files found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileTreeSearch;
