"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";

type SortOption = "default" | "price-asc" | "price-desc";

// Convert Bengali and other common numeral characters to numbers.
function parsePrice(value: unknown): number {
  const normalized = String(value ?? "")
    .replace(/[০-৯]/g, (digit) =>
      String("০১২৩৪৫৬৭৮৯".indexOf(digit))
    )
    .replace(/[٠-٩]/g, (digit) =>
      String("٠١٢٣٤٥٦٧٨٩".indexOf(digit))
    )
    .replace(/[,،٬\s৳টাকা]/g, "");

  const match = normalized.match(/-?\d+(?:\.\d+)?/);

  if (!match) return 0;

  const price = Number(match[0]);
  return Number.isFinite(price) ? price : 0;
}

export default function CategoryProductGrid({
  products,
}: {
  products: Product[];
}) {
  const [sort, setSort] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "price-asc") {
      result.sort(
        (a, b) => parsePrice(a.today) - parsePrice(b.today)
      );
    } else if (sort === "price-desc") {
      result.sort(
        (a, b) => parsePrice(b.today) - parsePrice(a.today)
      );
    }

    return result;
  }, [products, sort]);

  return (
    <>
      <div className="mt-3 flex min-h-11 items-center justify-end gap-2 rounded-xl border border-[#E0E9E1] bg-[#FAFCFA] px-4 py-2">
        <label
          htmlFor="sort-products"
          className="shrink-0 text-xs text-gray-500"
        >
          সাজান
        </label>

        <div className="relative">
          <select
            id="sort-products"
            value={sort}
            onChange={(event) =>
              setSort(event.target.value as SortOption)
            }
            className="cursor-pointer appearance-none rounded-md border border-[#DDE7DE] bg-white py-2 pl-3 pr-8 text-xs text-[#24352A] outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-asc">
              দাম: কম থেকে বেশি
            </option>
            <option value="price-desc">
              দাম: বেশি থেকে কম
            </option>
          </select>

          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
          >
            <path
              d="m5 7.5 5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <p className="mb-3 mt-3 text-[10px] text-gray-500">
        মোট {new Intl.NumberFormat("bn-BD").format(products.length)}
        টি পণ্য দেখানো হচ্ছে
      </p>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-[#E0E9E1] bg-[#FAFCFA] px-4 py-10 text-center">
          <h2 className="text-base font-semibold text-[#24352A]">
            এই বিভাগে কোনো পণ্য পাওয়া যায়নি।
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            অন্য বিভাগ দেখুন অথবা হোম পেজে ফিরে যান।
          </p>

          <Link
            href="/"
            className="mt-5 inline-flex items-center justify-center rounded-lg bg-[#078B43] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      )}
    </>
  );
}