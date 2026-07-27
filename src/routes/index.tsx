import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Camera, Shirt, Users } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { EVENT_LABEL } from "@/lib/event";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FKW 6 — Official Website" },
      { name: "description", content: "Forum Kebersamaan Warga angkatan 6 — kegiatan, desain baju, dan galeri." },
      { property: "og:title", content: "FKW 6 — Official Website" },
      { property: "og:description", content: "Momen kebersamaan, kebanggaan, dan kenangan FKW 6." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-hero-gradient opacity-25 blur-3xl animate-gradient" />
          <div className="absolute right-10 top-24 h-40 w-40 rounded-full bg-gold-gradient opacity-30 blur-2xl animate-float" />
          <div className="absolute bottom-0 left-10 h-56 w-56 rounded-full bg-secondary/30 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>

        <div className="mx-auto max-w-5xl px-6 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-primary">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              {EVENT_LABEL}
            </span>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 font-heading text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
              Momen <span className="text-gradient-gold">Kebersamaan</span>
              <br />
              Angkatan <span className="text-primary">FKW 6</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Satu acara, satu angkatan, satu cerita. Website resmi FKW 6 — tempat
              kegiatan, desain baju, dokumentasi, dan hitung mundur acara berkumpul.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold text-foreground hover:text-primary"
              >
                Tentang FKW
              </Link>
            </div>
          </Reveal>

        </div>
      </section>

      {/* About preview */}
      <section className="relative py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:items-center">
          <Reveal>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-hero-gradient shadow-elegant animate-gradient">
                <div className="grid h-full place-items-center p-10">
                  <div className="text-center text-white">
                    <div className="font-heading text-6xl font-bold md:text-7xl">F K W</div>
                    <div className="mt-2 text-7xl font-bold text-gradient-gold md:text-9xl">6</div>
                    <div className="mt-3 text-sm uppercase tracking-[0.3em] text-white/80">
                      Forum Kebersamaan Warga
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 h-28 w-28 rounded-2xl bg-gold-gradient shadow-glow animate-pulse-glow" />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Tentang
            </span>
            <h2 className="mt-3 font-heading text-4xl font-bold md:text-5xl">
              Lebih dari sekadar <span className="text-gradient-gold">acara</span>.
            </h2>
            <p className="mt-5 text-muted-foreground">
              FKW 6 adalah perayaan kebersamaan satu angkatan — dirancang sebagai
              momen yang elegan, hangat, dan dikenang. Setiap detailnya disusun
              dengan rasa, mulai dari desain baju hingga dokumentasi.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Users, label: "Kebersamaan" },
                { icon: Shirt, label: "Identitas" },
                { icon: Camera, label: "Kenangan" },
              ].map((f) => (
                <div key={f.label} className="rounded-2xl glass p-4 hover-lift">
                  <f.icon className="h-5 w-5 text-gold" />
                  <div className="mt-2 font-heading text-sm font-semibold">{f.label}</div>
                </div>
              ))}
            </div>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
            >
              Pelajari lebih lanjut <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Preview gallery + desain */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Preview</span>
              <h2 className="mt-2 font-heading text-4xl font-bold md:text-5xl">
                Sekilas <span className="text-gradient-gold">FKW 6</span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <Link to="/Gallery" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Buka Galeri <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="group relative aspect-[4/5] overflow-hidden rounded-3xl shadow-elegant hover-lift">
                  <div
                    className="absolute inset-0 bg-hero-gradient opacity-90 animate-gradient"
                    style={{ animationDelay: `${i * 0.5}s` }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_50%)]" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="text-xs font-medium uppercase tracking-[0.25em] text-white/70">
                      Momen #{String(i).padStart(2, "0")}
                    </div>
                    <div className="mt-1 font-heading text-xl font-bold text-white">
                      FKW 6
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 rounded-3xl glass p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Desain Baju</span>
                <h3 className="mt-2 font-heading text-3xl font-bold md:text-4xl">
                  Identitas angkatan, dijahit dengan <span className="text-gradient-gold">rasa</span>.
                </h3>
                <p className="mt-3 max-w-xl text-muted-foreground">
                  Setiap detail desain — siluet, warna, dan filosofi — dirancang
                  untuk mencerminkan semangat FKW 6.
                </p>
              </div>
              <Link
                to="/design"
                className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold text-gold-foreground shadow-glow transition-transform hover:scale-105"
              >
                Lihat Desain <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
