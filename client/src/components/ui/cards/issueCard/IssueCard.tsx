import React from "react";
import styles from "./issueCard.module.scss";
import Icon from "../../media/icon/Icon";
import Link from "next/link";

interface IssueCardProps {
  title: string;
  issueNumber: number;
  state: "open" | "closed";
  author: {
    name: string;
    profilePath: string;
  };
  timeLabel: string;
  labels?: { name: string; color: string }[];
  commentCount?: number;
  className?: string;
}

const IssueCard = ({
  title,
  issueNumber,
  state,
  author,
  timeLabel,
  labels = [],
  commentCount = 0,
  className = "",
}: IssueCardProps) => {
  return (
    <div className={`${styles.issue_card} ${className}`}>
      <div className={styles.issue_main}>
        <div className={`${styles.state_icon} ${styles[state]}`}>
          <Icon
            icon={state === "open" ? "CircleDot" : "CheckCircle"}
            size={16}
          />
        </div>
        <div className={styles.issue_info}>
          <div className={styles.issue_title_row}>
            <Link href="#" className={styles.issue_title}>
              {title}
            </Link>
            {labels.map((label) => (
              <span
                key={label.name}
                className={styles.label_badge}
                style={{
                  backgroundColor: `${label.color}20`,
                  color: label.color,
                  borderColor: label.color,
                }}
              >
                {label.name}
              </span>
            ))}
          </div>
          <div className={styles.issue_meta}>
            <span>
              #{issueNumber} opened {timeLabel} by{" "}
            </span>
            <Link href={author.profilePath} className={styles.author_name}>
              {author.name}
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.issue_indicators}>
        {commentCount > 0 && (
          <div className={styles.indicator_item}>
            <Icon icon="MessageSquare" size={14} />
            <span>{commentCount}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueCard;
