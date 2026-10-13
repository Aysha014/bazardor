
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[55vh] items-center justify-center bg-[#F0F5F0] px-4 py-12">
      <section className="w-full max-w-md rounded-2xl border border-[#E0E9E1] bg-[#FAFCFA] p-8 text-center shadow-sm">
        <div className="text-5xl" aria-hidden="true">
          🔎
        </div>

        <p className="mt-4 text-sm font-semibold text-green-700">
          404 · দুঃখিত, পেজটি খুঁজে পাওয়া যায়নি
        </p>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          ঠিকানাটি ভুল হতে পারে অথবা পেজটি সরিয়ে ফেলা হয়েছে।
        </p> 

        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-[#078B43] px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
        >
          হোম পেজে ফিরে যান
        </Link>
      </section>
    </main>
  );
}
