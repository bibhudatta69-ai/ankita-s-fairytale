import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/romantic/chrome";

export const Route = createFileRoute("/reasons")({
  head: () => ({
    meta: [
      { title: "143 Reasons I Love You" },
      { name: "description", content: "A reason for every part of you." },
      { property: "og:title", content: "143 Reasons I Love You" },
      { property: "og:description", content: "A reason for every part of you." },
    ],
  }),
  component: ReasonsPage,
});

const SEED = [
  "Your smile", "Your eyes", "Your kindness", "Your laugh", "Your voice on calls",
  "How you say my name", "How you scrunch your nose", "Your patience with me", "Your heart",
  "The way you care for your family", "How brave you are", "Your hands", "Your hair",
  "Your messages at 2 AM", "How safe I feel with you", "Your stubbornness (yes that too)",
  "How you fight with me, then hug me", "Your favourite songs", "Your taste in food",
  "How you love biryani", "How you love KFC", "How you love roses", "How you love tulips",
  "Your pink obsession", "Your wine-coloured everything", "The way you walk",
  "Your forehead I kiss in the photo", "How easily you forgive me", "How you remember small things",
  "The way you write", "How you call me Bibi", "How you call yourself Thul Thuli",
  "Your sleepy voice", "Your morning voice", "Your bad-day voice", "The way you say ‘aaru’",
  "Your dreams", "Your ambition", "Your softness", "Your strength",
  "Your loyalty", "Your honesty", "Your jealousy (a little)", "How you protect me",
  "How you let me protect you", "The way you cry when you love something deeply",
  "Your taste in movies", "Your taste in clothes", "Your perfume", "Your skin",
  "How you eat sweets", "How you eat spicy food and pretend it’s fine", "Your handwriting",
  "Your selfies", "Your candid photos", "How you pose", "How you don’t pose",
  "The way you call after fights", "How you never really stay angry", "Your tiny ears",
  "Your earrings", "Your bangles", "The way you twirl your hair", "Your dance",
  "Your singing", "Your humming", "Your silence", "Your gossip",
  "Your kindness to strangers", "How you treat waiters and drivers", "Your respect for elders",
  "Your friendship with your best friend", "Your trust in me", "Your faith in us",
  "How you forgive my chaos", "How you celebrate small wins", "How you make ordinary days feel special",
  "Your festival energy", "Your Raja energy", "Your monsoon energy", "Your sunset energy",
  "Your sunrise energy", "Your rain dance", "Your tea preferences", "Your coffee preferences",
  "The way you sleep", "The way you wake up", "Your dreams of our home", "Your dreams of our G-Wagon",
  "Your love for May flowers", "The way you smell after a bath", "The way you laugh at my bad jokes",
  "How you save my voice notes", "How you replay our memories", "Your apology hugs",
  "Your forehead-to-forehead moments", "Your soft no’s", "Your loud yes’s",
  "Your handwritten notes", "Your random ‘I love you’ texts", "Your good night messages",
  "Your good morning sunshine", "Your patience with my mood swings", "Your faith when I doubt myself",
  "Your reminders to eat", "Your reminders to sleep", "Your reminders to breathe",
  "How you build me up", "How you ground me", "How you ruin me for anyone else",
  "How nobody else feels like home", "How you make peace feel possible", "How you make forever feel real",
  "Your collarbones", "Your shoulders I rest on", "Your fingers between mine",
  "Your slow smiles", "Your shy smiles", "Your evil little grin", "Your judgmental eyebrow",
  "Your obsession with neat handwriting", "Your messy room you pretend is clean",
  "Your habit of stealing my hoodies", "Your habit of stealing my fries",
  "How you cry at romantic scenes", "How you secretly love cheesy lines",
  "Your dreams about being a mom one day", "Your dreams about our family",
  "How you choose me, every day", "How you’d still choose me on my worst day",
  "Your soul", "Your future self", "Your past self", "Your present self",
  "Every version of you that has ever existed", "Every version of you yet to come",
  "The fact that you exist", "The fact that you chose me", "The fact that this is real",
];
const TOTAL = 143;
const REASONS = Array.from({ length: TOTAL }, (_, i) => SEED[i % SEED.length]);

function ReasonsPage() {
  return (
    <main className="relative min-h-[100svh] pb-32">
      <PageHeader title="143 Reasons" subtitle="tap each card. there are 143 of you." />
      <div className="relative z-10 mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-3 px-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {REASONS.map((r, i) => (
          <ReasonCard key={i} index={i + 1} reason={r} />
        ))}
      </div>
    </main>
  );
}

function ReasonCard({ index, reason }: { index: number; reason: string }) {
  const [flipped, setFlipped] = useState(false);
  const tilt = useMemo(() => (Math.random() - 0.5) * 4, []);
  return (
    <button
      onClick={() => setFlipped((f) => !f)}
      className="relative aspect-[3/4] [perspective:900px]"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <motion.div
        className="absolute inset-0 [transform-style:preserve-3d] transition-transform duration-700"
        animate={{ rotateY: flipped ? 180 : 0 }}
      >
        {/* front */}
        <div className="absolute inset-0 grid place-items-center rounded-2xl gradient-wine text-white shadow-romance [backface-visibility:hidden]">
          <div className="text-center">
            <div className="font-script text-2xl">reason</div>
            <div className="font-display text-3xl">#{index}</div>
            <div className="mt-2 text-xl animate-heartbeat">❤</div>
          </div>
        </div>
        {/* back */}
        <div className="absolute inset-0 grid place-items-center rounded-2xl glass-card p-3 text-center shadow-romance [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <p className="font-display text-sm leading-snug text-wine sm:text-base">{reason}</p>
        </div>
      </motion.div>
    </button>
  );
}
