import React from "react";
import RoomCard from "@/components/ui/cards/roomCard/RoomCard";
import styles from "./rooms.module.scss";

const MOCK_ROOMS = [
  {
    fileName: "src/components/Editor.tsx",
    status: "active" as const,
    startTime: "10 minutes ago",
    participants: [
      { name: "youssef", avatar: "/images/amity.jpg" },
      { name: "asdek", avatar: "/images/logo.png" },
      { name: "guest", avatar: "/images/bg-popcorn.png" },
    ],
    roomPath: "#",
  },
  {
    fileName: "styles/global.css",
    status: "active" as const,
    startTime: "25 minutes ago",
    participants: [
      { name: "asdek", avatar: "/images/logo.png" },
      { name: "youssef", avatar: "/images/amity.jpg" },
    ],
    roomPath: "#",
  },
  {
    fileName: "api/routes/auth.ts",
    status: "active" as const,
    startTime: "1 hour ago",
    participants: [{ name: "dev_user", avatar: "/images/bg-popcorn.png" }],
    roomPath: "#",
  },
  {
    fileName: "package.json",
    status: "closed" as const,
    startTime: "2 hours ago",
    endTime: "1 hour ago",
    participants: [
      { name: "youssef", avatar: "/images/amity.jpg" },
      { name: "asdek", avatar: "/images/logo.png" },
    ],
    roomPath: "#",
  },
];

const RoomList = async () => {
  // Simulate data fetching
  await new Promise((resolve) => setTimeout(resolve, 800));

  return (
    <div className={styles.room_list}>
      {MOCK_ROOMS.map((room, index) => (
        <RoomCard key={index} {...room} />
      ))}
    </div>
  );
};

export default RoomList;
