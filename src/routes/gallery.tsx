import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader } from "@/components/romantic/chrome";
import heroAsset from "@/assets/hero-couple.asset.jpeg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Our Moments" },
      { name: "description", content: "Our favourite photos & memories." },
      { property: "og:title", content: "Our Gallery" },
      { property: "og:description", content: "Our favourite photos & memories." },
      { property: "og:image", content: heroAsset.url },
    ],
  }),
  component: GalleryPage,
});

// Add real images later — keeping placeholders that look beautiful.
const sections = [
  {
    title: "Photos",
    items: [
      { src: heroAsset.url, h: 5, caption: "the forehead-kiss day" },
      { src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=900", h: 4, caption: "movie night" },
      { src: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=900", h: 6, caption: "long drive" },
      { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=900", h: 5, caption: "first anniversary" },
      { src: "https://images.unsplash.com/photo-1525361688820-7c92c5d96b39?w=900", h: 4, caption: "rainy day" },
      { src: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=900", h: 5, caption: "festival lights" },
    ],
  },
  {
    title: "Cute Memories",
    items: [
      { src: "https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?w=900", h: 5, caption: "your favourite cafe" },
      { src: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=900", h: 6, caption: "tulips, like you wanted" },
      { src: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=900", h: 4, caption: "roses" },
      { src: "https://images.unsplash.com/photo-1521336575822-6da63fb45455?w=900", h: 5, caption: "biryani date" },
    ],
  },
];

type Item = { src: string; caption: string };

function GalleryPage() {
  const [open, setOpen] = useState<Item | null>(null);
  return (
    <main className="relative min-h-[100svh] pb-32">
      <PageHeader title="Our Gallery" subtitle="every photo is a tiny love letter" />
      <div className="relative z-10 mx-auto mt-12 max-w-6xl space-y-12 px-4">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="mb-4 px-2 font-script text-3xl text-rose">{s.title}</h2>
            <div className="columns-2 gap-3 sm:columns-3 lg:columns-4">
              {s.items.map((it, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setOpen(it)}
                  className="group mb-3 block w-full overflow-hidden rounded-2xl shadow-romance"
                  style={{ breakInside: "avoid" }}
                >
                  <div className="relative">
                    <img src={it.src} alt={it.caption} loading="lazy" className="w-full transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 text-xs text-white opacity-0 transition group-hover:opacity-100">
                      {it.caption}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </section>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[70] grid place-items-center bg-black/80 p-5 backdrop-blur"
          >
            {/* Floating hearts */}
            {Array.from({ length: 14 }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: -300, opacity: [0, 1, 0] }}
                transition={{ duration: 2.2 + Math.random(), delay: Math.random() * 0.6, repeat: Infinity }}
                className="pointer-events-none absolute text-rose"
                style={{ left: `${10 + Math.random() * 80}%`, bottom: 0, fontSize: 18 + Math.random() * 16 }}
              >❤</motion.span>
            ))}
            <motion.figure
              initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] max-w-3xl overflow-hidden rounded-3xl shadow-romance"
            >
              <img src={open.src} alt={open.caption} className="max-h-[80vh] w-full object-contain" />
              <figcaption className="bg-black/60 px-4 py-2 text-center text-sm text-white">{open.caption}</figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
