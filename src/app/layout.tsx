import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Navlinks from "@/components/Navlinks";
import Marquee from "@/components/Marquee";
import Footer from "@/components/footer";
import ToastProvider from "@/components/ToastProvider";



const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "BazarDor | বাজারদর",
  description: "Check daily market prices with BazarDor.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="bn"
      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F0F5F0] text-black">
        <ToastProvider />
        <Navbar />
        <Navlinks />
         <Marquee />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
