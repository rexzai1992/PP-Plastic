import { NextResponse } from "next/server";
import { uploadFileToR2, type UploadFolder } from "@/lib/r2";
import {
  ACCEPTED_REFERENCE_IMAGE_TYPES,
  MAX_REFERENCE_IMAGE_SIZE,
} from "@/lib/utils";

export const runtime = "edge";

const allowedFolders: UploadFolder[] = [
  "quote-references",
  "products",
  "categories",
  "documents",
];

function validateFile(file: File, folder: UploadFolder) {
  if (folder === "documents") {
    const allowedDocumentTypes = ["application/pdf", ...ACCEPTED_REFERENCE_IMAGE_TYPES];
    if (!allowedDocumentTypes.includes(file.type)) {
      return "Documents must be PDF, JPG, PNG, or WEBP files.";
    }

    if (file.size > 10 * 1024 * 1024) {
      return "Documents must be smaller than 10MB.";
    }

    return null;
  }

  if (!ACCEPTED_REFERENCE_IMAGE_TYPES.includes(file.type)) {
    return "Please upload a JPG, PNG, or WEBP image.";
  }

  if (file.size > MAX_REFERENCE_IMAGE_SIZE) {
    return "Image uploads must be smaller than 5MB.";
  }

  return null;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const folder = formData.get("folder");
  const file = formData.get("file");

  if (typeof folder !== "string" || !allowedFolders.includes(folder as UploadFolder)) {
    return NextResponse.json({ error: "Invalid upload folder." }, { status: 400 });
  }

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File upload is required." }, { status: 400 });
  }

  const validationError = validateFile(file, folder as UploadFolder);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  try {
    const uploaded = await uploadFileToR2(file, folder as UploadFolder);
    return NextResponse.json(uploaded);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Upload failed. Please check R2 configuration.",
      },
      { status: 500 },
    );
  }
}
