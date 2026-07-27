import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { Heart, Sparkles, Users, Calendar } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Tentang FKW 6 — Forum Kebersamaan Warga" },
      { name: "description", content: "FKW 6 adalah perayaan kebersamaan angkatan — momen, makna, dan nilai-nilai yang dirayakan bersama." },
      { property: "og:title", content: "Tentang FKW 6" },
      { property: "og:description", content: "Forum Kebersamaan Warga angkatan 6." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Heart, title: "Kebersamaan", text: "Mempererat ikatan satu angkatan melalui momen bersama yang penuh makna." },
  { icon: Sparkles, title: "Kebanggaan", text: "Merayakan identitas angkatan dengan rasa bangga dan elegan." },
  { icon: Users, title: "Kolaborasi", text: "Setiap detail dirancang bersama — dari konsep hingga eksekusi." },
];

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-20">
        <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-hero-gradient opacity-20 blur-3xl animate-gradient" />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Tentang</span>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-4 font-heading text-5xl font-bold md:text-7xl">
              Forum <span className="text-gradient-gold">Kebersamaan</span> Warga
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mx-auto mt-6 max-w-2xl text-muted-foreground md:text-lg">
              FKW 6 adalah perayaan tahunan yang dirancang untuk merayakan
              kebersamaan, kebanggaan, dan kenangan satu angkatan dalam satu
              acara yang elegan dan tak terlupakan.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Split intro */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:items-center">
          <Reveal>
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-hero-gradient shadow-elegant animate-gradient">
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center text-white">
                  <Calendar className="mx-auto h-10 w-10 text-gold" />
                  <div className="mt-4 font-heading text-5xl font-bold">FKW 6</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.3em] text-white/80">2026 Edition</div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Tujuan</span>
            <h2 className="mt-3 font-heading text-4xl font-bold">
              Merayakan angkatan, <span className="text-gradient-gold">menyimpan kenangan</span>.
            </h2>
            <p className="mt-5 text-muted-foreground">
              FKW 6 hadir sebagai wadah seluruh warga angkatan untuk berkumpul,
              berekspresi, dan mengabadikan momen bersama. Acara ini menjadi
              tanda bahwa kebersamaan kita lebih dari sekadar status — ia adalah
              cerita yang akan terus dikenang.
            </p>
            <p className="mt-4 text-muted-foreground">
              Dengan konsep modern, elegan, dan penuh makna, FKW 6 dirancang agar
              setiap detailnya — mulai dari desain baju, dokumentasi, hingga
              suasana acara — terasa istimewa.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Nilai</span>
            <h2 className="mt-3 font-heading text-4xl font-bold md:text-5xl">
              Tiga nilai yang kami <span className="text-gradient-gold">rayakan</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="group relative h-full overflow-hidden rounded-3xl glass p-8 hover-lift">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold-gradient opacity-20 blur-2xl transition-opacity group-hover:opacity-40" />
                  <div className="relative">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-hero-gradient text-white shadow-glow">
                      <v.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-heading text-xl font-bold">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}