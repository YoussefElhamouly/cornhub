"use client";

import React from "react";
import styles from "./filter.module.scss";
import { useQuerySync } from "@/hooks/useQuerySync";

interface filterProps {
  options: {
    value?: string;
    displayName?: string;
    default?: boolean;
  }[];
  id?: string;
  query?: string | null;
  customStyles?: React.CSSProperties;
  onCheck?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Filter = ({
  options = [],
  id = "filter",
  query = null,
  customStyles = {},
  onCheck = () => {},
}: filterProps) => {
  const { updateQuery } = useQuerySync(query);
  return (
    <div className={styles.filterBar} style={customStyles}>
      {options.map((option, i) => {
        return (
          <label className={styles.filter_label} key={i}>
            <span>{option.displayName}</span>
            <input
              defaultChecked={option.default}
              onChange={(e) => {
                onCheck(e);
                updateQuery(e.target.value);
              }}
              className={styles.filter_radio}
              type="radio"
              name={`${id}_filter`}
              id={`${id}_${option.value}`}
              value={option.value}
            />
          </label>
        );
      })}
    </div>
  );
};

export default Filter;
