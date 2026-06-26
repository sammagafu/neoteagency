import { CareerForm } from "@/components/admin/CareerForm";

export default function NewCareerPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-foreground">
        New Career Listing
      </h1>
      <div className="mt-8">
        <CareerForm />
      </div>
    </div>
  );
}
