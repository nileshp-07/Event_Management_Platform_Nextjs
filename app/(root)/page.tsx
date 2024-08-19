import Events from "@/components/shared/home/Events";
import HeroSection from "@/components/shared/home/HeroSection";
import { Button } from "@/components/ui/button";
import { SearchParamType } from "@/types";
import Image from "next/image";

export default function Home({searchParams} : SearchParamType) {
  console.log("SP : ",searchParams);

  return (
    <div>
        <HeroSection/>
        <Events searchParams={searchParams}/>
    </div>
  );
}
