import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { verifySession } from "@/lib/auth";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await verifySession();
  if (!authed) {
    redirect("/admin/login");
  }

  return <AdminShell>{children}</AdminShell>;
}
