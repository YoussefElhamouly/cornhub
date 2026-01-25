import React from "react";
import Picture from "../picture/Picture.jsx";
import styles from "./pfp.module.scss";
import Button from "../button/Button.jsx";
import { Camera } from "lucide-react";
const Pfp = ({ src, customStyles, editable = false }) => {
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
      {editable && <Button className={styles.pfp_edit_button} icon={Camera} />}
    </div>
  );
};

export default Pfp;
