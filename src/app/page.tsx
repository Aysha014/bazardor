
import Marquee from "@/components/Marquee";
import HeroSection from "@/components/HeroSection";
import PriceSection from "@/components/PriceSection";
import AllProducts from "@/components/AllProducts";
import type { Product } from "@/lib/products";

async function getProducts(): Promise<Product[]> {
  const response = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    { next: { revalidate: 300 } }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return Array.isArray(data) ? data : data.data ?? [];
}

export default async function HomePage() {
  const products = await getProducts();

  const rising = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const falling = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <>
      <Marquee />

      <div className="min-h-screen bg-[#F0F5F0]">
        <div className="mx-auto w-full max-w-225 px-4">
          <HeroSection />

          <PriceSection
            title="আজ দাম বেড়েছে"
            direction="up"
            products={rising}
          />

          <PriceSection
            title="আজ দাম কমেছে"
            direction="down"
            products={falling}
          />

          <AllProducts products={products} />
        </div>
      </div>
    </>
  );
}
