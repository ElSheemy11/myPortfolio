"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { toast } from "sonner";
import { FaGithub } from "react-icons/fa6";
import { IoCheckboxOutline, IoCopyOutline, IoMailOutline } from "react-icons/io5";
import MagicButton from "./ui/magic-button";
import SectionBackground from "./ui/section-background";
import { contact, socialMedia } from "@/data";
import { useSectionVisibility, useIsMobile } from "@/lib/hooks";

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

const SOCIALS: Record<number, { label: string; color: string }> = {
  1: { label: "GitHub", color: "#e5e7eb" },
  2: { label: "LinkedIn", color: "#38bdf8" },
  3: { label: "Facebook", color: "#3b82f6" },
  4: { label: "Instagram", color: "#ec4899" },
  5: { label: "WhatsApp", color: "#22c55e" },
};

/** Pulls its children slightly toward the cursor (mouse only, never on touch), throttled with rAF. */
function Magnetic({
  children,
  strength = 0.3,
  className = "inline-block",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      x.set((clientX - (r.left + r.width / 2)) * strength);
      y.set((clientY - (r.top + r.height / 2)) * strength);
    });
  };

  const onLeave = () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={onLeave} className={className}>
      {children}
    </motion.div>
  );
}

/** Little burst of sparks that plays each time `trigger` changes (and is > 0). */
const SPARKS = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2;
  const dist = 54 + (i % 3) * 18;
  return { x: +(Math.cos(angle) * dist).toFixed(1), y: +(Math.sin(angle) * dist).toFixed(1), size: 4 + (i % 3) * 2 };
});
function Burst({ trigger }: { trigger: number }) {
  if (trigger === 0) return null;
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {SPARKS.map((s, i) => (
        <motion.span
          key={`${trigger}-${i}`}
          className="absolute rounded-full bg-linear-to-br from-purple-300 to-sky-300"
          style={{ width: s.size, height: s.size }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: s.x, y: s.y, opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      ))}
    </span>
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

const linkBtn =
  "inline-flex h-12 w-full items-center justify-center gap-2 rounded-md border border-white/15 bg-white/10 px-6 text-sm font-medium text-white transition hover:border-purple-300/40 hover:bg-white/15 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 sm:w-auto";

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function Contact() {
  const reduce = useReducedMotion() ?? false;
  const isMobile = useIsMobile();
  const { ref: sectionRef, isInView } = useSectionVisibility<HTMLElement>();
  const [copied, setCopied] = useState(false);
  const [burst, setBurst] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(contact.email);
      ok = true;
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = contact.email;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        ok = false;
      }
    }

    if (ok) {
      setCopied(true);
      setBurst((b) => b + 1);
      toast.success("Email copied to clipboard!");
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2500);
    } else {
      toast.error(`Couldn't copy. My email is ${contact.email}`);
    }
  };

  const shouldAnimateRings = !reduce && isInView && !isMobile;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden px-4 pb-6 pt-20 md:pb-8 md:pt-28 cv-auto"
    >
      <SectionBackground variant="contact" />

      <div className="relative mx-auto max-w-3xl text-center">
        {/* orbiting rings behind content, paused when offscreen or on reduced-motion/mobile */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-60 md:opacity-100"
        >
          {/* soft dark disc so rings read cleanly */}
          <div className="absolute -inset-[10%] rounded-full bg-[radial-gradient(circle,rgba(0,3,25,0.8)_0%,rgba(0,3,25,0.45)_55%,transparent_75%)]" />

          {/* outer ring */}
          <motion.div
            animate={shouldAnimateRings ? { rotate: 360 } : undefined}
            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            className="relative size-[min(92vw,30rem)] rounded-full border border-dashed border-purple-300/50 shadow-[0_0_24px_rgba(167,139,250,0.3),inset_0_0_24px_rgba(167,139,250,0.18)] md:shadow-[0_0_40px_rgba(167,139,250,0.35),inset_0_0_40px_rgba(167,139,250,0.2)]"
          >
            <span className="absolute -top-2 left-1/2 size-4 -translate-x-1/2 rounded-full bg-purple-200 shadow-[0_0_22px_8px_rgba(167,139,250,0.9)]" />
            <span className="absolute -bottom-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-fuchsia-300 shadow-[0_0_18px_6px_rgba(232,121,249,0.85)]" />
          </motion.div>

          {/* middle ring */}
          <motion.div
            animate={shouldAnimateRings ? { rotate: -360 } : undefined}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[11%] rounded-full border border-sky-300/20 border-t-2 border-t-sky-300 shadow-[0_0_30px_rgba(56,189,248,0.25)]"
          >
            <span className="absolute -bottom-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-sky-200 shadow-[0_0_18px_6px_rgba(56,189,248,0.9)]" />
          </motion.div>

          {/* inner ring (desktop only) */}
          {!isMobile && (
            <motion.div
              animate={shouldAnimateRings ? { rotate: 360 } : undefined}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[24%] rounded-full border border-dotted border-pink-300/60"
            >
              <span className="absolute -right-1 top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-pink-200 shadow-[0_0_16px_6px_rgba(244,114,182,0.85)]" />
            </motion.div>
          )}
        </div>

        {/* availability badge */}
        <motion.div {...fadeUp(0)} className="mb-5 flex justify-center md:mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] uppercase tracking-widest text-neutral-200 sm:px-4 sm:text-xs">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Open to new projects
          </span>
        </motion.div>

        <h2 className="heading flex flex-wrap justify-center gap-x-2.5 sm:gap-x-3">
          {["Let's", "build", "something"].map((w, i) => (
            <motion.span
              key={w}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: "easeOut" }}
            >
              {w}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            className="text-shimmer bg-linear-to-r from-purple-400 via-sky-300 to-purple-400 bg-clip-text text-transparent"
          >
            together
          </motion.span>
        </h2>

        <motion.p {...fadeUp(0.5)} className="mx-auto mt-4 max-w-xl text-balance text-sm text-neutral-300 sm:mt-5 sm:text-base">
          Have a project in mind? Send me a message and I&apos;ll get back to you.
        </motion.p>

        {/* email pill */}
        <motion.div {...fadeUp(0.6)} className="mt-7 flex justify-center md:mt-8">
          <div className="group relative flex w-full max-w-sm min-w-0 items-center gap-3 rounded-full border border-white/10 bg-white/10 py-1.5 pl-4 pr-1.5 text-sm text-neutral-200 transition-colors hover:border-purple-300/40 sm:inline-flex sm:w-auto sm:max-w-full sm:py-2 sm:pr-2">
            <IoMailOutline className="shrink-0 text-purple-300" />
            <span className="min-w-0 flex-1 truncate text-left sm:flex-none">{contact.email}</span>
            <button
              type="button"
              onClick={copy}
              aria-label="Copy email address"
              className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-purple-500/40 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 sm:size-8"
            >
              {copied ? <IoCheckboxOutline /> : <IoCopyOutline />}
              <Burst trigger={burst} />
            </button>
          </div>
        </motion.div>

        {/* actions */}
        <motion.div
          {...fadeUp(0.7)}
          className="mx-auto mt-6 flex max-w-xs flex-col items-stretch gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4"
        >
          <Magnetic className="hidden sm:inline-block">
            <MagicButton
              title={copied ? "Email copied!" : "Copy my email"}
              icon={copied ? <IoCheckboxOutline /> : <IoCopyOutline />}
              position="left"
              handleClick={copy}
            />
          </Magnetic>
          <Magnetic className="w-full sm:w-auto">
            <a href={`mailto:${contact.email}`} className={linkBtn}>
              <IoMailOutline /> Send an email
            </a>
          </Magnetic>
          <Magnetic className="w-full sm:w-auto">
            <a href={contact.github} target="_blank" rel="noreferrer" className={linkBtn}>
              <FaGithub /> GitHub
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* footer */}
      <footer className="relative mx-auto mt-20 flex max-w-7xl flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 sm:flex-row sm:gap-0 sm:pt-10">
        <p className="text-xs font-light text-neutral-400 sm:text-sm">
          Designed &amp; built by <span className="font-medium text-white">Momen Sheemy</span> · © 2026
        </p>

        <div className="flex items-center gap-3">
          {socialMedia.map((s) => {
            const info = SOCIALS[s.id] ?? { label: "Social", color: "#a78bfa" };
            return (
              <a
                key={s.id}
                href={s.link}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit my ${info.label}`}
                className="group relative flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:-translate-y-0.5 hover:border-purple-300/40 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                <Image src={s.img} alt="" width={16} height={16} className="size-4 opacity-80 transition group-hover:opacity-100" />
              </a>
            );
          })}
        </div>
      </footer>
    </section>
  );
}
