import type Lenis from "lenis";

/** Module-level Lenis holder so any component can trigger smooth scrolling. */
export const scrollBus: { lenis: Lenis | null } = { lenis: null };

export function smoothTo(target: string | number) {
  if (scrollBus.lenis) {
    scrollBus.lenis.scrollTo(target as never, {
      offset: typeof target === "string" ? -70 : 0,
      duration: 1.6,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
  } else if (typeof target === "string") {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  } else {
    window.scrollTo({ top: target, behavior: "smooth" });
  }
}
