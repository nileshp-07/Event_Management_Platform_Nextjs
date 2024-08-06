import Events from "@/components/shared/home/Events";
import HeroSection from "@/components/shared/home/HeroSection";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
        <HeroSection/>
        <Events/>
    </div>
  );
}
