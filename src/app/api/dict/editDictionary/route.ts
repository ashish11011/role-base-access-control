import connectDB from "@/dbConfig/dbConfig";
import Dictionary from "@/models/dictionary";
import mongoose from "mongoose";

export async function POST(req: Request) {
  const body = await req.json();
  const { word, meaning, id } = body;

  if (!id || !mongoose.isValidObjectId(id)) {
    return new Response("Invalid ID", { status: 400 });
  }

  await connectDB();

  try {
    const dictionary = await Dictionary.updateOne(
      { _id: id },
      { $set: { word, meaning } }
    );
    console.log("Dictionary updated: " + dictionary.modifiedCount);
    return new Response(JSON.stringify("Dictionary updated"), { status: 200 });
  } catch (error) {
    console.error("Error updating dictionary:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
