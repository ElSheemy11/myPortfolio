import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { gridItems } from "@/data";

const Grid = () => {
  return (
    <div className="relative">
      {/* soft ambient glow behind the cards */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 mx-auto h-96 w-[70%] rounded-full bg-purple-600/15 blur-[120px]" />
      <section id="about" className="py-20">
        <h2 className="heading mb-4">
          A little <span className="text-purple-400">about me</span>
        </h2>
        <div aria-hidden className="mx-auto mb-14 h-px w-40 bg-linear-to-r from-transparent via-purple-400 to-transparent" />
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
