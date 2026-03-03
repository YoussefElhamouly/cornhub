import React from "react";
import Wrapper from "@/components/layouts/wrapper/Wrapper";
import Main from "@/components/layouts/main/Main";
import CommitGroup from "../../../../commits/_components/lists/CommitGroup";

export default function CommitsPage() {
  const mockCommits = [
    {
      id: "1",
      message: "Update navigation styles",
      author: {
        name: "Youssef Elhamouly",
        avatar: "/images/amity.jpg",
        profilePath: "/YoussefElhamouly",
      },
      hash: "a1b2c3d",
      isVerified: true,
      timeLabel: "2 hours ago",
    },
    {
      id: "2",
      message: "Add support for path property in Filter component",
      author: {
        name: "Youssef Elhamouly",
        avatar: "/images/amity.jpg",
        profilePath: "/YoussefElhamouly",
      },
      hash: "e5f6g7h",
      isVerified: true,
      timeLabel: "3 hours ago",
    },
  ];

  return (
    <Main>
      <CommitGroup date="Feb 23, 2026" commits={mockCommits} />
    </Main>
  );
}
