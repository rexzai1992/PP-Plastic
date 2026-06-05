import { randomUUID } from "node:crypto";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export type UploadFolder =
  | "quote-references"
  | "products"
  | "categories"
  | "documents";

const requiredEnvironmentVariables = [
  "CLOUDFLARE_R2_ACCOUNT_ID",
  "CLOUDFLARE_R2_ACCESS_KEY_ID",
  "CLOUDFLARE_R2_SECRET_ACCESS_KEY",
  "CLOUDFLARE_R2_BUCKET_NAME",
  "CLOUDFLARE_R2_PUBLIC_URL",
] as const;

function assertR2Environment() {
  const missingVariables = requiredEnvironmentVariables.filter(
    (key) => !process.env[key],
  );

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing Cloudflare R2 environment variables: ${missingVariables.join(", ")}`,
    );
  }
}

function getR2Client() {
  assertR2Environment();

  return new S3Client({
    region: "auto",
    endpoint: `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
    },
  });
}

function getBucketName() {
  assertR2Environment();
  return process.env.CLOUDFLARE_R2_BUCKET_NAME!;
}

export function getPublicFileUrl(key: string) {
  assertR2Environment();
  return `${process.env.CLOUDFLARE_R2_PUBLIC_URL!.replace(/\/$/, "")}/${key.replace(
    /^\//,
    "",
  )}`;
}

export async function uploadFileToR2(file: File, folder: UploadFolder) {
  const key = `${folder}/${randomUUID()}-${file.name.replace(/\s+/g, "-")}`;
  const arrayBuffer = await file.arrayBuffer();

  await getR2Client().send(
    new PutObjectCommand({
      Bucket: getBucketName(),
      Key: key,
      Body: Buffer.from(arrayBuffer),
      ContentType: file.type,
    }),
  );

  return {
    key,
    url: getPublicFileUrl(key),
  };
}

export async function deleteFileFromR2(key: string) {
  await getR2Client().send(
    new DeleteObjectCommand({
      Bucket: getBucketName(),
      Key: key,
    }),
  );
}

export async function getSignedUploadUrl(
  folder: UploadFolder,
  fileName: string,
  contentType: string,
) {
  const key = `${folder}/${randomUUID()}-${fileName.replace(/\s+/g, "-")}`;
  const command = new PutObjectCommand({
    Bucket: getBucketName(),
    Key: key,
    ContentType: contentType,
  });

  const url = await getSignedUrl(getR2Client(), command, {
    expiresIn: 300,
  });

  return {
    key,
    url,
    publicUrl: getPublicFileUrl(key),
  };
}
