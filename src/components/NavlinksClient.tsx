
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

export default function NavlinksClient({
  categories,
}: {
  categories: Category[];
}) {
  const pathname = usePathname();

  return (
    <nav className="w-full border-b border-gray-100 bg-[#F0F5F0]">
      <div className="mx-auto w-full max-w-225 overflow-x-auto px-4">
        <div className="flex min-w-max items-center gap-5">
          {categories.map((category) => {
            const active = pathname === `/category/${category.slug}`;

            return (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                aria-current={active ? "page" : undefined}
                className={`flex shrink-0 items-center gap-1.5 border-b-2 py-3 text-xs font-medium transition ${
                  active
                    ? "border-green-700 text-green-700"
                    : "border-transparent text-gray-700 hover:border-green-700 hover:text-green-700"
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
