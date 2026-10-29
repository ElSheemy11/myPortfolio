"use client";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * INTENSE animated section background: 4 hue-shifting aurora blobs (scroll parallax),
 * rotating light beams, pulsing rings, a bright drifting grid + big cursor spotlight,
 * glowing twinkling stars, shooting comets, rising colored particles and a light sweep.
 *
 * The parent section MUST have `relative isolate overflow-hidden`.
 */

function seeded(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}
const rnd = seeded(11);
const GLOW = ["#c4b5fd", "#67e8f9", "#f9a8d4", "#ffffff"];
const STARS = Array.from({ length: 150 }, (_, i) => ({
  x: +(rnd() * 100).toFixed(2),
  y: +(rnd() * 100).toFixed(2),
  size: +(1 + rnd() * 2.5).toFixed(2),
  delay: +(rnd() * 4).toFixed(2),
  dur: +(2 + rnd() * 4).toFixed(2),
  hot: i % 6 === 0,
  color: GLOW[i % GLOW.length],
}));
const PCOLORS = ["bg-purple-300", "bg-cyan-300", "bg-pink-300", "bg-indigo-300"];
const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  x: +(rnd() * 100).toFixed(2),
  y: +(50 + rnd() * 50).toFixed(2),
  size: +(2 + rnd() * 4).toFixed(2),
  delay: +(rnd() * 8).toFixed(2),
  dur: +(5 + rnd() * 6).toFixed(2),
  rise: Math.round(160 + rnd() * 260),
  color: PCOLORS[i % PCOLORS.length],
}));
const SHOOTING = [
  { left: "8%", top: "6%", delay: 0.8, repeatDelay: 4 },
  { left: "52%", top: "3%", delay: 2.5, repeatDelay: 5 },
  { left: "28%", top: "28%", delay: 4.5, repeatDelay: 6 },
  { left: "75%", top: "15%", delay: 6.5, repeatDelay: 5 },
  { left: "40%", top: "50%", delay: 8.5, repeatDelay: 7 },
  { left: "88%", top: "40%", delay: 10, repeatDelay: 6 },
];

export default function SectionBackground({ variant = "experience" }: { variant?: "experience" | "contact" }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-15%", "35%"]);
  const yB = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["25%", "-30%"]);
  const yC = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-20%", "25%"]);
  const yStars = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-14%"]);

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
    <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${variant === "contact" ? "contact-calm" : ""}`}>
      {/* aurora blobs */}
      <motion.div style={{ y: yA }} className="absolute inset-0"><div className="aurora aurora-a" /></motion.div>
      <motion.div style={{ y: yB }} className="absolute inset-0"><div className="aurora aurora-b" /></motion.div>
      <motion.div style={{ y: yC }} className="absolute inset-0"><div className="aurora aurora-c" /></motion.div>
      <motion.div style={{ y: yB }} className="absolute inset-0"><div className="aurora aurora-d" /></motion.div>

      {/* rotating light beams + pulsing rings */}
      <div className="beams" />
      <div className="ring" />
      <div className="ring" style={{ animationDelay: "2s" }} />
      <div className="ring" style={{ animationDelay: "4s" }} />

      {variant === "contact" && (
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-[radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.6),transparent_65%)]" />
      )}

      {/* grid + cursor spotlight */}
      <div className="grid-base" />
      <div className="cursor-glow" />
      <div className="grid-glare" />

      {/* glowing twinkling stars */}
      <motion.div style={{ y: yStars }} className="absolute -inset-y-[14%] inset-x-0">
        {STARS.map((s, i) => (
          <span
            key={i}
            className={s.hot ? "star star-hot" : "star"}
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.hot ? s.size + 1.5 : s.size,
              height: s.hot ? s.size + 1.5 : s.size,
              background: s.color,
              color: s.color,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.dur}s`,
            }}
          />
        ))}
      </motion.div>

      {!reduce && (
        <>
          {/* comets */}
          {SHOOTING.map((s, i) => (
            <motion.span
              key={i}
              className="absolute block max-md:hidden h-[2px] w-44 rounded-full bg-linear-to-r from-transparent via-purple-300 to-white shadow-[0_0_14px_3px_rgba(196,181,253,0.9)]"
              style={{ left: s.left, top: s.top, rotate: 35 }}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ x: 520, y: 365, opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, delay: s.delay, repeat: Infinity, repeatDelay: s.repeatDelay, ease: "easeIn" }}
            />
          ))}

          {/* rising particles */}
          {PARTICLES.map((p, i) => (
            <motion.span
              key={i}
              className={`absolute block max-md:hidden rounded-full ${p.color} shadow-[0_0_14px_4px_rgba(196,181,253,0.8)]`}
              style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
              initial={{ y: 0, opacity: 0, scale: 0.6 }}
              animate={{ y: -p.rise, opacity: [0, 1, 0], scale: [0.6, 1.4, 0.8] }}
              transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeOut" }}
            />
          ))}
        </>
      )}

      <div className="sweep" />

      {/* lighter vignette + shorter edge fades so the effects stay visible */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,#000319_110%)]" />
      <div className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-[#000319] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-[#000319] to-transparent" />
    </div>
  );
}
