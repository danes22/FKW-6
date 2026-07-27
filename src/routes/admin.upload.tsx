import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { addGalleryItem } from "@/lib/gallery-server-fns";
import { Loader2, Upload, Check } from "lucide-react";

export const Route = createFileRoute("/admin/upload")({
  component: AdminUploadPage,
});

const YEARS = ["2025", "2026"] as const;

const MAX_WIDTH = 1600;
const JPEG_QUALITY = 0.82;

function compressImage(file: File): Promise<{ base64: string; ratio: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, MAX_WIDTH / img.width);
        const width = Math.round(img.width * scale);
        const height = Math.round(img.height * scale);

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas tidak didukung di browser ini"));
        ctx.drawImage(img, 0, 0, width, height);

        const base64 = canvas.toDataURL("image/jpeg", JPEG_QUALITY);
        resolve({ base64, ratio: width / height });
      };
      img.onerror = () => reject(new Error("Gagal memuat gambar"));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error("Gagal membaca file"));
    reader.readAsDataURL(file);
  });
}

function AdminUploadPage() {
  const [year, setYear] = useState<(typeof YEARS)[number]>("2025");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleFile = (f: File | null) => {
    setFile(f);
    setStatus("idle");
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const handleUpload = async () => {
    if (!file) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const { base64, ratio } = await compressImage(file);
      await addGalleryItem({ data: { year, imageBase64: base64, ratio } });
      setStatus("success");
      setFile(null);
      setPreview(null);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Upload gagal");
    }
  };

  return (
    <section className="mx-auto max-w-xl px-6 pt-36 pb-24">
      <h1 className="font-heading text-3xl font-bold">Upload Foto Galeri</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Halaman ini untuk panitia — upload foto ke galeri FKW 6.
      </p>

      <div className="mt-8 space-y-6 rounded-3xl glass p-6">
        <div>
          <label className="text-sm font-semibold">Tahun</label>
          <div className="mt-2 flex gap-2">
            {YEARS.map((y) => (
              <button
                key={y}
                onClick={() => setYear(y)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                  year === y ? "bg-hero-gradient text-white" : "bg-muted text-foreground/70"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold">Foto</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            className="mt-2 block w-full text-sm"
          />
        </div>

        {preview && (
          <img src={preview} alt="Preview" className="max-h-64 w-full rounded-xl object-contain" />
        )}

        <button
          onClick={handleUpload}
          disabled={!file || status === "loading"}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-hero-gradient px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : status === "success" ? (
            <Check className="h-4 w-4" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          {status === "loading" ? "Mengunggah..." : status === "success" ? "Terunggah!" : "Upload"}
        </button>

        {status === "error" && <p className="text-sm text-red-500">{errorMsg}</p>}
      </div>
    </section>
  );
}