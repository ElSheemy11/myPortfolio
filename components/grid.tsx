"use client";
import React from "react";
import { motion } from "motion/react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { gridItems } from "@/data";

const Grid = () => {
  return (
    <div className="relative isolate overflow-hidden">
      <section id="about" className="relative px-4 py-16 sm:px-8 md:px-10 md:py-24 lg:px-24 cv-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-10 flex flex-col items-center md:mb-16"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-purple-200 shadow-[0_0_30px_rgba(168,85,247,0.35)] md:mb-5 md:px-4 md:text-xs md:tracking-[0.3em]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-300 shadow-[0_0_8px_2px_rgba(216,180,254,0.9)]" />
            About
          </span>
          <h2 className="heading">
            A little{" "}
            <span className="text-shimmer bg-linear-to-r from-purple-300 via-cyan-300 to-purple-300 bg-clip-text text-transparent">
              about me
            </span>
          </h2>
          <div aria-hidden className="mt-4 h-px w-40 bg-linear-to-r from-transparent via-purple-400 to-transparent shadow-[0_0_14px_2px_rgba(168,85,247,0.7)] md:mt-5 md:w-56" />
        </motion.div>

        <BentoGrid>
          {gridItems.map(({ id, title, description, className, img, imgClassName, titleClassName, spareImg }) => (
            <BentoGridItem
              id={id}
              key={id}
              title={title}
              description={description}
              className={className}
              img={img}
              imgClassName={imgClassName}
              titleClassName={titleClassName}
              spareImg={spareImg}
            />
          ))}
        </BentoGrid>
      </section>
    </div>
  );
};

export default Grid;
