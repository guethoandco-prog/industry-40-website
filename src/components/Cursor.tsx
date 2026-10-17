import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE } from "./ui";

export default function Cursor() {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  const dx = useSpring(mx, { stiffness: 900, damping: 60, mass: 0.2 });
  const dy = useSpring(my, { stiffness: 900, damping: 60, mass: 0.2 });
  const rx = useSpring(mx, { stiffness: 180, damping: 20, mass: 0.5 });
  const ry = useSpring(my, { stiffness: 180, damping: 20, mass: 0.5 });

  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      const t = (e.target as HTMLElement | null)?.closest?.("[data-cursor]") as HTMLElement | null;
      setHover(!!t);
      const v = t?.getAttribute("data-cursor");
      setLabel(v && v !== "hover" ? v : null);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden [@media(pointer:fine)]:block" aria-hidden>
      {/* dot */}
      <motion.div
        style={{ x: dx, y: dy }}
        className="absolute top-0 left-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal"
      />
      {/* ring */}
      <motion.div
        style={{ x: rx, y: ry }}
        animate={{ scale: hover ? 1.9 : 1, opacity: label ? 0 : 1 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="absolute top-0 left-0 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bone/50 mix-blend-difference"
      >
        <span className="font-mono text-[7px] tracking-widest text-bone/50" style={{ transform: "translate(1px,1px)" }}>
          +
        </span>
      </motion.div>
      {/* label bubble */}
      <AnimatePresence>
        {label && (
          <motion.div
            style={{ x: rx, y: ry }}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="absolute top-0 left-0 -translate-x-1/2 -translate-y-[140%]"
          >
            <span className="rounded-full bg-signal px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase text-ink whitespace-nowrap">
              {label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
