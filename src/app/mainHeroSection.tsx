"use client";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

function HeroSection() {
  const [serarchWord, setSearchWord] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/?word=${serarchWord}`);
    }, 1000);

    return () => clearTimeout(timer);
  }, [serarchWord]);

  return (
    <div className=" h-[60vh] w-full max-w-7xl mx-auto flex justify-center items-center">
      <div className=" flex flex-col gap-6">
        <p className=" text-4xl font-medium text-gray-700 text-center">
          Search for a word
        </p>
        <input
          onChange={(e) => setSearchWord(e.target.value)}
          value={serarchWord}
          type="text"
          className=" py-3 px-6 rounded-3xl border border-gray-300 focus:border-gray-400 focus:outline-none"
          placeholder=" Search here"
        />
      </div>
    </div>
  );
}

export default HeroSection;
