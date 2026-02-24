"use client";
import React, { useRef } from "react";
import styles from "./googleAuthButton.module.scss";

interface GoogleAuthButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

const GoogleIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M47.532 24.552c0-1.636-.132-3.204-.384-4.704H24.48v9.02h12.988c-.576 2.964-2.244 5.48-4.764 7.168v5.92h7.704c4.512-4.152 7.124-10.272 7.124-17.404z"
      fill="#4285F4"
    />
    <path
      d="M24.48 48c6.48 0 11.924-2.148 15.896-5.82l-7.704-5.92c-2.148 1.44-4.896 2.292-8.192 2.292-6.3 0-11.636-4.248-13.54-9.96H3.06v6.12C7.008 42.804 15.18 48 24.48 48z"
      fill="#34A853"
    />
    <path
      d="M10.94 28.592A14.336 14.336 0 0 1 10.2 24c0-1.596.276-3.144.74-4.592V13.288H3.06A23.996 23.996 0 0 0 .48 24c0 3.88.936 7.548 2.58 10.712l7.88-6.12z"
      fill="#FBBC05"
    />
    <path
      d="M24.48 9.508c3.552 0 6.74 1.224 9.252 3.624l6.936-6.936C36.392 2.4 30.948 0 24.48 0 15.18 0 7.008 5.196 3.06 13.288l7.88 6.12c1.904-5.712 7.24-9.9 13.54-9.9z"
      fill="#EA4335"
    />
  </svg>
);

export default function GoogleAuthButton({
  children = "Continue with Google",
  onClick,
}: GoogleAuthButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    // Ripple effect
    const ripple = document.createElement("span");
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position:absolute;
      border-radius:50%;
      width:${size}px;
      height:${size}px;
      top:${e.clientY - rect.top - size / 2}px;
      left:${e.clientX - rect.left - size / 2}px;
      background:rgba(255,255,255,0.12);
      transform:scale(0);
      animation:ripple 0.5s ease-out forwards;
      pointer-events:none;
    `;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
    onClick?.();
  };

  return (
    <button
      ref={btnRef}
      type="button"
      className={styles.google_btn}
      onClick={handleClick}
    >
      <GoogleIcon />
      <span>{children}</span>
    </button>
  );
}
