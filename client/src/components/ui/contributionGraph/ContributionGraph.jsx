import React, { useMemo } from "react";
import styles from "./contributionGraph.module.scss";

const ContributionGraph = ({
  data = {},
  startDate,
  endDate,
  showLegend = true,
  showLearnMore = true,
  onDayClick,
  colorLevels = 4,
  baseColor = "#4a2c0a", // Dark orange
  highlightColor = "#eba537", // Orange accent
}) => {
  // Generate dates for a full year from Jan 1 to Dec 31
  const dates = useMemo(() => {
    let start, end;

    if (startDate && endDate) {
      // Use custom dates if provided
      start = new Date(startDate);
      end = new Date(endDate);
    } else {
      // Default to current year: Jan 1 to Dec 31
      const currentYear = new Date().getFullYear();
      start = new Date(currentYear, 0, 1); // January 1st
      end = new Date(currentYear, 11, 31); // December 31st
    }

    const dateArray = [];
    const current = new Date(start);

    while (current <= end) {
      dateArray.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return dateArray;
  }, [startDate, endDate]);

  // Get contribution level for a date
  const getContributionLevel = (date) => {
    const dateKey = date.toISOString().split("T")[0];
    const value = data[dateKey] || 0;

    if (value === 0) return 0;

    // Calculate level based on max value in data
    const maxValue = Math.max(...Object.values(data), 1);
    const level = Math.ceil((value / maxValue) * colorLevels);

    return Math.min(level, colorLevels);
  };

  // Generate color for contribution level
  const getColor = (level) => {
    if (level === 0) return "#161b22";

    const intensity = level / colorLevels;
    // Interpolate between baseColor and highlightColor
    const r1 = parseInt(baseColor.slice(1, 3), 16);
    const g1 = parseInt(baseColor.slice(3, 5), 16);
    const b1 = parseInt(baseColor.slice(5, 7), 16);

    const r2 = parseInt(highlightColor.slice(1, 3), 16);
    const g2 = parseInt(highlightColor.slice(3, 5), 16);
    const b2 = parseInt(highlightColor.slice(5, 7), 16);

    const r = Math.round(r1 + (r2 - r1) * intensity);
    const g = Math.round(g1 + (g2 - g1) * intensity);
    const b = Math.round(b1 + (b2 - b1) * intensity);

    return `rgb(${r}, ${g}, ${b})`;
  };

  // Group dates by week (Monday = 0, Sunday = 6)
  const weeks = useMemo(() => {
    if (dates.length === 0) return [];

    const weekGroups = [];
    const firstDate = dates[0];
    // Convert Sunday=0 to Monday=0: Sunday becomes 6, Monday becomes 0, etc.
    let firstDayOfWeek = firstDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1; // Convert to Monday-based (0-6)

    // Pad the first week if it doesn't start on Monday
    let currentWeek = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null);
    }

    // Add all dates, grouping by week (Monday to Sunday)
    dates.forEach((date) => {
      currentWeek.push(date);
      if (currentWeek.length === 7) {
        weekGroups.push(currentWeek);
        currentWeek = [];
      }
    });

    // Pad the last week if needed
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weekGroups.push(currentWeek);
    }

    return weekGroups;
  }, [dates]);

  // Get month labels
  const monthLabels = useMemo(() => {
    const months = [];
    let lastMonth = -1;
    let lastWeekIndex = -1;

    weeks.forEach((week, weekIndex) => {
      const firstDate = week.find((d) => d !== null);
      if (firstDate) {
        const month = firstDate.getMonth();
        if (month !== lastMonth) {
          months.push({
            month,
            weekIndex,
            label: firstDate.toLocaleDateString("en-US", { month: "short" }),
          });
          lastMonth = month;
          lastWeekIndex = weekIndex;
        }
      }
    });

    return months;
  }, [weeks]);

  return (
    <div className={styles.contribution_graph}>
      <div className={styles.graph_container}>
        {/* Month labels */}
        <div className={styles.month_labels_container}>
          <div className={styles.month_labels_spacer}></div>
          <div
            className={styles.month_labels}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${weeks.length}, var(--square-size))`,
              gap: "var(--square-gap)",
            }}
          >
            {monthLabels.map((month, idx) => (
              <div
                key={idx}
                className={styles.month_label}
                style={{ gridColumn: month.weekIndex + 1 }}
              >
                {month.label}
              </div>
            ))}
          </div>
        </div>

        {/* Day labels and grid */}
        <div className={styles.graph_content}>
          <div className={styles.day_labels}>
            <div className={styles.day_label} style={{ gridRow: 1 }}>
              Mon
            </div>
            <div
              className={styles.day_label_spacer}
              style={{ gridRow: 2 }}
            ></div>
            <div className={styles.day_label} style={{ gridRow: 3 }}>
              Wed
            </div>
            <div
              className={styles.day_label_spacer}
              style={{ gridRow: 4 }}
            ></div>
            <div className={styles.day_label} style={{ gridRow: 5 }}>
              Fri
            </div>
            <div
              className={styles.day_label_spacer}
              style={{ gridRow: 6 }}
            ></div>
            <div
              className={styles.day_label_spacer}
              style={{ gridRow: 7 }}
            ></div>
          </div>

          <div className={styles.contribution_grid}>
            {weeks.map((week, weekIndex) => {
              return (
                <div
                  key={weekIndex}
                  className={styles.contribution_grid_column}
                >
                  {week.map((date, dayIndex) => {
                    if (!date) {
                      return (
                        <div
                          key={`${weekIndex}-${dayIndex}`}
                          className={styles.contribution_square_empty}
                        />
                      );
                    }

                    const level = getContributionLevel(date);
                    const color = getColor(level);
                    const dateKey = date.toISOString().split("T")[0];
                    const value = data[dateKey] || 0;
                    const totalDays = 365;
                    const dayOfYear = Math.floor(
                      (date - new Date(date.getFullYear(), 0, 0)) / 86400000,
                    );

                    const position =
                      50 +
                      50 *
                        Math.cos((Math.PI * (dayOfYear - 1)) / (totalDays - 1));
                    return (
                      <div
                        key={`${weekIndex}-${dayIndex}`}
                        className={styles.contribution_square}
                        style={{ backgroundColor: color }}
                        onClick={() => onDayClick && onDayClick(date, value)}
                        // title={`${date.toLocaleDateString()}: ${value} contributions`}
                      >
                        <div
                          className={styles.contribution_square_info}
                          style={{
                            left: "50%",
                            transform: `translateX(calc(-50% + ${20 * Math.cos((Math.PI * (dayOfYear - 1)) / (totalDays - 1))}px))`,
                          }}
                        >
                          <h4>{date.toLocaleDateString()}</h4>
                          {/* <h5>{value} contributions</h5> */}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.graph_footer}>
        {showLearnMore && (
          <div className={styles.learn_more}>
            <button
              className={styles.learn_more_link}
              onClick={() => {
                // Handle learn more click
              }}
            >
              Learn how we count contributions
            </button>
          </div>
        )}

        {showLegend && (
          <div className={styles.legend}>
            <span className={styles.legend_label}>Less</span>
            <div className={styles.legend_squares}>
              {[0, 1, 2, 3, colorLevels].map((level) => (
                <div
                  key={level}
                  className={styles.legend_square}
                  style={{ backgroundColor: getColor(level) }}
                />
              ))}
            </div>
            <span className={styles.legend_label}>More</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContributionGraph;
