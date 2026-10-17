import { motion, useScroll, useTransform } from "framer-motion";
import { Activity, Gauge, Layers, ScanLine } from "lucide-react";
import { useRef } from "react";
import { CornerTicks, EASE, Reveal, SectionIndex } from "./ui";

const FEATURES = [
  {
    icon: Gauge,
    label: "TRS piloté en direct",
    desc: "87,4 % mesuré en continu sur l'ensemble du parc. Chaque machine rend compte, chaque équipe pilote.",
  },
  {
    icon: Layers,
    label: "Jumeau numérique",
    desc: "Chaque parcours d'outil est validé sur la réplique numérique de la machine : zéro collision réelle.",
  },
  {
    icon: Activity,
    label: "Maintenance prédictive",
    desc: "Capteurs vibratoires et thermiques sur toutes les broches. On vous livre avant que la machine ne tombe.",
  },
  {
    icon: ScanLine,
    label: "Traçabilité unitaire",
    desc: "Chaque pièce porte son identifiant : nuance, coulée de matière, opérateur, contrôles. Infalsifiable.",
  },
] as const;

export default function Industry40() {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section id="industrie40" className="relative bg-ink px-5 py-24 md:px-10 md:py-36">
      <CornerTicks className="m-5 md:m-10" />
      <div className="grid gap-12 md:grid-cols-12 md:gap-10">
        {/* image with telemetry */}
        <div ref={imgRef} className="relative order-2 md:order-1 md:col-span-6">
          <div className="sweep relative h-full min-h-[420px] overflow-hidden border border-line md:min-h-[560px]">
            <motion.img
              src="/images/machine.jpg"
              alt="Centre d'usinage 5 axes connecté en cours de fonctionnement"
              loading="lazy"
              style={{ y, scale: 1.22 }}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/20" />

            {/* telemetry card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: EASE }}
              className="absolute right-5 bottom-5 left-5 border border-bone/15 bg-ink/70 p-5 backdrop-blur-md"
            >
              <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] uppercase">
                <span className="flex items-center gap-2 text-bone">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-signal" />
                    <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                  </span>
                  MAM72-35V — En cycle
                </span>
                <span className="text-fog">MAJ 0,4 s</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 font-mono">
                {[
                  ["Broche", "24 300 tr/min"],
                  ["Avance", "8 200 mm/min"],
                  ["Vibration", "0,4 mm/s"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <span className="text-[9px] tracking-[0.2em] uppercase text-fog">{k}</span>
                    <p className="mt-1 text-xs text-bone">{v}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 h-1 w-full overflow-hidden bg-bone/10">
                <motion.div
                  initial={{ width: "12%" }}
                  whileInView={{ width: "92%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.2, delay: 0.6, ease: EASE }}
                  className="h-full bg-signal"
                />
              </div>
              <div className="mt-2 flex justify-between font-mono text-[9px] tracking-[0.2em] uppercase text-fog">
                <span>Chargement palette</span>
                <span className="text-signal">92 %</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* content */}
        <div className="order-1 md:order-2 md:col-span-6">
          <SectionIndex index="05" label="Industrie 4.0" />
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-4xl leading-[1.02] font-medium tracking-[-0.03em] text-bone sm:text-5xl md:text-6xl">
              L'atelier connecté,
              <br />
              <em className="font-serif font-light italic text-signal">en temps réel.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-fog">
              Vingt-trois capteurs par machine, un MES maison, des données consolidées à la seconde. La mécanique 4.0
              n'est pas un slogan ici : c'est ce qui nous permet de tenir le micron, pièce après pièce, nuit et
              week-end compris.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-px bg-line sm:grid-cols-2">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.9, delay: i * 0.07, ease: EASE }}
                className="group bg-ink p-6 transition-colors duration-500 hover:bg-panel md:p-7"
              >
                <f.icon className="h-5 w-5 text-signal" strokeWidth={1.5} />
                <h3 className="mt-4 font-display text-base font-medium tracking-tight text-bone">{f.label}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-fog">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-6 font-mono text-[10px] tracking-[0.25em] uppercase text-fog/70">
            MES · ERP · IoT — 1 380 mesures / seconde remontées du parc
          </Reveal>
        </div>
      </div>
    </section>
  );
}
