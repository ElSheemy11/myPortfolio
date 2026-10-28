"use client";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Animated section background: aurora blobs (scroll parallax), a drifting grid
 * lit up by the cursor, twinkling stars, shooting stars, rising particles and a
 * light sweep. Reuses the .aurora / .grid-* / .star / .sweep classes in globals.css.
 *
 * Usage: the parent section MUST have `relative isolate overflow-hidden`
 * (isolate keeps the -z-10 layer above the page background).
 */

// Deterministic pseudo-random values, computed once at module level so server
// and client render exactly the same markup (no hydration mismatch).
function seeded(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}
const rnd = seeded(11);
const STARS = Array.from({ length: 60 }, () => ({
  x: +(rnd() * 100).toFixed(2),
  y: +(rnd() * 100).toFixed(2),
  size: +(1 + rnd() * 2).toFixed(2),
  delay: +(rnd() * 4).toFixed(2),
  dur: +(3 + rnd() * 4).toFixed(2),
}));
const PARTICLES = Array.from({ length: 16 }, () => ({
  x: +(rnd() * 100).toFixed(2),
  y: +(55 + rnd() * 45).toFixed(2),
  size: +(2 + rnd() * 3).toFixed(2),
  delay: +(rnd() * 8).toFixed(2),
  dur: +(7 + rnd() * 6).toFixed(2),
  rise: Math.round(120 + rnd() * 140),
}));
const SHOOTING = [
  { left: "12%", top: "8%", delay: 1.5, repeatDelay: 9 },
  { left: "58%", top: "4%", delay: 5.5, repeatDelay: 12 },
  { left: "30%", top: "30%", delay: 9, repeatDelay: 15 },
];

export default function SectionBackground({ variant = "experience" }: { variant?: "experience" | "contact" }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-10%", "25%"]);
  const yB = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["20%", "-20%"]);
  const yC = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-15%", "15%"]);
  const yStars = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-10%"]);

  // Feed the cursor position (relative to the parent section) to the grid glare layer.
  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    parent.addEventListener("pointermove", onMove, { passive: true });
    return () => parent.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* aurora blobs, each drifting at its own scroll speed */}
      <motion.div style={{ y: yA }} className="absolute inset-0">
        <div className="aurora aurora-a" />
      </motion.div>
      <motion.div style={{ y: yB }} className="absolute inset-0">
        <div className="aurora aurora-b" />
      </motion.div>
      <motion.div style={{ y: yC }} className="absolute inset-0">
        <div className="aurora aurora-c" />
      </motion.div>

      {variant === "contact" && (
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_at_bottom,rgba(147,51,234,0.35),transparent_65%)]" />
      )}

      {/* grid + cursor glare */}
      <div className="grid-base" />
      <div className="grid-glare" />

      {/* twinkling stars (parallax) */}
      <motion.div style={{ y: yStars }} className="absolute -inset-y-[10%] inset-x-0">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="star"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.dur}s`,
            }}
          />
        ))}
      </motion.div>

      {!reduce && (
        <>
          {/* shooting stars */}
          {SHOOTING.map((s, i) => (
            <motion.span
              key={i}
              className="absolute block h-px w-28 bg-linear-to-r from-transparent to-white"
              style={{ left: s.left, top: s.top, rotate: 35 }}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ x: 430, y: 300, opacity: [0, 1, 0] }}
              transition={{ duration: 1.4, delay: s.delay, repeat: Infinity, repeatDelay: s.repeatDelay, ease: "easeIn" }}
            />
          ))}

          {/* rising particles */}
          {PARTICLES.map((p, i) => (
            <motion.span
              key={i}
              className="absolute block rounded-full bg-purple-300/70 shadow-[0_0_10px_2px_rgba(196,181,253,0.6)]"
              style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -p.rise, opacity: [0, 0.9, 0] }}
              transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeOut" }}
            />
          ))}
        </>
      )}

      <div className="sweep" />

      {/* vignette + edge fades so the section melts into the page */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#000319_100%)]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[#000319] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#000319] to-transparent" />
    </div>
  );
}
