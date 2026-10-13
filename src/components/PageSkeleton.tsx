
type Props = {
  kind?: "home" | "products" | "detail";
};

export default function PageSkeleton({
  kind = "products",
}: Props) {
  return (
    <main
      aria-label="পেজ লোড হচ্ছে"
      aria-busy="true"
      className="min-h-110 animate-pulse bg-[#F0F5F0]"
    >
      <div className="mx-auto w-full max-w-225 px-4 py-5">
        {kind === "home" && (
          <>
            <div className="mb-4 h-20 rounded-xl bg-white/80" />
            <div className="mb-4 h-16 rounded-xl bg-white/80" />
          </>
        )}

        {kind === "detail" ? (
          <>
            <div className="h-28 rounded-2xl bg-white/80" />
            <div className="mt-5 h-52 rounded-2xl bg-white/80" />
          </>
        ) : (
          <>
            <div className="h-16 rounded-xl border border-[#E0E9E1] bg-[#FAFCFA]" />

            <div className="mt-3 h-11 rounded-xl border border-[#E0E9E1] bg-[#FAFCFA]" />

            <div className="mb-3 mt-4 h-3 w-40 rounded bg-gray-200" />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }, (_, index) => (
                <div
                  key={index}
                  className="h-24 rounded-xl border border-[#E0E9E1] bg-[#FAFCFA] p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-gray-200" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-2/3 rounded bg-gray-200" />
                      <div className="h-2 w-1/3 rounded bg-gray-200" />
                    </div>
                  </div>
                  <div className="mt-4 h-3 w-1/2 rounded bg-gray-200" />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
