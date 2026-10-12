import Marquee from "@/components/Marquee";
import HeroSection from "@/components/HeroSection";

export default function HomePage() {
  return (
    <>
      <Marquee />

      <div className="min-h-screen bg-[#F0F5F0]">
        <HeroSection />
        
      </div>
    </>
  );
}