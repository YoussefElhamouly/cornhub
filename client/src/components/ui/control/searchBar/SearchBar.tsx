"use client";

import React from "react";
import styles from "./searchBar.module.scss";
import { useState } from "react";

import Icon from "../../media/icon/Icon";

interface searchBarProps {
  placeHolder: string;
  customStyles?: React.CSSProperties;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const SearchBar = ({
  placeHolder,
  customStyles = {},
  id,
  onChange,
}: searchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <label
      className={
        !isFocused
          ? styles.searchBar_container
          : `${styles.searchBar_container} ${styles.searchBar_container_focused}`
      }
      style={customStyles}
    >
      <Icon icon={"Search"} />

      <input
        id={id}
        type="text"
        placeholder={placeHolder}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        onChange={onChange}
      />
    </label>
  );
};

export default SearchBar;
