
import { notFound } from "next/navigation";
import CategoryProductGrid from "@/components/CategoryProductGrid";
import type { Product } from "@/lib/products";

type Category = {
    id: string | number;
    slug: string;
    nameBn: string;
    icon: string;
};

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

async function getCategories(): Promise<Category[]> {
    const response = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/categories",
        { next: { revalidate: 300 } }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch categories");
    }

    const data = await response.json();

    return Array.isArray(data) ? data : data.data ?? [];
}

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const [products, categories] = await Promise.all([
        getProducts(),
        getCategories(),
    ]);

    const category = categories.find(
        (item) => item.slug.toLowerCase() === slug.toLowerCase()
    );

    if (!category) {
        notFound();
    }

    const categoryProducts = products.filter((product) => {
        const productCategory = String(product.category ?? "")
            .trim()
            .toLowerCase();

        return (
            productCategory === String(category.id).toLowerCase() ||
            productCategory === category.slug.toLowerCase() ||
            productCategory === category.nameBn.toLowerCase() ||
            String(product.categoryNameBn ?? "").trim() === category.nameBn
        );
    });

    return (
        <main className="min-h-110 bg-[#F0F5F0]">
            <div className="mx-auto w-full max-w-192.5 px-3 pb-16 pt-4 sm:px-4">
                {/* Category header */}
                <section className="flex min-h-15.75 items-center gap-3 rounded-xl border border-[#E0E9E1] bg-[#FAFCFA] px-4 py-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] text-2xl">
                        {category.icon}
                    </div>

                    <div>
                        <h1 className="text-base font-bold text-[#202820]">
                            {category.nameBn}
                        </h1>

                        <p className="text-[10px] text-gray-500">
                            {new Intl.NumberFormat("bn-BD").format(categoryProducts.length)} টি পণ্যের আজকের দাম ও পরিবর্তন
                        </p>
                    </div>
                </section>

                {/* Sorting and product grid */}
                <CategoryProductGrid products={categoryProducts} />
            </div>
        </main>
    );
}
