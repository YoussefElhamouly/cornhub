import React, { useState } from "react";
import styles from "./post.module.scss";

import Button from "../../../ui/control/button/Button.jsx";
import Menu from "../../../ui/control/menu/Menu.jsx";
import Picture from "../../../ui/media/picture/Picture.jsx";
import Video from "../../../ui/media/Video/Video.jsx";
import Slider from "../../../ui/media/slider/Slider.jsx";
import ShowMoreText from "../../../ui/media/showMoreText/ShowMoreText.jsx";
import Comment from "../comment/Comment.jsx";
import { Star, MessageCircle, MoreHorizontal } from "lucide-react";
import Avatar from "../../../ui/media/avatar/Avatar.jsx";

const Post = ({
  author = {
    name: "User Name",
    username: "username",
    pfp: "/images/amity.jpg",
    timestamp: "2 hours ago",
  },
  postBody = {
    text: null,
    image: null,
    video: null,
  },
  likes = 0,
  comments = 0,
  tags = [],
  commentsList = [],
  onLike = null,
  onComment = null,
  onShare = null,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [showAllComments, setShowAllComments] = useState(false);

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikeCount(newLikedState ? likeCount + 1 : likeCount - 1);
    if (onLike) onLike(newLikedState);
  };

  // Render media attachment (image or video, but not both)
  const renderMediaAttachment = () => {
    // Video takes precedence
    if (postBody.video) {
      return (
        <Video
          src={postBody.video.src || postBody.video}
          maxHeight={400}
          customStyles={{
            marginTop: "1rem",
          }}
        />
      );
    }

    // Images
    if (postBody.image && Array.isArray(postBody.image)) {
      // Multiple images - use slider
      if (postBody.image.length > 1) {
        return <Slider images={postBody.image} />;
      }
      // Single image - use Picture component
      if (postBody.image.length === 1) {
        const imageData = postBody.image[0];
        return (
          <Picture
            src={imageData.src || imageData}
            customStyles={{
              width: "100%",
              height: "auto",
              borderRadius: "0.3rem",
            }}
          />
        );
      }
    }

    return null;
  };

  return (
    <div className={styles.post_card}>
      {/* Header */}
      <div className={styles.post_header}>
        <div className={styles.header_left}>
          <Avatar
            editable={false}
            src={author.pfp}
            customStyles={{ width: "40px", height: "40px" }}
          />
          <div className={styles.author_info}>
            <h3 className={styles.author_name}>{author.name}</h3>
            <p className={styles.author_meta}>
              <span className={styles.username}>@{author.username}</span>
              <span className={styles.separator}>·</span>
              <span className={styles.timestamp}>{author.timestamp}</span>
            </p>
          </div>
        </div>

        <Menu
          icon={MoreHorizontal}
          wrapperStyle={{ width: "fit-content" }}
          buttonStyle={{
            backgroundColor: "transparent",
            width: "32px",
            height: "32px",
            display: "flex",
            justifyContent: "center",
            border: "none",
          }}
        >
          <div className={styles.menu_item}>Edit</div>
          <div className={styles.menu_item}>Delete</div>
          <div className={styles.menu_item}>Report</div>
        </Menu>
      </div>

      {/* Body */}
      <div className={styles.post_body}>
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className={styles.tags_container}>
            {tags.map((tag, idx) => (
              <span key={idx} className={styles.tag}>
                #{tag}
              </span>
            ))}
          </div>
        )}
        {postBody.text && (
          <ShowMoreText
            text={postBody.text}
            charLimit={300}
            onExpand={() => console.log("Text expanded")}
            onCollapse={() => console.log("Text collapsed")}
            customStyles={{ fontSize: "0.85rem" }}
          />
        )}

        {renderMediaAttachment()}
      </div>

      {/* Footer - Reactions */}
      <div className={styles.post_footer}>
        <div className={styles.reaction_group}>
          <Button
            icon={Star}
            title={likeCount > 0 ? likeCount : ""}
            onClick={handleLike}
            variant="transparent"
          />
        </div>

        <div className={styles.reaction_group}>
          <Button
            icon={MessageCircle}
            title={comments > 0 ? comments : ""}
            onClick={() => setShowAllComments(!showAllComments)}
            variant="transparent"
          />
        </div>
      </div>

      {/* Comments Section */}
      {showAllComments && (
        <div className={styles.comments_section}>
          <div className={styles.comments_container}>
            {commentsList
              ?.slice(0, showAllComments ? commentsList.length : 2)
              .map((comment, idx) => (
                <Comment key={idx} comment={comment} />
              ))}
          </div>
          {!showAllComments && commentsList?.length > 2 && (
            <button
              className={styles.show_more_comments_btn}
              onClick={() => setShowAllComments(true)}
            >
              Show {commentsList.length - 2} more comments
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
