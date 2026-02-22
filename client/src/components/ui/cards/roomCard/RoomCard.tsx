import React from "react";
import styles from "./roomCard.module.scss";
import Icon from "../../media/icon/Icon";
import Link from "next/link";

interface Participant {
  name: string;
  avatar: string;
}

interface RoomCardProps {
  fileName: string;
  status: "active" | "closed";
  startTime: string;
  endTime?: string;
  participants: Participant[];
  roomPath: string;
}

const RoomCard = ({
  fileName,
  status,
  startTime,
  endTime,
  participants,
  roomPath,
}: RoomCardProps) => {
  return (
    <div className={styles.room_card}>
      <div className={styles.room_main}>
        <div className={`${styles.type_icon} ${styles[status]}`}>
          <Icon icon={status === "active" ? "Radio" : "Archive"} size={18} />
        </div>
        <div className={styles.room_info}>
          <div className={styles.room_title_row}>
            <Link href={roomPath} className={styles.room_name}>
              {fileName}
            </Link>
            <span className={styles.status_badge}>{status}</span>
          </div>
          <div className={styles.room_meta}>
            <span className={styles.timestamp}>
              {status === "active"
                ? `Started ${startTime}`
                : `Ended ${endTime}`}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.room_participants}>
        <div className={styles.avatar_stack}>
          {participants.slice(0, 3).map((p, i) => (
            <div key={i} className={styles.avatar_item} title={p.name}>
              <img src={p.avatar} alt={p.name} />
            </div>
          ))}
          {participants.length > 3 && (
            <div
              className={styles.avatar_item}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                color: "#7d8590",
              }}
            >
              +{participants.length - 3}
            </div>
          )}
        </div>
        <div className={styles.participant_count}>
          <Icon icon="Users" size={14} />
          <span>{participants.length}</span>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
