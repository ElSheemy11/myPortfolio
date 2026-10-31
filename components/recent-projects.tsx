import React from "react";
import { projects } from "@/data";
import ProjectCard from "./ui/project-card";

const RecentProjects = () => {
  return (
    <section className="relative py-20 cv-auto" id="projects">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 mx-auto h-96 w-[70%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.18)_0%,transparent_70%)]" />
      <h2 className="heading">
        A small selection of <span className="text-purple-500">recent projects</span>
      </h2>
      <div aria-hidden className="mx-auto mb-14 mt-4 h-px w-40 bg-linear-to-r from-transparent via-purple-400 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 xl:grid-cols-3">
        {projects.map(({ id, title, des, img, iconLists, link }, i) => (
          <ProjectCard key={id} index={i} title={title} des={des} img={img} iconLists={iconLists} link={link} />
        ))}
      </div>
    </section>
  );
};

export default RecentProjects;
