import React from "react";
import styles from "./pulls.module.scss";
import PullRequestCard from "@/components/ui/cards/pullRequestCard/PullRequestCard";

const MOCK_PRS = [
  {
    title: "feat: implement API token management system",
    prNumber: 116,
    state: "open" as const,
    author: {
      name: "asdek",
      avatar: "/images/amity.jpg",
      profilePath: "/asdek",
    },
    timeLabel: "3 hours ago",
    labels: [{ name: "feature", color: "#a371f7" }],
    commentCount: 2,
    reviewStatus: "approved" as const,
  },
  {
    title: "fix: resolve specificity issues in global layouts",
    prNumber: 115,
    state: "open" as const,
    author: {
      name: "jdoe",
      avatar: "/images/logo.png",
      profilePath: "/jdoe",
    },
    timeLabel: "5 hours ago",
    labels: [{ name: "bug", color: "#f85149" }],
  },
  {
    title: "docs: update contribution guidelines",
    prNumber: 114,
    state: "open" as const,
    author: {
      name: "alice",
      avatar: "/images/amity.jpg",
      profilePath: "/alice",
    },
    timeLabel: "Yesterday",
    commentCount: 5,
  },
  {
    title: "refactor: simplify state management in repository overview",
    prNumber: 113,
    state: "open" as const,
    author: {
      name: "asdek",
      avatar: "/images/amity.jpg",
      profilePath: "/asdek",
    },
    timeLabel: "2 days ago",
  },
];

const PullRequestList = async () => {
  // Simulate data fetching
  await new Promise((resolve) => setTimeout(resolve, 500));

  return (
    <div className={styles.pr_list_container}>
      {MOCK_PRS.map((pr) => (
        <PullRequestCard key={pr.prNumber} {...pr} />
      ))}
    </div>
  );
};

export default PullRequestList;
