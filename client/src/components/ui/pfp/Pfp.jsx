import React, { useRef } from "react";
import Picture from "../picture/Picture.jsx";
import styles from "./pfp.module.scss";
import Button from "../button/Button.jsx";
import { Camera } from "lucide-react";

const Pfp = ({ src, customStyles, editable = false }) => {
  const inputRef = useRef(null);
  return (
    <div className={styles.pfp_wrapper}>
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
            icon={Camera}
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

export default Pfp;
