import Link from "next/link";

export default function SignupSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F0F5F0] px-4 py-10">
      <div className="w-full max-w-107.5 rounded-2xl border border-[#E0E9E1] bg-white/70 p-6 text-center shadow-sm sm:p-8">
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-700">
            ✓
          </div>
        </div>

        <h1 className="text-2xl font-bold text-[#24352A]">
          অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          বাজার দর-এ অ্যাকাউন্ট তৈরি করার জন্য ধন্যবাদ।
          এখন আপনার ইমেইল ও পাসওয়ার্ড দিয়ে সাইন ইন করুন।
        </p>

        <Link
          href="/signin"
          className="mt-6 block w-full rounded-lg bg-[#078B43] py-3 text-sm font-semibold text-white shadow-md transition hover:bg-green-800"
        >
          সাইন ইন করুন
        </Link>

        <Link
          href="/"
          className="mt-4 inline-block text-sm text-gray-500 hover:text-green-700"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}