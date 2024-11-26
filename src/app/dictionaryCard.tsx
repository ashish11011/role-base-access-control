import { DictionaryType } from "./page";
import Link from "next/link";
import { cookies } from "next/headers";
import DictionaryCardEditButton from "./dictionaryCardEditButton";

async function DictionaryCard({
  dictionary,
  token,
}: {
  token: string;
  dictionary: DictionaryType;
}) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-md flex justify-between gap-2 transition">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">{dictionary.word}</h2>
        <p className="text-gray-600">{dictionary.meaning}</p>
        <Link
          href={`/?partOfSpeech=${dictionary.partOfSpeech}`}
          className=" group font-medium text-sm mt-2"
        >
          Category:{" "}
          <span className=" group-hover:underline text-gray-500">
            {" "}
            {dictionary.partOfSpeech}
          </span>
        </Link>
        <div className=" flex flex-col">
          <p className=" font-semibold mt-2 text-gray-00 ">Antonyms</p>
          <div className=" flex gap-2 flex-wrap">
            {dictionary.antonyms.length > 0 ? (
              dictionary.antonyms.map((item: string) => (
                <p key={item} className=" underline text-sm text-gray-500">
                  {item}
                </p>
              ))
            ) : (
              <p className=" text-gray-500">No antonyms found.</p>
            )}
          </div>
        </div>
      </div>
      <DictionaryCardEditButton
        dictionaryContent={JSON.stringify({
          word: dictionary.word,
          meaning: dictionary.meaning,
          id: dictionary._id,
        })}
        token={token}
      />
    </div>
  );
}

export default DictionaryCard;
