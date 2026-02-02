import React, { useState } from "react";
import { ChevronDown, ChevronRight, Star, Reply } from "lucide-react";
import Avatar from "../../../ui/avatar/Avatar.jsx";
import Button from "../../../ui/button/Button.jsx";
import styles from "./comment.module.scss";

const Comment = ({ comment, onReply = null }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [liked, setLiked] = useState(false);

  const hasReplies = comment.replies && comment.replies.length > 0;

  const handleReply = () => {
    if (replyText.trim() && onReply) {
      onReply({
        author: {
          name: "You",
          username: "@yourname",
          pfp: "/images/default-pfp.jpg",
        },
        text: replyText,
        timestamp: "now",
        likes: 0,
        replies: [],
      });
      setReplyText("");
      setShowReplyForm(false);
    }
  };

  return (
    <div className={styles.comment_wrapper}>
      <div className={styles.comment_container}>
        <div className={styles.comment_content}>
          <div className={styles.comment_header}>
            <Avatar
              src={comment.author.pfp}
              alt={comment.author.name}
              customStyles={{ width: "28px", height: "28px" }}
            />
            <div className={styles.author_info}>
              <span className={styles.author_name}>{comment.author.name}</span>
              {/* <span className={styles.author_username}>
                {comment.author.username}
              </span> */}
              <span className={styles.timestamp}>{comment.timestamp}</span>
            </div>
          </div>

          <div className={styles.comment_text}>{comment.text}</div>

          <div className={styles.comment_actions}>
            <Button
              icon={Star}
              title={comment.likes + (liked ? 1 : 0)}
              onClick={() => setLiked(!liked)}
              variant="transparent"
            />

            <Button
              icon={Reply}
              title="Reply"
              onClick={() => setShowReplyForm(!showReplyForm)}
              variant="transparent"
            />

            {hasReplies && (
              <Button
                icon={isExpanded ? ChevronDown : ChevronRight}
                title={`${comment.replies.length}`}
                onClick={() => setIsExpanded(!isExpanded)}
                variant="transparent"
              />
            )}
          </div>
        </div>
      </div>

      {hasReplies && isExpanded && (
        <div className={styles.replies_container}>
          {comment.replies.map((reply, index) => (
            <Comment
              key={index}
              comment={reply}
              onReply={(newReply) => {
                // Handle nested replies
                console.log("New reply:", newReply);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
