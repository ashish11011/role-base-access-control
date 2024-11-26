import connectDB from "@/dbConfig/dbConfig";
import Dictionary from "@/models/dictionary";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id } = body;
  await connectDB();

  try {
    const dictionary = await Dictionary.deleteOne({ _id: id });
    console.log("Dictionary deleted: " + dictionary.deletedCount);
    return new Response(JSON.stringify("Dictionary deleted"), { status: 200 });
  } catch (error) {
    console.error("Error deleting dictionary:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
