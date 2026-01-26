import React from "react";
import styles from "./table.module.scss";

const Table = ({ columns = [], data = [], className = "" }) => {
  if (!columns.length || !data.length) {
    return null;
  }

  return (
    <div className={`${styles.table_wrapper} ${className}`}>
      <table className={styles.table}>
        {/* <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={styles.table_header}>
                {column.header || column.label || ""}
              </th>
            ))}
          </tr>
        </thead> */}
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={styles.table_row}>
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={styles.table_cell}
                  style={colIndex != 0 ? { opacity: "0.5" } : {}}
                >
                  {column.render
                    ? column.render(row[column.key], row, rowIndex)
                    : row[column.key] || ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
