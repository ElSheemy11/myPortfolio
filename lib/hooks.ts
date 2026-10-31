"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Attaches an IntersectionObserver to the returned element ref.
 * When the element is out of the viewport, it adds the `.paused` class to pause all CSS animations,
 * and sets `isInView` to false so heavy JS/3D effects can pause or unmount.
 */
export function useSectionVisibility<T extends HTMLElement = HTMLElement>(
  margin = "200px 0px"
) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const visible = entry?.isIntersecting ?? true;
        setIsInView(visible);
        if (visible) {
          el.classList.remove("paused");
        } else {
          el.classList.add("paused");
        }
      },
      { rootMargin: margin }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      el.classList.remove("paused");
    };
  }, [margin]);

  return { ref, isInView };
}

/**
 * Responsive breakpoint hook.
 */
export function useIsMobile(query = "(max-width: 767px)") {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(query);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  return isMobile;
}
