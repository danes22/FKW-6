import { supabase } from "@/integrations/supabase/client";

export type GalleryItem = {
  id: string;
  year: string;
  image_url: string;
  storage_path: string;
  ratio: number;
  created_at: string;
};

const BUCKET = "gallery";
const URL_EXPIRY = 60 * 60 * 24 * 365 * 10; // ~10 years

export async function listPhotos(year: string): Promise<GalleryItem[]> {
  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .eq("year", year)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data as GalleryItem[];
}

function getImageRatio(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img.width / img.height);
    };
    img.onerror = reject;
    img.src = url;
  });
}

export async function uploadPhoto(year: string, file: File): Promise<GalleryItem> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${year}/${crypto.randomUUID()}.${ext}`;

  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false });
  if (upErr) throw upErr;

  const { data: signed, error: sErr } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, URL_EXPIRY);
  if (sErr) throw sErr;

  const ratio = await getImageRatio(file);

  const { data, error } = await supabase
    .from("gallery_items")
    .insert({
      year,
      image_url: signed.signedUrl,
      storage_path: path,
      ratio,
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as GalleryItem;
}

export async function deletePhoto(photo: GalleryItem): Promise<void> {
  await supabase.storage.from(BUCKET).remove([photo.storage_path]);
  const { error } = await supabase.from("gallery_items").delete().eq("id", photo.id);
  if (error) throw error;
}