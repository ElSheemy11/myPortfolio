"use client";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function GlareCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const frameRef = useRef<number | null>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const target = e.currentTarget;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      if (!target) return;
      const r = target.getBoundingClientRect();
      target.style.setProperty("--gx", `${clientX - r.left}px`);
      target.style.setProperty("--gy", `${clientY - r.top}px`);
    });
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
