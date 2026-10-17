import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { cn } from "../utils/cn";
import { CornerTicks, EASE, Reveal, SectionIndex } from "./ui";

type Piece = {
  ref: string;
  name: string;
  img: string;
  matiere: string;
  tolerance: string;
  secteur: string;
  note: string;
};

const PIECES: Piece[] = [
  {
    ref: "AX-2201",
    name: "Impulseur aéronautique Ø 380",
    img: "/images/piece-impeller.jpg",
    matiere: "Titane Ti-6Al-4V Gr. 5",
    tolerance: "± 0,005 mm",
    secteur: "Aéronautique",
    note: "5 axes simultanés · 96 h de coupe",
  },
  {
    ref: "AX-2213",
    name: "Châssis structural de voilure",
    img: "/images/piece-aerospace.jpg",
    matiere: "AU4G / 2017A anodisé",
    tolerance: "± 0,015 mm",
    secteur: "Défense & Aéro",
    note: "Poches à parois minces 0,8 mm",
  },
  {
    ref: "AX-2230",
    name: "Cage rachidienne lombaire",
    img: "/images/piece-orthopedics.jpg",
    matiere: "Titane Ti-6Al-4V ELI",
    tolerance: "± 0,010 mm",
    secteur: "Médical",
    note: "Micro-structure lattice · état Ra 0,2",
  },
  {
    ref: "AX-2198",
    name: "Moule injection haute brillance",
    img: "/images/piece-mold.jpg",
    matiere: "1.2343 ESU — 52 HRC",
    tolerance: "± 0,004 mm",
    secteur: "Optique & Moules",
    note: "Poli miroir A1 · empreinte 3D",
  },
  {
    ref: "AX-2244",
    name: "Platine & rouages de calibre",
    img: "/images/piece-watch.jpg",
    matiere: "CuBe2 rhodié · acier 20AP",
    tolerance: "± 0,003 mm",
    secteur: "Horlogerie",
    note: "Anglage & côtes de Genève",
  },
  {
    ref: "AX-2251",
    name: "Bloc hydraulique multiservice",
    img: "/images/piece-manifold.jpg",
    matiere: "Inox 316L",
    tolerance: "± 0,008 mm",
    secteur: "Énergie",
    note: "64 perçages profonds intersectants",
  },
];

const LAYOUT = [
  "md:col-span-7 aspect-[4/3]",
  "md:col-span-5 aspect-[4/4.4] md:mt-24",
  "md:col-span-5 aspect-[4/4.4] md:-mt-16",
  "md:col-span-7 aspect-[4/3] md:mt-24",
  "md:col-span-6 aspect-[4/3]",
  "md:col-span-6 aspect-[4/3] md:mt-16",
];

function PieceCard({ piece, index }: { piece: Piece; index: number }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, ease: EASE }}
      className={cn("group col-span-1 flex flex-col", LAYOUT[index])}
      data-cursor="Détail"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* image */}
      <div className="sweep relative flex-1 overflow-hidden border border-line bg-panel">
        <motion.img
          src={piece.img}
          alt={piece.name}
          loading={index > 1 ? "lazy" : undefined}
          animate={{ scale: hover ? 1.07 : 1 }}
          transition={{ duration: 1.4, ease: EASE }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/30" />

        {/* ref + arrow */}
        <div className="absolute top-4 right-4 left-4 flex items-start justify-between font-mono text-[10px] tracking-[0.2em] uppercase">
          <span className="border border-bone/20 bg-ink/60 px-2.5 py-1.5 text-bone/90 backdrop-blur-sm">
            RÉF {piece.ref}
          </span>
          <motion.span
            animate={{ rotate: hover ? 45 : 0, backgroundColor: hover ? "#ff4d00" : "rgba(10,10,11,0.6)" }}
            transition={{ duration: 0.4 }}
            className="grid h-9 w-9 place-items-center border border-bone/20 text-bone backdrop-blur-sm"
          >
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
          </motion.span>
        </div>

        {/* bottom note */}
        <div className="absolute right-4 bottom-4 left-4 translate-y-1 font-mono text-[10px] tracking-[0.15em] uppercase text-bone/70 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          {piece.note}
        </div>
      </div>

      {/* meta */}
      <div className="border border-t-0 border-line px-5 py-5 md:px-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-lg font-medium tracking-tight text-bone md:text-xl">{piece.name}</h3>
          <span className="shrink-0 font-mono text-[10px] tracking-[0.2em] uppercase text-signal">{piece.secteur}</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-4 font-mono text-[10px] tracking-[0.12em] uppercase">
          <div>
            <span className="text-fog/60">Matière</span>
            <p className="mt-1 text-bone/85">{piece.matiere}</p>
          </div>
          <div>
            <span className="text-fog/60">Tolérance</span>
            <p className="mt-1 text-signal">{piece.tolerance}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Realizations() {
  return (
    <section id="realisations" className="relative bg-ink px-5 py-24 md:px-10 md:py-36">
      <CornerTicks className="m-5 md:m-10" />
      {/* header */}
      <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <SectionIndex index="01" label="Réalisations — Usinage 5 axes" />
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-4xl leading-[1.02] font-medium tracking-[-0.03em] text-bone sm:text-5xl md:text-7xl">
              Des pièces <em className="font-serif font-light italic text-signal">d'exception,</em>
              <br />
              usinées une à une.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.25} className="md:col-span-4 md:text-right">
          <p className="text-sm leading-relaxed text-fog md:ml-auto md:max-w-xs">
            Chaque référence est documentée : matière, programme FAO, rapport de mesure 3D. Une traçabilité totale, de
            la barre brute à la livraison.
          </p>
          <p className="mt-4 font-mono text-[10px] tracking-[0.25em] uppercase text-bone/60">
            — 1 200 références / an
          </p>
        </Reveal>
      </div>

      {/* grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-x-8 md:gap-y-0">
        {PIECES.map((p, i) => (
          <PieceCard key={p.ref} piece={p} index={i} />
        ))}
      </div>

      {/* footer row */}
      <Reveal className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 font-mono text-[10px] tracking-[0.25em] uppercase text-fog md:mt-24 md:flex-row">
        <span>Sélection 2024 — 2025 · secteurs réglementés</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rotate-45 bg-signal" /> Photos : atelier AXIOME, tolérances contractuelles
        </span>
      </Reveal>
    </section>
  );
}
