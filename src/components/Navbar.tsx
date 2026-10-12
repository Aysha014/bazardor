
"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

type NavbarProps = {
  user?: {
    name: string;
    image?: string;
  } | null;
};

export default function Navbar({ user = null }: NavbarProps) {
  const banglaDate = new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

  return (
    <header className="w-full border-b border-gray-200 bg-[#F0F5F0]">
      {/* Top navigation */}
      <div className="mx-auto flex w-full max-w-225 items-center justify-between px-4 py-3">
        {/* Logo and date */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700">
            <Image
              src="/logo-icon.png"
              alt="BazarDor logo"
              width={20}
              height={20}
              className="object-contain"
              priority
            />
          </div>

          <div>
            <h1 className="text-base font-extrabold leading-tight text-gray-900">
              বাজার দর
            </h1>
            <p className="mt-0.5 text-[11px] text-black">
              {banglaDate}
            </p>
          </div>
        </Link>

        {/* Authentication / Profile */}
        {user ? (
          <Link
            href="/profile"
            className="flex items-center gap-2 rounded-md px-2 py-1 transition hover:bg-gray-50"
          >
            {user.image ? (
              <Image
                src={user.image}
                alt="Profile"
                width={28}
                height={28}
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-800">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}

            <span className="hidden text-xs font-medium text-gray-700 sm:block">
              {user.name}
            </span>

            <ChevronDown size={14} className="text-gray-500" />
          </Link>
        ) : (
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/signin"
              className="inline-flex items-center justify-center rounded-md border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-md bg-green-700 px-4 py-2 text-xs font-semibold text-white transition hover:bg-green-800"
            >
              সাইন আপ
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
