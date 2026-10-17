import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE } from "./ui";

const AXES = ["X", "Y", "Z", "A", "C"] as const;

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    let n = 0;
    const id = window.setInterval(() => {
      n += 2 + Math.floor(Math.random() * 8);
      if (n >= 100) {
        n = 100;
        window.clearInterval(id);
        window.setTimeout(() => {
          setGone(true);
          onDone();
        }, 500);
      }
      setCount(n);
    }, 95);
    return () => {
      window.clearInterval(id);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: EASE }}
          className="fixed inset-0 z-[95] flex flex-col justify-between bg-ink p-6 md:p-10"
        >
          {/* top */}
          <motion.div exit={{ opacity: 0 }} className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] uppercase text-fog">
            <span className="text-bone">AXIOME<span className="text-signal">®</span></span>
            <span>Étalonnage des axes en cours…</span>
          </motion.div>

          {/* center counter */}
          <motion.div exit={{ opacity: 0 }} className="flex flex-col items-start gap-6">
            <div className="flex items-end gap-4">
              <span className="font-display text-[18vw] leading-[0.85] font-medium tracking-tighter text-bone md:text-[11rem]">
                {String(count).padStart(3, "0")}
              </span>
              <span className="mb-2 font-mono text-sm text-signal md:mb-4">%</span>
            </div>
            <div className="flex gap-6 font-mono text-[11px] tracking-[0.2em] text-fog">
              {AXES.map((a, i) => (
                <span key={a} className="flex items-center gap-2">
                  <span className="text-bone">{a}</span>
                  <span className={count > (i + 1) * 18 ? "text-signal" : "text-line"}>■</span>
                </span>
              ))}
            </div>
          </motion.div>

          {/* bottom progress */}
          <motion.div exit={{ opacity: 0 }} className="space-y-4">
            <div className="hairline relative w-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-signal"
                style={{ width: `${count}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <div className="flex justify-between font-mono text-[10px] tracking-[0.25em] uppercase text-fog">
              <span>Grenoble — 45.1885° N / 5.7245° E</span>
              <span className="hidden sm:block">Mécanique de précision 4.0</span>
              <span>± 0,001 mm</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
