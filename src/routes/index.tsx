import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroAsset from "@/assets/hero-couple.asset.json";
import { Sparkly } from "@/components/romantic/chrome";
import { APP_CONFIG } from "@/lib/app-config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Would you be my forever? — Bibhu ❤️ Ankita" },
      { name: "description", content: "A little proposal for Ankita." },
      { property: "og:title", content: "Would you be my forever?" },
      { property: "og:description", content: "A magical memory book for Ankita." },
      { property: "og:image", content: heroAsset.url },
    ],
  }),
  component: ProposalPage,
});

function ProposalPage() {
  const navigate = useNavigate();
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [escapes, setEscapes] = useState(0);

  const dodge = () => {
    const x = (Math.random() - 0.5) * 320;
    const y = (Math.random() - 0.5) * 160;
    setNoPos({ x, y });
    setEscapes((e) => e + 1);
  };

  const sayNo = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      setNoPos({ x: 0, y: 0 });
      setEscapes(0);
    }, 4500);
  };

  return (
    <main className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-10">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative z-10 mx-auto w-full max-w-md text-center"
      >
        <p className="font-script text-3xl text-rose">welcome to</p>
        <h1 className="mt-1 font-display text-4xl font-bold leading-tight text-wine sm:text-5xl">
          Our Little World <span className="inline-block animate-heartbeat">❤️</span>
        </h1>

        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 80 }}
          className="relative mx-auto mt-6 aspect-[4/5] w-full max-w-xs overflow-hidden rounded-[2rem] shadow-romance"
        >
          <img
            src={heroAsset.url}
            alt={`${APP_CONFIG.hisName} and ${APP_CONFIG.herName}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 ring-1 ring-white/40" />
          <div className="absolute -inset-1 -z-10 rounded-[2.25rem] gradient-wine blur-2xl opacity-50" />
        </motion.div>

        <p className="mt-6 font-display text-2xl text-wine">
          {APP_CONFIG.hisName} <span className="text-rose">❤️</span> {APP_CONFIG.herName}
        </p>
        <p className="mt-2 italic text-wine/70">
          “I love you so much {APP_CONFIG.herNickname} 🫂”
        </p>

        <h2 className="mt-8 font-script text-4xl text-wine">Would You Be My Forever?</h2>

        <div className="relative mt-7 flex items-center justify-center gap-4">
          <Sparkly>
            <button
              onClick={() => navigate({ to: "/home" })}
              className="rounded-full bg-rose px-7 py-3 font-semibold text-white shadow-romance transition hover:scale-105 active:scale-95"
            >
              ❤️ YES
            </button>
          </Sparkly>
          <motion.button
            animate={noPos}
            transition={{ type: "spring", stiffness: 220, damping: 14 }}
            onMouseEnter={dodge}
            onTouchStart={dodge}
            onClick={escapes > 6 ? sayNo : dodge}
            className="rounded-full border border-wine/30 bg-white/70 px-7 py-3 font-semibold text-wine/70 backdrop-blur transition"
          >
            💔 NO
          </motion.button>
        </div>
        <p className="mt-3 text-xs text-wine/50">(try clicking NO… i dare you)</p>
      </motion.div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-black/40 p-5 backdrop-blur"
          >
            <motion.div
              initial={{ scale: 0.7, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.7 }}
              className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white p-8 text-center shadow-romance"
            >
              <div className="mb-3 text-5xl animate-heartbeat">😂❤️</div>
              <h3 className="font-display text-2xl text-wine">Congratulations</h3>
              <p className="mt-3 text-wine/80">
                You officially have <b>no chance to reject</b>.
                <br />
                Forever means forever.
              </p>
              <p className="mt-4 text-xs text-wine/50">redirecting back…</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
