import { cache } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
// import { redirect } from "next/navigation";
// import { getUser } from "@/lib/auth"; // use your own auth helper

/* ---------- Types (match the API response exactly) ---------- */

type MarketPrice = {
  market: string;
  division: string;
  min: number;
  max: number;
};

type ProductDetail = {
  id: number;
  slug: string;
  nameBn: string;
  category: string; // slug, e.g. "chal"
  categoryNameBn: string; // e.g. "চাল"
  categoryIcon: string;
  unit: "kg" | "litre" | "dozen" | "piece" | string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: { dir: "up" | "down" | "flat"; pct: number };
  markets: MarketPrice[];
};

/* ---------- Data ---------- */

const API_URL = "https://api.api-store.workers.dev/api/bazardor/products";

// cache() lets generateMetadata and the page share one request
const getProduct = cache(async (slug: string): Promise<ProductDetail | null> => {
  try {
    const res = await fetch(API_URL, { next: { revalidate: 300 } });
    if (!res.ok) return null;

    const data = await res.json();
    const list: ProductDetail[] = Array.isArray(data) ? data : data?.data ?? [];

    return list.find((p) => p.slug === slug) ?? null;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  return {
    title: product ? `${product.nameBn} | বাজার দর` : "পণ্য পাওয়া যায়নি | বাজার দর",
  };
}

/* ---------- Helpers ---------- */

const unitBn = (unit: string) =>
  unit === "kg"
    ? "কেজি"
    : unit === "litre"
    ? "লিটার"
    : unit === "dozen"
    ? "ডজন"
    : "পিস";

// Whole numbers stay plain (৬২), halves show two decimals (৬৩.৫০) like the Figma
const bn = (n: number) =>
  Number.isInteger(n)
    ? n.toLocaleString("bn-BD")
    : n.toLocaleString("bn-BD", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

// One place to control change colors (up = green, down = red).
// If your Figma should show red for up, swap the two text colors.
const tone = {
  up: { text: "text-green-600", arrow: "▲", label: "বেড়েছে" },
  down: { text: "text-red-600", arrow: "▼", label: "কমেছে" },
  flat: { text: "text-gray-500", arrow: "—", label: "অপরিবর্তিত" },
} as const;

/* ---------- Page ---------- */

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Protected route: uncomment once your auth helper exists
  // const user = await getUser();
  // if (!user) redirect("/signin");

  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const unit = unitBn(product.unit);
  const t = tone[product.change.dir];
  const diff = Math.abs(product.today - product.yesterday);

  // Per-market average = (min + max) / 2, sorted cheapest first
  const rows = product.markets
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);

  const lowest = Math.min(...rows.map((r) => r.min));
  const highest = Math.max(...rows.map((r) => r.max));

  return (
    <div className="mx-auto w-full max-w-225 px-4 py-6">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-4 flex flex-wrap items-center gap-2 text-xs text-gray-500"
      >
        <Link href="/" className="hover:text-green-700">
          হোম
        </Link>
        <span aria-hidden>›</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-green-700"
        >
          {product.categoryNameBn}
        </Link>
        <span aria-hidden>›</span>
        <span className="text-gray-800">{product.nameBn}</span>
      </nav>

      {/* Top summary */}
      <section className="flex flex-col gap-4 rounded-2xl border border-[#E0E9E1] bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] text-3xl">
            {product.image}
          </div>

          <div className="min-w-0">
            <h1 className="text-2xl font-bold leading-tight text-gray-900">
              {product.nameBn}
            </h1>
            <p className="mt-1 text-xs text-gray-500">
              প্রতি {unit} · {product.categoryNameBn}
            </p>
            <p className="mt-1.5 text-xs text-gray-700">
              গতকালের তুলনায় আজ দাম{" "}
              <b className="font-bold text-gray-900">{t.label}</b>
              {diff > 0 && <> · {bn(diff)} টাকা</>}
            </p>
          </div>
        </div>

        <div className="shrink-0 rounded-xl bg-[#F0F5F0] px-6 py-3 text-center sm:min-w-32">
          <p className="text-[11px] text-gray-500">আজকের দাম</p>
          <p className="text-3xl font-extrabold leading-tight text-gray-900">
            {bn(product.today)}
          </p>
          <p className="text-[11px] text-gray-500">টাকা / {unit}</p>
          <p className={`mt-1 text-xs font-semibold ${t.text}`}>
            {t.arrow} {bn(Math.abs(product.change.pct))}%
          </p>
        </div>
      </section>

      {/* Price summary */}
      <section className="mt-5 rounded-2xl border border-[#E0E9E1] bg-white p-5">
        <h2 className="mb-3 text-base font-bold text-gray-900">
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <SummaryBox
            label="সর্বনিম্ন দাম"
            value={lowest}
            color="text-green-700"
            note="সবচেয়ে কম দামের বাজার"
          />
          <SummaryBox
            label="সর্বোচ্চ দাম"
            value={highest}
            color="text-red-600"
            note="সবচেয়ে বেশি দামের বাজার"
          />
          <SummaryBox
            label="গড় দাম"
            value={product.today}
            color="text-gray-900"
            note={`প্রতি ${unit}-এর হিসাবে`}
          />
        </div>

        <h2 className="mb-3 mt-6 text-base font-bold text-gray-900">
          বাজারভিত্তিক আজকের দাম
        </h2>

        {/* Market table */}
        <div className="overflow-x-auto rounded-xl border border-[#E0E9E1]">
          <table className="w-full min-w-140 text-sm">
            <thead>
              <tr className="text-xs text-gray-500">
                <th scope="col" className="px-4 py-3 text-left font-normal">
                  বাজার
                </th>
                <th scope="col" className="px-4 py-3 text-left font-normal">
                  বিভাগ
                </th>
                <th scope="col" className="px-4 py-3 text-right font-normal">
                  সর্বনিম্ন
                </th>
                <th scope="col" className="px-4 py-3 text-right font-normal">
                  সর্বাধিক
                </th>
                <th scope="col" className="px-4 py-3 text-right font-normal">
                  গড়
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((m, i) => (
                <tr
                  key={`${m.market}-${m.division}`}
                  className={`border-t border-[#E0E9E1] ${
                    i % 2 === 1 ? "bg-[#F0F5F0]/70" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-3 font-semibold text-gray-900">
                    {m.market}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{m.division}</td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    {bn(m.min)} টাকা
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    {bn(m.max)} টাকা
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-gray-900">
                    {bn(m.avg)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

/* ---------- Small component ---------- */

function SummaryBox({
  label,
  value,
  color,
  note,
}: {
  label: string;
  value: number;
  color: string;
  note: string;
}) {
  return (
    <div className="rounded-xl border border-[#E0E9E1] p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`mt-1 font-bold ${color}`}>
        <span className="text-2xl">{bn(value)}</span>{" "}
        <span className="text-xs">টাকা</span>
      </p>
      <p className="mt-1 text-[11px] text-gray-500">{note}</p>
    </div>
  );
}