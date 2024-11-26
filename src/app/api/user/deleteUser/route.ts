import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/users";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId } = body;
  await connectDB();

  try {
    const user = await User.deleteOne({ _id: userId });
    console.log("User deleted: " + user.deletedCount);
    return new Response(JSON.stringify("User deleted"), { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
