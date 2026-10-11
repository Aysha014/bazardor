import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold text-gray-900">
          বাজার দর
        </Link>

        <div className="flex items-center gap-4 text-sm font-medium text-gray-700">
          <Link href="/" className="transition hover:text-gray-900">
            হোম
          </Link>
          <Link href="/prices" className="transition hover:text-gray-900">
            দাম
          </Link>
        </div>
      </nav>
    </header>
  );
}
