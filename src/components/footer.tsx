export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-gray-60">
      <div className="mx-auto flex w-full max-w-225 flex-col items-start justify-between gap-2 px-4 py-5 text-xs text-gray-600 sm:flex-row sm:items-center">
        <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>

        <p className="sm:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}