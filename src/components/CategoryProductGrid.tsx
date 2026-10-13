
"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";

export default function CategoryProductGrid({
  products,
}: {
  products: Product[];
}) {
  const [sort, setSort] = useState("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "price-asc") {
      result.sort((a, b) => a.today - b.today);
    } else if (sort === "price-desc") {
      result.sort((a, b) => b.today - a.today);
    } else if (sort === "name") {
      result.sort((a, b) => a.nameBn.localeCompare(b.nameBn, "bn"));
    }

    return result;
  }, [products, sort]);

  return (
    <>
      <div className="mt-3 flex min-h-[44px] items-center justify-end gap-2 rounded-xl border border-[#E0E9E1] bg-[#FAFCFA] px-4 py-2">
        <label htmlFor="sort-products" className="text-[10px] text-gray-500">
          সাজান
        </label>
        <select
          id="sort-products"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          className="max-w-full rounded-md border border-gray-200 bg-transparent px-2 py-1 text-[10px] text-gray-700 outline-none focus:border-green-600"
        >
          <option value="default">নির্বাচন</option>
          <option value="price-asc">দাম: কম থেকে বেশি</option>
          <option value="price-desc">দাম: বেশি থেকে কম</option>
          <option value="name">নাম অনুযায়ী</option>
        </select>
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
        <div className="rounded-xl border border-[#E0E9E1] bg-[#FAFCFA] px-4 py-10 text-center text-xs text-gray-500">
          এই বিভাগে কোনো পণ্য পাওয়া যায়নি।
        </div>
      )}
    </>
  );
}
