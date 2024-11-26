import connectDB from "@/dbConfig/dbConfig";
import Dictionary from "@/models/dictionary";
import HeroSection from "./mainHeroSection";
import DictionaryCard from "./dictionaryCard";
import User from "@/models/users";
import Link from "next/link";
import { cookies } from "next/headers";
import { hasPermission } from "@/dictionaryPermission";

export const revalidate = 0;

export default async function Home({ searchParams }: { searchParams: any }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value as string;
  await connectDB();
  const searchParamsSafe = await searchParams;

  const filter: any = {};
  if (searchParamsSafe?.word) {
    filter.word = new RegExp(searchParamsSafe.word, "i");
  }
  if (searchParamsSafe?.partOfSpeech) {
    filter.partOfSpeech = searchParamsSafe.partOfSpeech;
  }
  if (searchParamsSafe?.createdBy) {
    filter.createdBy = searchParamsSafe.createdBy;
  }

  let data = [];
  try {
    await User.findOne({ role: "admin" });
    data = await Dictionary.find(filter).populate("createdBy", "_id name");
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <div className=" mx-auto max-w-7xl w-full min-h-screen p-6">
      {(hasPermission(token, "edit:dictionary") ||
        hasPermission(token, "edit:user")) && (
        <Link
          href="/admin"
          className=" text-lg font-semibold text-gray-600 cursor-pointer mb-4"
        >
          Admin panel
        </Link>
      )}
      <HeroSection></HeroSection>
      <h1 className="text-2xl font-bold mb-4">
        Dictionary Results -{" "}
        <span className=" text-gray-500 font-medium text-xl">
          {data.length}
        </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.length > 0 ? (
          data.map((item: DictionaryType) => (
            <DictionaryCard key={item._id} dictionary={item} token={token} />
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export type DictionaryType = {
  _id: string;
  word: string;
  meaning: string;
  partOfSpeech: string;
  example: string;
  synonyms: string[];
  antonyms: string[];
};
