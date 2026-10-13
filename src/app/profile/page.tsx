
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "../../lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [initialized, setInitialized] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Fill the form with the signed-in user's name.
  if (session?.user && !initialized) {
    setName(session.user.name ?? "");
    setInitialized(true);
  }

  if (isPending) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <p className="text-sm text-gray-500">প্রোফাইল লোড হচ্ছে...</p>
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4">
        <p>প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।</p>
        <Link
          href="/signin"
          className="rounded-md bg-green-700 px-5 py-2 text-sm text-white"
        >
          সাইন ইন
        </Link>
      </main>
    );
  }

  const user = session.user;

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const result = await authClient.updateUser({ name: name.trim() });

      if (result.error) {
        setMessage(result.error.message ?? "নাম আপডেট করা যায়নি।");
      } else {
        setMessage("আপনার নাম সফলভাবে আপডেট হয়েছে।");
      }
    } catch {
      setMessage("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setSaving(false);
    }
  }

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/signin");
    router.refresh();
  }

  return (
    <main className="flex-1 bg-[#F0F5F0] px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            আমার প্রোফাইল
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* User information */}
        <section className="mb-4 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center">
          {user.image ? (
            <img
              src={user.image}
              alt={`${user.name || "User"}'s profile picture`}
              referrerPolicy="no-referrer"
              className="h-20 w-20 shrink-0 rounded-full border-2 border-green-200 object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-800">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h2 className="font-bold text-gray-900">{user.name}</h2>
            <p className="break-all text-sm text-gray-500">
              {user.email}
            </p>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-md border border-red-300 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            ↪ সাইন আউট
          </button>
        </section>

        {/* Edit profile */}
        <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
          <h2 className="mb-6 text-lg font-bold text-gray-800">
            তথ্য
          </h2>

          <form onSubmit={handleUpdate}>
            <label
              htmlFor="name"
              className="mb-2 block text-sm text-gray-700"
            >
              নাম
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mb-4 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />

            <button
              type="submit"
              disabled={saving || !name.trim()}
              className="w-full rounded-md bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-800 disabled:opacity-60"
            >
              {saving ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>

            {message && (
              <p role="status" className="mt-3 text-sm text-gray-600">
                {message}
              </p>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}
