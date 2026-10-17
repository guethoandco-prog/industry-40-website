import { motion, useScroll, useSpring } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useState } from "react";
import Contact from "./components/Contact";
import Cursor from "./components/Cursor";
import Expertise from "./components/Expertise";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Industry40 from "./components/Industry40";
import Machines from "./components/Machines";
import Marquee, { StatsBand } from "./components/Marquee";
import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import Process from "./components/Process";
import Realizations from "./components/Realizations";
import { scrollBus } from "./utils/scroll";

const SECTORS = [
  "Usinage 5 axes",
  "Aéronautique",
  "Médical",
  "Horlogerie",
  "Moules & outillages",
  "Énergie",
  "Métrologie 3D",
];

const PROMISES = ["Réponse sous 24 h", "Devis transparents", "NDA sur demande", "Livraison Europe 48 h", "Séries 1 à 50 000 pièces"];

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[80] h-0.5 origin-left bg-signal" />;
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.25, smoothWheel: true, touchMultiplier: 1.6 });
    scrollBus.lenis = lenis;
    lenis.stop(); // wait for preloader
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      scrollBus.lenis = null;
    };
  }, []);

  useEffect(() => {
    if (loaded) scrollBus.lenis?.start();
  }, [loaded]);

  return (
    <div className="grain min-h-screen bg-ink font-display text-bone antialiased">
      <Preloader onDone={() => setLoaded(true)} />
      <Cursor />
      <ScrollProgress />
      <Navbar ready={loaded} />
      <main>
        <Hero ready={loaded} />
        <Marquee items={SECTORS} />
        <StatsBand />
        <Realizations />
        <Expertise />
        <Process />
        <Machines />
        <Industry40 />
        <Marquee items={PROMISES} tone="signal" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
