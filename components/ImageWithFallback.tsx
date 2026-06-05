"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function ImageWithFallback({
  src,
  alt,
  fill,
  width,
  height,
  className,
  sizes,
  priority,
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={cn(
          "flex h-full w-full items-center justify-center bg-[#F7F8FA] text-sm font-medium text-[#6B7280]",
          className,
        )}
      >
        Product image
      </div>
    );
  }

  return (
    <Image
      alt={alt}
      className={className}
      fill={fill}
      height={height}
      priority={priority}
      sizes={sizes}
      src={src}
      width={width}
      onError={() => setHasError(true)}
    />
  );
}
