import React from "react";
import styles from "../issues.module.scss";
import IssueCard from "../cards/IssueCard";

const MOCK_ISSUES = [
  {
    title: "Performance degradation on large diffs",
    issueNumber: 42,
    state: "open" as const,
    author: {
      name: "developer1",
      profilePath: "/developer1",
    },
    timeLabel: "2 days ago",
    labels: [{ name: "bug", color: "#f85149" }],
    commentCount: 3,
  },
  {
    title: "Support for custom themes",
    issueNumber: 41,
    state: "open" as const,
    author: {
      name: "user_a",
      profilePath: "/user_a",
    },
    timeLabel: "5 days ago",
    labels: [{ name: "enhancement", color: "#a371f7" }],
  },
  {
    title: "Fix broken links in documentation",
    issueNumber: 40,
    state: "open" as const,
    author: {
      name: "contributor",
      profilePath: "/contributor",
    },
    timeLabel: "last week",
    commentCount: 1,
  },
];

const IssueList = async () => {
  // Simulate data fetching
  await new Promise((resolve) => setTimeout(resolve, 500));

  return (
    <div className={styles.issue_list_container}>
      {MOCK_ISSUES.map((issue) => (
        <IssueCard key={issue.issueNumber} {...issue} />
      ))}
    </div>
  );
};

export default IssueList;
