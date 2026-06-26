import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { RomanticBackground } from "@/components/romantic/chrome";
import { APP_CONFIG } from "@/lib/app-config";

export const Route = createFileRoute("/final")({
  head: () => ({
    meta: [
      { title: "Forever Begins With You" },
      { name: "description", content: "A promise, under the moon, with you." },
      { property: "og:title", content: "Forever Begins With You" },
      { property: "og:description", content: "A promise, under the moon, with you." },
    ],
  }),
  component: FinalPage,
});

function FinalPage() {
  const [heartTaps, setHeartTaps] = useState(0);
  const [hiddenMsg, setHiddenMsg] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => document.documentElement.classList.remove("dark");
  }, []);

  const onHeart = () => {
    const n = heartTaps + 1;
    setHeartTaps(n);
    if (n === 10) {
      confetti({ particleCount: 180, spread: 90, origin: { y: 0.6 }, colors: ["#FF5E9C", "#7B1436", "#F4C542", "#FFD6E8"] });
      setHiddenMsg(true);
      setTimeout(() => setHiddenMsg(false), 5000);
    }
  };

  return (
    <main className="relative min-h-[100svh] overflow-hidden pb-32 pt-24">
      {/* Override the daytime background with night */}
      <RomanticBackground variant="night" />

      {/* Lanterns */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: 0 }}
          animate={{ y: [-12, 12, -12] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute h-10 w-7 rounded-full bg-gradient-to-b from-[#f4c542] to-[#f29a3b] opacity-90 shadow-[0_0_30px_8px_rgba(244,197,66,0.4)]"
          style={{ left: `${10 + i * 14}%`, top: `${20 + (i % 3) * 8}%` }}
        />
      ))}

      <section className="relative z-10 mx-auto max-w-2xl px-6 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-script text-5xl text-[#ffd6e8] sm:text-6xl"
        >
          Forever Begins With You
        </motion.h1>
        <p className="mt-2 text-2xl">❤️</p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.2 }}
          className="mt-10 space-y-4 font-display text-lg leading-relaxed text-white/90"
        >
          <p>No matter where life takes us,</p>
          <p>I’ll always choose you.</p>
          <p>Thank you for coming into my life.</p>
          <p>Thank you for healing me.</p>
          <p>Thank you for loving me.</p>
          <p>I promise to love, respect, support and stand beside you every day.</p>
          <p>You’re not just my girlfriend.</p>
          <p>You’re my favourite person, my home, my peace,</p>
          <p>and the person I dream of spending my future with.</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-10 font-script text-4xl text-[#ff9ec1]"
        >
          I love you forever, {APP_CONFIG.herNickname}.
        </motion.p>
        <p className="mt-2 text-white/80">— Love, {APP_CONFIG.hisName} ❤️</p>

        <button
          onClick={onHeart}
          className="mt-12 inline-flex items-center justify-center text-6xl transition active:scale-90"
          aria-label="Tap the heart"
        >
          <span className="animate-heartbeat">❤️</span>
        </button>
        <p className="mt-2 text-xs text-white/60">(psst… tap me 10 times)</p>

        <AnimatePresence>
          {hiddenMsg && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 rounded-3xl bg-white/10 p-6 backdrop-blur"
            >
              <p className="font-script text-2xl text-[#ffd6e8]">
                “I’ll always find my way back to you.”
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
