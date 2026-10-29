"use client";
import React, { JSX, useState, useEffect } from "react";
import { motion } from "motion/react";
import { IoHomeOutline, IoPersonOutline, IoRocketOutline, IoMailOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";

// Default icons (used on mobile) when a nav item has no `icon` of its own
const ICONS: Record<string, JSX.Element> = {
  "#home": <IoHomeOutline />,
  "#about": <IoPersonOutline />,
  "#projects": <IoRocketOutline />,
  "#contact": <IoMailOutline />,
};

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: { name: string; link: string; icon?: JSX.Element }[];
  className?: string;
}) => {
  const [active, setActive] = useState(navItems[0]?.link ?? "");

  // Scroll-spy: track which section is in view
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.link))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [navItems]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-[max(0.75rem,env(safe-area-inset-top))] z-5000 mx-auto flex max-w-fit items-center justify-center sm:top-10",
        className
      )}
    >
      <nav
        aria-label="Primary"
        className="flex items-center gap-1 rounded-2xl border border-white/15 bg-white/80 p-1.5 shadow-lg shadow-black/20 backdrop-blur-xl dark:border-purple-300/20 dark:bg-[#0a0a2e]/70 dark:shadow-[0_0_30px_rgba(139,92,246,0.25)]"
      >
        {navItems.map((navItem, idx) => {
          const isActive = active === navItem.link;
          const icon = navItem.icon ?? ICONS[navItem.link];
          return (
            <motion.a
              layout
              key={`link-${idx}`}
              href={navItem.link}
              aria-label={navItem.name}
              aria-current={isActive ? "page" : undefined}
              onClick={() => setActive(navItem.link)}
              className={cn(
                "relative flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors sm:px-4",
                isActive
                  ? "text-neutral-900 dark:text-white"
                  : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-xl bg-neutral-100 dark:bg-white/10 dark:shadow-[inset_0_0_14px_rgba(167,139,250,0.35)]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {/* mobile: icon only, active item also shows its name; desktop: name only */}
              {icon && <span className="relative z-10 text-lg sm:hidden">{icon}</span>}
              <span className={cn("relative z-10 whitespace-nowrap", icon && !isActive && "hidden sm:block")}>
                {navItem.name}
              </span>
            </motion.a>
          );
        })}
      </nav>
    </motion.div>
  );
};
