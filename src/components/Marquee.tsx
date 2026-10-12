import MarqueeClient from "./MarqueeClient";

interface Product {
    id: number;
    nameBn: string;
    today: number;
    unit: string;
    image: string;
    change: { dir: "up" | "down" | "flat"; pct: number };
}

const Marquee = async () => {
    let products: Product[] = [];

    try {
        const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
        const data = await res.json();

        if (Array.isArray(data)) products = data;
        else if (Array.isArray(data?.data)) products = data.data;
    } catch (error) {
        console.error("Failed to fetch products:", error);
    }

    if (products.length === 0) return null;

    return <MarqueeClient products={products} />;
};

export default Marquee;