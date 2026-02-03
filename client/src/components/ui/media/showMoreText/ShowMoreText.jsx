import React, { useState } from "react";
import styles from "./showMoreText.module.scss";

const ShowMoreText = ({
  text = "",
  charLimit = 300,
  onExpand = null,
  onCollapse = null,

  customStyles = {},
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return null;

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const shouldTruncate = text.length > charLimit;
  const displayedText =
    isExpanded || !shouldTruncate ? text : text.slice(0, charLimit);

  const handleToggle = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    if (newState && onExpand) onExpand();
    if (!newState && onCollapse) onCollapse();
  };

  const renderContent = () => {
    const lines = displayedText.split("\n");
    return lines.map((line, lineIndex, lineArray) => {
      const isLastLine = lineIndex === lineArray.length - 1;
      const parts = line.split(urlRegex);

      return (
        <span key={lineIndex}>
          {parts.map((part, i) =>
            urlRegex.test(part) ? (
              <a
                key={i}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.text_link}
              >
                {part}
              </a>
            ) : (
              part
            ),
          )}
          {shouldTruncate && isLastLine && !isExpanded && (
            <>
              ...{" "}
              <button className={styles.show_more_btn} onClick={handleToggle}>
                See more
              </button>
            </>
          )}
          {shouldTruncate && isLastLine && isExpanded && (
            <>
              {" "}
              <button className={styles.show_more_btn} onClick={handleToggle}>
                See less
              </button>
            </>
          )}
          {lineIndex !== lineArray.length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <div className={styles.show_more_text_container}>
      <p className={styles.text_content} style={customStyles}>
        {renderContent()}
      </p>
    </div>
  );
};

export default ShowMoreText;
