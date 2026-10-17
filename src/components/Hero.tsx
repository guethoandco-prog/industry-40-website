import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { smoothTo } from "../utils/scroll";
import { EASE, MaskedLine } from "./ui";

const META = [
  ["Tolérance", "± 0,001 mm"],
  ["Certifications", "ISO 9001 · EN 9100"],
  ["Position", "45.1885° N — 5.7245° E"],
  ["Production", "24 h / 24 — 7 j / 7"],
] as const;

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);

  return (
    <section ref={ref} id="top" className="relative overflow-hidden bg-ink">
      {/* --- backdrop --- */}
      <motion.div style={{ y: imgY }} className="absolute inset-[-12%]">
        <motion.img
          src="/images/hero.jpg"
          alt="Impulseur turbine en titane usiné en 5 axes par AXIOME"
          fetchPriority="high"
          initial={{ scale: 1.16 }}
          animate={ready ? { scale: 1 } : {}}
          transition={{ duration: 2.4, ease: EASE }}
          className="h-full w-full object-cover opacity-80"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/25 to-transparent" />
      <div className="bg-blueprint absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_85%)]" />

      {/* --- rotating badge --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute top-[34%] right-10 z-10 hidden lg:block xl:right-24"
      >
        <div className="relative grid h-36 w-36 place-items-center">
          <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden>
            <defs>
              <path id="circ" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
            </defs>
            <text className="fill-bone/60 font-mono text-[8px] uppercase" style={{ letterSpacing: "0.32em" }}>
              <textPath href="#circ">Pièces d'exception · Usinées en France · 5 axes ·</textPath>
            </text>
          </svg>
          <ArrowDown className="h-5 w-5 text-signal" strokeWidth={1.5} />
        </div>
      </motion.div>

      {/* --- content --- */}
      <motion.div
        style={{ opacity: fade, y: contentY }}
        className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 md:px-10"
      >
        <div className="pb-10 md:pb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
            className="mb-6 flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase text-bone/80 md:mb-10"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping bg-signal/70" />
              <span className="h-2 w-2 bg-signal" />
            </span>
            Mécanique de précision 4.0 — Atelier connecté
            <span className="hairline w-16" />
            <span className="hidden text-fog sm:block">Est. 2008</span>
          </motion.div>

          <h1 className="font-display font-medium tracking-[-0.035em] text-bone">
            <MaskedLine show={ready} delay={0.45} className="text-[clamp(2.7rem,8.4vw,8rem)] leading-[0.96]">
              Usinage 5 axes
            </MaskedLine>
            <MaskedLine show={ready} delay={0.58} className="text-[clamp(2rem,6vw,5.6rem)] leading-[1.05]">
              <em className="font-serif font-light italic text-bone">
                à précision <span className="text-signal">extrême.</span>
              </em>
            </MaskedLine>
          </h1>

          <div className="mt-8 grid gap-6 md:mt-12 md:grid-cols-12 md:items-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.85, ease: EASE }}
              className="max-w-xl text-sm leading-relaxed text-fog md:col-span-6 md:text-[15px]"
            >
              Impulseurs titane, implants médicaux, moules haute brillance — nous usinons les géométries les plus
              exigeantes aux tolérances du micron, dans un atelier entièrement connecté ouvert 24&nbsp;h/24.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.95, ease: EASE }}
              className="flex flex-wrap items-center gap-4 md:col-span-6 md:justify-end"
            >
              <button
                onClick={() => smoothTo("#realisations")}
                data-cursor="hover"
                className="group flex items-center gap-3 bg-bone px-6 py-3.5 font-mono text-[11px] tracking-[0.2em] uppercase text-ink transition-colors duration-500 hover:bg-signal"
              >
                Voir les réalisations
                <ArrowDown className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-y-0.5" />
              </button>
              <button
                onClick={() => smoothTo("#contact")}
                data-cursor="hover"
                className="group flex items-center gap-3 border border-bone/30 px-6 py-3.5 font-mono text-[11px] tracking-[0.2em] uppercase text-bone transition-all duration-500 hover:border-signal hover:text-signal"
              >
                Envoyer un plan
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-45" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* --- meta bar --- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.3 }}
          className="grid grid-cols-2 gap-y-4 border-t border-bone/15 py-5 font-mono text-[10px] tracking-[0.2em] uppercase md:grid-cols-4"
        >
          {META.map(([k, v]) => (
            <div key={k} className="flex flex-col gap-1.5 md:flex-row md:items-baseline md:gap-3">
              <span className="text-fog/70">{k}</span>
              <span className="text-bone/90">{v}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
