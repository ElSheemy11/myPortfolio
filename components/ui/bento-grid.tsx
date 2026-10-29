"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { BackgroundGradientAnimation } from "./background-gradient-animation";
import { GlobeDemo } from "./grid-globe";
import Lottie from "react-lottie";
import { useState } from "react";
import animationData from "@/data/confetti.json";
import MagicButton from "./magic-button";
import {
  IoCheckboxOutline,
  IoCopyOutline,
  IoChatbubblesOutline,
  IoLocationOutline,
  IoCodeSlashOutline,
  IoSparklesOutline,
} from "react-icons/io5";
import { toast } from "sonner";

export const BentoGrid = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[8rem] md:grid-cols-6 md:gap-5 lg:grid-cols-5",
        className,
      )}
    >
      {children}
    </div>
  );
};

const ACCENT: Record<number, string> = {
  1: "#8b5cf6", 2: "#22d3ee", 3: "#f472b6", 4: "#818cf8", 5: "#e879f9", 6: "#a78bfa",
};
const ICON: Record<number, React.ReactNode> = {
  1: <IoChatbubblesOutline />, 2: <IoLocationOutline />, 3: <IoCodeSlashOutline />, 5: <IoSparklesOutline />,
};
const STACK_LEFT = [
  { n: "ReactJs", c: "#22d3ee" },
  { n: "NextJs", c: "#ffffff" },
  { n: "TypeScript", c: "#3b82f6" },
];
const STACK_RIGHT = [
  { n: "NodeJs", c: "#4ade80" },
  { n: "Express", c: "#a1a1aa" },
  { n: "MongoDB", c: "#10b981" },
];

const stackChip =
  "chip-float flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-linear-to-br from-[#1b1f4a] to-[#0b0d26] px-3 py-2 text-xs text-white/90 shadow-lg shadow-black/30 transition duration-300 hover:-translate-y-1 hover:scale-105 hover:border-purple-400/60 hover:shadow-purple-500/30 md:backdrop-blur lg:px-4 lg:py-4 lg:text-base";
const stackBlank = "hidden rounded-xl border border-white/5 bg-[#10132E]/60 px-3 py-3.5 md:block lg:px-6 lg:py-6";

// Cards are auto-height on mobile, so each gets a sensible minimum (reset at md+, where grid rows take over)
const MOBILE_MIN: Record<number, string> = {
  1: "min-h-[18rem]",
  2: "min-h-[22rem]",
  3: "min-h-[17rem]",
  4: "min-h-[9rem]",
  5: "min-h-[19rem]",
  6: "min-h-[15rem]",
};

