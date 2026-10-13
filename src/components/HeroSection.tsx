
import Image from "next/image";

export default function HeroSection() {
    const today = new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <section className="mt-6 flex flex-col items-center justify-between gap-8 rounded-3xl border border-gray-200 bg-white/70 px-6 py-8 shadow-sm md:flex-row md:px-10 md:py-10">
            <div className="min-w-0 flex-1">
                <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                    {today}
                </span>

                <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
                    আজকের বাজারের দাম এক নজরে
                </h1>

                <p className="mt-4 text-sm leading-7 text-gray-500">
                    চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                    বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক
                    এবং দামের পরিবর্তন এক জায়গায়।
                </p>

                <a
                    href="#সব-পণ্য"
                    className="mt-6 inline-flex rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-900/20 transition hover:bg-green-800"
                >
                    সব পণ্য দেখুন
                </a>
            </div>

            <div className="flex shrink-0 items-center justify-center">
                <Image
                    src="/bazar-hero.png"
                    alt="Basket of fresh vegetables"
                    width={240}
                    height={180}
                    priority
                    className="h-auto w-48 object-contain md:w-60"
                />
            </div>
        </section>
    );
}
