import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return new Response("All fields are required", { status: 400 });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return new Response("Invalid email or password.", { status: 400 });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return new Response("Invalid email or password.", { status: 400 });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    return new Response(JSON.stringify({ message: "Sign in successful." }), {
      status: 200,
      headers: {
        "Set-Cookie": cookie.serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 15,
          sameSite: "strict",
          path: "/",
        }),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response("Server error.", { status: 500 });
  }
}
