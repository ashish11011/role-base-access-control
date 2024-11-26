"use client";
import { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState<any>("");
  const [loading, setLoading] = useState<any>(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/user/createNewUser", formData);
      if (response.status === 201) {
        setMessage("User registered successfully.");
        setTimeout(() => {
          setMessage("");
        }, 3000);
        setFormData({ name: "", email: "", password: "" });
        router.push("/signin");
      }
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" min-h-screen w-full mx-auto flex justify-center items-center ">
      <div className=" flex flex-col w-full gap-4 mx-auto max-w-md justify-center items-center p-4 border rounded">
        <h1 className=" font-semibold text-2xl text-gray-600">Sign Up</h1>
        <form className=" flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <input
            className=" py-1.5 px-2 border focus:outline-none focus:border-gray-400 text-gray-800 rounded"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
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
            {loading ? (
              <Loader2 className=" animate-spin" />
            ) : (
              "Create New Account"
            )}
          </button>
        </form>
        {message && (
          <p className=" text-sm text-blue-600 font-medium">{message}</p>
        )}
        <Link href="/signin">Already have an account</Link>
      </div>
    </div>
  );
}
