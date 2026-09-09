"use client";

import NextImage, { type ImageProps } from "next/image";
import { useState } from "react";
import { canLoadDirectly, resolvePhotoSource } from "@/lib/image-sources";

/**
 * Preserve next/image optimisation, responsive sizes, loading and alt text.
 * If a host's optimiser fails, retry the SAME photo directly once. A final
 * source error is not masked by substituting unrelated photography.
 */
export default function RestaurantImage(props: ImageProps) {
  const src = typeof props.src === "string" ? resolvePhotoSource(props.src) : props.src;
  const key = typeof src === "string" ? src : "default" in src ? src.default.src : src.src;
  return <ImageWithRecovery key={key} {...props} src={src} />;
}

function ImageWithRecovery({ src, onError, unoptimized, alt, ...props }: ImageProps) {
  const [direct, setDirect] = useState(false);
  const canRetry = typeof src === "string" && canLoadDirectly(src);

  return (
    <NextImage
      {...props}
      src={src}
      alt={alt}
      unoptimized={unoptimized || direct}
      data-image-recovery={direct ? "direct" : undefined}
      onError={(event) => {
        if (!direct && !unoptimized && canRetry) {
          setDirect(true);
          return;
        }
        onError?.(event);
      }}
    />
  );
}
