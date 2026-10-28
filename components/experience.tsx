"use client";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";
import { GlareCard } from "./ui/glare-card";
import SectionBackground from "./ui/section-background";
import { workExperience } from "@/data";

type Item = (typeof workExperience)[number];

/* ------------------------------------------------------------------ */
/* One timeline entry                                                  */
/* ------------------------------------------------------------------ */
function TimelineItem({
  item,
  index,
  progress,
  reduce,
}: {
  item: Item;
  index: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const left = index % 2 === 0;
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const frac = useRef(2); // where along the timeline this node sits (0..1); 2 = not measured yet

  // Measure the node position so it lights up exactly when the glowing line reaches it.
  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const measure = () => {
      frac.current = (el.offsetTop + 36) / parent.offsetHeight;
      setActive(progress.get() >= frac.current);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(parent);
    return () => ro.disconnect();
  }, [progress]);

  useMotionValueEvent(progress, "change", (v) => {
    const next = v >= frac.current;
    setActive((prev) => (prev === next ? prev : next));
  });

  // Scroll-linked depth: cards scale up as they reach the middle of the screen,
  // the date drifts at a different speed than the card.
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const cardScale = useTransform(p, [0, 0.25, 0.5, 0.75, 1], reduce ? [1, 1, 1, 1, 1] : [0.94, 1, 1.02, 1, 0.96]);
  const cardOpacity = useTransform(p, [0, 0.15, 0.85, 1], reduce ? [1, 1, 1, 1] : [0.4, 1, 1, 0.4]);
  const cardY = useTransform(p, [0, 1], reduce ? [0, 0] : [24, -24]);
  const dateY = useTransform(p, [0, 1], reduce ? [0, 0] : [56, -56]);
  const dateOpacity = useTransform(p, [0, 0.25, 0.75, 1], [0.15, 1, 1, 0.15]);

  return (
    <div
      ref={ref}
      className="relative mb-12 pl-12 last:mb-0 md:mb-24 md:grid md:grid-cols-2 md:gap-20 md:pl-0"
      style={{ perspective: 1200 }}
    >
      {/* node on the line */}
      <span aria-hidden className="absolute left-4 top-7 z-10 -translate-x-1/2 md:left-1/2">
        {active && !reduce && (
          <span className="absolute inset-0 m-auto size-4 animate-ping rounded-full bg-purple-400/60" />
        )}
        <motion.span
          animate={{
            scale: active ? 1.25 : 0.8,
            backgroundColor: active ? "#a78bfa" : "#000319",
            boxShadow: active ? "0 0 22px 6px rgba(167,139,250,0.85)" : "0 0 0px 0px rgba(167,139,250,0)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="relative block size-4 rounded-full border-2 border-purple-300"
        />
      </span>

      {/* beam from the node to the card (desktop) */}
      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "absolute top-9 hidden h-px w-10 md:block",
          left
            ? "right-1/2 origin-right bg-linear-to-l from-purple-400 to-transparent"
            : "left-1/2 origin-left bg-linear-to-r from-purple-400 to-transparent",
        )}
      />

      {/* date (desktop: opposite side of the card) */}
      <motion.div
        style={{ y: dateY, opacity: dateOpacity }}
        className={cn("hidden items-start pt-4 md:flex", left ? "order-2 justify-start" : "order-1 justify-end")}
      >
        <p className="bg-linear-to-r from-white to-purple-300 bg-clip-text text-4xl font-bold text-transparent">
          {item.date}
        </p>
      </motion.div>

      {/* card: 3D flip-in once, then scroll-linked parallax */}
      <motion.div
        initial={
          reduce
            ? { opacity: 0 }
            : { opacity: 0, x: left ? -60 : 60, rotateY: left ? 16 : -16, filter: "blur(10px)" }
        }
        whileInView={{ opacity: 1, x: 0, rotateY: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={left ? "order-1" : "order-2"}
      >
        <motion.div style={{ scale: cardScale, opacity: cardOpacity, y: cardY }}>
          <GlareCard className="p-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-purple-300 md:hidden">{item.date}</p>
            <h3 className="bg-linear-to-b from-white to-neutral-300 bg-clip-text text-lg font-bold text-transparent lg:text-xl">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-purple-300/80">{item.place}</p>
            <p className="mt-3 text-sm font-light leading-relaxed text-[#c1c2d3] lg:text-base">{item.desc}</p>

            <motion.div
              className="mt-4 flex flex-wrap gap-2"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.35 } } }}
            >
              {item.tags.map((t) => (
                <motion.span
                  key={t}
                  variants={{
                    hidden: { opacity: 0, y: 10, scale: 0.85 },
                    show: { opacity: 1, y: 0, scale: 1 },
                  }}
                  whileHover={{ y: -2 }}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-neutral-300 transition-colors hover:border-purple-300/60 hover:text-white"
                >
                  {t}
                </motion.span>
              ))}
            </motion.div>
          </GlareCard>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function Experience() {
  const reduce = useReducedMotion() ?? false;
  const timelineRef = useRef<HTMLDivElement>(null);

  // The glowing line fills as you scroll. Its tip always sits ~60% down the viewport.
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 60%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.0005 });
  const headTop = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <section id="experience" className="relative isolate w-full overflow-hidden px-4 py-28 md:px-8">
      <SectionBackground variant="experience" />

      <h2 className="heading flex flex-wrap justify-center gap-x-3">
        {["My", "experience"].map((w, i) => (
          <motion.span
            key={w}
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
            className={cn(
              i === 1 && "text-shimmer bg-linear-to-r from-purple-400 via-sky-300 to-purple-400 bg-clip-text text-transparent",
            )}
          >
            {w}
          </motion.span>
        ))}
      </h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="mx-auto mt-4 max-w-xl text-center text-neutral-400"
      >
        Where I&apos;ve built, studied, and grown as a developer.
      </motion.p>

      <motion.div
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="mx-auto mt-6 h-px w-40 bg-linear-to-r from-transparent via-purple-400 to-transparent"
      />

      <div ref={timelineRef} className="relative mx-auto mt-24 max-w-5xl">
        {/* track */}
        <div aria-hidden className="absolute bottom-0 left-4 top-0 w-px -translate-x-1/2 bg-white/10 md:left-1/2" />

        {/* filled line */}
        <motion.div
          aria-hidden
          style={{ scaleY: progress }}
          className="absolute bottom-0 left-4 top-0 w-0.5 origin-top -translate-x-1/2 bg-linear-to-b from-purple-400 via-indigo-400 to-sky-400 shadow-[0_0_16px_2px_rgba(167,139,250,0.7)] md:left-1/2"
        />

        {/* comet at the tip of the line */}
        <motion.div
          aria-hidden
          style={{ top: headTop }}
          className="absolute left-4 z-20 -translate-x-1/2 -translate-y-1/2 md:left-1/2"
        >
          <span className="block size-3 rounded-full bg-white shadow-[0_0_20px_8px_rgba(167,139,250,0.9),0_0_50px_16px_rgba(56,189,248,0.4)]" />
        </motion.div>

        {workExperience.map((item, i) => (
          <TimelineItem key={item.id} item={item} index={i} progress={progress} reduce={reduce} />
        ))}
      </div>
    </section>
  );
}
