"use client";

import React, { useState } from "react";
import styles from "./inputField.module.scss";
import { useQuerySync } from "../../../hooks/useQuerySync";

interface InputFieldProps {
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  query?: string | null;
  customStyles?: React.CSSProperties;
  label?: string;
  sublabel?: string;
  placeHolder?: string;
  defaultValue?: string;
}

const InputField = ({
  id,
  value,
  onChange,
  query = null,
  customStyles = {},
  label,
  sublabel,
  placeHolder,
  defaultValue,
}: InputFieldProps) => {
  const { updateQuery } = useQuerySync(query);
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
          if (onChange) onChange(e);
          updateQuery(e.target.value);
        }}
      />
      {/* <textarea id=""></textarea> */}
    </div>
  );
};

export default InputField;
