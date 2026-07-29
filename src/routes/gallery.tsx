import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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

type GalleryItem = {
  id: string;
  year: string;
  image_url: string;
  ratio: number;
  created_at: string;
};

function GalleryPage() {
  const [year, setYear] = useState<Year>("2025");
  const [open, setOpen] = useState<number | null>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchItems() {
      setLoading(true);
      setError(null);
      setOpen(null);
      try {
        const { data, error } = await supabase
          .from("gallery_items")
          .select("id, year, image_url, ratio, created_at")
          .eq("year", year)
          .order("created_at", { ascending: true });

        if (error) throw error;
        if (!cancelled) setItems((data as GalleryItem[]) ?? []);
      } catch (e: unknown) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Gagal memuat galeri");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchItems();
    return () => {
      cancelled = true;
    };
  }, [year]);

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

      <section className="pb-6">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-2 px-6">
          {YEARS.map((y) => (
            <button
              key={y}
              onClick={() => setYear(y)}
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

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          {loading ? (
            <div className="flex justify-center py-24">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="mx-auto max-w-xl rounded-3xl glass p-12 text-center text-sm text-destructive">
              {error}
            </div>
          ) : items.length === 0 ? (
            <Reveal className="mx-auto max-w-xl rounded-3xl glass p-12 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                {year}
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
              {items.map((it, idx) => (
                <Reveal
                  key={it.id}
                  delay={(idx % 6) * 60}
                  className="mb-5 break-inside-avoid"
                >
                  <button
                    onClick={() => setOpen(idx)}
                    className="group relative block w-full overflow-hidden rounded-2xl shadow-elegant hover-lift"
                    style={{ aspectRatio: it.ratio }}
                  >
                    <img
                      src={it.image_url}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </button>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {open !== null && items[open] && (
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
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl shadow-elegant"
            style={{ aspectRatio: items[open].ratio }}
          >
            <img
              src={items[open].image_url}
              alt=""
              className="h-full w-full object-cover"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}