import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/romantic/chrome";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — Bibhu & Ankita" },
      { name: "description", content: "Every moment that brought us here." },
      { property: "og:title", content: "Our Story" },
      { property: "og:description", content: "Every moment that brought us here." },
    ],
  }),
  component: StoryPage,
});

const moments = [
  { date: "The First Hello", title: "Our first conversation", desc: "I didn’t know yet — but this was the start of everything." },
  { date: "14 May", title: "Officially yours", desc: "The day we said yes to us. The best decision of my life." },
  { date: "One Month In", title: "Our first month anniversary", desc: "Already couldn’t imagine a single day without you." },
  { date: "Raja Festival", title: "Our Raja together", desc: "Pithas, swings, and the way you laughed — I’ll never forget." },
  { date: "The Three Words", title: "First “I love you”", desc: "I said it because I couldn’t hold it in anymore. You said it back like you’d been waiting." },
  { date: "Every day since", title: "Becoming us", desc: "Inside jokes, late-night calls, soft fights, softer apologies — building a tiny world only we live in." },
];

function StoryPage() {
  return (
    <main className="relative min-h-[100svh] pb-32">
      <PageHeader title="Our Story" subtitle="a timeline of us" />
      <div className="relative z-10 mx-auto mt-16 max-w-3xl px-6">
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-rose via-wine to-gold sm:left-1/2 sm:-translate-x-1/2" />
          {moments.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className={`relative mb-10 sm:w-1/2 ${
                i % 2 === 0 ? "sm:pr-12" : "sm:ml-[50%] sm:pl-12"
              } pl-12`}
            >
              <span className="absolute left-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-rose text-xs text-white shadow-romance sm:left-auto sm:right-[-12px] sm:translate-x-0 animate-heartbeat"
                style={ i % 2 === 0 ? {} : { left: -12, right: "auto" } }>
                ❤
              </span>
              <div className="rounded-2xl glass-card p-5 shadow-romance">
                <p className="font-script text-2xl text-rose">{m.date}</p>
                <h3 className="font-display text-xl text-wine">{m.title}</h3>
                <p className="mt-1 text-sm text-wine/70">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
