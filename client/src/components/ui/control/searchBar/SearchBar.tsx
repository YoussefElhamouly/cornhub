"use client";

import React from "react";
import styles from "./searchBar.module.scss";
import { useState } from "react";

import Icon from "../../media/icon/Icon";
import { useQuerySync } from "@/components/hooks/useQuerySync";

interface searchBarProps {
  placeHolder: string;
  customStyles?: React.CSSProperties;
  id?: string;
  query?: string | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const SearchBar = ({
  placeHolder,
  customStyles = {},
  id,
  query,
  onChange,
}: searchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const { updateQuery } = useQuerySync(query);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
    updateQuery(e.target.value);
  };
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
        onChange={handleChange}
      />
    </label>
  );
};

export default SearchBar;
