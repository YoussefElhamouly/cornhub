import React, { useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import styles from "./codeEditor.module.scss";

const MONACO_THEMES = {
  "transparent-theme": {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#00000000",
      "editorLineNumber.foreground": "#9198a1",
      "editorCursor.foreground": "#ffffffff",
      "editorLineNumber.activeForeground": "#eba537",
      "editor.selectionBackground": "#00000000",
      "editor.lineHighlightBorder": "#00000000",
    },
  },

  "cursor-dark": {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6A9955", fontStyle: "italic" },
      { token: "keyword", foreground: "C586C0" },
      { token: "number", foreground: "B5CEA8" },
      { token: "string", foreground: "CE9178" },
      { token: "type", foreground: "4EC9B0" },
      { token: "class", foreground: "4EC9B0" },
      { token: "function", foreground: "DCDCAA" },
      { token: "variable", foreground: "9CDCFE" },
    ],
    colors: {
      "editor.background": "#00000000",
      "editor.foreground": "#D4D4D4",
      "editorLineNumber.foreground": "#858585",
      "editorLineNumber.activeForeground": "#C6C6C6",
      "editorCursor.foreground": "#AEAFAD",
      "editorCursor.background": "#00000000",
      "editor.selectionBackground": "#264F78",
      "editor.selectionHighlightBackground": "#ADD6FF26",
      "editor.lineHighlightBackground": "#2A2D2E80",
      "editor.lineHighlightBorder": "#00000000",
    },
  },

  "atom-one-dark": {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "5C6370", fontStyle: "italic" },
      { token: "keyword", foreground: "C678DD" },
      { token: "number", foreground: "D19A66" },
      { token: "string", foreground: "98C379" },
      { token: "type", foreground: "56B6C2" },
      { token: "class", foreground: "E5C07B" },
      { token: "function", foreground: "61AFEF" },
      { token: "variable", foreground: "E06C75" },
      { token: "constant", foreground: "D19A66" },
    ],
    colors: {
      "editor.background": "#00000000", // transparent
      "editor.foreground": "#ABB2BF",
      "editorLineNumber.foreground": "#5C6370",
      "editorLineNumber.activeForeground": "#E5C07B",
      "editorCursor.foreground": "#528BFF",
      "editor.selectionBackground": "#3E445180",
      "editor.selectionHighlightBackground": "#3E445140",
      "editor.lineHighlightBackground": "#2C313A80",
      "editor.lineHighlightBorder": "#00000000",
      "editorIndentGuide.background": "#3B4048",
      "editorIndentGuide.activeBackground": "#4B5263",
    },
  },

  default: {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "5C6370", fontStyle: "italic" },
      { token: "keyword", foreground: "83d6c5" }, // orange keywords
      { token: "number", foreground: "D19A66" },
      { token: "string", foreground: "d88dd1" },
      { token: "type", foreground: "a99af4" },
      { token: "class", foreground: "83d6c5" }, // orange classes
      { token: "function", foreground: "efb080" }, // your accent
      { token: "variable", foreground: "E06C75" },
      { token: "constant", foreground: "aa9bf5" },
    ],
    colors: {
      "editor.background": "#00000000",
      "editor.foreground": "#ABB2BF",
      "editorLineNumber.foreground": "#5C6370",
      "editorLineNumber.activeForeground": "#EBA537",
      "editorCursor.foreground": "#EBA537",
      "editor.selectionBackground": "#EBA53733",
      "editor.selectionHighlightBackground": "#EBA53722",
      "editor.lineHighlightBackground": "#2C313A80",
      "editor.lineHighlightBorder": "#00000000",
      "editorIndentGuide.background": "#3B4048",
      "editorIndentGuide.activeBackground": "#EBA53766",
      "minimap.background": "#00000000",
    },
  },
};

