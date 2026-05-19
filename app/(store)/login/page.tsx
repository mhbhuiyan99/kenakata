"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const token = await loginUser({ email, password });

    if (!token) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
      return;
    }

    localStorage.setItem("kenakata_access_token", token);
    router.push("/products");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-sm text-left space-y-6">
        
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Welcome back to kenakata
          </h1>
          <p className="text-xs text-slate-400">
            Log in to manage your orders and secure checkout profiles
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-xs font-semibold p-3 rounded-xl">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
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
              placeholder="Your password"
              className="w-full text-sm text-gray-800 bg-gray-50 rounded-xl py-2.5 px-4 border border-slate-100 focus:outline-none focus:bg-white focus:border-slate-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-900 text-white font-bold py-3 px-4 rounded-xl text-center shadow-md hover:bg-[#b4f46c] hover:text-teal-950 transition-all text-sm cursor-pointer disabled:opacity-50"
          >
            {loading ? "Verifying Account..." : "Log In"}
          </button>
        </form>

      </div>
    </main>
  );
}