import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/romantic/chrome";
import { APP_CONFIG } from "@/lib/app-config";

export const Route = createFileRoute("/letter")({
  head: () => ({
    meta: [
      { title: "A Love Letter — for Ankita" },
      { name: "description", content: "An emotional letter from Bibhu to Ankita." },
      { property: "og:title", content: "A Love Letter for Ankita" },
      { property: "og:description", content: "From my heart to yours." },
    ],
  }),
  component: LetterPage,
});

const paragraphs = [
  `My ${APP_CONFIG.herNickname},`,
  `Before you, I was just existing — going through days like they were chores. Then you walked into my life and quietly, gently, you changed everything. You softened the sharp edges I had built around myself. You healed parts of me I thought were broken forever.`,
  `I miss you every single day. Not in a small way — in that aching, full-chest, can’t-stop-thinking-about-you kind of way. The world is louder when you’re not around and quieter when you are; somehow both feel like home.`,
  `Your smile is my favourite thing in the universe. It makes the worst day feel survivable and the best day feel like a movie. Your eyes — god, your eyes — I could write a whole book just about the way they catch the light.`,
  `I love your kindness, your courage, the way you care for people, the way you laugh, the way you scrunch your nose, the way you call me by names only you’re allowed to. I love how safe I feel with you. I love how easy it is to be myself.`,
  `My dream is simple: to marry you. To wake up next to you, fight over the blanket, make coffee badly, build a tiny life that nobody else gets to see the inside of. I want all of it with you and nobody else.`,
  `So here is my promise — written down so you can hold me to it forever. I will stay. I will choose you on the good days, the boring days, and the hard ones. I will protect your peace. I will love you out loud.`,
];

function LetterPage() {
  return (
    <main className="relative min-h-[100svh] pb-32">
      <PageHeader title="A Letter For You" subtitle="read slowly. it’s all true." />
      <article className="relative z-10 mx-auto mt-12 max-w-2xl px-6">
        <div className="rounded-[2rem] glass-card p-8 sm:p-12 shadow-romance">
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
              className="mb-5 font-display text-lg leading-relaxed text-wine/90 first:font-script first:text-3xl first:text-rose"
            >
              {p}
            </motion.p>
          ))}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 font-script text-3xl text-rose"
          >
            I’ll always choose you.
          </motion.p>
          <p className="mt-2 text-right text-wine/70">— {APP_CONFIG.hisName} ❤️</p>
        </div>
      </article>
    </main>
  );
}
