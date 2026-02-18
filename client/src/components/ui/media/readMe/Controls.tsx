"use client";
import React from "react";
import Button from "../../control/button/Button";
import styles from "./readMe.module.scss";
const Controls = () => {
  return (
    <div className={styles.header_right}>
      <Button
        icon={"Edit2"}
        customStyles={{
          backgroundColor: "transparent",
          width: "32px",
          height: "32px",
        }}
      />
      <Button
        icon={"List"}
        customStyles={{
          backgroundColor: "transparent",
          width: "32px",
          height: "32px",
        }}
      />
    </div>
  );
};

export default Controls;
