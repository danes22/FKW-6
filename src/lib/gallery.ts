import { supabase } from "@/integrations/supabase/client";

export type GalleryPhoto = {
  id: string;
  year: number;
  storage_path: string;
  public_url: string;
  position: number;
  created_at: string;
};

const BUCKET = "gallery";
// ~10 years — signed URLs stored in DB so <img src> works directly
const URL_EXPIRY = 60 * 60 * 24 * 365 * 10;

export async function listPhotos(year: number): Promise<GalleryPhoto[]> {
  const { data, error } = await supabase
    .from("gallery_photos")
    .select("*")
    .eq("year", year)
    .order("position", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data as GalleryPhoto[];
}

export async function uploadPhoto(year: number, file: File): Promise<GalleryPhoto> {
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

  // Place at end
  const { data: max } = await supabase
    .from("gallery_photos")
    .select("position")
    .eq("year", year)
    .order("position", { ascending: false })
    .limit(1);
  const nextPos = (max?.[0]?.position ?? -1) + 1;

  const { data, error } = await supabase
    .from("gallery_photos")
    .insert({
      year,
      storage_path: path,
      public_url: signed.signedUrl,
      position: nextPos,
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as GalleryPhoto;
}

export async function deletePhoto(photo: GalleryPhoto): Promise<void> {
  await supabase.storage.from(BUCKET).remove([photo.storage_path]);
  const { error } = await supabase.from("gallery_photos").delete().eq("id", photo.id);
  if (error) throw error;
}

export async function reorderPhotos(photos: GalleryPhoto[]): Promise<void> {
  // Update positions in order of array
  await Promise.all(
    photos.map((p, idx) =>
      supabase.from("gallery_photos").update({ position: idx }).eq("id", p.id),
    ),
  );
}