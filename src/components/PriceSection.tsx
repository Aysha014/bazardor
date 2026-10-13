import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";

type Props = {
  title: string;
  products: Product[];
  direction: "up" | "down";
};

export default function PriceSection({ title, products, direction }: Props) {
  return (
    <section className="mt-5">
      <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-gray-800">
        <span className={direction === "up" ? "text-green-600" : "text-red-600"}>
          {direction === "up" ? "▲" : "▼"}
        </span>
        {title}
      </h2>

      {/* 6 items = 2 full rows of 3 on large screens */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {products.slice(0, 6).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}