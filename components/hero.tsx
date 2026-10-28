"use client";
import { useRef } from "react";
import { FaGithub, FaLocationArrow } from "react-icons/fa6";
import { Spotlight } from "./ui/spotlight";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import MagicButton from "./ui/magic-button";
import { contact } from "@/data";

const words = "Transforming Concepts into Seamless User Experiences";

// Deterministic positions (no Math.random during render)
const stars = Array.from({ length: 42 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  top: (i * 53 + 7) % 100,
  delay: (i % 7) * 0.8,
  size: i % 5 === 0 ? 2 : 1,
}));

const Hero = () => {
  const ref = useRef<HTMLElement>(null);

  // Feeds the cursor position to the "glare" layer of the grid
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section
      id="home"
      ref={ref}
      onPointerMove={onMove}
      className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-[#000319] px-4 pb-20 pt-28"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="aurora aurora-a" />
        <div className="aurora aurora-b" />
        <div className="aurora aurora-c" />
        <div className="grid-base" />
        <div className="grid-glare" />
        {stars.map((s, i) => (
          <span
            key={i}
            className="star"
            style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
          />
        ))}
        <div className="sweep" />
        <Spotlight className="-top-40 -left-10 h-screen md:-top-32 md:-left-20" fill="white" />
        <Spotlight className="top-10 left-[70%] h-[80vh] w-[50vw]" fill="purple" />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
        {/* edge fade so the grid melts into the page */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#000319_88%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-[#000319]" />
      </div>

      <div className="relative z-10 flex max-w-[89vw] flex-col items-center text-center md:max-w-2xl lg:max-w-[60vw]">
        <span className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-widest text-blue-100 backdrop-blur">
          Front-end &amp; Full-stack · Aswan, Egypt
        </span>
        <TextGenerateEffect
          className="mt-5 text-center text-[40px] text-white md:text-5xl lg:text-6xl"
          words={words}
          duration={1}
        />
        <p className="mb-8 max-w-2xl text-sm text-neutral-300 md:text-lg lg:text-xl">
          Hi, I&apos;m Sheemy, a web developer specializing in Next.js. I build fast, polished sites and dashboards, from hotel platforms to AI tools.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <MagicButton title="Explore My Work" icon={<FaLocationArrow />} position="right" otherClasses="gap-2" handleClick={() => { window.location.hash = "projects"; }} />
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-md border border-white/15 bg-white/5 px-6 text-sm font-medium text-white backdrop-blur transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            <FaGithub /> GitHub
          </a>
        </div>
      </div>

      <span aria-hidden className="absolute bottom-8 z-10 h-9 w-5 rounded-full border border-white/30">
        <span className="mx-auto mt-2 block h-2 w-1 animate-bounce rounded-full bg-white/70" />
      </span>
    </section>
  );
};

export default Hero;
