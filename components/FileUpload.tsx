"use client";

import { useId, useState } from "react";
import { LoaderCircle, Trash2, UploadCloud } from "lucide-react";
import type { UploadedReference } from "@/types/quote";
import { isValidReferenceImage } from "@/lib/utils";
import { ImageWithFallback } from "@/components/ImageWithFallback";

interface FileUploadProps {
  label: string;
  value?: UploadedReference;
  onChange: (value?: UploadedReference) => void;
  folder?: "quote-references" | "products" | "categories" | "documents";
  helperText?: string;
}

export function FileUpload({
  label,
  value,
  onChange,
  folder = "quote-references",
  helperText = "Optional JPG, PNG, or WEBP image up to 5MB.",
}: FileUploadProps) {
  const inputId = useId();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  function handleUpload(file: File) {
    setError("");
    setIsUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const request = new XMLHttpRequest();
    request.open("POST", "/api/upload");

    request.upload.addEventListener("progress", (event) => {
      if (!event.lengthComputable) {
        return;
      }

      setProgress(Math.round((event.loaded / event.total) * 100));
    });

    request.addEventListener("load", () => {
      setIsUploading(false);

      try {
        const parsed = JSON.parse(request.responseText) as {
          error?: string;
          key?: string;
          url?: string;
        };

        if (request.status >= 400 || !parsed.url || !parsed.key) {
          setError(parsed.error || "Upload failed. Please try again.");
          return;
        }

        onChange({
          key: parsed.key,
          name: file.name,
          url: parsed.url,
        });
      } catch {
        setError("Upload failed. Please try again.");
      }
    });

    request.addEventListener("error", () => {
      setIsUploading(false);
      setError("Upload failed. Please try again.");
    });

    request.send(formData);
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-[#1F2933]" htmlFor={inputId}>
        {label}
      </label>
      <label
        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#CBD5E1] bg-[#F7F8FA] px-4 py-6 text-center transition-colors hover:border-[#0F4C81]"
        htmlFor={inputId}
      >
        <input
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          id={inputId}
          type="file"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) {
              return;
            }

            if (folder !== "documents") {
              const validationError = isValidReferenceImage(file);
              if (validationError) {
                setError(validationError);
                return;
              }
            }

            handleUpload(file);
          }}
        />
        {isUploading ? (
          <>
            <LoaderCircle className="h-6 w-6 animate-spin text-[#0F4C81]" />
            <p className="mt-3 text-sm font-medium text-[#1F2933]">
              Uploading reference image...
            </p>
            <p className="mt-1 text-xs text-[#6B7280]">{progress}% complete</p>
          </>
        ) : (
          <>
            <UploadCloud className="h-6 w-6 text-[#0F4C81]" />
            <p className="mt-3 text-sm font-medium text-[#1F2933]">
              Click to upload a reference image
            </p>
            <p className="mt-1 text-xs text-[#6B7280]">{helperText}</p>
          </>
        )}
      </label>

      {value ? (
        <div className="flex flex-col gap-4 rounded-xl border border-[#E5E7EB] bg-white p-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-[#E5E7EB]">
              <ImageWithFallback
                fill
                alt={value.name}
                className="object-cover"
                sizes="64px"
                src={value.url}
              />
            </div>
            <div className="min-w-0">
              <p className="truncate font-medium text-[#1F2933]">{value.name}</p>
              <a
                className="truncate text-[#0F4C81]"
                href={value.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                View uploaded image
              </a>
            </div>
          </div>
          <button
            className="inline-flex items-center gap-2 text-sm font-medium text-[#B91C1C]"
            type="button"
            onClick={() => onChange(undefined)}
          >
            <Trash2 className="h-4 w-4" />
            Remove
          </button>
        </div>
      ) : null}

      {error ? <p className="text-sm text-[#B91C1C]">{error}</p> : null}
    </div>
  );
}
