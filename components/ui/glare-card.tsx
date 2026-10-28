"use client";
import { cn } from "@/lib/utils";

export function GlareCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--gx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--gy", `${e.clientY - r.top}px`);
  };
  return (
    <div
      onPointerMove={onMove}
      className={cn(
        "group/glare relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-[#0a0a2e] via-[#060628] to-[#1a0a52] shadow-lg shadow-black/40 transition duration-300 hover:border-white/25 hover:shadow-purple-600/25",
        className,
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover/glare:opacity-100"
        style={{ background: "radial-gradient(380px circle at var(--gx,50%) var(--gy,50%), rgba(167,139,250,0.16), transparent 60%)" }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
