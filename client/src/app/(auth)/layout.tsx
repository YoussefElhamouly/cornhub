import React from "react";
import styles from "./auth.module.scss";
import ParticleCanvas from "@/components/features/auth/ParticleCanvas";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.auth_root}>
      <ParticleCanvas />
      <div className={styles.auth_center}>{children}</div>
    </div>
  );
}
