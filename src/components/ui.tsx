import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "../utils/cn";

export const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/*  Fade / rise reveal on scroll                                       */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 1, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Masked line reveal (headline lines container)                      */
/* ------------------------------------------------------------------ */
export function MaskedLine({
  children,
  show,
  delay = 0,
  className,
}: {
  children: ReactNode;
  show: boolean;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={cn("block overflow-hidden pb-[0.08em] -mb-[0.08em]", className)}>
      <motion.span
        className="block will-change-transform"
        initial={{ y: "112%" }}
        animate={show ? { y: "0%" } : { y: "112%" }}
        transition={{ duration: 1.15, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Section eyebrow: "01 — RÉALISATIONS"                               */
/* ------------------------------------------------------------------ */
export function SectionIndex({ index, label, className }: { index: string; label: string; className?: string }) {
  return (
    <Reveal className={cn("flex items-center gap-3 font-mono text-[11px] tracking-[0.28em] uppercase", className)}>
      <span className="text-signal">{index}</span>
      <span className="hairline w-10" />
      <span className="text-fog">{label}</span>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Corner registration ticks ("+") for bordered panels                */
/* ------------------------------------------------------------------ */
export function CornerTicks({ className }: { className?: string }) {
  const pos = [
    "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
    "top-0 right-0 translate-x-1/2 -translate-y-1/2",
    "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
    "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
  ];
  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden>
      {pos.map((p) => (
        <span key={p} className={cn("absolute font-mono text-xs text-signal/70", p)}>
          +
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Magnetic button                                                    */
/* ------------------------------------------------------------------ */
export function Magnetic({
  children,
  className,
  href,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  function onMove(e: MouseEvent) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href ?? "#"}
      onClick={(e) => {
        if (!href) e.preventDefault();
        onClick?.();
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      data-cursor="hover"
      className={cn("group relative inline-flex items-center gap-3 will-change-transform", className)}
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.5} />
    </motion.a>
  );
}

/* ------------------------------------------------------------------ */
/*  Italic serif accent helper: wrap words in *asterisks*              */
/* ------------------------------------------------------------------ */
export function Serif({ children, className }: { children: string; className?: string }) {
  return <em className={cn("font-serif italic font-light", className)}>{children}</em>;
}
