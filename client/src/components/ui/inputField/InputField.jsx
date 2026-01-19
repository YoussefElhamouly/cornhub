import React, { useState } from "react";
import styles from "./inputField.module.scss";
const InputField = ({
  id,
  value,
  onChange,
  customStyles,
  label,
  sublabel,
  placeHolder,
  defaultValue,
}) => {
  return (
    <div className={styles.input_field}>
      <label htmlFor={id}>
        {label}{" "}
        {!!sublabel && <span className={styles.sub_label}>{sublabel}</span>}
      </label>
      <input
        defaultValue={defaultValue}
        value={value}
        placeholder={placeHolder}
        id={id}
        type="text"
        onChange={(e) => {
          onChange(e);
        }}
      />
      {/* <textarea id=""></textarea> */}
    </div>
  );
};

export default InputField;
