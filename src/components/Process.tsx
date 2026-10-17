import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { CornerTicks, EASE, Reveal, SectionIndex } from "./ui";

const STEPS = [
  {
    n: "01",
    phase: "Phase d'étude",
    title: "Bureau des méthodes & CAO",
    desc: "Analyse de faisabilité dès réception du plan : reprise de cotes, proposition DFM pour optimiser l'usinabilité et le coût. Devis chiffré et daté sous 24 heures ouvrées.",
    meta: ["STEP · IGES · X_T · CATIA V5", "Devis < 24 h"],
  },
  {
    n: "02",
    phase: "Programmation",
    title: "FAO & jumeau numérique",
    desc: "Parcours outils générés sur hyperMILL® avec simulation cinématique complète de la machine. Chaque collision potentielle est éliminée avant d'entrer en atelier.",
    meta: ["hyperMILL® 5 axes", "Simulation 100 %"],
  },
  {
    n: "03",
    phase: "Fabrication",
    title: "Usinage 24 h / 24 — 7 j / 7",
    desc: "Centre palettisé à 32 positions, réfrigération, robot d'ébavurage en ligne. Auto-contrôle palpeur en machine à chaque étape, données versées au dossier numérique de la pièce.",
    meta: ["32 palettes automatiques", "Palpage Renishaw"],
  },
  {
    n: "04",
    phase: "Validation",
    title: "Contrôle & traçabilité",
    desc: "Contrôle tridimensionnel de 100 % des caractéristiques critiques en salle climatisée. Livraison avec certificat matière 3.1, rapport de mesure et conformité FAI si requise.",
    meta: ["Certificat matière 3.1", "FAI / PPAP niv. 3"],
  },
] as const;

export default function Process() {
  return (
    <section id="processus" className="relative bg-ink px-5 py-24 md:px-10 md:py-36">
      <CornerTicks className="m-5 md:m-10" />
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        {/* sticky intro */}
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <SectionIndex index="03" label="Processus" />
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-4xl leading-[1.02] font-medium tracking-[-0.03em] text-bone md:text-6xl">
                Un process
                <br />
                sous contrôle <em className="font-serif font-light italic text-signal">total.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-fog">
                Quatre phases verrouillées, une seule interlocutrice pour chaque affaire. Votre pièce traverse l'atelier
                avec son dossier numérique — jamais l'inverse.
              </p>
            </Reveal>
            <Reveal delay={0.35} className="mt-8 space-y-3">
              {STEPS.map((s) => (
                <div key={s.n} className="flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] uppercase text-fog">
                  <Check className="h-3 w-3 text-signal" strokeWidth={2} />
                  {s.phase} — {s.title.split("&")[0].trim()}
                </div>
              ))}
            </Reveal>
          </div>
        </div>

        {/* steps */}
        <div className="space-y-6 md:col-span-7 md:col-start-6">
          {STEPS.map((s) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 1, delay: 0.05, ease: EASE }}
              className="group relative overflow-hidden border border-line bg-panel p-7 transition-colors duration-500 hover:border-signal/50 md:p-10"
            >
              <span className="text-outline absolute -top-4 right-4 font-display text-8xl font-bold md:text-[9rem] md:leading-none">
                {s.n}
              </span>
              <div className="relative">
                <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] uppercase">
                  <span className="text-signal">Étape {s.n}</span>
                  <span className="hairline w-8" />
                  <span className="text-fog">{s.phase}</span>
                </div>
                <h3 className="mt-4 max-w-md font-display text-2xl font-medium tracking-tight text-bone md:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-fog">{s.desc}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.meta.map((m) => (
                    <span
                      key={m}
                      className="border border-line px-3 py-1.5 font-mono text-[9px] tracking-[0.18em] uppercase text-bone/70"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-signal transition-all duration-700 group-hover:w-full" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
