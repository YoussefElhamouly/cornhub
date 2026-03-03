import React from "react";
import styles from "../commits.module.scss";
import Icon from "@/components/ui/media/icon/Icon";
import CommitCard from "../cards/commitCard/CommitCard";

interface Commit {
  id: string;
  message: string;
  author: {
    name: string;
    avatar: string;
    profilePath: string;
  };
  hash: string;
  isVerified: boolean;
  timeLabel: string;
  prNumber?: number;
}

interface CommitGroupProps {
  date: string;
  commits: Commit[];
}

const CommitGroup = ({ date, commits }: CommitGroupProps) => {
  return (
    <div className={styles.commit_group}>
      <div className={styles.group_header}>
        <Icon icon="GitCommit" size={24} className={styles.group_icon} />
        <span className={styles.group_title}>Commits on {date}</span>
      </div>
      <div className={styles.commits_list}>
        {commits.map((commit) => (
          <CommitCard key={commit.id} {...commit} />
        ))}
      </div>
    </div>
  );
};

export default CommitGroup;
