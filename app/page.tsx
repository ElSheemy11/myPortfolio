import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Grid from "@/components/grid";
import Hero from "@/components/hero";
import RecentProjects from "@/components/recent-projects";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/data";

export default function Home() {
  return (
    <main className="relative flex w-full flex-col items-center overflow-x-clip bg-white dark:bg-[#000319]">
      <FloatingNav navItems={navItems} />
      <Hero />      
      <div className="w-full max-w-7xl px-4 md:px-8">
        <Grid />
        <RecentProjects />
      </div>
      <div className="mx-auto mb-20 mt-8 h-px w-40 bg-linear-to-r from-transparent via-purple-400 to-transparent" />
      <Experience />
      <div className="mx-auto mb-20 mt-8 h-px w-40 bg-linear-to-r from-transparent via-purple-400 to-transparent" />
      <Contact />
    </main>
  );
}
