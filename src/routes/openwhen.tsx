import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader } from "@/components/romantic/chrome";

export const Route = createFileRoute("/openwhen")({
  head: () => ({
    meta: [
      { title: "Open When — for any mood" },
      { name: "description", content: "Tiny love notes for every feeling." },
      { property: "og:title", content: "Open When" },
      { property: "og:description", content: "Tiny love notes for every feeling." },
    ],
  }),
  component: OpenWhenPage,
});

const cards = [
  { emoji: "😭", title: "When you’re sad", msg: "Breathe, baby. I’m one call away and I always will be. Whatever it is, we’ll sit with it together. You’re not alone — you have me, and I am not going anywhere. Cry as much as you need. I’ll be here to wipe every tear." },
  { emoji: "🥺", title: "When you miss me", msg: "I miss you too. Right now. Even as you read this. Close your eyes — I’m kissing your forehead. Open them — I’m holding your hand. Distance is just geography; we belong to each other in a place no map can find." },
  { emoji: "🤍", title: "When you feel alone", msg: "You are loved by someone whose heart literally has your name carved into it. Look up — same sky. Look inside — same heart, two bodies. You are never alone, Thul Thuli. Never." },
  { emoji: "🌧", title: "When you doubt yourself", msg: "Hey. Stop. I see you clearly, even when you can’t see yourself. You are smart, kind, brave, beautiful, capable. The world is so lucky to have you. I am the luckiest of all. Trust me — I don’t lie about you." },
  { emoji: "😔", title: "When you feel like giving up", msg: "Don’t. Please. Whatever it is — exam, work, family, life — give it one more breath. Then one more. I’ll carry you through the rest. We didn’t come this far to stop. And I am right here, holding your hand." },
  { emoji: "😡", title: "When you’re angry", msg: "Scream into a pillow. Type the meanest text and don’t send it. Then call me and yell. I can take it. I’d rather be your safe place than your polite friend. Your anger is welcome here — all of you is." },
  { emoji: "😴", title: "Before sleeping", msg: "Goodnight, my love. Thank you for today. I hope your dreams are soft and warm. I am thinking of you as I sleep too. Tomorrow we get to love each other all over again. Sweet dreams, Thul Thuli." },
  { emoji: "🌅", title: "After waking up", msg: "Good morning, sunshine. The day is lucky to have you in it. Drink water, stretch, smile once for me. Whatever happens today — I’m on your team. I love you. Now go shine." },
];

function OpenWhenPage() {
  const [open, setOpen] = useState<(typeof cards)[number] | null>(null);
  return (
    <main className="relative min-h-[100svh] pb-32">
      <PageHeader title="Open When…" subtitle="pick your mood, my love" />
      <div className="relative z-10 mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 px-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, i) => (
          <motion.button
            key={c.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setOpen(c)}
            className="group rounded-3xl glass-card p-6 text-left transition hover:-translate-y-1 hover:shadow-romance"
          >
            <div className="mb-3 text-4xl transition group-hover:scale-125">{c.emoji}</div>
            <h3 className="font-display text-lg text-wine">{c.title}</h3>
            <p className="mt-1 text-xs text-wine/60">tap to open</p>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[70] grid place-items-center bg-black/50 p-5 backdrop-blur"
          >
            <motion.div
              initial={{ rotateX: -90, opacity: 0, y: 30 }}
              animate={{ rotateX: 0, opacity: 1, y: 0 }}
              exit={{ rotateX: 90, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-romance"
            >
              <div className="mb-4 text-5xl">{open.emoji}</div>
              <h3 className="font-script text-3xl text-rose">{open.title}</h3>
              <p className="mt-4 font-display text-base leading-relaxed text-wine/90">{open.msg}</p>
              <p className="mt-6 font-script text-xl text-rose">always yours, Bibhu ❤️</p>
              <button onClick={() => setOpen(null)} className="mt-4 text-xs text-wine/50 underline">close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
