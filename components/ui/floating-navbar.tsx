"use client";
import React, { JSX, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
} from "motion/react";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState(navItems[0]?.link ?? "");

  // Scroll-spy: track which section is in view
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.link))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      {
        // triggers when section crosses roughly the middle of viewport
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navItems]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto z-5000 items-center justify-center",
          className
        )}
      >
        <div className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/80 px-2 py-1.5 shadow-lg shadow-black/10 backdrop-blur-md dark:border-white/10 dark:bg-black/50">
          <div className="h-5 w-px bg-neutral-200 dark:bg-white/10" />

          <div className="flex items-center gap-1">
            {navItems.map((navItem, idx: number) => {
              const isActive = active === navItem.link;
              return (
                <a
                  key={`link-${idx}`}
                  href={navItem.link}
                  onClick={() => setActive(navItem.link)}
                  className={cn(
                    "relative flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
                    )}
                  >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-lg bg-neutral-100 dark:bg-white/10"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10 block sm:hidden">
                    {navItem.icon}
                  </span>
                  <span className="relative z-10 hidden sm:block">
                    {navItem.name}
                  </span>
                </a>
              );
            })}
          </div>

          <div className="h-5 w-px bg-neutral-200 dark:bg-white/10" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};