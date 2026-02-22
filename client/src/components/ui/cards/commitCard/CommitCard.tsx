import React from "react";
import Link from "next/link";
import styles from "./commitCard.module.scss";
import Avatar from "../../media/avatar/Avatar";
import Button from "../../control/button/Button";
import CommitCardActions from "./CommitCardActions";

interface CommitCardProps {
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

const CommitCard = ({
  message,
  author,
  hash,
  isVerified,
  timeLabel,
  prNumber,
}: CommitCardProps) => {
  return (
    <div className={styles.commit_card}>
      <div className={styles.commit_main}>
        <div className={styles.commit_message_row}>
          <Link href={`/commit/${hash}`} className={styles.commit_message}>
            {message}
            {prNumber && (
              <span
                style={{ color: "var(--text-accent-blue)", marginLeft: "4px" }}
              >
                (#{prNumber})
              </span>
            )}
          </Link>
          <Button
            variant="transparent"
            icon="MoreHorizontal"
            className={styles.expand_btn}
            title=""
          />
        </div>
        <div className={styles.commit_meta}>
          <Avatar
            src={author.avatar}
            customStyles={{ width: "20px", height: "20px" }}
          />
          <Link href={author.profilePath} className={styles.author_name}>
            {author.name}
          </Link>
          <span>{timeLabel}</span>
          {isVerified && (
            <span className={styles.verified_badge}>Verified</span>
          )}
        </div>
      </div>
      <CommitCardActions hash={hash} />
    </div>
  );
};

export default CommitCard;
