import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/romantic/chrome";

export const Route = createFileRoute("/future")({
  head: () => ({
    meta: [
      { title: "Our Future — Dream Board" },
      { name: "description", content: "Every dream we’ll tick off together." },
      { property: "og:title", content: "Our Future Together" },
      { property: "og:description", content: "Every dream we’ll tick off together." },
    ],
  }),
  component: FuturePage,
});

const dreams = [
  { icon: "🏡", text: "Our dream home" },
  { icon: "💍", text: "Marriage" },
  { icon: "🚗", text: "White Mercedes G-Wagon" },
  { icon: "🍗", text: "KFC date" },
  { icon: "🍛", text: "Biryani date" },
  { icon: "🌷", text: "Tulip garden together" },
  { icon: "🌹", text: "Rose garden together" },
  { icon: "✈️", text: "Travel the world" },
  { icon: "👨‍👩‍👧", text: "Our little family" },
];

function FuturePage() {
  const [done, setDone] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setDone((s) => {
      const n = new Set(s);
      n.has(i) ? n.delete(i) : n.add(i);
      return n;
    });

  return (
    <main className="relative min-h-[100svh] pb-32">
      <PageHeader title="Future Together" subtitle="our little dream board" />
      <div className="relative z-10 mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 px-5 sm:grid-cols-2 lg:grid-cols-3">
        {dreams.map((d, i) => {
          const checked = done.has(i);
          return (
            <motion.button
              key={i}
              whileTap={{ scale: 0.96 }}
              onClick={() => toggle(i)}
              className={`group flex items-center gap-4 rounded-3xl p-5 text-left shadow-romance transition ${
                checked ? "bg-wine text-white" : "glass-card text-wine"
              }`}
            >
              <span className="text-4xl">{d.icon}</span>
              <span className={`font-display text-lg ${checked ? "line-through opacity-80" : ""}`}>
                {d.text}
              </span>
              <span className="ml-auto text-xl">{checked ? "✅" : "○"}</span>
            </motion.button>
          );
        })}
      </div>
      <p className="mx-auto mt-10 max-w-md px-6 text-center text-sm text-wine/60">
        tap each one as we live it. let’s tick this whole list together.
      </p>
    </main>
  );
}
