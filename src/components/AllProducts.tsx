
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";

export default function AllProducts({ products }: { products: Product[] }) {
  return (
    <section className="mt-7 pb-10">
      <h2 className="text-base font-bold text-gray-800">সব পণ্য</h2>

      <p className="mb-3 mt-2 text-xs text-gray-500">
        মোট {new Intl.NumberFormat("bn-BD").format(products.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
