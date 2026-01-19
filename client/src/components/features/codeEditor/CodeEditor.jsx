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
}) => {
  const editorRef = useRef(null);

  const handleChange = (value) => {
    if (onChange) {
      onChange(value || "");
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    // Theme is already defined in beforeMount, no need to redefine here
  };

  // Update editor content when code prop changes (without reloading)
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

  return (
    <div className={styles.codeEditor_wrapper}>
      <Editor
        height="100%"
        language={language}
        value={code || ""}
        onChange={handleChange}
        loading={null}
        options={{
          readOnly: !onChange,
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
        }}
        onMount={handleEditorDidMount}
        theme={theme}
      />
    </div>
  );
};

export default CodeEditor;
