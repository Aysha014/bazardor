"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";

type NavUser = {
  name: string;
  email: string;
  image?: string;
};

function Avatar({ user, size }: { user: NavUser; size: number }) {
  if (user.image) {
    return (
      <Image
        src={user.image}
        alt="Profile"
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className="rounded-full object-cover"
      />
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className="flex items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-800"
    >
      {user.name.charAt(0).toUpperCase()}
    </div>
  );
}

function ProfileMenu({ user }: { user: NavUser }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click and on Escape
  useEffect(() => {
    if (!open) return;

    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  async function handleSignOut() {
    setOpen(false);
    await authClient.signOut();
    router.push("/signin");
    router.refresh();
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-md px-2 py-1 transition hover:bg-gray-50"
      >
        <Avatar user={user} size={28} />

        <span className="hidden text-xs font-medium text-gray-700 sm:block">
          {user.name}
        </span>

        <ChevronDown
          size={14}
          className={`text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-3 w-72 rounded-2xl border border-gray-200 bg-white p-5 shadow-xl"
        >
          <p className="truncate text-base font-bold text-gray-900">
            {user.name}
          </p>
          <p className="mb-4 truncate text-sm text-gray-500">{user.email}</p>

          <Link
            href="/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-md py-2 text-sm text-gray-800 hover:text-green-700"
          >
            <User size={16} />
            আমার প্রোফাইল
          </Link>

          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            className="flex w-full items-center gap-2 rounded-md py-2 text-sm text-red-600 hover:text-red-700"
          >
            <LogOut size={16} />
            সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const { data: session } = authClient.useSession();

  const user: NavUser | null = session?.user
    ? {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image ?? undefined,
      }
    : null;

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
            <p className="mt-0.5 text-[11px] text-black">{banglaDate}</p>
          </div>
        </Link>

        {/* Authentication / Profile */}
        {user ? (
          <ProfileMenu user={user} />
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/signin"
              className="rounded-md border border-green-700 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-50"
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              className="rounded-md bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800"
            >
              সাইন আপ
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
