import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { CornerTicks, Magnetic, Reveal, SectionIndex } from "./ui";

const CARDS = [
  { icon: Phone, label: "Téléphone", value: "+33 (0)4 76 41 20 20", href: "tel:+33476412020" },
  { icon: Mail, label: "Email", value: "bureau@axiome.fr", href: "mailto:bureau@axiome.fr" },
  {
    icon: MapPin,
    label: "Atelier",
    value: "4 rue des Sablières, 38400 St-Martin-d'Hères",
    href: "#top",
  },
] as const;

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink px-5 py-24 md:px-10 md:py-40">
      <div className="bg-blueprint absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_75%)]" />
      <CornerTicks className="m-5 md:m-10" />

      <div className="relative">
        <SectionIndex index="06" label="Contact — Devis sous 24 h" />

        <Reveal delay={0.1}>
          <h2 className="mt-8 max-w-5xl font-display text-[clamp(2.6rem,7.6vw,7rem)] leading-[0.98] font-medium tracking-[-0.035em] text-bone">
            Une pièce
            <br />
            <em className="font-serif font-light italic text-signal">à usiner ?</em>
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-col items-start gap-10 md:mt-16 md:flex-row md:items-end md:justify-between">
          <Reveal delay={0.2}>
            <Magnetic
              href="mailto:bureau@axiome.fr?subject=Demande%20de%20devis%20%E2%80%94%20usinage%205%20axes"
              className="sweep border border-signal bg-signal px-10 py-6 font-mono text-xs tracking-[0.25em] uppercase text-ink transition-colors duration-500 hover:bg-bone hover:border-bone md:px-14 md:py-8"
            >
              Envoyez votre plan 3D
            </Magnetic>
            <p className="mt-4 max-w-sm font-mono text-[10px] leading-relaxed tracking-[0.15em] uppercase text-fog">
              Formats acceptés : STEP · IGES · X_T · CATIA V5 · PDF coté
            </p>
          </Reveal>

          <Reveal delay={0.3} className="flex items-center gap-3 border border-line px-4 py-3 font-mono text-[10px] tracking-[0.18em] uppercase text-fog">
            <ShieldCheck className="h-4 w-4 text-signal" strokeWidth={1.5} />
            Accord de confidentialité signé sur simple demande
          </Reveal>
        </div>

        {/* contact cards */}
        <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-3 md:mt-20">
          {CARDS.map((c, i) => (
            <Reveal key={c.label} delay={0.1 + i * 0.08} className="h-full">
              <a
                href={c.href}
                data-cursor="hover"
                className="group flex h-full flex-col gap-6 bg-ink p-6 transition-colors duration-500 hover:bg-panel md:p-8"
              >
                <div className="flex items-center justify-between">
                  <c.icon className="h-4 w-4 text-signal" strokeWidth={1.5} />
                  <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-fog">{c.label}</span>
                </div>
                <span className="font-display text-lg font-medium tracking-tight text-bone group-hover:text-signal md:text-xl">
                  {c.value}
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10 flex flex-col items-start justify-between gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-fog/70 md:flex-row md:items-center">
          <span>Réponse chiffrée sous 24 h ouvrées</span>
          <span>Séries de 1 à 50 000 pièces</span>
        </Reveal>
      </div>
    </section>
  );
}
