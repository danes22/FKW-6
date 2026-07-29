import { Link } from "@tanstack/react-router";
import { Instagram, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border/60 bg-foreground text-background">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[60rem] -translate-x-1/2 rounded-full bg-hero-gradient opacity-30 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-gradient text-sm font-bold text-gold-foreground">
              F6
            </span>
            <span className="font-heading text-xl font-bold">
              FKW <span className="text-gradient-gold">6</span>
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-background/70">
            Forum Kebersamaan Warga angkatan 6 — momen, kebersamaan, dan kebanggaan
            yang dirayakan dalam satu acara penuh makna.
          </p>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-gold">
            Jelajahi
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-background/70">
            <li><Link to="/about" className="hover:text-gold">Tentang FKW</Link></li>
            <li><Link to="/desain" className="hover:text-gold">Design</Link></li>
            <li><Link to="/gallery" className="hover:text-gold">Gallery</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-gold">
            Kontak
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-background/70">
            <li className="flex items-center gap-2">
              <Instagram className="h-4 w-4 text-gold" />
              <a
                href="https://www.instagram.com/festivalkarmawairagya"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold"
              >
                @festivalkarmawairagya
              </a>
            </li>

            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" /> Lapangan Utama Smansia</li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-background/10 py-6 text-center text-xs text-background/50">
        © {new Date().getFullYear()} FKW 6 — Official Website
      </div>
    </footer>
  );
}