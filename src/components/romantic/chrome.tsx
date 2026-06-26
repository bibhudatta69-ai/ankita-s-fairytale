import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Volume2, VolumeX, Moon, Sun, Sparkles } from "lucide-react";
import { APP_CONFIG } from "@/lib/app-config";

/* ---------------- Falling petals + hearts background ---------------- */
type Particle = { id: number; left: number; delay: number; duration: number; size: number; kind: "petal" | "heart" | "flower" };

export function RomanticBackground({ variant = "day" }: { variant?: "day" | "night" }) {
  const particles = useMemo<Particle[]>(() => {
    const arr: Particle[] = [];
    for (let i = 0; i < 22; i++) {
      arr.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 10 + Math.random() * 14,
        size: 14 + Math.random() * 22,
        kind: i % 3 === 0 ? "heart" : i % 3 === 1 ? "petal" : "flower",
      });
    }
    return arr;
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {variant === "day" ? (
        <div className="absolute inset-0 gradient-romance" />
      ) : (
        <div className="absolute inset-0 gradient-night">
          {Array.from({ length: 60 }).map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          ))}
          {/* Moon */}
          <div className="absolute right-10 top-10 h-24 w-24 rounded-full bg-[radial-gradient(circle_at_30%_30%,#fff_0%,#f4e4c1_60%,#caa86a_100%)] shadow-[0_0_80px_30px_rgba(244,228,193,0.35)]" />
        </div>
      )}

      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-petal-fall"
          style={{
            left: `${p.left}%`,
            top: "-10vh",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            fontSize: `${p.size}px`,
            filter: variant === "night" ? "drop-shadow(0 0 6px rgba(255,200,220,0.6))" : "none",
          }}
        >
          {p.kind === "heart" ? "❤️" : p.kind === "petal" ? "🌸" : "🌷"}
        </div>
      ))}
    </div>
  );
}

/* ---------------- Cursor heart trail ---------------- */
export function CursorTrail() {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const idRef = useRef(0);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let last = 0;
    const handler = (e: MouseEvent) => {
      const now = performance.now();
      if (now - last < 60) return;
      last = now;
      const id = idRef.current++;
      setHearts((h) => [...h, { id, x: e.clientX, y: e.clientY }].slice(-20));
      setTimeout(() => setHearts((h) => h.filter((x) => x.id !== id)), 900);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          initial={{ opacity: 0.9, scale: 1, y: 0 }}
          animate={{ opacity: 0, scale: 0.4, y: -40 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute text-rose"
          style={{ left: h.x - 6, top: h.y - 6, fontSize: 14 }}
        >
          ❤
        </motion.span>
      ))}
    </div>
  );
}

/* ---------------- Music toggle ---------------- */
export function MusicToggle() {
  const [on, setOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    audioRef.current = new Audio(
      "https://cdn.pixabay.com/audio/2022/10/30/audio_347111d2bb.mp3",
    );
    audioRef.current.loop = true;
    audioRef.current.volume = 0.35;
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);
  const toggle = () => {
    if (!audioRef.current) return;
    if (on) {
      audioRef.current.pause();
      setOn(false);
    } else {
      audioRef.current.play().catch(() => {});
      setOn(true);
    }
  };
  return (
    <button
      onClick={toggle}
      aria-label={on ? "Mute music" : "Play music"}
      className="fixed left-4 top-4 z-50 grid h-11 w-11 place-items-center rounded-full glass-card text-wine shadow-romance transition hover:scale-110"
    >
      {on ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
    </button>
  );
}

/* ---------------- Dark mode toggle ---------------- */
export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="fixed left-[68px] top-4 z-50 grid h-11 w-11 place-items-center rounded-full glass-card text-wine shadow-romance transition hover:scale-110"
    >
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

/* ---------------- Emergency Hug ---------------- */
export function EmergencyHug() {
  const href = `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    APP_CONFIG.emergencyMessage,
  )}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 group flex items-center gap-2 rounded-full bg-wine px-4 py-3 text-white shadow-romance transition hover:scale-105"
    >
      <span className="text-lg animate-heartbeat">🚨</span>
      <span className="hidden text-sm font-semibold sm:inline">Emergency Hug</span>
      <Heart className="h-4 w-4 fill-white" />
      <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-rose/60 animate-ping" />
    </a>
  );
}

/* ---------------- Page back link ---------------- */
export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="relative z-10 mx-auto max-w-5xl px-6 pt-24 text-center">
      <Link
        to="/home"
        className="mb-6 inline-flex items-center gap-1 text-sm text-wine/70 hover:text-wine"
      >
        ← back to our world
      </Link>
      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-script text-5xl text-wine sm:text-6xl"
      >
        {title}
      </motion.h1>
      {subtitle && <p className="mt-3 text-wine/70">{subtitle}</p>}
    </header>
  );
}

/* ---------------- Alien hugging frog mascot ---------------- */
export function CoupleMascot() {
  const [hugged, setHugged] = useState(false);
  const [taps, setTaps] = useState(0);
  const onFrog = () => {
    const n = taps + 1;
    setTaps(n);
    if (n >= 5) {
      setHugged(true);
      setTimeout(() => {
        setHugged(false);
        setTaps(0);
      }, 4000);
    }
  };
  return (
    <div className="pointer-events-none fixed bottom-24 left-4 z-40 select-none sm:bottom-6">
      <AnimatePresence>
        {hugged && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-2 rounded-2xl bg-white/80 px-3 py-1 text-xs text-wine shadow-romance"
          >
            big hug! 🫂
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex items-end gap-1 text-3xl">
        <motion.button
          onClick={onFrog}
          className="pointer-events-auto"
          animate={hugged ? { x: 8 } : { x: 0 }}
        >
          🐸
        </motion.button>
        <motion.span animate={hugged ? { x: -8, rotate: -10 } : { x: 0 }}>👽</motion.span>
      </div>
    </div>
  );
}

/* ---------------- Sparkle wrapper for buttons ---------------- */
export function Sparkly({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <Sparkles className="pointer-events-none absolute -right-3 -top-3 h-4 w-4 text-gold animate-sparkle" />
      <Sparkles
        className="pointer-events-none absolute -left-3 -bottom-3 h-3 w-3 text-gold animate-sparkle"
        style={{ animationDelay: "0.7s" }}
      />
    </span>
  );
}

/* ---------------- Outer chrome that wraps every non-proposal page ---------------- */
export function RomanticChrome({ variant = "day", children }: { variant?: "day" | "night"; children: React.ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isProposal = path === "/";
  return (
    <>
      <RomanticBackground variant={variant} />
      <CursorTrail />
      {!isProposal && <MusicToggle />}
      {!isProposal && <ThemeToggle />}
      {!isProposal && <EmergencyHug />}
      {!isProposal && <CoupleMascot />}
      {children}
    </>
  );
}
