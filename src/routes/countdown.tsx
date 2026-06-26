import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/romantic/chrome";
import { APP_CONFIG } from "@/lib/app-config";

export const Route = createFileRoute("/countdown")({
  head: () => ({
    meta: [
      { title: "Countdown — Loving You" },
      { name: "description", content: "Every second since 14 May." },
      { property: "og:title", content: "Loving You — Countdown" },
      { property: "og:description", content: "Every second since 14 May." },
    ],
  }),
  component: CountdownPage,
});

function diff(from: Date) {
  const now = new Date();
  let years = now.getFullYear() - from.getFullYear();
  let months = now.getMonth() - from.getMonth();
  let days = now.getDate() - from.getDate();
  let hours = now.getHours() - from.getHours();
  let mins = now.getMinutes() - from.getMinutes();
  let secs = now.getSeconds() - from.getSeconds();
  if (secs < 0) { secs += 60; mins -= 1; }
  if (mins < 0) { mins += 60; hours -= 1; }
  if (hours < 0) { hours += 24; days -= 1; }
  if (days < 0) {
    const prev = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += prev; months -= 1;
  }
  if (months < 0) { months += 12; years -= 1; }
  return { years, months, days, hours, mins, secs };
}

function CountdownPage() {
  const [t, setT] = useState(() => diff(APP_CONFIG.anniversary));
  useEffect(() => {
    const id = setInterval(() => setT(diff(APP_CONFIG.anniversary)), 1000);
    return () => clearInterval(id);
  }, []);
  const isFuture = APP_CONFIG.anniversary > new Date();
  const units = [
    { label: "Years", value: t.years },
    { label: "Months", value: t.months },
    { label: "Days", value: t.days },
    { label: "Hours", value: t.hours },
    { label: "Mins", value: t.mins },
    { label: "Secs", value: t.secs },
  ];

  return (
    <main className="relative min-h-[100svh] pb-32">
      <PageHeader title="Loving You" subtitle={`since 14 May ${APP_CONFIG.anniversary.getFullYear()}`} />
      <div className="relative z-10 mx-auto mt-16 max-w-3xl px-6 text-center">
        <div className="flex items-center justify-center gap-4">
          <span className="text-6xl animate-heartbeat">❤️</span>
          <p className="font-script text-3xl text-rose">I’ve been loving you for…</p>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {units.map((u) => (
            <motion.div
              key={u.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl glass-card p-4 shadow-romance"
            >
              <div className="font-display text-3xl text-wine sm:text-4xl tabular-nums">
                {String(Math.max(0, u.value)).padStart(2, "0")}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-wine/60">{u.label}</div>
            </motion.div>
          ))}
        </div>

        {isFuture && (
          <p className="mt-6 text-sm text-wine/60">
            (counting down to our day — every second closer is a win)
          </p>
        )}

        <p className="mt-10 font-display text-lg italic text-wine/80">
          “Every second of it, on purpose.”
        </p>
      </div>
    </main>
  );
}
