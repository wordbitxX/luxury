/*
 * Portable photography sources.
 *
 * Hostinger deployment audit: the named /images/*.webp files were omitted
 * from the deployed public directory. The originals and remote Next.js
 * image optimisation both returned valid images. Keep photo identity in
 * source-controlled text so an exported project never depends on omitted
 * sandbox binaries. These are the same originals, not replacement photos.
 */

export const LEGACY_PHOTO_IDS: Readonly<Record<string, number>> = {
  "/images/signature-lamb-rack.webp": 11795618,
  "/images/signature-mushroom-risotto.webp": 24289215,
  "/images/signature-berry-pavlova.webp": 34552000,
  "/images/maison-noor-evening-room.webp": 37968303,
  "/images/burrata-and-tomato.webp": 24706519,
  "/images/brioche-with-berries.webp": 9597589,
  "/images/smoked-tomato-soup.webp": 38786370,
  "/images/hand-rolled-pasta.webp": 38868615,
  "/images/chargrilled-steak.webp": 27305335,
  "/images/house-coffee.webp": 459489,
};

const originallyLocal = new Set(Object.values(LEGACY_PHOTO_IDS));

export function remotePhotoUrl(id: number, width: number, height?: number, extension = "jpeg") {
  const url = new URL(`https://images.pexels.com/photos/${id}/pexels-photo-${id}.${extension}`);
  url.searchParams.set("auto", "compress");
  url.searchParams.set("cs", "tinysrgb");
  url.searchParams.set("w", String(Math.max(1, Math.round(width))));
  if (height) {
    url.searchParams.set("fit", "crop");
    url.searchParams.set("h", String(Math.max(1, Math.round(height))));
  }
  return url.toString();
}

export function photoUrl(id: number, width: number, height: number, extension = "jpeg") {
  // Local originals were not cropped by px(); retain their natural aspect
  // ratio and let the existing object-fit styles control the composition.
  return remotePhotoUrl(id, width, originallyLocal.has(id) ? undefined : height, extension);
}

export function resolvePhotoSource(source: string) {
  const path = source.split("?")[0];
  const id = LEGACY_PHOTO_IDS[path];
  return id ? remotePhotoUrl(id, 1600) : source;
}

export function canLoadDirectly(source: string) {
  try {
    const url = new URL(source);
    return url.protocol === "https:" && url.hostname === "images.pexels.com";
  } catch {
    return false;
  }
}
