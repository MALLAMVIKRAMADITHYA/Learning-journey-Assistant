"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const [university, setUniversity] = useState("La Trobe University");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Logging in...");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ university, email, password }),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("studentId", data.student.id.toString());
      localStorage.setItem("studentName", data.student.name);
      router.push("/dashboard");
    } else {
      setMessage(data.message || "Login failed");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 text-white">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-blue-100">
              La Trobe Project
            </p>
            <h1 className="text-4xl font-bold mt-4 leading-tight">
              Learning Journey Assistant
            </h1>
            <p className="mt-5 text-blue-100 text-lg leading-8">
              Personalized student analytics, skill gap detection, smart
              recommendations, and adaptive quizzes in one intelligent learning
              platform.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/10 p-4 border border-white/10">
              <p className="text-2xl font-bold">10+</p>
              <p className="text-sm text-blue-100 mt-1">Demo Students</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 border border-white/10">
              <p className="text-2xl font-bold">4</p>
              <p className="text-sm text-blue-100 mt-1">Common Subjects</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 border border-white/10">
              <p className="text-2xl font-bold">AI-Style</p>
              <p className="text-sm text-blue-100 mt-1">Recommendations</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 border border-white/10">
              <p className="text-2xl font-bold">Adaptive</p>
              <p className="text-sm text-blue-100 mt-1">Quiz Support</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 lg:p-10">
          <div className="max-w-md mx-auto">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                Student Login
              </p>
              <h2 className="text-3xl font-bold text-slate-900 mt-2">
                Welcome Back
              </h2>
              <p className="text-slate-500 mt-2">
                Sign in to view your subjects, performance, skill gaps, and
                recommendations.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  University
                </label>
                <select
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>La Trobe University</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  Student Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="student1@latrobe.edu.au"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.01] hover:shadow-xl"
              >
                Login
              </button>
            </form>

            {message && (
              <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
                {message}
              </div>
            )}

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-800 mb-2">Demo logins</p>
              <div className="space-y-1 text-sm text-slate-600">
                <p>student@latrobe.edu.au / 123456</p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}