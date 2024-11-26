"use client";
import { Github, Globe } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function AshishFooter() {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  function handleNameClick() {
    router.push("https://portfolio-iota-olive-12.vercel.app/");
  }
  return (
    <div className="mx-auto w-full border-t border-neutral-300 py-2">
      <div className="relative text-center text-sm text-gray-700">
        Developed By -{" "}
        <span
          onClick={handleNameClick}
          className="cursor-pointer rounded p-1 duration-300 hover:bg-neutral-200"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Ashish Bishnoi
          {isHovered && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 transform p-1">
              <div className="flex w-80 flex-col justify-start gap-3 rounded border border-neutral-200 bg-neutral-100 p-3 text-gray-500 shadow-lg">
                <div className="flex gap-3">
                  <Link
                    target="_blank"
                    href={"https://portfolio-iota-olive-12.vercel.app/"}
                  >
                    <img
                      className="size-12 rounded-full border border-neutral-400"
                      src="https://bishnoi11011.s3.ap-south-1.amazonaws.com/portfolio/me.jpg"
                      alt="Ashish Bishnoi Pic"
                    />
                  </Link>
                  <Link
                    target="_blank"
                    href="https://portfolio-iota-olive-12.vercel.app/"
                    className="flex flex-col rounded px-1 duration-200 hover:bg-neutral-200"
                  >
                    <p className="text-left text-lg font-bold">
                      Ashish Bishnoi
                    </p>
                    <p className="text text-left font-thin text-gray-400">
                      Software Developer
                    </p>
                  </Link>
                  <div className="ml-auto mr-2 flex flex-col items-center justify-center gap-1">
                    <Link
                      target="_blank"
                      href="https://portfolio-iota-olive-12.vercel.app/"
                    >
                      <Globe
                        className="cursor-pointer text-gray-700 duration-200 hover:scale-125 hover:text-black"
                        size={16}
                      />
                    </Link>
                    <Link
                      target="_blank"
                      href={"https://github.com/ashish11011"}
                    >
                      <Github
                        className="cursor-pointer text-gray-700 duration-200 hover:scale-125 hover:text-black"
                        size={16}
                      />
                    </Link>
                  </div>
                </div>
                <div className="text-left text-gray-700">
                  Full Stack Developer open for freelance projects in dynamic
                  web applications.
                </div>
              </div>
            </div>
          )}
        </span>
      </div>
    </div>
  );
}

export default AshishFooter;
