"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SigninPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (result.error) {
        console.error("Signin error:", result.error);
        setError(result.error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।");
        return;
      }

      router.push("/profile");
      router.refresh();
    } catch (err) {
      console.error("Signin exception:", err);
      setError("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialSignin(provider: "google" | "github") {
    setError("");
    setSocialLoading(provider);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/profile",
      });

      if (result.error) {
        console.error(`${provider} signin error:`, result.error);
        setError(result.error.message || "সোশ্যাল সাইন-ইন করা যায়নি।");
        setSocialLoading("");
      }
    } catch (err) {
      console.error(`${provider} signin exception:`, err);
      setError("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setSocialLoading("");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#F0F5F0] px-4 py-10 sm:py-12">
      <div className="mb-7 text-center">
        <h1 className="text-3xl font-bold text-[#24352A]">
          সাইন ইন
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <div className="w-full max-w-107.5 rounded-2xl border border-[#E0E9E1] bg-white/70 p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[#24352A]"
            >
              ইমেইল
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="h-10.5 w-full rounded-lg border border-[#DDE7DE] bg-transparent px-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-[#24352A]"
            >
              পাসওয়ার্ড
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর"
              autoComplete="current-password"
              required
              className="h-10.5 w-full rounded-lg border border-[#DDE7DE] bg-transparent px-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-xs text-green-700 hover:underline"
            >
              পাসওয়ার্ড ভুলে গেছেন?
            </Link>
          </div>

          {error && (
            <p role="alert" className="text-sm leading-5 text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !!socialLoading}
            className="w-full rounded-lg bg-[#078B43] py-3 text-sm font-semibold text-white shadow-md transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#E0E6E1]" />
          <span className="text-xs text-gray-600">অথবা</span>
          <div className="h-px flex-1 bg-[#E0E6E1]" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleSocialSignin("google")}
            disabled={loading || !!socialLoading}
            className="flex min-w-0 items-center justify-center gap-1.5 rounded-lg border border-[#DDE7DE] bg-white px-2 py-3 text-xs font-semibold text-[#26332A] transition hover:bg-gray-50 disabled:opacity-60"
          >
            <svg viewBox="0 0 48 48" className="h-4 w-4 shrink-0" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" transform="translate(0 5)" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 38.06 46.98 31.86 46.98 24.55Z" />
              <path fill="#FBBC05" d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.2a23.9 23.9 0 0 0 0 21.58l7.98-6.2Z" transform="translate(0 5)" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.44-4.89 2.3-8.18 2.3-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.2C6.51 42.62 14.62 48 24 48Z" transform="translate(0 -2)" />
            </svg>

            <span className="truncate">
              {socialLoading === "google" ? "অপেক্ষা করুন..." : "Google দিয়ে চালিয়ে যান"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignin("github")}
            disabled={loading || !!socialLoading}
            className="flex min-w-0 items-center justify-center gap-1.5 rounded-lg border border-[#DDE7DE] bg-white px-2 py-3 text-xs font-semibold text-[#26332A] transition hover:bg-gray-50 disabled:opacity-60"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 fill-current" aria-hidden="true">
              <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.67-3.75-1.32-3.75-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.23-5.1 5.51.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
            </svg>

            <span className="truncate">
              {socialLoading === "github" ? "অপেক্ষা করুন..." : "GitHub দিয়ে চালিয়ে যান"}
            </span>
          </button>
        </div>

        <p className="mt-5 text-center text-sm text-gray-700">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-medium text-green-700 hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      <Link
        href="/"
        className="mt-6 text-sm text-gray-500 hover:text-green-700"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}