import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/lib/supabase";

const BUCKET = "gallery-photos";

export interface GalleryItem {
  id: string;
  year: string;
  image_url: string;
  ratio: number;
  created_at: string;
}

export const getGalleryItems = createServerFn({ method: "GET" })
  .validator((year: string) => year)
  .handler(async ({ data: year }) => {
    const { data, error } = await supabaseAdmin
      .from("gallery_items")
      .select("*")
      .eq("year", year)
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []) as GalleryItem[];
  });

export const addGalleryItem = createServerFn({ method: "POST" })
  .validator((input: { year: string; imageBase64: string; ratio: number }) => input)
  .handler(async ({ data }) => {
    const { year, imageBase64, ratio } = data;

    // imageBase64 format: "data:image/jpeg;base64,xxxx"
    const matches = imageBase64.match(/^data:(image\/\w+);base64,(.+)$/);
    if (!matches) throw new Error("Format gambar tidak valid");
    const mimeType = matches[1];
    const base64Data = matches[2];
    const ext = mimeType.split("/")[1] || "jpg";

    const bytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
    const filePath = `${year}/${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(filePath, bytes, { contentType: mimeType });

    if (uploadError) throw new Error(uploadError.message);

    const { data: urlData } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(filePath);

    const { error: insertError } = await supabaseAdmin.from("gallery_items").insert({
      year,
      image_url: urlData.publicUrl,
      ratio,
    });

    if (insertError) throw new Error(insertError.message);

    return { url: urlData.publicUrl };
  });