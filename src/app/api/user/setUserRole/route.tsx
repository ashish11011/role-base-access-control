import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/users";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const { userId, role } = body;

  if (!userId || !role) {
    return new Response("All fields are required", { status: 400 });
  }

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    user.role = role;
    await user.save();

    return new Response("User role updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating user role:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
