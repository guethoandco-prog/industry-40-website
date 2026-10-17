import { ArrowUp } from "lucide-react";
import { smoothTo } from "../utils/scroll";
import { Wordmark } from "./Navbar";

const NAV = [
  ["Réalisations", "#realisations"],
  ["Savoir-faire", "#savoir-faire"],
  ["Processus", "#processus"],
  ["Parc machines", "#machines"],
  ["Industrie 4.0", "#industrie40"],
  ["Contact", "#contact"],
] as const;

const SECTEURS = ["Aéronautique & Défense", "Médical & Implants", "Horlogerie de luxe", "Optique & Moules", "Énergie & Nucléaire"];
const CERTIFS = ["ISO 9001 : 2015", "EN 9100 : 2018", "ISO 13485 — en cours", "Certificats matière 3.1"];

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-panel px-5 pt-16 pb-8 md:px-10 md:pt-24">
      {/* giant wordmark */}
      <div className="pointer-events-none select-none overflow-hidden" aria-hidden>
        <div className="text-outline font-display text-[18.5vw] leading-[0.82] font-bold tracking-[-0.04em] whitespace-nowrap md:text-[17vw]">
          AXIOME
        </div>
      </div>

      <div className="mt-12 grid gap-10 border-t border-line pt-12 md:mt-16 md:grid-cols-12 md:pt-16">
        <div className="md:col-span-4">
          <Wordmark />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-fog">
            Mécanique de précision 4.0. Usinage 5 axes, électroérosion et métrologie pour les secteurs qui ne pardonnent
            aucune approximation.
          </p>
          <p className="mt-6 font-mono text-[10px] tracking-[0.22em] uppercase text-fog/60">
            45.1885° N — 5.7245° E · Grenoble, France
          </p>
        </div>

        <div className="md:col-span-2">
          <h3 className="font-mono text-[10px] tracking-[0.25em] uppercase text-fog/70">Navigation</h3>
          <ul className="mt-5 space-y-3">
            {NAV.map(([label, href]) => (
              <li key={href}>
                <button
                  onClick={() => smoothTo(href)}
                  data-cursor="hover"
                  className="text-sm text-bone/80 transition-colors hover:text-signal"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="font-mono text-[10px] tracking-[0.25em] uppercase text-fog/70">Secteurs</h3>
          <ul className="mt-5 space-y-3">
            {SECTEURS.map((s) => (
              <li key={s} className="flex items-center gap-2 text-sm text-bone/80">
                <span className="h-1 w-1 rotate-45 bg-signal/70" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="font-mono text-[10px] tracking-[0.25em] uppercase text-fog/70">Certifications</h3>
          <ul className="mt-5 space-y-3">
            {CERTIFS.map((c) => (
              <li key={c} className="text-sm text-bone/80">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 font-mono text-[10px] tracking-[0.2em] uppercase text-fog/70 md:flex-row md:items-center">
        <span>© 2025 AXIOME SAS — Tous droits réservés</span>
        <span className="hidden md:block">SIRET 894 123 456 00019 — RCS Grenoble</span>
        <button
          onClick={() => smoothTo(0)}
          data-cursor="hover"
          className="group flex items-center gap-2 uppercase text-bone/80 transition-colors hover:text-signal"
        >
          Retour en haut
          <ArrowUp className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-1" strokeWidth={1.5} />
        </button>
      </div>
    </footer>
  );
}
