import React, { useState } from "react";
import styles from "./activityList.module.scss";
import { ChevronDown, ChevronUp, GitBranch, Star, Code2 } from "lucide-react";

const ActivityList = ({ activities = [], selectedDate = null }) => {
  const [expandedSections, setExpandedSections] = useState({});

  // Group activities by type
  const groupByType = (activityList) => {
    const grouped = {};
    activityList.forEach((activity) => {
      if (!grouped[activity.type]) {
        grouped[activity.type] = [];
      }
      grouped[activity.type].push(activity);
    });
    return grouped;
  };

  // Filter activities by selected date if provided
  const filteredActivities = selectedDate
    ? activities.filter((activity) => activity.date === selectedDate)
    : activities;

  const groupedActivities = groupByType(filteredActivities);

  const toggleSection = (type) => {
    setExpandedSections((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "repository":
        return <GitBranch size={18} />;
      case "star":
        return <Star size={18} />;
      case "code":
        return <Code2 size={18} />;
      default:
        return <Code2 size={18} />;
    }
  };

  const getActivityLabel = (type, count) => {
    const labels = {
      repository: `Created ${count} ${count === 1 ? "repository" : "repositories"}`,
      star: `Starred ${count} ${count === 1 ? "repository" : "repositories"}`,
      code: `Made ${count} ${count === 1 ? "commit" : "commits"}`,
    };
    return labels[type] || type;
  };

  if (filteredActivities.length === 0) {
    return (
      <div className={styles.empty_state}>
        <p>No activities for {selectedDate || "this date"}</p>
      </div>
    );
  }

  return (
    <div className={styles.activity_list}>
      {Object.entries(groupedActivities).map(([type, items]) => (
        <div key={type} className={styles.activity_section}>
          <button
            className={styles.section_header}
            onClick={() => toggleSection(type)}
          >
            <div className={styles.header_left}>
              <div className={styles.icon}>{getActivityIcon(type)}</div>
              <span className={styles.section_title}>
                {getActivityLabel(type, items.length)}
              </span>
            </div>
            <div className={styles.toggle_icon}>
              {expandedSections[type] ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </div>
          </button>

          {expandedSections[type] && (
            <div className={styles.section_content}>
              {items.map((activity, idx) => (
                <div key={idx} className={styles.activity_item}>
                  <a
                    href={activity.link || "#"}
                    className={styles.activity_link}
                    onClick={(e) => {
                      if (!activity.link) e.preventDefault();
                    }}
                  >
                    <span className={styles.activity_name}>
                      {activity.name}
                    </span>
                    {activity.language && (
                      <span className={styles.activity_language}>
                        <span className={styles.language_dot}></span>
                        {activity.language}
                      </span>
                    )}
                  </a>
                  <span className={styles.activity_date}>
                    {new Date(activity.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ActivityList;
