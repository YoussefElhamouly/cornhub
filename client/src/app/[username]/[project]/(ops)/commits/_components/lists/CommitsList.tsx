import React from "react";
import styles from "./commits.module.scss";
import CommitGroup from "./CommitGroup";

const MOCK_COMMITS = [
  {
    date: "Feb 22, 2026",
    commits: [
      {
        id: "1",
        message: "Merge pull request #116 from vxcontrol/feature/api_tokens",
        author: {
          name: "asdek",
          avatar: "/images/amity.jpg",
          profilePath: "/asdek",
        },
        hash: "f111863",
        isVerified: true,
        timeLabel: "3 hours ago",
        prNumber: 116,
      },
      {
        id: "2",
        message: "feat: implement API token management system",
        author: {
          name: "asdek",
          avatar: "/images/amity.jpg",
          profilePath: "/asdek",
        },
        hash: "6ac70c9",
        isVerified: true,
        timeLabel: "3 hours ago",
      },
    ],
  },
  {
    date: "Feb 21, 2026",
    commits: [
      {
        id: "3",
        message:
          "Merge pull request #111 from salmanmkc/upgrade-github-actions-node24",
        author: {
          name: "asdek",
          avatar: "/images/amity.jpg",
          profilePath: "/asdek",
        },
        hash: "6031676",
        isVerified: true,
        timeLabel: "13 hours ago",
        prNumber: 111,
      },
      {
        id: "4",
        message:
          "Merge pull request #112 from salmanmkc/upgrade-github-actions-node24-general",
        author: {
          name: "asdek",
          avatar: "/images/amity.jpg",
          profilePath: "/asdek",
        },
        hash: "cbecf01",
        isVerified: true,
        timeLabel: "13 hours ago",
        prNumber: 112,
      },
      {
        id: "5",
        message: "Upgrade GitHub Actions to latest versions",
        author: {
          name: "salmanmkc",
          avatar: "/images/logo.png",
          profilePath: "/salmanmkc",
        },
        hash: "acd189c",
        isVerified: true,
        timeLabel: "18 hours ago",
      },
    ],
  },
];

const CommitsList = async () => {
  // Simulate data fetching
  await new Promise((resolve) => setTimeout(resolve, 500));

  return (
    <div className={styles.commits_container}>
      {MOCK_COMMITS.map((group) => (
        <CommitGroup
          key={group.date}
          date={group.date}
          commits={group.commits}
        />
      ))}
    </div>
  );
};

export default CommitsList;
