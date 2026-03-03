import React from "react";
import Link from "next/link";
import styles from "./pullRequestCard.module.scss";
import Icon from "../../../../../../../../components/ui/media/icon/Icon";
import Avatar from "../../../../../../../../components/ui/media/avatar/Avatar";
import PullRequestCardActions from "./PullRequestCardActions";

interface PullRequestCardProps {
  title: string;
  prNumber: number;
  state: "open" | "closed" | "merged";
  author: {
    name: string;
    avatar: string;
    profilePath: string;
  };
  timeLabel: string;
  labels?: { name: string; color: string }[];
  commentCount?: number;
  reviewStatus?: "approved" | "changes_requested" | "pending";
  className?: string;
}

const PullRequestCard = ({
  title,
  prNumber,
  state,
  author,
  timeLabel,
  labels = [],
  commentCount = 0,
  reviewStatus,
  className = "",
}: PullRequestCardProps) => {
  const stateIconMap = {
    open: "CircleDot",
    closed: "CircleSlash",
    merged: "GitMerge",
  };

  return (
    <div className={`${styles.pr_card} ${className}`}>
      <div className={styles.pr_main}>
        <Icon
          icon={stateIconMap[state]}
          size={16}
          className={`${styles.state_icon} ${styles[state]}`}
        />
        <div className={styles.pr_info}>
          <div className={styles.pr_title_row}>
            <Link href={`pulls/${prNumber}`} className={styles.pr_title}>
              {title}
            </Link>
            {labels.map((label) => (
              <span
                key={label.name}
                className={styles.label_badge}
                style={{
                  backgroundColor: `${label.color}1a`,
                  borderColor: label.color,
                  color: label.color,
                }}
              >
                {label.name}
              </span>
            ))}
          </div>
          <div className={styles.pr_meta}>
            <span>
              #{prNumber} opened {timeLabel} by
            </span>
            <Link href={author.profilePath} className={styles.author_name}>
              {author.name}
            </Link>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className={styles.pr_indicators}>
          {reviewStatus === "approved" && (
            <div className={styles.indicator_item} title="Approved">
              <Icon icon="Check" size={14} style={{ color: "#3fb950" }} />
            </div>
          )}
          {commentCount > 0 && (
            <div className={styles.indicator_item}>
              <Icon icon="MessageSquare" size={14} />
              <span>{commentCount}</span>
            </div>
          )}
        </div>
        <PullRequestCardActions prNumber={prNumber} />
      </div>
    </div>
  );
};

export default PullRequestCard;
