import { revalidatePath } from "next/cache";

export function revalidatePublicContent() {
  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath("/about");
  revalidatePath("/careers");
  revalidatePath("/portfolio/[slug]", "page");
}
