"use client";
import { useEffect, useMemo } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  duration = 0.6,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = useMemo(() => words.split(" "), [words]);

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        y: 0,
      },
      {
        duration: duration || 0.6,
        delay: stagger(0.12),
        ease: "easeOut",
      }
    );
  }, [animate, duration]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className={`${idx > 3 ? "text-purple-500" : "dark:text-white text-black"} inline-block opacity-0`}
              style={{
                y: 8,
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="my-4">
        <div className="dark:text-white text-black leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
