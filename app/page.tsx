import Grid from "@/components/grid";
import Hero from "@/components/hero";
import RecentProjects from "@/components/recent-projects";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/Data";
import { FaHome } from "react-icons/fa";

export default function Home() {
  return (
      <main className="relative flex min-h-screen w-full max-w-full flex-col items-center justify-between bg-white dark:bg-[#000319] overflow-hidden mx-auto px-4 py-8 sm:px-2 sm:py-4 sm:items-start md:px-8 md:py-16">
       <div className="w-full max-full ">
        <FloatingNav 
          navItems={navItems}
        />
        <Hero />
        <Grid />
        <RecentProjects />
        </div>
      </main>
  );
}
