"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { FaLocationArrow } from "react-icons/fa6";

type Props = {
  index: number;
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  tags?: string[];
  link: string;
};

// Accent per card (used by the fallback artwork and the ambient glow)
const accents = [
  { glow: "from-amber-300/50 to-amber-700/10", spot: "rgba(251,191,36,0.35)" },
  { glow: "from-rose-500/60 to-rose-900/10", spot: "rgba(244,63,94,0.35)" },
  { glow: "from-fuchsia-400/50 to-indigo-600/10", spot: "rgba(167,139,250,0.4)" },
];

export default function ProjectCard({ index, title, des, img, iconLists, tags = [], link }: Props) {
  const reduce = useReducedMotion() ?? false;
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [failed, setFailed] = useState(!img);
  const accent = accents[index % accents.length];

  // Cursor position, -0.5 .. 0.5, smoothed with springs
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 170, damping: 20, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 170, damping: 20, mass: 0.5 });
  const rotateY = useTransform(sx, (v) => v * 10);
  const rotateX = useTransform(sy, (v) => v * -8);
  const imgX = useTransform(sx, (v) => v * -14);
  const imgY = useTransform(sy, (v) => v * -10);

  // Throttled pointer position measurement
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (clientX - r.left) / r.width;
      const py = (clientY - r.top) / r.height;
      el.style.setProperty("--gx", `${px * 100}%`);
      el.style.setProperty("--gy", `${py * 100}%`);
      if (reduce) return;
      mx.set(px - 0.5);
      my.set(py - 0.5);
    });
  };

  const onLeave = () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    mx.set(0);
    my.set(0);
  };

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <div
        ref={wrapRef}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="group/card relative isolate h-full"
        style={{ perspective: 1100 }}
      >
        {/* ambient glow that follows cursor (pure radial gradient, no blur filter) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-3 -z-10 rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          style={{
            background: `radial-gradient(400px circle at var(--gx,50%) var(--gy,50%), ${accent.spot}, transparent 70%)`,
          }}
        />

        <motion.a
          href={link}
          target="_blank"
          rel="noreferrer"
          aria-label={`${title}, open project`}
          style={{ rotateX: reduce ? 0 : rotateX, rotateY: reduce ? 0 : rotateY }}
          whileHover={reduce ? undefined : { y: -6 }}
          whileTap={{ scale: 0.985 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-[#0a0a2e] via-[#060628] to-[#1a0a52] p-4 shadow-xl shadow-black/40 transition-[box-shadow,border-color] duration-300 hover:border-white/25 hover:shadow-2xl hover:shadow-purple-600/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
        >
          {/* ---------- media ---------- */}
          <div className="relative aspect-16/10 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d26]">
            <div aria-hidden className={`absolute inset-0 bg-linear-to-br ${accent.glow}`} />
            <div aria-hidden className="grid-base opacity-60" />

            {!failed && img ? (
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover/card:scale-[1.04]">
                <motion.div
                  style={{ x: reduce ? 0 : imgX, y: reduce ? 0 : imgY, scale: 1.05 }}
                  className="absolute inset-x-0 bottom-0 z-10 mx-auto flex h-[94%] w-full items-end justify-center"
                >
                  <Image
                    src={img}
                    alt={title}
                    width={560}
                    height={350}
                    loading="lazy"
                    onError={() => setFailed(true)}
                    className="max-h-full w-auto object-contain object-bottom"
                  />
                </motion.div>
              </div>
            ) : (
              <div className="absolute inset-0 z-10 flex flex-col p-3">
                <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-white/10 bg-[#070920]/95">
                  <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="size-2 rounded-full bg-white/25" />
                    ))}
                    <span className="ms-3 h-2 flex-1 max-w-32 rounded-full bg-white/10" />
                  </div>
                  <div className="flex flex-1 items-end gap-2 p-4">
                    {[40, 65, 50, 80, 60, 90].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 origin-bottom rounded-t bg-linear-to-t from-purple-500/40 to-sky-400/30 transition-transform duration-500 group-hover/card:scale-y-110"
                        style={{ height: `${h}%`, transitionDelay: `${i * 40}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* fade into the card body */}
            <div aria-hidden className="absolute inset-x-0 bottom-0 z-20 h-1/3 bg-linear-to-t from-[#060628]/80 to-transparent" />

            {/* light sweep on hover */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-20 -translate-x-full -skew-x-12 bg-linear-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 ease-out group-hover/card:translate-x-full"
            />

            <span className="absolute left-3 top-3 z-30 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-xs tracking-widest text-white/90">
              0{index + 1}
            </span>
            <span className="absolute right-3 top-3 z-30 flex size-9 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/90 transition duration-300 group-hover/card:border-purple-300/60 group-hover/card:bg-purple-500 group-hover/card:text-white">
              <FaLocationArrow className="text-xs transition duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
            </span>
          </div>

          {/* ---------- body ---------- */}
          <div className="flex flex-1 flex-col px-1 pb-1 pt-5">
            <h3 className="bg-linear-to-b from-white to-neutral-300 bg-clip-text text-lg font-bold text-transparent lg:text-2xl">
              {title}
            </h3>
            <p className="mt-2 line-clamp-4 text-sm font-light leading-relaxed text-[#c1c2d3] lg:text-base">{des}</p>

            {tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-neutral-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-3 pt-6">
              <div className="flex shrink-0 items-center">
                {iconLists.map((icon, idx) => (
                  <div
                    key={idx}
                    style={{ "--i": idx, transitionDelay: `${idx * 55}ms`, zIndex: iconLists.length - idx } as React.CSSProperties}
                    className="relative -ms-2 flex size-9 items-center justify-center rounded-full border border-white/20 bg-black transition duration-300 ease-out first:ms-0 group-hover/card:-translate-y-1 group-hover/card:translate-x-[calc(var(--i)*6px)] group-hover/card:scale-110 group-hover/card:border-purple-300/60 group-hover/card:shadow-[0_0_16px_2px_rgba(167,139,250,0.45)] lg:size-10"
                  >
                    <Image
                      src={icon}
                      alt=""
                      width={22}
                      height={22}
                      loading="lazy"
                      className="size-full object-contain p-2"
                    />
                  </div>
                ))}
              </div>

              {/* CTA */}
              <span className="group/cta relative inline-flex shrink-0 items-center gap-3 whitespace-nowrap text-sm font-semibold text-purple-300 transition-all duration-300 group-hover/card:translate-x-1 group-hover/card:text-white lg:text-base">
                <span className="relative">
                  Check out my work!
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-px w-0 bg-linear-to-r from-purple-300 to-sky-300 transition-all duration-500 group-hover/card:w-full"
                  />
                </span>
                <span className="flex size-8 items-center justify-center rounded-full border border-purple-300/40 bg-purple-400/10 transition duration-300 group-hover/card:rotate-12 group-hover/card:scale-110 group-hover/card:border-transparent group-hover/card:bg-purple-500 group-hover/card:shadow-[0_0_18px_3px_rgba(167,139,250,0.6)]">
                  <FaLocationArrow
                    className="text-xs transition duration-300 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5"
                    color="#E9DDFF"
                  />
                </span>
              </span>
            </div>
          </div>

          {/* ---------- cursor glare + glowing border ---------- */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-30 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
            style={{
              background:
                "radial-gradient(420px circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,0.09), transparent 60%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
            style={{
              padding: "1px",
              background:
                "radial-gradient(280px circle at var(--gx,50%) var(--gy,50%), rgba(167,139,250,0.95), rgba(56,189,248,0.4) 45%, transparent 70%)",
              WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
        </motion.a>
      </div>
    </motion.div>
  );
}
