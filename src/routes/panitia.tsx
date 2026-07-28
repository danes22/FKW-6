import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Upload, Trash2, ArrowLeft, ArrowRight, Loader2, ImagePlus } from "lucide-react";
import {
  listPhotos,
  uploadPhoto,
  deletePhoto,
  reorderPhotos,
  type GalleryPhoto,
} from "@/lib/gallery";

export const Route = createFileRoute("/panitia")({
  head: () => ({
    meta: [
      { title: "Panel Panitia — FKW 6" },
      { name: "description", content: "Upload dan atur foto galeri FKW 6." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: PanitiaPage,
});

const YEARS = [2025, 2026] as const;
type Year = (typeof YEARS)[number];

function PanitiaPage() {
  const [year, setYear] = useState<Year>(2025);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function refresh(y: Year) {
    setLoading(true);
    try {
      const data = await listPhotos(y);
      setPhotos(data);
      setDirty(false);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Gagal memuat foto");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh(year);
  }, [year]);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);
    setUploading(true);
    setProgress({ done: 0, total: files.length });
    try {
      for (let i = 0; i < files.length; i++) {
        await uploadPhoto(year, files[i]);
        setProgress({ done: i + 1, total: files.length });
      }
      await refresh(year);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Upload gagal");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function handleDelete(p: GalleryPhoto) {
    if (!confirm("Hapus foto ini?")) return;
    try {
      await deletePhoto(p);
      setPhotos((cur) => cur.filter((x) => x.id !== p.id));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Gagal hapus");
    }
  }

  function move(idx: number, dir: -1 | 1) {
    const j = idx + dir;
    if (j < 0 || j >= photos.length) return;
    const next = photos.slice();
    [next[idx], next[j]] = [next[j], next[idx]];
    setPhotos(next);
    setDirty(true);
  }

  async function saveOrder() {
    setSaving(true);
    try {
      await reorderPhotos(photos);
      setDirty(false);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Gagal simpan urutan");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Panel Panitia
            </span>
            <h1 className="mt-2 font-heading text-4xl font-bold md:text-5xl">
              Kelola <span className="text-gradient-gold">Galeri</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Upload, hapus, dan atur urutan foto galeri per tahun.
            </p>
          </div>
          <div className="flex gap-2">
            {YEARS.map((y) => (
              <button
                key={y}
                onClick={() => setYear(y)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                  year === y
                    ? "bg-hero-gradient text-white shadow-elegant"
                    : "glass text-foreground/70 hover:text-primary"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        {/* Upload zone */}
        <div className="rounded-3xl glass p-6 md:p-8">
          <label
            htmlFor="fkw-upload"
            className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-8 text-center transition-colors hover:border-primary/60 hover:bg-primary/10"
          >
            {uploading ? (
              <>
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="font-semibold">
                  Meng-upload {progress.done}/{progress.total}…
                </span>
              </>
            ) : (
              <>
                <ImagePlus className="h-8 w-8 text-primary" />
                <span className="font-semibold">
                  Klik untuk pilih foto (bisa banyak sekaligus)
                </span>
                <span className="text-xs text-muted-foreground">
                  Tahun aktif: <b>{year}</b> · JPG/PNG/WebP
                </span>
              </>
            )}
            <input
              id="fkw-upload"
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
              disabled={uploading}
            />
          </label>

          {error && (
            <p className="mt-4 rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          {dirty && (
            <div className="mt-4 flex items-center justify-between rounded-xl bg-primary/10 px-4 py-3 text-sm">
              <span>Urutan berubah — simpan supaya tampil di halaman galeri.</span>
              <button
                onClick={saveOrder}
                disabled={saving}
                className="rounded-full bg-hero-gradient px-5 py-2 text-xs font-semibold text-white shadow-elegant disabled:opacity-50"
              >
                {saving ? "Menyimpan…" : "Simpan Urutan"}
              </button>
            </div>
          )}
        </div>

        {/* Grid */}
        <div className="mt-8">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : photos.length === 0 ? (
            <div className="rounded-3xl glass p-12 text-center text-muted-foreground">
              Belum ada foto untuk tahun {year}. Upload di atas 👆
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {photos.map((p, idx) => (
                <div
                  key={p.id}
                  className="group relative overflow-hidden rounded-2xl border border-border/40 bg-muted shadow-elegant"
                >
                  <img
                    src={p.public_url}
                    alt=""
                    className="aspect-square w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-black/60 px-2 py-1.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="font-mono">#{idx + 1}</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => move(idx, -1)}
                        disabled={idx === 0}
                        className="rounded p-1 hover:bg-white/20 disabled:opacity-30"
                        title="Naik"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => move(idx, 1)}
                        disabled={idx === photos.length - 1}
                        className="rounded p-1 hover:bg-white/20 disabled:opacity-30"
                        title="Turun"
                      >
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(p)}
                    className="absolute bottom-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-destructive text-white opacity-0 shadow-elegant transition-opacity hover:bg-destructive/90 group-hover:opacity-100"
                    title="Hapus"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}