const CodeEditor = ({
  code,
  language = "javascript",
  onChange,
  theme = "default",
  customStyles = {},
  className = "",
  highlights = {},
}) => {
  const editorRef = useRef(null);
  const decorationsRef = useRef([]);

  const handleChange = (value) => {
    // Disable editing when highlights are present
    if (onChange && Object.keys(highlights).length === 0) {
      onChange(value || "");
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    // Apply highlights immediately after mount
    if (Object.keys(highlights).length > 0) {
      applyHighlights(highlights, monaco);
    }
  };

  const applyHighlights = (highlightsObj, monaco) => {
    if (
      !editorRef.current ||
      !highlightsObj ||
      Object.keys(highlightsObj).length === 0
    ) {
      return;
    }

    const decorations = Object.entries(highlightsObj)
      .map(([lineNum, type]) => {
        const line = parseInt(lineNum);
        if (!line || (type !== "+" && type !== "-")) return null;

        return {
          range: new monaco.Range(line, 1, line, 250),
          options: {
            isWholeLine: true,
            className:
              type === "+" ? "highlight-added-line" : "highlight-removed-line",
            glyphMarginClassName:
              type === "+" ? "glyph-added-icon" : "glyph-removed-icon",
            glyphMarginHoverMessage: {
              value: type === "+" ? "Added line" : "Removed line",
            },
            minimap: {
              color: type === "+" ? "#22c55e99" : "#ef444499",
            },
            overviewRuler: {
              color: type === "+" ? "#22c55e" : "#ef4444",
              position: 7,
            },
          },
        };
      })
      .filter(Boolean);

    decorationsRef.current = editorRef.current.deltaDecorations(
      decorationsRef.current,
      decorations,
    );
  };

  useEffect(() => {
    if (editorRef.current && code !== undefined) {
      const currentValue = editorRef.current.getValue();
      if (currentValue !== code) {
        // Preserve cursor position
        const position = editorRef.current.getPosition();
        const scrollTop = editorRef.current.getScrollTop();
        const scrollLeft = editorRef.current.getScrollLeft();

        editorRef.current.setValue(code || "");

        // Restore cursor position if it was valid
        if (position) {
          editorRef.current.setPosition(position);
        }
        editorRef.current.setScrollTop(scrollTop);
        editorRef.current.setScrollLeft(scrollLeft);
      }
    }
  }, [code]);

  // Apply highlights whenever highlights object changes
  useEffect(() => {
    if (editorRef.current && window.monaco) {
      applyHighlights(highlights, window.monaco);
    }
  }, [highlights]);

  return (
    <div
      className={`${styles.codeEditor_wrapper} ${className}`}
      style={customStyles}
    >
      <Editor
        height="100%"
        language={language}
        value={code || ""}
        onChange={handleChange}
        loading={null}
        options={{
          readOnly: !onChange || Object.keys(highlights).length > 0,
          glyphMargin: true,
          minimap: {
            enabled: false,
            side: "left", // "right" | "left"
            size: "proportional", // "proportional" | "fill" | "fit"
            showSlider: "mouseover", // "always" | "mouseover"
            scale: 1, // number (e.g. 1–3)
            renderCharacters: true, // boolean
            maxColumn: 120, // number
          },
          fontSize: 13,
          scrollBeyondLastLine: false,
          cursorStyle: "line",
          cursorBlinking: "solid",
          lineNumbers: "on",
          renderLineHighlight: "all",
          overviewRulerBorder: false,
          hideCursorInOverviewRuler: true,
          renderWhitespace: "none",
          stickyScroll: { enabled: false },
          padding: { top: "10px", bottom: "30px" },
        }}
        beforeMount={(monaco) => {
          // Register all themes
          Object.entries(MONACO_THEMES).forEach(([themeName, themeConfig]) => {
            monaco.editor.defineTheme(themeName, themeConfig);
          });

          // Define highlight styles
          const styleSheet = document.createElement("style");
          styleSheet.textContent = `
            .highlight-added-line {
              background: linear-gradient(90deg, rgba(34, 197, 94, 0.25) 0%, transparent 100%) !important;
              border-left: 3px solid #22c55e !important;
            }
            .highlight-removed-line {
              background: linear-gradient(90deg, rgba(239, 68, 68, 0.25) 0%, transparent 100%) !important;
              border-left: 3px solid #ef4444 !important;
            }
            .glyph-added-icon {
              background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Ctext x='4' y='12' font-size='14' font-weight='bold' fill='%2322c55e'%3E+%3C/text%3E%3C/svg%3E") center/10px no-repeat !important;
            }
            .glyph-removed-icon {
              background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Ctext x='4' y='12' font-size='14' font-weight='bold' fill='%23ef4444'%3E−%3C/text%3E%3C/svg%3E") center/10px no-repeat !important;
            }
          `;
          document.head.appendChild(styleSheet);
        }}
        onMount={handleEditorDidMount}
        theme={theme}
      />
    </div>
  );
};

export default CodeEditor;
