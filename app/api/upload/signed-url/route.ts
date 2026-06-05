import { NextResponse } from "next/server";
import { getSignedUploadUrl, type UploadFolder } from "@/lib/r2";
import {
  ACCEPTED_REFERENCE_IMAGE_TYPES,
  MAX_REFERENCE_IMAGE_SIZE,
} from "@/lib/utils";

const allowedFolders: UploadFolder[] = [
  "quote-references",
  "products",
  "categories",
  "documents",
];

export async function POST(request: Request) {
  const body = (await request.json()) as {
    contentType?: string;
    fileName?: string;
    fileSize?: number;
    folder?: UploadFolder;
  };

  if (!body.folder || !allowedFolders.includes(body.folder)) {
    return NextResponse.json({ error: "Invalid upload folder." }, { status: 400 });
  }

  if (!body.fileName || !body.contentType) {
    return NextResponse.json(
      { error: "fileName and contentType are required." },
      { status: 400 },
    );
  }

  if (body.folder === "documents") {
    const allowedDocumentTypes = ["application/pdf", ...ACCEPTED_REFERENCE_IMAGE_TYPES];
    if (!allowedDocumentTypes.includes(body.contentType)) {
      return NextResponse.json({ error: "Invalid document type." }, { status: 400 });
    }

    if (body.fileSize && body.fileSize > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Documents must be smaller than 10MB." },
        { status: 400 },
      );
    }
  } else {
    if (!ACCEPTED_REFERENCE_IMAGE_TYPES.includes(body.contentType)) {
      return NextResponse.json({ error: "Invalid image type." }, { status: 400 });
    }

    if (body.fileSize && body.fileSize > MAX_REFERENCE_IMAGE_SIZE) {
      return NextResponse.json(
        { error: "Images must be smaller than 5MB." },
        { status: 400 },
      );
    }
  }

  try {
    return NextResponse.json(
      await getSignedUploadUrl(body.folder, body.fileName, body.contentType),
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create signed upload URL.",
      },
      { status: 500 },
    );
  }
}
