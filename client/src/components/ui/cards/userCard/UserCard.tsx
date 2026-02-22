import React from "react";
import Link from "next/link";
import styles from "./userCard.module.scss";
import Avatar from "../../media/avatar/Avatar";
import Icon from "../../media/icon/Icon";
import UserCardActions from "./UserCardActions";

interface UserCardProps {
  username: string;
  avatarSrc: string;
  bio: string;
  profilePath: string;
  onFollowClick?: () => void;
  className?: string;
}

const UserCard = ({
  username,
  avatarSrc,
  bio,
  profilePath,
  onFollowClick,
  className = "",
}: UserCardProps) => {
  return (
    <div className={`${styles.user_card} ${className}`}>
      <div className={styles.user_info}>
        <Avatar
          src={avatarSrc}
          customStyles={{ width: "48px", height: "48px" }}
        />
        <div className={styles.user_details}>
          <Link href={profilePath} className={styles.username_link}>
            {username}
          </Link>
          <div className={styles.joined_date}>
            <Icon icon="Clock" size={14} className={styles.clock_icon} />
            <span>Joined on {bio}</span>
          </div>
        </div>
      </div>
      <UserCardActions onFollowClick={onFollowClick} />
    </div>
  );
};

export default UserCard;
