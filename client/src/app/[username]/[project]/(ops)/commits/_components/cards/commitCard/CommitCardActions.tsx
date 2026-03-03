"use client";

import React from "react";
import Button from "@/components/ui/control/button/Button";
import styles from "./commitCard.module.scss";

interface CommitCardActionsProps {
  hash: string;
}

const CommitCardActions = ({ hash }: CommitCardActionsProps) => {
  const handleCopyHash = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(hash);
    // TODO: Add toast notification
  };

  return (
    <div className={styles.commit_actions}>
      <a href={`#${hash}`} className={styles.commit_hash}>
        {hash.substring(0, 7)}
      </a>
      <Button
        variant="transparent"
        icon="Copy"
        className={styles.action_btn}
        onClick={handleCopyHash}
        title=""
      />
      <Button
        variant="transparent"
        icon="Code"
        className={styles.action_btn}
        onClick={() => {}}
        title=""
      />
    </div>
  );
};

export default CommitCardActions;
