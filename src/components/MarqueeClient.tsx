"use client";

import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Product {
    id: number;
    nameBn: string;
    today: number;
    unit: string;
    image: string;
    change: { dir: "up" | "down" | "flat"; pct: number };
}

const arrow = { up: "▲", down: "▼", flat: "–" };
const color = { up: "text-red-600", down: "text-green-600", flat: "text-gray-500" };

const MarqueeClient = ({ products }: { products: Product[] }) => {
    return (
        <div className="bg-white text-black text-sm">
            <MarqueeText className="py-1" direction="right" duration={10}>
                {products.map((p) => (
                    <span key={p.id} className="inline-flex items-center gap-1.5 mr-8">
                        <span>{p.image}</span>
                        <span>{p.nameBn}</span>
                        <span className="font-semibold">৳{p.today}/{p.unit}</span>
                        <span className={color[p.change.dir]}>
                            {arrow[p.change.dir]} {Math.abs(p.change.pct)}%
                        </span>
                    </span>
                ))}
            </MarqueeText>
        </div>
    );
};

export default MarqueeClient;