"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { toast } from "sonner";
import { FaArrowUp, FaGithub } from "react-icons/fa6";
import { IoCheckboxOutline, IoCopyOutline, IoMailOutline } from "react-icons/io5";
import MagicButton from "./ui/magic-button";
import SectionBackground from "./ui/section-background";
import { contact } from "@/data";

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

/** Pulls its children slightly toward the cursor. */
function Magnetic({ children, strength = 0.3 }: { children: React.ReactNode; strength?: number }) {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={onLeave} className="inline-block">
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
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function Contact() {
  const reduce = useReducedMotion() ?? false;
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
      // Fallback for browsers / contexts without the async clipboard API
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

  return (
    <section id="contact" className="relative isolate w-full overflow-hidden px-4 pb-8 pt-28">
      <SectionBackground variant="contact" />

      <div className="relative mx-auto max-w-3xl text-center">
        {/* slowly orbiting rings behind the content */}
        {!reduce && (
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="relative size-[26rem] rounded-full border border-dashed border-purple-400/20 md:size-[40rem]"
            >
              <span className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-purple-300 shadow-[0_0_18px_6px_rgba(167,139,250,0.8)]" />
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
              className="absolute inset-8 rounded-full border border-sky-400/15 md:inset-16"
            >
              <span className="absolute -bottom-1.5 left-1/2 size-2.5 -translate-x-1/2 rounded-full bg-sky-300 shadow-[0_0_16px_5px_rgba(56,189,248,0.7)]" />
            </motion.div>
          </div>
        )}

        {/* availability badge */}
        <motion.div {...fadeUp(0)} className="mb-6 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-widest text-neutral-200 backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Open to new projects
          </span>
        </motion.div>

        <h2 className="heading flex flex-wrap justify-center gap-x-3">
          {["Let's", "build", "something"].map((w, i) => (
            <motion.span
              key={w}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: "easeOut" }}
            >
              {w}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="text-shimmer bg-linear-to-r from-purple-400 via-sky-300 to-purple-400 bg-clip-text text-transparent"
          >
            together
          </motion.span>
        </h2>

        <motion.p {...fadeUp(0.6)} className="mx-auto mt-5 max-w-xl text-neutral-300">
          Have a project in mind? Send me a message and I&apos;ll get back to you.
        </motion.p>

        {/* email pill */}
        <motion.div {...fadeUp(0.7)} className="mt-8 flex justify-center">
          <div className="group relative inline-flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-white/5 py-2 pl-4 pr-2 text-sm text-neutral-200 backdrop-blur transition-colors hover:border-purple-300/40">
            <IoMailOutline className="shrink-0 text-purple-300" />
            <span className="truncate">{contact.email}</span>
            <button
              type="button"
              onClick={copy}
              aria-label="Copy email address"
              className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-purple-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              {copied ? <IoCheckboxOutline /> : <IoCopyOutline />}
              <Burst trigger={burst} />
            </button>
          </div>
        </motion.div>

        {/* actions */}
        <motion.div {...fadeUp(0.8)} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <MagicButton
              title={copied ? "Email copied!" : "Copy my email"}
              icon={copied ? <IoCheckboxOutline /> : <IoCopyOutline />}
              position="left"
              handleClick={copy}
            />
          </Magnetic>
          <Magnetic>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex h-12 items-center gap-2 rounded-md border border-white/15 bg-white/5 px-6 text-sm font-medium text-white backdrop-blur transition hover:border-purple-300/40 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              <IoMailOutline /> Send an email
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-md border border-white/15 bg-white/5 px-6 text-sm font-medium text-white backdrop-blur transition hover:border-purple-300/40 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              <FaGithub /> GitHub
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* footer */}
      <motion.footer
        {...fadeUp(0.2)}
        className="relative mx-auto mt-28 flex w-full max-w-6xl items-center justify-between border-t border-white/10 py-8 text-sm text-neutral-400"
      >
        <div aria-hidden className="absolute inset-x-0 -top-px mx-auto h-px w-1/2 bg-linear-to-r from-transparent via-purple-400/70 to-transparent" />
        <p>© {new Date().getFullYear()} Momen Sheemy</p>
        <div className="flex items-center gap-4">
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-lg transition hover:text-white"
          >
            <FaGithub />
          </a>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:-translate-y-1 hover:border-purple-300/50 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            <FaArrowUp />
          </button>
        </div>
      </motion.footer>
    </section>
  );
}
