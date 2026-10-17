import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { smoothTo } from "../utils/scroll";
import { EASE } from "./ui";

const LINKS = [
  { label: "Réalisations", href: "#realisations" },
  { label: "Savoir-faire", href: "#savoir-faire" },
  { label: "Processus", href: "#processus" },
  { label: "Parc machines", href: "#machines" },
  { label: "Industrie 4.0", href: "#industrie40" },
];

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span className="relative grid h-7 w-7 place-items-center">
        <span className="absolute inset-0 rotate-45 border border-signal" />
        <span className="h-1.5 w-1.5 bg-signal" />
      </span>
      <span className="font-display text-lg font-semibold tracking-tight text-bone">
        AXIOME<span className="text-signal">®</span>
      </span>
    </span>
  );
}

export default function Navbar({ ready }: { ready: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  const go = (href: string) => {
    setOpen(false);
    window.setTimeout(() => smoothTo(href), open ? 350 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -32, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.2, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-[60] transition-colors duration-500 ${
          scrolled ? "border-b border-line bg-ink/75 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 md:px-10">
          <a
            href="#top"
            data-cursor="hover"
            onClick={(e) => {
              e.preventDefault();
              go("#top");
            }}
            aria-label="AXIOME — Accueil"
          >
            <Wordmark />
          </a>

          {/* desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
            {LINKS.map((l, i) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                data-cursor="hover"
                className="group relative font-mono text-[11px] tracking-[0.22em] uppercase text-fog transition-colors duration-300 hover:text-bone"
              >
                <span className="mr-1.5 text-signal/80">0{i + 1}</span>
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-signal transition-all duration-500 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => go("#contact")}
              data-cursor="hover"
              className="group hidden items-center gap-2 border border-line px-5 py-2.5 font-mono text-[11px] tracking-[0.2em] uppercase text-bone transition-all duration-500 hover:border-signal hover:bg-signal hover:text-ink sm:flex"
            >
              Devis sous 24 h
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-45" />
            </button>
            <button
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              data-cursor="hover"
              className="grid h-10 w-10 place-items-center border border-line text-bone transition-colors hover:border-signal lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-[70] flex flex-col bg-panel"
          >
            <div className="flex items-center justify-between px-5 py-4 md:px-10">
              <Wordmark />
              <button
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
                className="grid h-10 w-10 place-items-center border border-line text-bone transition-colors hover:border-signal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-1 px-6" aria-label="Menu mobile">
              {[...LINKS, { label: "Contact", href: "#contact" }].map((l, i) => (
                <motion.button
                  key={l.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: EASE }}
                  onClick={() => go(l.href)}
                  className="group flex items-baseline gap-4 border-b border-line/60 py-4 text-left"
                >
                  <span className="font-mono text-xs text-signal">0{i + 1}</span>
                  <span className="font-display text-4xl font-medium tracking-tight text-bone transition-colors group-hover:text-signal sm:text-5xl">
                    {l.label}
                  </span>
                </motion.button>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-between px-6 pb-8 font-mono text-[10px] tracking-[0.2em] uppercase text-fog"
            >
              <span className="flex items-center gap-2">
                <Phone className="h-3 w-3 text-signal" /> +33 (0)4 76 41 20 20
              </span>
              <span>Grenoble, FR</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
