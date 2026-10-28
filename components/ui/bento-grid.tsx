"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { BackgroundGradientAnimation } from "./background-gradient-animation";
import { GlobeDemo } from "./grid-globe";
import Lottie from "react-lottie";
import { useState } from "react";
import animationData from "@/data/confetti.json";
import MagicButton from "./magic-button";
import { IoCheckboxOutline, IoCopyOutline } from "react-icons/io5";
import { toast } from "sonner";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-5 md:auto-rows-[8rem] md:grid-cols-6 lg:grid-cols-5",
        className,
      )}
    >
      {children}
    </div>
  );
};

const stackChip =
  "rounded-xl border border-white/10 bg-linear-to-br from-[#161a3d] to-[#0b0d26] px-3 py-2 text-center text-xs text-white/90 shadow-lg shadow-black/30 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-purple-400/60 hover:shadow-purple-500/20 lg:px-4 lg:py-4 lg:text-base";
const stackBlank =
  "rounded-xl border border-white/5 bg-[#10132E]/70 px-3 py-3.5 text-center lg:px-6 lg:py-6";

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

  const handleCopy = () => {
    navigator.clipboard.writeText("momenelshemy1@gmail.com");
    setCopied(true);
    toast.success("Email copied to clipboard!");
  };

  // Feeds the cursor position to the glare + glowing-border layers
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--gx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--gy", `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (id ?? 0) * 0.07, ease: "easeOut" }}
      onPointerMove={onMove}
      className={cn(
        "group/bento relative row-span-1 flex flex-col justify-between space-y-4 overflow-hidden rounded-2xl border border-white/10",
        "shadow-lg shadow-black/40 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-600/25",
        className,
      )}
      style={{
        background:
          "linear-gradient(135deg, #0a0a2e 0%, #060628 45%, #1a0a52 100%)",
      }}
    >
      {/* top highlight edge */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />

      <div className={cn(id === 6 && "flex h-full justify-center")}>
        <div className="absolute h-full w-full">
          {img && (
            <img
              src={img}
              alt=""
              className={cn(imgClassName, "object-cover object-center")}
            />
          )}
        </div>
        <div className={cn("absolute right-0 -bottom-5", id === 5 && "w-full opacity-80")}>
          {spareImg && (
            <img
              src={spareImg}
              alt=""
              className="h-full w-full object-cover object-center"
            />
          )}
        </div>

        {id === 6 && <BackgroundGradientAnimation />}

        <div
          className={cn(
            titleClassName,
            "relative flex min-h-40 flex-col p-5 transition duration-300 group-hover/bento:translate-x-2 md:h-full lg:p-6",
          )}
        >
          <div className="font-sans text-sm font-light tracking-wide text-[#c1c2d3] md:text-xs lg:text-base">
            {description}
          </div>
          <div className="z-10 max-w-96 bg-linear-to-b from-white to-neutral-300 bg-clip-text font-sans text-lg font-bold text-transparent lg:text-2xl">
            {title}
          </div>

          {id === 3 && (
            <div className="absolute -right-3 top-2 flex w-fit gap-1 opacity-90 lg:-right-5">
              <div className="m-4 flex flex-col gap-1 lg:gap-2">
                {["ReactJs", "NextJs", "TypeScript"].map((item) => (
                  <span key={item} className={stackChip}>
                    {item}
                  </span>
                ))}
                <span className={stackBlank} />
              </div>
              <div className="flex flex-col gap-1 lg:gap-2">
                <span className={stackBlank} />
                {["NodeJs", "Express", "MongoDB"].map((item) => (
                  <span key={item} className={stackChip}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {id === 6 && (
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

        {id === 2 && <GlobeDemo />}
      </div>

      {/* cursor glare */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover/bento:opacity-100"
        style={{
          background:
            "radial-gradient(380px circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.09), transparent 60%)",
        }}
      />
      {/* glowing border that follows the cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/bento:opacity-100"
        style={{
          padding: "1px",
          background:
            "radial-gradient(260px circle at var(--gx, 50%) var(--gy, 50%), rgba(167,139,250,0.95), rgba(56,189,248,0.4) 45%, transparent 70%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
    </motion.div>
  );
};
