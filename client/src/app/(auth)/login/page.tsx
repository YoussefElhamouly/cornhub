"use client";
import React, { useState } from "react";
import styles from "./login.module.scss";
import AuthInput from "@/components/features/auth/AuthInput";
import GoogleAuthButton from "@/components/features/auth/GoogleAuthButton";
import Link from "next/link";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    identifier?: string;
    password?: string;
  }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!identifier.trim()) e.identifier = "Email or username is required";
    if (!password) e.password = "Password is required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    // TODO: wire up real auth
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
  };

  return (
    <div className={styles.card}>
      {/* Logo / Brand */}
      <header className={styles.card_header}>
        <div className={styles.logo_mark}>
          <span className={styles.logo_bracket}>&lt;</span>
          <span className={styles.logo_slash}>/</span>
          <span className={styles.logo_bracket}>&gt;</span>
        </div>
        <h1 className={styles.title}>Sign in to Cornhub</h1>
        <p className={styles.subtitle}>
          Don't have an account?{" "}
          <Link href="/register" className={styles.link}>
            Create one
          </Link>
        </p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <AuthInput
          label="Email or username"
          type="text"
          autoComplete="username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          error={errors.identifier}
          icon={
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z"
              />
            </svg>
          }
        />

        <AuthInput
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          icon={
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path strokeLinecap="round" d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          }
        />

        <div className={styles.forgot_row}>
          <Link href="/forgot-password" className={styles.link_muted}>
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className={`${styles.primary_btn} ${loading ? styles.loading : ""}`}
          disabled={loading}
        >
          {loading ? (
            <span className={styles.spinner_row}>
              <span className={styles.spinner} />
              <span className={styles.loading_text}>
                Authenticating
                <span className={styles.dots} />
              </span>
            </span>
          ) : (
            "Sign in"
          )}
        </button>

        <div className={styles.divider}>
          <span />
          <span className={styles.divider_text}>or</span>
          <span />
        </div>

        <GoogleAuthButton />
      </form>

      <footer className={styles.card_footer}>
        <span className={styles.footer_code}>
          {"// "} Secure authentication powered by Cornhub
        </span>
      </footer>
    </div>
  );
}
