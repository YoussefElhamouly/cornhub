import React, { useState } from "react";
import styles from "./createPost.module.scss";
import Button from "../../../ui/button/Button.jsx";
import InputField from "../../../ui/inputField/InputField.jsx";
import Pfp from "../../../ui/avatar/Avatar.jsx";
import Modal from "../../../ui/modal/Modal.jsx";
import Post from "./Post.jsx";
import { Image, Video, X } from "lucide-react";

const CreatePost = ({ author, onPostCreate = null }) => {
  const [postText, setPostText] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);

  const handleTextChange = (e) => {
    setPostText(e.target.value);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const handleVideoUrlChange = (e) => {
    setVideoUrl(e.target.value);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreviewUrls((prev) => [...prev, event.target.result]);
      };
      reader.readAsDataURL(file);
    });
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const parseTags = () => {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
  };

  const previewData = {
    author: author || {
      name: "Your Name",
      username: "yourname",
      pfp: "/images/amity.jpg",
      timestamp: "now",
    },
    postBody: {
      text: postText || null,
      image:
        imagePreviewUrls.length > 0
          ? imagePreviewUrls.map((url) => ({ src: url }))
          : null,
      video: videoUrl ? { src: videoUrl } : null,
    },
    likes: 0,
    comments: 0,
    tags: parseTags(),
    commentsList: [],
  };

  const handlePublish = () => {
    if (!postText.trim() && images.length === 0 && !videoUrl.trim()) {
      alert("Please add some content to your post");
      return;
    }

    const postData = {
      text: postText,
      images: images,
      video: videoUrl,
      tags: parseTags(),
    };

    if (onPostCreate) {
      onPostCreate(postData);
    }

    // Reset form
    setPostText("");
    setTags("");
    setImages([]);
    setVideoUrl("");
    setImagePreviewUrls([]);
    setShowPreview(false);
  };

  const handleCancel = () => {
    setShowPreview(false);
  };

  return (
    <div className={styles.create_post_container}>
      {/* Form Section */}
      <div className={styles.create_post_card}>
        {/* Header with PFP */}
        <div className={styles.create_header}>
          <Pfp
            editable={false}
            src={author?.pfp || "/images/amity.jpg"}
            customStyles={{ width: "40px", height: "40px" }}
          />
          <span className={styles.create_prompt}>What's on your mind?</span>
        </div>

        {/* Text Area */}
        <textarea
          className={styles.text_area}
          placeholder="Share your thoughts, updates, or ask a question..."
          value={postText}
          onChange={handleTextChange}
        />

        {/* Image Preview */}
        {imagePreviewUrls.length > 0 && (
          <div className={styles.image_preview_container}>
            {imagePreviewUrls.map((url, idx) => (
              <div key={idx} className={styles.image_preview_item}>
                <img src={url} alt={`preview-${idx}`} />
                <button
                  className={styles.remove_image_btn}
                  onClick={() => removeImage(idx)}
                  type="button"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Video URL Input */}
        <InputField
          id="video-url"
          placeHolder="https://example.com/video.mp4"
          value={videoUrl}
          onChange={handleVideoUrlChange}
          customStyles={{ marginTop: "1rem" }}
        />

        {/* Tags Input */}
        <InputField
          id="tags"
          placeHolder="Enter tags separated by commas (e.g: react, webdev, tips)"
          value={tags}
          onChange={handleTagsChange}
          customStyles={{ marginTop: "1rem" }}
        />

        {/* File Upload and Actions */}
        <div className={styles.create_footer}>
          <div className={styles.upload_buttons}>
            <label className={styles.upload_label}>
              <Image size={18} />
              Image
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </label>
            <label className={styles.upload_label}>
              <Video size={18} />
              Video
              <input
                type="file"
                accept="video/*"
                onChange={(e) => {
                  // This is for local video files
                  // In a real scenario, you'd upload and get a URL
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setVideoUrl(event.target.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                style={{ display: "none" }}
              />
            </label>
          </div>

          <div className={styles.action_buttons}>
            <Button
              title="Preview"
              variant="transparent"
              onClick={() => setShowPreview(true)}
              customStyles={{
                padding: "0.5rem 1.2rem",
                fontSize: "0.9rem",
              }}
            />
            <Button
              title="Post"
              variant="primary"
              onClick={handlePublish}
              customStyles={{
                padding: "0.5rem 1.2rem",
                fontSize: "0.9rem",
              }}
            />
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <Modal onClose={handleCancel}>
          <div className={styles.preview_modal_content}>
            <div className={styles.preview_header}>
              <h2>Preview</h2>
              <button className={styles.close_btn} onClick={handleCancel}>
                <X size={20} />
              </button>
            </div>

            <div className={styles.preview_post}>
              <Post {...previewData} />
            </div>

            <div className={styles.preview_actions}>
              <Button
                title="Cancel"
                variant="transparent"
                onClick={handleCancel}
                customStyles={{
                  padding: "0.6rem 1.4rem",
                  fontSize: "0.95rem",
                }}
              />
              <Button
                title="Post"
                variant="primary"
                onClick={handlePublish}
                customStyles={{
                  padding: "0.6rem 1.4rem",
                  fontSize: "0.95rem",
                }}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CreatePost;
