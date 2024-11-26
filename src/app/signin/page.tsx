"use client";
import { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function Signin() {
  const [formData, setFormData] = useState<any>({ email: "", password: "" });
  const [message, setMessage] = useState<any>("");
  const [loading, setLoading] = useState<any>(false);

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post("/api/user/signinUser", formData);
      setMessage(`Welcome! Token: ${response.data.token}`);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error: any) {
      setMessage(error.response?.data?.error || "An error occurred.");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
    setLoading(false);
  };

  return (
    <div className=" min-h-screen w-full mx-auto flex justify-center items-center ">
      <div className=" flex flex-col w-full gap-4 mx-auto max-w-md justify-center items-center p-4 border rounded">
        <h1 className=" font-semibold text-2xl text-gray-600">Sign In</h1>
        <form className=" flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <input
            className=" py-1.5 px-2 border focus:outline-none focus:border-gray-400 text-gray-800 rounded"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            className=" py-1.5 px-2 border focus:outline-none focus:border-gray-400 text-gray-800 rounded"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button
            className=" text-center flex justify-center items-center border hover:bg-gray-50 text-gray-800 font-semibold py-1.5 px-2 rounded"
            type="submit"
          >
            {loading ? <Loader2 className=" animate-spin" /> : "Sign In"}
          </button>
        </form>
        {message && (
          <p className=" text-sm text-blue-600 font-medium">{message}</p>
        )}
        <Link href="/signup">Dont have an account</Link>
      </div>
    </div>
  );
}
