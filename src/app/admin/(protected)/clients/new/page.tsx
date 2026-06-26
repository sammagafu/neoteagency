import { ClientLogoForm } from "@/components/admin/ClientLogoForm";

export default function NewClientLogoPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-foreground">
        New Client Logo
      </h1>
      <div className="mt-8">
        <ClientLogoForm />
      </div>
    </div>
  );
}
