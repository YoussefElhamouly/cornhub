import React from "react";
import Post from "../post/Post";
import CreatePost from "../post/CreatePost";

const mockPosts = [
  {
    author: {
      name: "Jordan Lee",
      username: "jordanlee",
      pfp: "/images/amity.jpg",
      timestamp: "2 weeks ago",
    },
    postBody: {
      text: "Live demo of Mittens voice calling feature in action! 🎤📹 The quality is crystal clear even on mobile networks. The UI is intuitive and the latency is practically non-existent. Can't wait to integrate this into production!",
      image: null,
      video: null,
    },
    likes: 445,
    comments: 72,
    tags: ["voicecalls", "webrtc", "demo", "mobile"],
    commentsList: [
      {
        author: {
          name: "Nina Rodriguez",
          username: "ninarodriguez",
          pfp: "/images/amity.jpg",
        },
        text: "The audio quality is insane! No lag at all during my test call.",
        timestamp: "13 days ago",
        likes: 67,
        replies: [
          {
            author: {
              name: "Jordan Lee",
              username: "jordanlee",
              pfp: "/images/amity.jpg",
            },
            text: "Thanks! We optimized the codec settings for better performance.",
            timestamp: "12 days ago",
            likes: 23,
            replies: [],
          },
        ],
      },
    ],
  },
  {
    author: {
      name: "Alex Martinez",
      username: "alexmartinez",
      pfp: "/images/amity.jpg",
      timestamp: "1 week ago",
    },
    postBody: {
      text: "Check out the incredible gallery feature! https://www.youtube.com/watch?v=AS8MnNBkHYE 📸🎥 Just launched our new image slider with smooth coverflow effects. The performance is buttery smooth even with high-res images.",
      image: [
        {
          src: "/images/amity.jpg",
        },
        {
          src: "/images/tall.jpg",
        },
        {
          src: "/images/amity.jpg",
        },
      ],
      video: null,
    },
    likes: 562,
    comments: 89,
    tags: ["gallery", "ui", "showcase"],
    commentsList: [
      {
        author: {
          name: "Priya Patel",
          username: "priyapatel",
          pfp: "/images/amity.jpg",
        },
        text: "The slider implementation is so smooth! 🔥",
        timestamp: "6 days ago",
        likes: 56,
        replies: [],
      },
    ],
  },
  {
    author: {
      name: "Sarah Chen",
      username: "sarahchen",
      pfp: "/images/amity.jpg",
      timestamp: "5 days ago",
    },
    postBody: {
      text: "Just finished a comprehensive review of our fullstack architecture. The modular component approach is making development so much faster. Loving the clean separation of concerns!",
      image: null,
      video: null,
    },
    likes: 328,
    comments: 45,
    tags: ["architecture", "bestpractices", "fullstack"],
    commentsList: [
      {
        author: {
          name: "Marcus Johnson",
          username: "marcusjohnson",
          pfp: "/images/amity.jpg",
        },
        text: "This is exactly the pattern we've been looking for. Can you share the design docs?",
        timestamp: "4 days ago",
        likes: 34,
        replies: [
          {
            author: {
              name: "Sarah Chen",
              username: "sarahchen",
              pfp: "/images/amity.jpg",
            },
            text: "Absolutely! I'll create a wiki post with all the details.",
            timestamp: "3 days ago",
            likes: 18,
            replies: [],
          },
        ],
      },
    ],
  },
  {
    author: {
      name: "Youssef Elhamouly",
      username: "youssefelhamouly",
      pfp: "/images/amity.jpg",
      timestamp: "3 days ago",
    },
    postBody: {
      text: "🚀 Exciting news! We just released v2.0 with Socket.io integration for real-time updates. The response from beta testers has been overwhelming. Special thanks to everyone who contributed!",
      image: [
        {
          src: "/images/amity.jpg",
        },
        {
          src: "/images/tall.jpg",
        },
      ],
      video: null,
    },
    likes: 892,
    comments: 156,
    tags: ["release", "react", "socketio", "webrtc"],
    commentsList: [
      {
        author: {
          name: "Elena Volkov",
          username: "elenav",
          pfp: "/images/amity.jpg",
        },
        text: "This is a game changer! The real-time sync is lightning fast.",
        timestamp: "2 days ago",
        likes: 123,
        replies: [],
      },
      {
        author: {
          name: "Dev Team",
          username: "devteam",
          pfp: "/images/amity.jpg",
        },
        text: "Thanks for the amazing feedback! v2.1 is already in development.",
        timestamp: "1 day ago",
        likes: 89,
        replies: [],
      },
    ],
  },
  {
    author: {
      name: "Lisa Wong",
      username: "lisawong",
      pfp: "/images/amity.jpg",
      timestamp: "2 days ago",
    },
    postBody: {
      text: "Sharing my latest project: a collaborative code editor with live editing support. Built with React, WebSockets, and Monaco Editor. The experience is seamless with minimal latency.",
      image: null,
      video: {
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    },
    likes: 445,
    comments: 62,
    tags: ["collaborative", "editor", "react", "websockets"],
    commentsList: [
      {
        author: {
          name: "David Kumar",
          username: "davidkumar",
          pfp: "/images/amity.jpg",
        },
        text: "This is exactly what our team needed! Can we get the repo link?",
        timestamp: "1 day ago",
        likes: 45,
        replies: [
          {
            author: {
              name: "Lisa Wong",
              username: "lisawong",
              pfp: "/images/amity.jpg",
            },
            text: "Check my profile, it's open source! MIT licensed.",
            timestamp: "12 hours ago",
            likes: 32,
            replies: [],
          },
        ],
      },
    ],
  },
];

const Feed = () => {
  return (
    <>
      {/* <CreatePost /> */}
      {mockPosts.map((post, idx) => (
        <Post
          key={idx}
          author={post.author}
          postBody={post.postBody}
          likes={post.likes}
          comments={post.comments}
          tags={post.tags}
          commentsList={post.commentsList}
          onLike={(isLiked) => console.log("Liked:", isLiked)}
          onComment={() => console.log("Commenting")}
          onShare={() => console.log("Sharing")}
        />
      ))}
    </>
  );
};

export default Feed;
