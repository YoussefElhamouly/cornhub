import React from "react";
import styles from "./filter.module.scss";

const Filter = ({
  options = [],
  id = "filter",
  customStyles = {},
  onCheck = () => {},
}) => {
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
              }}
              className={styles.filter_radio}
              type="radio"
              name={`${id}_filter`}
              id={`${id}_${option.key}`}
              value={option.value}
            />
          </label>
        );
      })}
    </div>
  );
};

export default Filter;
