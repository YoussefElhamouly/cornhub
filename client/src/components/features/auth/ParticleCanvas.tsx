"use client";
import React, { useEffect, useRef } from "react";
import styles from "./particleCanvas.module.scss";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  glyph: string;
  size: number;
  opacity: number;
  color: string;
  trail: { x: number; y: number }[];
}

const GLYPHS = [
  "</>",
  "{}",
  ";",
  "=>",
  "&&",
  "||",
  "[]",
  "fn()",
  "0x",
  "/*",
  "*/",
  "::",
  "??",
  "//",
];
const COLORS = [
  "rgba(68,147,248,",
  "rgba(235,165,55,",
  "rgba(63,185,80,",
  "rgba(145,152,161,",
];
const MAX_PARTICLES = 45;
const REPEL_RADIUS = 120;
const REPEL_STRENGTH = 0.45;
const DRIFT_SPEED = 0.25;
const TRAIL_LENGTH = 6;

function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * DRIFT_SPEED,
    vy: (Math.random() - 0.5) * DRIFT_SPEED,
    glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
    size: Math.random() * 6 + 9,
    opacity: Math.random() * 0.18 + 0.07,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    trail: [],
  };
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Seed particles
    particlesRef.current = Array.from({ length: MAX_PARTICLES }, () =>
      createParticle(canvas.width, canvas.height),
    );

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Cursor radial glow
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const radial = ctx.createRadialGradient(mx, my, 0, mx, my, 200);
      radial.addColorStop(0, "rgba(68,147,248,0.04)");
      radial.addColorStop(1, "transparent");
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        // Repel from mouse
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
          p.vx += (dx / dist) * force * REPEL_STRENGTH;
          p.vy += (dy / dist) * force * REPEL_STRENGTH;
        }
        // Speed damping
        p.vx *= 0.97;
        p.vy *= 0.97;
        // Drift back to natural speed if too slow
        if (Math.abs(p.vx) < 0.05) p.vx += (Math.random() - 0.5) * 0.03;
        if (Math.abs(p.vy) < 0.05) p.vy += (Math.random() - 0.5) * 0.03;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        // Trail
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > TRAIL_LENGTH) p.trail.shift();

        // Draw trail
        p.trail.forEach((pt, i) => {
          const trailOpacity = (i / TRAIL_LENGTH) * p.opacity * 0.5;
          ctx.font = `${p.size * (i / TRAIL_LENGTH)}px monospace`;
          ctx.fillStyle = `${p.color}${trailOpacity})`;
          ctx.fillText(p.glyph, pt.x, pt.y);
        });

        // Draw glyph with glow
        ctx.save();
        ctx.shadowColor = `${p.color}0.8)`;
        ctx.shadowBlur = 8;
        ctx.font = `${p.size}px 'SF Mono', 'Fira Code', monospace`;
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.fillText(p.glyph, p.x, p.y);
        ctx.restore();
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    if (!prefersReducedMotion) {
      animFrameRef.current = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
  );
}
