import React from "react";
import styles from "./table.module.scss";

interface Column<T = any> {
  displayName?: string;
  key?: string;
  render?: (value: any, row: T, rowIndex: number) => React.ReactNode;
}

interface TableProps<T = any> {
  columns?: Column<T>[];
  data?: T[];
  className?: string;
}

const Table = <T extends Record<string, any>>({
  columns = [],
  data = [],
  className = "",
}: TableProps<T>) => {
  if (!columns.length || !data.length) {
    return null;
  }

  return (
    <div className={`${styles.table_wrapper} ${className}`}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={styles.table_header}>
                {column.displayName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={styles.table_row}>
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={styles.table_cell}
                  style={colIndex !== 0 ? { opacity: "0.5" } : {}}
                >
                  {column.render
                    ? column.render(
                        column.key ? row[column.key] : undefined,
                        row,
                        rowIndex,
                      )
                    : (column.key ? row[column.key] : "") || ""}
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
