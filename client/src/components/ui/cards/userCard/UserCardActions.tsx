"use client";

import React from "react";
import Button from "../../control/button/Button";
import styles from "./userCard.module.scss";

interface UserCardActionsProps {
  onFollowClick?: () => void;
}

const UserCardActions = ({ onFollowClick }: UserCardActionsProps) => {
  return (
    <Button
      title="Follow"
      onClick={onFollowClick}
      className={styles.follow_btn}
    />
  );
};

export default UserCardActions;
