import React, { useState } from "react";

const ShowMoreText = ({ text, charLimit = 300 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  if (!text) return null;

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const shouldTruncate = text.length > charLimit;
  const displayedText =
    isExpanded || !shouldTruncate ? text : text.slice(0, charLimit) + "...";

  return (
    <p className="post-caption">
      <span>
        {displayedText.split("\n").map((line, index, array) => (
          <span key={index}>
            {line.split(urlRegex).map((part, i) =>
              urlRegex.test(part) ? (
                <a
                  key={i}
                  href={part}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-links"
                >
                  {part}
                </a>
              ) : (
                part
              ),
            )}
            {index !== array.length - 1 && <br />}
          </span>
        ))}
      </span>
      {shouldTruncate && (
        <button
          className="glowing-link show-more-btn"
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ display: "inline" }}
        >
          {isExpanded ? "See less" : "See more"}
        </button>
      )}
    </p>
  );
};

export default ShowMoreText;
