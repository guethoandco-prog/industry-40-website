import { motion } from "framer-motion";
import { CornerTicks, EASE, Reveal, SectionIndex } from "./ui";

const MACHINES = [
  { name: "Hermle C 42 U dynamic", type: "Fraisage 5 axes", courses: "850 × 700 × 500", perf: "18 000 tr/min" },
  { name: "DMG MORI DMU 65 monoBLOCK", type: "Fraisage 5 axes", courses: "650 × 650 × 560", perf: "20 000 tr/min" },
  { name: "Matsuura MAM72-35V", type: "5 axes palettisé", courses: "350 × 350 × 350", perf: "30 000 tr/min" },
  { name: "Mikron MILL P 800 U", type: "Fraisage 5 axes HSC", courses: "800 × 800 × 600", perf: "36 000 tr/min" },
  { name: "Okuma GENOS L250-E", type: "Tournage-fraisage", courses: "Ø 250 × 450", perf: "4 500 tr/min" },
  { name: "Charmilles CUT 3000", type: "Électroérosion fil", courses: "400 × 300 × 250", perf: "Fil Ø 0,07 mm" },
  { name: "Zeiss Contura G2 10/16/6", type: "Métrologie 3D", courses: "1 000 × 1 600 × 600", perf: "0,9 µm + L/350" },
] as const;

const COLS = "md:grid-cols-[6rem_1fr_12rem_12rem_9rem]";

export default function Machines() {
  return (
    <section id="machines" className="relative bg-panel px-5 py-24 md:px-10 md:py-36">
      <CornerTicks className="m-5 md:m-10" />
      <div className="mb-12 grid gap-8 md:mb-16 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <SectionIndex index="04" label="Parc machines" />
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-4xl leading-[1.02] font-medium tracking-[-0.03em] text-bone sm:text-5xl md:text-7xl">
              Le meilleur
              <br />
              de <em className="font-serif font-light italic text-signal">la machine-outil.</em>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.25} className="md:col-span-4 md:text-right">
          <p className="text-sm leading-relaxed text-fog md:ml-auto md:max-w-xs">
            42 équipements répartis sur 4 200 m², renouvelés en continu. Tous rétrofités capteurs IoT et reliés à notre
            MES maison.
          </p>
        </Reveal>
      </div>

      {/* table header */}
      <Reveal className={`hidden ${COLS} border-b border-line px-4 pb-3 font-mono text-[9px] tracking-[0.25em] uppercase text-fog/70 md:grid`}>
        <span>Réf</span>
        <span>Machine</span>
        <span>Technologie</span>
        <span>Courses X · Y · Z</span>
        <span className="text-right">Performance</span>
      </Reveal>

      <div>
        {MACHINES.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.03, ease: EASE }}
              data-cursor="hover"
              className={`group ${COLS} border-b border-line px-4 py-6 transition-colors duration-500 hover:bg-bone max-md:block md:grid md:items-center md:gap-x-8`}
            >
            {/* mobile */}
            <div className="flex items-baseline justify-between md:hidden">
              <span className="font-mono text-[10px] text-signal">M.{String(i + 1).padStart(2, "0")}</span>
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-fog">{m.type}</span>
            </div>
            <h3 className="mt-2 font-display text-xl font-medium tracking-tight text-bone transition-colors duration-500 group-hover:text-ink md:hidden">
              {m.name}
            </h3>
            <p className="mt-2 font-mono text-[10px] tracking-[0.15em] uppercase text-fog md:hidden">
              {m.courses} — {m.perf}
            </p>

            {/* desktop */}
            <span className="hidden font-mono text-xs text-signal md:block">M.{String(i + 1).padStart(2, "0")}</span>
            <h3 className="hidden font-display text-xl font-medium tracking-tight text-bone transition-colors duration-500 group-hover:text-ink md:block lg:text-2xl">
              {m.name}
            </h3>
            <span className="hidden font-mono text-[10px] tracking-[0.18em] uppercase text-fog transition-colors duration-500 group-hover:text-ink/70 md:block">
              {m.type}
            </span>
            <span className="hidden font-mono text-[10px] tracking-[0.18em] text-fog transition-colors duration-500 group-hover:text-ink/70 md:block">
              {m.courses}
            </span>
            <span className="hidden text-right font-mono text-[10px] tracking-[0.18em] uppercase text-signal transition-colors duration-500 group-hover:text-signal md:block">
              {m.perf}
            </span>
          </motion.div>
        ))}
      </div>

      <Reveal className="mt-8 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] uppercase text-fog">
        <span>Liste non exhaustive — 42 équipements</span>
        <span className="hidden md:block">Visites atelier sur rendez-vous</span>
      </Reveal>
    </section>
  );
}
