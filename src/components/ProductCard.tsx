import Link from "next/link";
import type { Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
};

const unitBn = (unit: string) =>
  unit === "kg"
    ? "কেজি"
    : unit === "litre"
    ? "লিটার"
    : unit === "dozen"
    ? "ডজন"
    : "পিস";

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link
      href={`/product/${product.slug ?? product.id}`}
      className="flex min-h-25 flex-col rounded-xl border border-[#E0E9E1] bg-[#FAFCFA] p-3 transition hover:border-green-700 hover:shadow-sm"
    >
      {/* Product icon and details */}
      <div className="flex min-w-0 items-center gap-2">
        <div className="flex h-8.75 w-8.75 shrink-0 items-center justify-center rounded-lg bg-[#F0F5F0] text-lg">
          {product.image}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-[13px] font-semibold leading-5 text-gray-800">
            {product.nameBn}
          </h3>
          <p className="text-[10px] leading-4 text-gray-500">
            প্রতি {unitBn(product.unit)}
          </p>
        </div>
      </div>

      {/* Price and percentage change */}
      <div className="mt-auto flex min-w-0 items-end justify-between gap-2 pt-2">
        <div className="min-w-0">
          <p className="text-[9px] leading-3 text-gray-500">আজকের দাম</p>
          <p className="truncate text-sm font-bold leading-5 text-gray-900">
            {product.today.toLocaleString("bn-BD")} টাকা
          </p>
        </div>

        <div
          className={`mb-0.5 shrink-0 rounded-full px-2 py-1 text-[9px] font-semibold leading-none ${
            isUp
              ? "bg-green-50 text-green-600"
              : isDown
              ? "bg-red-50 text-red-600"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
          {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
        </div>
      </div>
    </Link>
  );
}