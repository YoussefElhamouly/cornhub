"use client";
import React, { useState, useId } from "react";
import styles from "./authInput.module.scss";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export default function AuthInput({
  label,
  error,
  icon,
  id,
  className = "",
  ...props
}: AuthInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [focused, setFocused] = useState(false);
  const hasValue = Boolean(props.value || props.defaultValue);
  const lifted = focused || hasValue;

  return (
    <div
      className={`${styles.field_wrap} ${error ? styles.has_error : ""} ${className}`}
    >
      <div className={`${styles.input_row} ${focused ? styles.focused : ""}`}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <div className={styles.float_group}>
          <input
            id={inputId}
            className={styles.input}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder=" "
            {...props}
          />
          <label
            htmlFor={inputId}
            className={`${styles.label} ${lifted ? styles.lifted : ""} ${focused ? styles.cursor_blink : ""}`}
          >
            {label}
          </label>
        </div>
      </div>
      {error && (
        <p className={styles.error_msg} role="alert">
          ⚠ {error}
        </p>
      )}
    </div>
  );
}
