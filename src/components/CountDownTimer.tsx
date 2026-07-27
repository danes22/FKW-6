import { useEffect, useState } from "react";
import { EVENT_DATE } from "@/lib/event";

function diff(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms / 3600000) % 24);
  const m = Math.floor((ms / 60000) % 60);
  const s = Math.floor((ms / 1000) % 60);
  return { d, h, m, s, done: ms === 0 };
}

interface Props {
  size?: "sm" | "lg";
}

export function CountdownTimer({ size = "lg" }: Props) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0, done: false });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setT(diff(EVENT_DATE));
    const id = setInterval(() => setT(diff(EVENT_DATE)), 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { label: "Hari", v: t.d },
    { label: "Jam", v: t.h },
    { label: "Menit", v: t.m },
    { label: "Detik", v: t.s },
  ];

  const big = size === "lg";

  return (
    <div className={`grid grid-cols-4 gap-3 sm:gap-5 ${big ? "md:gap-6" : ""}`}>
      {items.map((it) => (
        <div
          key={it.label}
          className={`relative overflow-hidden rounded-2xl glass text-center ${
            big ? "p-5 sm:p-7" : "p-3 sm:p-4"
          }`}
        >
          <div className="pointer-events-none absolute inset-0 bg-gold-gradient opacity-[0.08]" />
          <div
            className={`font-heading font-bold tabular-nums text-foreground ${
              big ? "text-4xl sm:text-6xl md:text-7xl" : "text-2xl sm:text-3xl"
            }`}
          >
            {String(it.v).padStart(2, "0")}
          </div>
          <div
            className={`mt-1 font-medium uppercase tracking-[0.2em] text-muted-foreground ${
              big ? "text-xs sm:text-sm" : "text-[10px]"
            }`}
          >
            {it.label}
          </div>
        </div>
      ))}
    </div>
  );
}