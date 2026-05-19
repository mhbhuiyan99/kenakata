"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUpUser } from "@/lib/api/auth";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const isCreated = await signUpUser({ name, email, password });

    if (!isCreated) {
      setError("Failed to create account. Email might already be taken.");
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    
    // Redirect to login page after a brief moment
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-sm text-left space-y-6">
        
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Create an Account
          </h1>
          <p className="text-xs text-slate-400">
            Join kenakata to track your purchases and speed up checkout
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-xs font-semibold p-3 rounded-xl">
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold p-3 rounded-xl">
            🎉 Account created successfully! Redirecting to login...
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name" 
              className="w-full text-sm text-gray-800 bg-gray-50 rounded-xl py-2.5 px-4 border border-slate-100 focus:outline-none focus:bg-white focus:border-slate-200"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full text-sm text-gray-800 bg-gray-50 rounded-xl py-2.5 px-4 border border-slate-100 focus:outline-none focus:bg-white focus:border-slate-200"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Add a password"
              className="w-full text-sm text-gray-800 bg-gray-50 rounded-xl py-2.5 px-4 border border-slate-100 focus:outline-none focus:bg-white focus:border-slate-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full bg-teal-900 text-white font-bold py-3 px-4 rounded-xl text-center shadow-md hover:bg-[#b4f46c] hover:text-teal-950 transition-all text-sm cursor-pointer disabled:opacity-50"
          >
            {loading ? "Registering account..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center text-xs text-slate-400">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="text-teal-800 font-bold hover:underline">
              Log In
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}