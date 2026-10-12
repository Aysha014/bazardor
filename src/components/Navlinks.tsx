import Link from "next/link";

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
      throw new Error(`Failed to fetch categories: ${res.status}`);
    }

    const data: Category[] = await res.json();
    categories = data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  return (
    <nav className="w-full border-b border-gray-100 bg-background">
      <div className="mx-auto max-w-6xl overflow-x-auto px-4 sm:px-6">
        <div className="flex min-w-max items-center gap-5">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="flex items-center gap-1.5 border-b-2 border-transparent py-3 text-xs font-medium text-gray-700 transition hover:border-green-700 hover:text-green-700"
            >
              <span>{category.icon}</span>
              <span>{category.nameBn}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}