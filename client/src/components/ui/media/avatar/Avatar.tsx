"use client";

import React, { useRef } from "react";
import Picture from "../picture/Picture";
import styles from "./avatar.module.scss";
import Button from "../../control/button/Button";

interface avatarProps {
  src: string;
  className?: string;
  customStyles?: React.CSSProperties;
  editable?: boolean;
}

const Avatar = ({
  src,
  className = "",
  customStyles = {},
  editable = false,
}: avatarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className={`${styles.pfp_wrapper} ${className}`}>
      <Picture
        src={src}
        customStyles={{
          height: "300px",
          width: "300px",
          borderRadius: "50%",
          ...customStyles,
        }}
      />
      {editable && (
        <>
          <Button
            className={styles.pfp_edit_button}
            icon={"Camera"}
            onClick={() => inputRef.current?.click()} // programmatically trigger
          ></Button>
          <input
            ref={inputRef}
            id="pfp_input"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
          />
        </>
      )}
    </div>
  );
};

export default Avatar;
