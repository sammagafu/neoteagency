import type { Metadata } from "next";
import { adminMetadata } from "@/lib/seo";
import "./admin-editor.css";

export const metadata: Metadata = adminMetadata;

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
