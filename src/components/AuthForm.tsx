
"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

type AuthFormProps = {
    mode: "signin" | "signup";
};

export default function AuthForm({ mode }: AuthFormProps) {
    const isSignup = mode === "signup";

    return (
        <main className="flex flex-1 flex-col items-center bg-[#f0f5f0] px-4 py-10 sm:py-14">
            <div className="mb-6 text-center">
                <h1 className="text-xl font-bold text-gray-900">
                    {isSignup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}
                </h1>

                <p className="mt-2 text-xs text-gray-500">
                    {isSignup
                        ? "বাজার দর-এর সকল সুবিধা পেতে আপনার অ্যাকাউন্ট তৈরি করুন"
                        : "আপনার অ্যাকাউন্টে প্রবেশ করতে সাইন ইন করুন"}
                </p>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    alert("Authentication will be connected here.");
                }}
                className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
            >
                {isSignup && (
                    <div className="mb-4">
                        <label className="mb-1 block text-xs font-medium text-gray-700">
                            নাম
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="আপনার নাম লিখুন"
                            autoComplete="name"
                            required
                            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                        />
                    </div>
                )}

                <div className="mb-4">
                    <label className="mb-1 block text-xs font-medium text-gray-700">
                        ইমেইল
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                    />
                </div>

                <div className="mb-4">
                    <label className="mb-1 block text-xs font-medium text-gray-700">
                        পাসওয়ার্ড
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="আপনার পাসওয়ার্ড লিখুন"
                        autoComplete={
                            isSignup ? "new-password" : "current-password"
                        }
                        minLength={8}
                        required
                        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                    />
                </div>

                {isSignup && (
                    <div className="mb-4">
                        <label className="mb-1 block text-xs font-medium text-gray-700">
                            পাসওয়ার্ড নিশ্চিত করুন
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="আবার পাসওয়ার্ড লিখুন"
                            autoComplete="new-password"
                            minLength={8}
                            required
                            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                        />
                    </div>
                )}

                {!isSignup && (
                    <div className="mb-4 text-right">
                        <Link
                            href="/forgot-password"
                            className="text-xs text-green-700 hover:underline"
                        >
                            পাসওয়ার্ড ভুলে গেছেন?
                        </Link>
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full rounded-md bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
                >
                    {isSignup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}
                </button>

                <div className="my-4 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-xs text-gray-500">অথবা</span>
                    <div className="h-px flex-1 bg-gray-200" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <button
                        type="button"
                        className="flex items-center justify-center gap-2 rounded-md border border-gray-200 px-2 py-2 text-xs text-gray-700 hover:bg-gray-50"
                        onClick={() => alert("Connect Google authentication here.")}
                    >
                        <FcGoogle size={18} />
                        <span>Google দিয়ে চালিয়ে যান</span>
                    </button>

                    <button
                        type="button"
                        className="rounded-md border border-gray-200 px-2 py-2 text-xs text-gray-700 hover:bg-gray-50"
                        onClick={() => alert("Connect GitHub authentication here.")}
                    >
                        ◉ GitHub দিয়ে চালিয়ে যান
                    </button>
                </div>

                <p className="mt-4 text-center text-xs text-gray-600">
                    {isSignup ? "ইতোমধ্যে অ্যাকাউন্ট আছে?" : "অ্যাকাউন্ট নেই?"}{" "}
                    <Link
                        href={isSignup ? "/signin" : "/signup"}
                        className="font-semibold text-green-700 hover:underline"
                    >
                        {isSignup ? "সাইন ইন করুন" : "নতুন অ্যাকাউন্ট তৈরি করুন"}
                    </Link>
                </p>
            </form>

            <Link
                href="/"
                className="mt-5 text-xs text-gray-500 transition hover:text-green-700 hover:underline"
            >
                ← হোম পেজে ফিরে যান
            </Link>
        </main>
    );
}
