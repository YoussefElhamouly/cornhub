import React from "react";
import styles from "./readMe.module.scss";
import { BookOpen, Edit2, List } from "lucide-react";
import Button from "../button/Button.jsx";

const ReadMe = ({ content = "", title = "README" }) => {
  // Parse markdown-like syntax into JSX
  const parseMarkdown = (text) => {
    if (!text) return [];

    const lines = text.split("\n");
    const elements = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Headings (# ## ### etc)
      if (line.startsWith("# ")) {
        elements.push(
          <h1 key={`h1-${i}`} className={styles.heading1}>
            {line.substring(2)}
          </h1>,
        );
        i++;
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2 key={`h2-${i}`} className={styles.heading2}>
            {line.substring(3)}
          </h2>,
        );
        i++;
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3 key={`h3-${i}`} className={styles.heading3}>
            {line.substring(4)}
          </h3>,
        );
        i++;
      }
      // Bold text **text**
      else if (line.includes("**")) {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        elements.push(
          <p key={`p-${i}`} className={styles.paragraph}>
            {parts.map((part, idx) => (
              <span key={idx}>
                {idx % 2 === 1 ? (
                  <strong>{part}</strong>
                ) : (
                  parseInlineFormatting(part)
                )}
              </span>
            ))}
          </p>,
        );
        i++;
      }
      // Italic text *text*
      else if (line.includes("*") && !line.startsWith("*")) {
        const parts = line.split(/\*(.*?)\*/g);
        elements.push(
          <p key={`p-${i}`} className={styles.paragraph}>
            {parts.map((part, idx) =>
              idx % 2 === 1 ? <em key={idx}>{part}</em> : part,
            )}
          </p>,
        );
        i++;
      }
      // Unordered lists
      else if (line.trim().startsWith("- ")) {
        const listItems = [];
        while (i < lines.length && lines[i].trim().startsWith("- ")) {
          listItems.push(
            <li key={`li-${i}`} className={styles.list_item}>
              {lines[i].trim().substring(2)}
            </li>,
          );
          i++;
        }
        elements.push(
          <ul key={`ul-${i}`} className={styles.unordered_list}>
            {listItems}
          </ul>,
        );
      }
      // Code blocks (``` ... ```)
      else if (line.trim().startsWith("```")) {
        const codeLines = [];
        i++;
        while (i < lines.length && !lines[i].trim().startsWith("```")) {
          codeLines.push(lines[i]);
          i++;
        }
        elements.push(
          <pre key={`code-${i}`} className={styles.code_block}>
            <code>{codeLines.join("\n")}</code>
          </pre>,
        );
        i++;
      }
      // Horizontal line
      else if (line.trim() === "---" || line.trim() === "***") {
        elements.push(
          <hr key={`hr-${i}`} className={styles.horizontal_rule} />,
        );
        i++;
      }
      // Images ![alt](url)
      else if (line.trim().match(/^!\[.*?\]\(.*?\)$/)) {
        const imgMatch = line.match(/!\[(.*?)\]\((.*?)\)/);
        if (imgMatch) {
          elements.push(
            <div key={`img-${i}`} className={styles.image_wrapper}>
              <img
                src={imgMatch[2]}
                alt={imgMatch[1]}
                className={styles.image}
              />
              {imgMatch[1] && (
                <p className={styles.image_caption}>{imgMatch[1]}</p>
              )}
            </div>,
          );
        }
        i++;
      }
      // Empty lines
      else if (line.trim() === "") {
        i++;
      }
      // Regular paragraph
      else {
        elements.push(
          <p key={`p-${i}`} className={styles.paragraph}>
            {parseInlineFormatting(line)}
          </p>,
        );
        i++;
      }
    }

    return elements;
  };

  // Parse inline formatting like [links](url) and ![images](url)
  const parseInlineFormatting = (text) => {
    // Match ![alt](url) and [text](url) patterns
    const combinedRegex = /(!?\[(.*?)\]\((.*?)\))/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = combinedRegex.exec(text)) !== null) {
      // Add text before link/image
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      // Check if it's an image
      if (match[1].startsWith("!")) {
        const imgAlt = match[2];
        const imgUrl = match[3];
        parts.push(
          <img
            key={`inline-img-${match.index}`}
            src={imgUrl}
            alt={imgAlt}
            className={styles.inline_image}
          />,
        );
      } else {
        // It's a link
        const linkText = match[2];
        const linkUrl = match[3];
        parts.push(
          <a
            key={`link-${match.index}`}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {linkText}
          </a>,
        );
      }

      lastIndex = combinedRegex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  const parsedContent = parseMarkdown(content);

  return (
    <div className={styles.readme_container}>
      <div className={styles.readme_header}>
        <div className={styles.header_left}>
          <BookOpen size={20} />
          <h2 className={styles.readme_title}>{title}</h2>
        </div>
        <div className={styles.header_right}>
          <Button
            icon={Edit2}
            customStyles={{
              backgroundColor: "transparent",
              width: "32px",
              height: "32px",
            }}
          />
          <Button
            icon={List}
            customStyles={{
              backgroundColor: "transparent",
              width: "32px",
              height: "32px",
            }}
          />
        </div>
      </div>

      <div className={styles.readme_content}>{parsedContent}</div>
    </div>
  );
};

export default ReadMe;