export const BentoGridItem = ({
  className,
  title,
  description,
  id,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  id?: number;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion();
  const n = id ?? 0;
  const accent = ACCENT[n] ?? "#8b5cf6";
  const tilt = !reduce && n !== 2; // keep the globe card flat so dragging the globe feels right

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 180, damping: 18 });

  const handleCopy = () => {
    navigator.clipboard.writeText("momenelshemy1@gmail.com");
    setCopied(true);
    toast.success("Email copied to clipboard!");
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return; // no tilt / glare while touch-scrolling
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--gx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--gy", `${e.clientY - r.top}px`);
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: Math.min(n, 3) * 0.08, ease: "easeOut" }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onPointerCancel={onLeave}
      className={cn(
        "group/bento relative row-span-1 flex flex-col justify-between space-y-4 overflow-hidden rounded-3xl border border-white/10 md:backdrop-blur-md",
        "shadow-xl shadow-black/50 transition-shadow duration-300 hover:-translate-y-1 hover:border-white/20",
        MOBILE_MIN[n],
        "md:min-h-0",
        className,
      )}
      style={{
        background:
          "linear-gradient(135deg, rgba(10,10,46,0.88) 0%, rgba(6,6,40,0.84) 45%, rgba(26,10,82,0.9) 100%)",
        rotateX: tilt ? rotateX : 0,
        rotateY: tilt ? rotateY : 0,
        transformPerspective: 1000,
      }}
      whileHover={{ boxShadow: `0 25px 70px -15px ${accent}88` }}
    >
      <div aria-hidden className="bento-blob bento-blob-a" style={{ background: accent }} />
      <div aria-hidden className="bento-blob bento-blob-b" style={{ background: accent }} />

      {(n === 1 || n === 3) && (
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      )}

      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />

      {n === 1 && <div aria-hidden className="bento-orbit pointer-events-none absolute right-6 top-6 hidden md:block" />}

      <div className={cn(n === 6 && "flex h-full justify-center")}>
        <div className="absolute h-full w-full">
          {img && <img src={img} alt="" className={cn(imgClassName, "object-cover object-center")} />}
        </div>
        <div className={cn("absolute right-0 -bottom-5", n === 5 && "w-full opacity-80")}>
          {spareImg && <img src={spareImg} alt="" className="h-full w-full object-cover object-center" />}
        </div>

        {n === 6 && <BackgroundGradientAnimation />}

        <div
          className={cn(
            titleClassName,
            "relative flex min-h-40 flex-col p-5 transition duration-300 group-hover/bento:translate-x-2 md:h-full lg:p-6",
          )}
        >
          {ICON[n] && (
            <span
              className="relative z-10 mb-3 grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5 text-lg transition duration-300 group-hover/bento:rotate-6 group-hover/bento:scale-110"
              style={{ color: accent, boxShadow: `0 0 24px ${accent}55, inset 0 0 12px ${accent}22` }}
            >
              {ICON[n]}
            </span>
          )}

          {n === 5 ? (
            <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-1 text-xs font-medium text-fuchsia-200">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-fuchsia-400" />
              </span>
              {description}
            </div>
          ) : (
            <div className="font-sans text-sm font-light tracking-wide text-[#c1c2d3] md:text-xs lg:text-base">{description}</div>
          )}

          <div className="z-10 max-w-96 bg-linear-to-b from-white to-neutral-300 bg-clip-text font-sans text-xl font-bold leading-snug text-transparent md:text-lg lg:text-2xl">
            {title}
          </div>

          {n === 5 && (
            <div className="z-10 mt-4 h-1.5 w-44 overflow-hidden rounded-full bg-white/10">
              <div className="bento-progress" />
            </div>
          )}

          {n === 3 && (
            <div className="relative z-10 mt-4 flex flex-wrap gap-2 md:absolute md:-right-3 md:top-2 md:mt-0 md:w-fit md:flex-nowrap md:gap-1 md:opacity-95 lg:-right-5">
              <div className="contents md:m-4 md:flex md:flex-col md:gap-1 lg:gap-2">
                {STACK_LEFT.map((s, i) => (
                  <span key={s.n} className={stackChip} style={{ animationDelay: `${i * 0.4}s` }}>
                    <i className="h-2 w-2 rounded-full" style={{ background: s.c, boxShadow: `0 0 10px ${s.c}` }} />
                    {s.n}
                  </span>
                ))}
                <span className={stackBlank} />
              </div>
              <div className="contents md:flex md:flex-col md:gap-1 lg:gap-2">
                <span className={stackBlank} />
                {STACK_RIGHT.map((s, i) => (
                  <span key={s.n} className={stackChip} style={{ animationDelay: `${0.6 + i * 0.4}s` }}>
                    <i className="h-2 w-2 rounded-full" style={{ background: s.c, boxShadow: `0 0 10px ${s.c}` }} />
                    {s.n}
                  </span>
                ))}
              </div>
            </div>
          )}

          {n === 6 && (
            <div className="relative mt-5">
              <div className="absolute -bottom-5 right-0">
                <Lottie
                  options={{
                    loop: copied,
                    autoplay: copied,
                    animationData,
                    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
                  }}
                />
              </div>
              <MagicButton
                title={copied ? "Email copied!" : "Copy my email"}
                icon={<IoCopyOutline />}
                iconCopied={<IoCheckboxOutline />}
                position="left"
                otherClasses="!bg-[#161a31]"
                handleClick={handleCopy}
                copied={copied}
              />
            </div>
          )}
        </div>

        {n === 2 && <GlobeDemo />}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover/bento:opacity-100"
        style={{ background: "radial-gradient(420px circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.1), transparent 60%)" }}
      />
      <div aria-hidden className="bento-border" style={{ "--accent": accent } as React.CSSProperties} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/bento:opacity-100"
        style={{
          padding: "1px",
          background: "radial-gradient(260px circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.9), rgba(56,189,248,0.5) 45%, transparent 70%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-20 -translate-x-full bg-linear-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 ease-out group-hover/bento:translate-x-full" />
    </motion.div>
  );
};
