import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import heroAsset from "@/assets/hero-couple.asset.json";
import { APP_CONFIG } from "@/lib/app-config";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Our Little World — Home" },
      { name: "description", content: "Every heartbeat, every memory, belongs to us." },
      { property: "og:title", content: "Our Little World" },
      { property: "og:description", content: "Every heartbeat, every memory, belongs to us." },
      { property: "og:image", content: heroAsset.url },
    ],
  }),
  component: HomePage,
});

const cards = [
  { to: "/letter", icon: "❤️", title: "Love Letter", desc: "from my heart to yours" },
  { to: "/story", icon: "🌸", title: "Our Story", desc: "every memory, in order" },
  { to: "/gallery", icon: "📸", title: "Gallery", desc: "our favourite moments" },
  { to: "/openwhen", icon: "💌", title: "Open When", desc: "for any mood, anytime" },
  { to: "/reasons", icon: "❤️", title: "143 Reasons", desc: "why I love you" },
  { to: "/countdown", icon: "⏳", title: "Countdown", desc: "how long I’ve loved you" },
  { to: "/future", icon: "✨", title: "Future Together", desc: "our dream board" },
  { to: "/favourites", icon: "🌷", title: "Her Favourites", desc: "everything you love" },
  { to: "/final", icon: "🕊️", title: "Forever", desc: "the last page" },
] as const;

function HomePage() {
  return (
    <main className="relative min-h-[100svh] px-5 pb-32 pt-20">
      {/* Hero */}
      <section className="relative mx-auto max-w-5xl">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <p className="font-script text-3xl text-rose">welcome home,</p>
            <h1 className="mt-2 font-display text-5xl font-bold leading-tight sm:text-6xl">
              <span className="text-shimmer">Our Little World</span>
            </h1>
            <div className="mt-6 space-y-1 font-display text-lg italic text-wine/80">
              <p>Every heartbeat,</p>
              <p>Every memory,</p>
              <p>Every smile,</p>
              <p>Every dream…</p>
              <p className="font-script text-2xl not-italic text-rose">belongs to us.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] shadow-romance"
          >
            <img src={heroAsset.url} alt="us" className="h-full w-full object-cover" />
            <div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-white/60 px-3 py-2 text-center backdrop-blur">
              <p className="font-script text-xl text-wine">
                {APP_CONFIG.hisName} & {APP_CONFIG.herName}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Nav cards */}
      <section className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, i) => (
          <motion.div
            key={c.to}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
          >
            <Link
              to={c.to}
              className="group block h-full rounded-3xl glass-card p-6 transition hover:-translate-y-1 hover:shadow-romance"
            >
              <div className="mb-3 text-4xl transition group-hover:scale-125">{c.icon}</div>
              <h3 className="font-display text-xl text-wine">{c.title}</h3>
              <p className="text-sm text-wine/60">{c.desc}</p>
            </Link>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
