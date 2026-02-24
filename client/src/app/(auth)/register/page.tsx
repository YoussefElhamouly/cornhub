"use client";
import React, { useState } from "react";
import styles from "./register.module.scss";
import AuthInput from "@/components/features/auth/AuthInput";
import GoogleAuthButton from "@/components/features/auth/GoogleAuthButton";
import Link from "next/link";

type PasswordStrength = 0 | 1 | 2 | 3 | 4;
const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLORS = ["", "#f85149", "#e3b341", "#3fb950", "#4493f8"];

function getPasswordStrength(pw: string): PasswordStrength {
  let score = 0;
  if (!pw) return 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score as PasswordStrength;
}

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const strength = getPasswordStrength(form.password);

  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.username.trim()) e.username = "Username is required";
    else if (form.username.length < 3) e.username = "At least 3 characters";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "A valid email is required";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "At least 8 characters";
    if (form.confirm !== form.password) e.confirm = "Passwords do not match";
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
    // TODO: wire up real registration
    await new Promise((r) => setTimeout(r, 1600));
    setLoading(false);
  };

  return (
    <div className={styles.card}>
      <header className={styles.card_header}>
        <div className={styles.logo_mark}>
          <span className={styles.logo_bracket}>&lt;</span>
          <span className={styles.logo_slash}>/</span>
          <span className={styles.logo_bracket}>&gt;</span>
        </div>
        <h1 className={styles.title}>Create your account</h1>
        <p className={styles.subtitle}>
          Already have an account?{" "}
          <Link href="/login" className={styles.link}>
            Sign in
          </Link>
        </p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <AuthInput
          label="Username"
          type="text"
          autoComplete="username"
          value={form.username}
          onChange={set("username")}
          error={errors.username}
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
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          }
        />

        <AuthInput
          label="Email address"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={set("email")}
          error={errors.email}
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          }
        />

        <div>
          <AuthInput
            label="Password"
            type="password"
            autoComplete="new-password"
            value={form.password}
            onChange={set("password")}
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
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path strokeLinecap="round" d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            }
          />
          {form.password && (
            <div className={styles.strength_container}>
              <div className={styles.strength_bars}>
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={styles.strength_bar}
                    style={{
                      backgroundColor:
                        level <= strength
                          ? STRENGTH_COLORS[strength]
                          : undefined,
                      boxShadow:
                        level <= strength
                          ? `0 0 6px ${STRENGTH_COLORS[strength]}80`
                          : undefined,
                    }}
                  />
                ))}
              </div>
              <span
                className={styles.strength_label}
                style={{ color: STRENGTH_COLORS[strength] }}
              >
                <span className={styles.mono_prefix}>{"// "}</span>
                {STRENGTH_LABELS[strength]}
              </span>
            </div>
          )}
        </div>

        <AuthInput
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          value={form.confirm}
          onChange={set("confirm")}
          error={errors.confirm}
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
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          }
        />

        <button
          type="submit"
          className={`${styles.primary_btn} ${loading ? styles.loading : ""}`}
          disabled={loading}
        >
          {loading ? (
            <span className={styles.spinner_row}>
              <span className={styles.spinner} />
              <span className={styles.loading_text}>
                Creating account
                <span className={styles.dots} />
              </span>
            </span>
          ) : (
            "Create account"
          )}
        </button>

        <div className={styles.divider}>
          <span />
          <span className={styles.divider_text}>or</span>
          <span />
        </div>

        <GoogleAuthButton>Sign up with Google</GoogleAuthButton>
      </form>

      <footer className={styles.card_footer}>
        <span className={styles.footer_code}>
          {"// "} By creating an account you agree to our{" "}
          <Link href="/terms" className={styles.link_muted}>
            Terms
          </Link>{" "}
          &amp;{" "}
          <Link href="/privacy" className={styles.link_muted}>
            Privacy Policy
          </Link>
        </span>
      </footer>
    </div>
  );
}
