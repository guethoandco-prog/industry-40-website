import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "../utils/cn";
import { EASE } from "./ui";

/* ------------------------------------------------------------------ */
/*  Marquee ticker                                                     */
/* ------------------------------------------------------------------ */
export default function Marquee({
  items,
  className,
  tone = "bone",
}: {
  items: string[];
  className?: string;
  tone?: "bone" | "signal";
}) {
  const row = (
    <>
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-8 pr-8 md:gap-14 md:pr-14">
          <span
            className={cn(
              "text-3xl tracking-tight uppercase md:text-5xl",
              i % 2 ? "font-serif font-light normal-case italic" : "font-display font-medium",
              tone === "signal" ? "text-signal" : i % 2 ? "text-outline" : "text-bone",
            )}
          >
            {it}
          </span>
          <span className={cn("h-2 w-2 rotate-45", tone === "signal" ? "bg-bone/40" : "bg-signal")} />
        </span>
      ))}
    </>
  );
  return (
    <div className={cn("relative overflow-hidden border-y border-line py-6 md:py-8", className)}>
      <div className="flex w-max animate-marquee will-change-transform">
        <div className="flex">{row}</div>
        <div className="flex" aria-hidden>
          {row}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated counter                                                   */
/* ------------------------------------------------------------------ */
function Counter({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 50, damping: 18 });

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, to, mv]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      if (ref.current)
        ref.current.textContent =
          v.toLocaleString("fr-FR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    });
    return unsub;
  }, [spring, suffix, decimals]);

  return <span ref={ref}>0{suffix}</span>;
}

/* ------------------------------------------------------------------ */
/*  Stats band                                                         */
/* ------------------------------------------------------------------ */
const STATS: { value: number; decimals?: number; prefix?: string; suffix?: string; label: string; sub: string }[] = [
  { value: 0.5, decimals: 1, prefix: "± ", suffix: " µm", label: "Tolérance minimale", sub: "Garantie par contrôle 3D" },
  { value: 42, label: "Machines CNC connectées", sub: "Dont 18 centres 5 axes" },
  { value: 24, suffix: "/7", label: "Production continue", sub: "Palettisation automatisée" },
  { value: 98.7, decimals: 1, suffix: " %", label: "Taux de service", sub: "Sur 17 ans d'activité" },
];

export function StatsBand() {
  return (
    <section className="border-b border-line bg-panel">
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
            className={cn(
              "group relative border-line px-6 py-10 md:px-10 md:py-14",
              i < 3 && "lg:border-r",
              i % 2 === 0 && "max-lg:border-r",
              i < 2 && "max-lg:border-b",
            )}
          >
            <div className="font-display text-4xl font-medium tracking-tight text-bone md:text-6xl">
              {s.prefix}
              <Counter to={s.value} decimals={s.decimals ?? 0} suffix={s.suffix ?? ""} />
            </div>
            <div className="mt-5 font-mono text-[10px] tracking-[0.22em] uppercase text-fog">
              <span className="text-signal">/</span> {s.label}
            </div>
            <div className="mt-1 font-mono text-[10px] tracking-[0.1em] text-fog/60">{s.sub}</div>
            <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-signal transition-all duration-700 group-hover:w-full" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
