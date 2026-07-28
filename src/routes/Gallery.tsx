import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { X } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Galeri — FKW 6" },
      { name: "description", content: "Dokumentasi galeri kegiatan FKW 6: event, tim, persiapan, dan behind the scene." },
      { property: "og:title", content: "Galeri FKW 6" },
      { property: "og:description", content: "Setiap momen FKW 6, diabadikan." },
    ],
  }),
  component: GalleryPage,
});

const YEARS = ["2025", "2026"] as const;
type Year = (typeof YEARS)[number];

const itemsByYear: Record<Year, { ratio: number }[]> = {
  "2025": [
    { ratio: 1.1 }, { ratio: 1.3 }, { ratio: 0.95 }, { ratio: 1.5 },
    { ratio: 1.0 }, { ratio: 1.2 }, { ratio: 0.9 }, { ratio: 1.3 },
  ],
  "2026": [],
};

function GalleryPage() {
  const [year, setYear] = useState<Year>("2025");
  const [open, setOpen] = useState<number | null>(null);
  const filtered = itemsByYear[year];

  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-12">
        <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-hero-gradient opacity-20 blur-3xl animate-gradient" />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Dokumentasi</span>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-4 font-heading text-5xl font-bold md:text-7xl">
              Galeri <span className="text-gradient-gold">FKW 6</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mx-auto mt-6 max-w-2xl text-muted-foreground md:text-lg">
              Kumpulan momen dari setiap sisi acara — event, tim, persiapan,
              hingga behind the scene.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Year tabs */}
      <section className="pb-6">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-2 px-6">
          {YEARS.map((y) => (
            <button
              key={y}
              onClick={() => { setYear(y); setOpen(null); }}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition-all ${
                year === y
                  ? "bg-hero-gradient text-white shadow-elegant animate-gradient"
                  : "glass text-foreground/70 hover:text-primary"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          {year === "2026" ? (
            <Reveal className="mx-auto max-w-xl rounded-3xl glass p-12 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                2026
              </span>
              <h3 className="mt-4 font-heading text-4xl font-bold md:text-5xl">
                <span className="text-gradient-gold">Coming Soon</span>
              </h3>
              <p className="mx-auto mt-4 max-w-md text-muted-foreground">
                Momen FKW 6 tahun ini akan segera hadir. Nantikan dokumentasinya!
              </p>
            </Reveal>
          ) : (
            <div className="columns-1 gap-5 sm:columns-2 md:columns-3 lg:columns-4">
            {filtered.map((it, idx) => (
              <Reveal
                key={idx}
                delay={(idx % 6) * 60}
                className="mb-5 break-inside-avoid"
              >
                <button
                  onClick={() => setOpen(idx)}
                  className="group relative block w-full overflow-hidden rounded-2xl shadow-elegant hover-lift"
                  style={{ aspectRatio: it.ratio }}
                >
                  <div
                    className="absolute inset-0 bg-hero-gradient animate-gradient"
                    style={{ animationDelay: `${idx * 0.3}s` }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent_50%)]" />
                </button>
              </Reveal>
            ))}
            </div>
          )}
        </div>
      </section>

      {open !== null && filtered[open] && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-foreground/90 p-4 backdrop-blur-md"
          onClick={() => setOpen(null)}
        >
          <button
            aria-label="Close"
            className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full glass text-white"
            onClick={() => setOpen(null)}
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl shadow-elegant" style={{ aspectRatio: filtered[open].ratio }}>
            <div className="absolute inset-0 bg-hero-gradient animate-gradient" />
          </div>
        </div>
      )}
    </>
  );
}