import crypto from "crypto";
import fs from "fs";
import path from "path";

const ALLOWED_TYPES = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
  ["image/svg+xml", ".svg"],
]);

const ALLOWED_FOLDERS = new Set(["case-studies", "team", "gallery", "clients"]);

const MAX_SIZE = 5 * 1024 * 1024;

export async function saveUploadedImage(file: File, folder: string) {
  if (!ALLOWED_FOLDERS.has(folder)) {
    throw new Error("Invalid upload folder");
  }

  const extension = ALLOWED_TYPES.get(file.type);
  if (!extension) {
    throw new Error("Only JPEG, PNG, WebP, GIF, and SVG images are allowed");
  }

  if (file.size > MAX_SIZE) {
    throw new Error("Image must be 5 MB or smaller");
  }

  const filename = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${extension}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", folder);

  fs.mkdirSync(uploadDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(uploadDir, filename), buffer);

  return `/uploads/${folder}/${filename}`;
}
