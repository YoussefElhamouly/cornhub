import React from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.scss";

const Modal = ({ children, customStyles, onClose, title, imageSrc }) => {
  if (imageSrc) {
    return createPortal(
      <div className={styles.image_viewer}>
        <img
          src={imageSrc}
          alt="Fullscreen view"
          className={styles.fullscreen_image}
        />
        <button onClick={onClose} className={styles.close_button_image}>
          <svg
            clipRule="evenodd"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
          </svg>
        </button>
      </div>,
      document.body
    );
  }

  return createPortal(
    <div className={styles.modal_outer_window}>
      <div className={styles.modal_window} style={customStyles || {}}>
        <header>
          <h1>{title}</h1>
          <button onClick={onClose} className={styles.close_icon}>
            <svg
              clipRule="evenodd"
              fillRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
            </svg>
          </button>
        </header>
        <div className={styles.modal_window_content_container}>{children}</div>

        <footer></footer>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
