import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { X, Shirt, Palette, Sparkles, Check, Ban } from "lucide-react";
import shirtAsset from "@/assets/fkw-shirt.png.asset.json.png";
import clothesAsset from "@/assets/fkw-clothes.png.asset.json.jpeg";

export const Route = createFileRoute("/desain")({
  head: () => ({
    meta: [
      { title: "Desain Baju — FKW 6" },
      { name: "description", content: "Showcase desain baju resmi FKW 6: tampilan depan, belakang, dan filosofi desain." },
      { property: "og:title", content: "Desain Baju FKW 6" },
      { property: "og:description", content: "Identitas angkatan, dijahit dengan rasa." },
    ],
  }),
  component: DesainPage,
});

function DesainPage() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-16">
        <div className="pointer-events-none absolute -top-32 right-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-gold-gradient opacity-25 blur-3xl animate-float" />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Showcase</span>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-4 font-heading text-5xl font-bold md:text-7xl">
              Desain <span className="text-gradient-gold">Baju</span> Resmi
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mx-auto mt-6 max-w-2xl text-muted-foreground md:text-lg">
              Festival Karma Wairagya #6 — desain baju resmi angkatan dengan
              motif merak pada balutan navy yang elegan.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Shirt showcase */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <button
              onClick={() => setLightbox(shirtAsset)}
              className="group relative block w-full overflow-hidden rounded-3xl shadow-elegant hover-lift"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-primary via-secondary to-primary">
                <img
                  src={shirtAsset}
                  alt="Desain baju resmi FKW 6 — motif merak Festival Karma Wairagya"
                  className="h-full w-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-left">
                <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                  Official Shirt
                </div>
                <div className="mt-1 font-heading text-2xl font-bold text-white">
                  Festival Karma Wairagya — SMA Negeri 9 Denpasar
                </div>
              </div>
            </button>
          </Reveal>
        </div>
      </section>

      {/* Dresscode */}
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:items-center">
          <Reveal>
            <div className="overflow-hidden rounded-3xl shadow-elegant">
              <img
                src={clothesAsset}
                alt="Dresscode FKW 6 — baju FKW dengan celana bebas"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Dresscode
            </span>
            <h2 className="mt-3 font-heading text-4xl font-bold">
              Baju FKW, <span className="text-gradient-gold">celana bebas</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              Semua warga angkatan wajib mengenakan baju resmi Festival Karma
              Wairagya #6. Untuk bawahan, dibebaskan — asal tetap sopan dan
              nyaman dipakai sepanjang acara.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" />
                <span><strong className="text-foreground">Atasan:</strong> Baju resmi FKW 6 (navy, motif merak).</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" />
                <span><strong className="text-foreground">Bawahan:</strong> Bebas — jeans, chino, atau rok panjang.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" />
                <span><strong className="text-foreground">Alas kaki:</strong> Bebas rapi, tidak sandal jepit.</span>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Filosofi */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Filosofi</span>
            <h2 className="mt-3 font-heading text-4xl font-bold md:text-5xl">
              Setiap detail punya <span className="text-gradient-gold">arti</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: Palette, title: "Warna", text: "Biru navy dan hijau zamrud melambangkan ketenangan dan pertumbuhan, dipadu emas yang berarti kebanggaan." },
              { icon: Shirt, title: "Siluet", text: "Potongan modern minimalist dengan fit relaxed — nyaman dipakai sepanjang acara." },
              { icon: Sparkles, title: "Detail", text: "Sulaman emas, label custom, dan finishing premium yang membuatnya layak disimpan sebagai kenangan." },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 100}>
                <div className="rounded-3xl glass p-8 hover-lift">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-gradient text-gold-foreground shadow-glow">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-heading text-xl font-bold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Peraturan */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Peraturan</span>
            <h2 className="mt-3 font-heading text-4xl font-bold md:text-5xl">
              Do's & <span className="text-gradient-gold">Don'ts</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Demi kenyamanan bersama, mohon ikuti peraturan berikut selama Festival Karma Wairagya #6 berlangsung.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="rounded-3xl glass p-8 hover-lift h-full">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-500/15 text-emerald-600">
                    <Check className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold">Do's</h3>
                </div>
                <ul className="mt-6 space-y-3 text-sm">
                  {[
                    "Bersikap sopan dan menghormati sesama pengunjung.",
                    "Mengikuti seluruh peraturan dan arahan panitia.",
                    "Menggunakan dresscode yang telah ditentukan.",
                    "Menjaga kebersihan area acara.",
                    "Datang tepat waktu sesuai jadwal.",
                    "Simpan tiket & identitas selama acara berlangsung.",
                  ].map((t) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                      <span className="text-muted-foreground">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-3xl glass p-8 hover-lift h-full">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-red-500/15 text-red-600">
                    <Ban className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold">Don'ts</h3>
                </div>
                <ul className="mt-6 space-y-3 text-sm">
                  {[
                    "Membawa botol plastik atau sampah sekali pakai.",
                    "Merokok maupun vaping di area acara.",
                    "Membuat keributan atau tindakan yang merugikan orang lain.",
                    "Membawa senjata tajam, obat terlarang, atau minuman keras.",
                    "Membawa makanan & minuman dari luar tanpa izin.",
                    "Meninggalkan sampah di area acara.",
                  ].map((t) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                      <span className="text-muted-foreground">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <p className="mt-8 text-center text-xs text-muted-foreground">
              Peraturan lengkap & update terbaru dapat dilihat di Instagram{" "}
              <a
                href="https://www.instagram.com/festivalkarmawairagya"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                @festivalkarmawairagya
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-foreground/90 p-4 backdrop-blur-md animate-in fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            aria-label="Close"
            className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full glass text-white"
            onClick={() => setLightbox(null)}
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={lightbox}
            alt="Desain baju FKW 6"
            className="max-h-[85vh] w-auto max-w-[90vw] rounded-2xl shadow-elegant"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}