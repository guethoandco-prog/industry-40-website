import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { CornerTicks, Reveal, SectionIndex } from "./ui";

const EXPERTISE = [
  {
    n: "01",
    title: "Fraisage 5 axes simultanés",
    desc: "Géométries complexes en une seule prise : surfaces gauches, contre-dépouilles, turbomachines. Répétabilité garantie par calibration laser et palpage en machine.",
    tags: ["Turbomachines", "Parois minces", "Jusqu'à Ø 850 mm"],
  },
  {
    n: "02",
    title: "Tournage-fraisage milléturn",
    desc: "Pièces de révolution complètes en une prise de barre : fraisage radial/axial, axe Y, contre-poupée. Idéal pour implants, raccords et visserie spéciale.",
    tags: ["Barreur Ø 2–65 mm", "Axe Y", "Contre-opération"],
  },
  {
    n: "03",
    title: "Électroérosion à fil",
    desc: "Découpe dans acier durci ou carbure jusqu'à 400 mm de hauteur, fil Ø 0,07 mm. Angles vifs, rayons faibles, états de surface Ra 0,2.",
    tags: ["Acier durci 64 HRC", "Fil Ø 0,07 mm", "Pente ± 30°"],
  },
  {
    n: "04",
    title: "Métrologie tridimensionnelle",
    desc: "Salle climatisée 20 °C ± 0,5, machine à mesurer Zeiss certifiée. Rapport de mesure dimensionnelle et FAI/PPAP sur demande, pour chaque série.",
    tags: ["Zeiss Contura G2", "± 0,9 µm + L/350", "Rapport numérique"],
  },
] as const;

export default function Expertise() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: bannerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-16%", "16%"]);

  return (
    <section id="savoir-faire" className="relative bg-panel px-5 py-24 md:px-10 md:py-36">
      <CornerTicks className="m-5 md:m-10" />
      {/* header */}
      <div className="mb-12 md:mb-16">
        <SectionIndex index="02" label="Savoir-faire" />
        <div className="mt-6 grid gap-8 md:grid-cols-12 md:items-end">
          <Reveal delay={0.1} className="md:col-span-8">
            <h2 className="font-display text-4xl leading-[1.02] font-medium tracking-[-0.03em] text-bone sm:text-5xl md:text-7xl">
              Quatre métiers,
              <br />
              une obsession : <em className="font-serif font-light italic text-signal">la justesse.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.25} className="md:col-span-4">
            <p className="max-w-xs text-sm leading-relaxed text-fog md:ml-auto">
              De la barre brute au rapport de mesure, chaque opération est maîtrisée en interne. Aucune sous-traitance
              cachée.
            </p>
          </Reveal>
        </div>
      </div>

      {/* rows */}
      <div className="border-t border-line">
        {EXPERTISE.map((e, i) => (
          <Reveal key={e.n} delay={i * 0.05}>
            <div
              className="group grid gap-4 border-b border-line px-2 py-8 transition-colors duration-500 hover:bg-bone md:grid-cols-12 md:items-center md:gap-6 md:px-6 md:py-12"
              data-cursor="hover"
            >
              <span className="font-mono text-xs text-signal md:col-span-1">({e.n})</span>
              <h3 className="font-display text-2xl font-medium tracking-tight text-bone transition-colors duration-500 group-hover:text-ink md:col-span-4 md:text-4xl">
                {e.title}
              </h3>
              <p className="text-sm leading-relaxed text-fog transition-colors duration-500 group-hover:text-ink/70 md:col-span-5">
                {e.desc}
              </p>
              <div className="flex flex-wrap gap-2 md:col-span-2 md:flex-col md:items-end">
                {e.tags.map((t) => (
                  <span
                    key={t}
                    className="border border-line px-2.5 py-1 font-mono text-[9px] tracking-[0.15em] uppercase text-fog transition-colors duration-500 group-hover:border-ink/30 group-hover:text-ink/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <ArrowUpRight className="hidden h-6 w-6 text-signal opacity-0 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100 md:block" />
            </div>
          </Reveal>
        ))}
      </div>

      {/* parallax banner */}
      <div ref={bannerRef} className="relative mt-16 h-[52vh] overflow-hidden border border-line md:mt-24 md:h-[64vh]">
        <motion.img
          src="/images/metrology.jpg"
          alt="Palpeur de machine tridimensionnelle Zeiss mesurant une pièce usinée"
          loading="lazy"
          style={{ y, scale: 1.25 }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/30" />
        <div className="absolute bottom-0 flex w-full flex-col gap-2 p-6 font-mono text-[10px] tracking-[0.22em] uppercase text-bone/80 md:p-10">
          <span className="text-signal">Salle métrologie climatisée</span>
          <span className="font-display text-xl tracking-tight normal-case md:text-2xl">
            Zeiss Contura G2 — incertitude 0,9 µm + L/350
          </span>
        </div>
        <span className="absolute top-6 right-6 hidden font-mono text-[10px] tracking-[0.25em] uppercase text-bone/60 md:block">
          CTRL — 20.0 °C ± 0,5
        </span>
      </div>
    </section>
  );
}
