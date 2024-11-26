import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/users";
import React from "react";
import ShowAllUsers from "./showAllUsers";
import { cookies } from "next/headers";

export const revalidate = 0;

const Page = async () => {
  await connectDB();
  const user = await User.find();

  const cookieData = await cookies();
  const token = cookieData.get("token")?.value as string;

  return (
    <div>
      <ShowAllUsers user={JSON.stringify(user)} token={token} />
    </div>
  );
};

export default Page;
