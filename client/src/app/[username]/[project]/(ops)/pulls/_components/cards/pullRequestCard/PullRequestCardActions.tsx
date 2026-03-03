"use client";

import React from "react";
import Button from "../../../../../../../../components/ui/control/button/Button";
import styles from "./pullRequestCard.module.scss";

interface PullRequestCardActionsProps {
  prNumber: number;
}

const PullRequestCardActions = ({ prNumber }: PullRequestCardActionsProps) => {
  return (
    <div className={styles.pr_actions}>
      <Button
        variant="transparent"
        icon="MessageSquare"
        className={styles.action_btn}
        onClick={() => {}}
        title=""
      />
      <Button
        variant="transparent"
        icon="MoreHorizontal"
        className={styles.action_btn}
        onClick={() => {}}
        title=""
      />
    </div>
  );
};

export default PullRequestCardActions;
