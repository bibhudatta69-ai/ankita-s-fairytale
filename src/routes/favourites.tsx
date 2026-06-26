import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/romantic/chrome";

export const Route = createFileRoute("/favourites")({
  head: () => ({
    meta: [
      { title: "Her Favourite Things" },
      { name: "description", content: "Everything Ankita loves." },
      { property: "og:title", content: "Her Favourites" },
      { property: "og:description", content: "Everything Ankita loves." },
    ],
  }),
  component: FavPage,
});

const favs = [
  { icon: "🍗", label: "KFC" },
  { icon: "🚙", label: "G-Wagon" },
  { icon: "🍛", label: "Biryani" },
  { icon: "🌷", label: "Tulips" },
  { icon: "🌹", label: "Roses" },
  { icon: "🩷", label: "Pink" },
  { icon: "🍷", label: "Wine colours" },
  { icon: "🌼", label: "May flowers" },
];

function FavPage() {
  return (
    <main className="relative min-h-[100svh] pb-32">
      <PageHeader title="Her Favourites" subtitle="the things you love (I’m paying attention)" />
      <div className="relative z-10 mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 px-5 sm:grid-cols-4">
        {favs.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex flex-col items-center rounded-3xl glass-card p-6 text-center shadow-romance"
          >
            <div className="text-5xl">{f.icon}</div>
            <p className="mt-3 font-display text-wine">{f.label}</p>
            <p className="text-xs text-rose">❤ yours</p>
          </motion.div>
        ))}
      </div>

      <section className="mx-auto mt-16 max-w-md px-6 text-center">
        <div className="rounded-3xl glass-card p-8 shadow-romance">
          <p className="font-script text-3xl text-rose">us, in two emojis</p>
          <div className="mt-4 flex items-center justify-center gap-3 text-5xl">
            <motion.span animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity }}>👽</motion.span>
            <span className="text-rose text-2xl animate-heartbeat">❤</span>
            <motion.span animate={{ rotate: [5, -5, 5] }} transition={{ duration: 3, repeat: Infinity }}>🐸</motion.span>
          </div>
          <p className="mt-3 text-sm text-wine/70">alien & frog. forever.</p>
        </div>
      </section>
    </main>
  );
}
