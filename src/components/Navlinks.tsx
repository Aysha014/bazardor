
import NavlinksClient from "@/components/NavlinksClient";


type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

export default async function Navlinks() {
  let categories: Category[] = [];

  try {
    const res = await fetch(
      "https://api.abcz.workers.dev/api/bazardor/categories",
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await res.json();
    categories = Array.isArray(data) ? data : data.data ?? [];
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  return <NavlinksClient categories={categories} />;
}
