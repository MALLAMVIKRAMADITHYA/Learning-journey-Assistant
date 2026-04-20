"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type Subject = {
  id: number;
  code: string;
  name: string;
  description: string;
};

type Enrollment = {
  id: number;
  subject: Subject;
};

type Assessment = {
  id: number;
  title: string;
  type: string;
  score: number;
  maxScore: number;
  feedback: string;
  dueDate: string;
  subject: Subject;
};

type Quiz = {
  id: number;
  title: string;
  topic: string;
  score: number;
  maxScore: number;
  subject: Subject;
};

type Recommendation = {
  id: number;
  type: string;
  content: string;
};

type StudentData = {
  id: number;
  name: string;
  email: string;
  overallPerformance: number;
  university: {
    name: string;
  };
  enrollments: Enrollment[];
  assessments: Assessment[];
  quizzes: Quiz[];
  recommendations: Recommendation[];
};

function getOverallBadge(score: number) {
  if (score < 60) {
    return "bg-red-100 text-red-700 border-red-200";
  }
  if (score < 75) {
    return "bg-amber-100 text-amber-700 border-amber-200";
  }
  return "bg-emerald-100 text-emerald-700 border-emerald-200";
}

export default function DashboardPage() {
  const router = useRouter();

  const [student, setStudent] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const studentId = localStorage.getItem("studentId");

    if (!studentId) {
      setLoading(false);
      return;
    }

    const fetchStudent = async () => {
      const res = await fetch(`/api/student?studentId=${studentId}`);
      const data = await res.json();

      if (data.success) {
        setStudent(data.student);
      }

      setLoading(false);
    };

    fetchStudent();
  }, []);

  const generateSuggestions = (assessments: Assessment[], quizzes: Quiz[]) => {
    const suggestions: string[] = [];

    assessments.forEach((a) => {
      if (a.score < 60) {
        suggestions.push(
          `Based on your recent performance, revise ${a.subject.name} - ${a.title} and practice additional questions to strengthen understanding.`
        );
      } else if (a.score < 75) {
        suggestions.push(
          `You are improving in ${a.subject.name}. More revision and targeted practice can help lift your next result.`
        );
      }
    });

    quizzes.forEach((q) => {
      if (q.score < 60) {
        suggestions.push(
          `Your quiz performance in "${q.topic}" suggests that you should revise this topic and attempt more practice quizzes.`
        );
      }
    });

    if (suggestions.length === 0) {
      suggestions.push(
        "Great performance overall. Continue revising consistently to maintain this level."
      );
    }

    return suggestions;
  };

  const getAverage = (items: { score: number }[]) => {
    if (items.length === 0) return "0.0";
    const total = items.reduce((sum, i) => sum + i.score, 0);
    return (total / items.length).toFixed(1);
  };

  const getProgressData = (assessments: Assessment[], quizzes: Quiz[]) => {
    return [
      ...assessments.map((a, i) => ({
        name: `A${i + 1}`,
        score: a.score,
      })),
      ...quizzes.map((q, i) => ({
        name: `Q${i + 1}`,
        score: q.score,
      })),
    ];
  };

  const handleLogout = () => {
    localStorage.removeItem("studentId");
    localStorage.removeItem("studentName");
    router.push("/");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="rounded-2xl bg-white px-6 py-4 shadow-lg text-slate-700">
          Loading student data...
        </div>
      </main>
    );
  }

  if (!student) {
    return (
      <main className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="rounded-2xl bg-white px-6 py-4 shadow-lg text-slate-700">
          No student data found.
        </div>
      </main>
    );
  }

  const smartSuggestions = generateSuggestions(
    student.assessments,
    student.quizzes
  );

  const progressData = getProgressData(
    student.assessments,
    student.quizzes
  );

  const weakAssessments = student.assessments.filter((a) => a.score < 60);
  const weakQuizzes = student.quizzes.filter((q) => q.score < 60);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 p-8 text-white shadow-2xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-blue-200 text-sm uppercase tracking-[0.25em]">
                Student Dashboard
              </p>
              <h1 className="text-4xl font-bold mt-3">Welcome, {student.name}</h1>
              <p className="text-blue-100 mt-2">{student.university.name}</p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="text-lg font-medium">
                  Overall Performance: {student.overallPerformance}%
                </span>
                <span
                  className={`rounded-full border px-4 py-1 text-sm font-semibold ${getOverallBadge(
                    student.overallPerformance
                  )}`}
                >
                  {student.overallPerformance < 60
                    ? "Needs Support"
                    : student.overallPerformance < 75
                    ? "Improving"
                    : "Strong"}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-xl bg-white/10 border border-white/15 px-5 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-white p-5 shadow-lg border border-slate-100">
            <p className="text-sm text-slate-500">Subjects</p>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              {student.enrollments.length}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-lg border border-slate-100">
            <p className="text-sm text-slate-500">Assessments</p>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              {student.assessments.length}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-lg border border-slate-100">
            <p className="text-sm text-slate-500">Quizzes</p>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              {student.quizzes.length}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-lg border border-slate-100">
            <p className="text-sm text-slate-500">Avg Quiz Score</p>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              {getAverage(student.quizzes)}%
            </h2>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-5 shadow-lg border border-slate-100">
            <p className="text-sm text-slate-500">Avg Assessment Score</p>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              {getAverage(student.assessments)}%
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-lg border border-slate-100">
            <p className="text-sm text-slate-500">Current Status</p>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              {student.overallPerformance < 60
                ? "Needs Support"
                : student.overallPerformance < 75
                ? "Improving"
                : "Strong"}
            </h2>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg border border-slate-100 overflow-x-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Performance Progress
          </h2>
          <LineChart width={1000} height={320} data={progressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={4} />
          </LineChart>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-lg border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Weak Areas Summary
            </h2>
            <div className="space-y-3">
              {weakAssessments.length === 0 ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
                  No major weak assessment areas identified.
                </div>
              ) : (
                weakAssessments.map((a) => (
                  <div
                    key={a.id}
                    className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
                  >
                    ⚠️ {a.subject.name} - {a.title}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Skill Gaps Identified
            </h2>
            <div className="space-y-3">
              {weakAssessments.length === 0 && weakQuizzes.length === 0 ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
                  No major skill gaps identified. Keep maintaining your performance.
                </div>
              ) : (
                <>
                  {weakAssessments.map((a) => (
                    <div
                      key={`assessment-${a.id}`}
                      className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-700"
                    >
                      🔴 Skill Gap: {a.subject.name} - {a.title}
                    </div>
                  ))}

                  {weakQuizzes.map((q) => (
                    <div
                      key={`quiz-${q.id}`}
                      className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
                    >
                      🔴 Skill Gap: {q.subject.name} - {q.topic}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Enrolled Subjects
          </h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {student.enrollments.map((e) => (
              <Link
                key={e.id}
                href={`/subjects/${e.subject.id}`}
                className="group rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-3 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  {e.subject.code}
                </div>
                <h3 className="font-bold text-slate-900 text-lg">
                  {e.subject.name}
                </h3>
                <p className="text-sm text-slate-500 mt-2 line-clamp-3">
                  {e.subject.description}
                </p>
                <p className="text-sm text-blue-600 mt-4 font-semibold group-hover:translate-x-1 transition">
                  View subject details →
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-lg border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Assessments</h2>
            <div className="space-y-4 max-h-[520px] overflow-y-auto pr-2">
              {student.assessments.map((a) => (
                <div
                  key={a.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <h3 className="font-bold text-slate-900">
                    {a.title} ({a.subject.name})
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">Type: {a.type}</p>
                  <p className="mt-2 font-medium text-slate-800">
                    Score: {a.score}/{a.maxScore}
                  </p>
                  <p className="mt-2 text-slate-600">{a.feedback}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Quizzes</h2>
            <div className="space-y-4 max-h-[520px] overflow-y-auto pr-2">
              {student.quizzes.map((q) => (
                <div
                  key={q.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <h3 className="font-bold text-slate-900">
                    {q.title} ({q.subject.name})
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">Topic: {q.topic}</p>
                  <p className="mt-2 font-medium text-slate-800">
                    Score: {q.score}/{q.maxScore}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-lg border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Database Recommendations
            </h2>
            <div className="space-y-4">
              {student.recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4"
                >
                  <h3 className="font-bold text-indigo-800">{rec.type}</h3>
                  <p className="text-indigo-700 mt-1">{rec.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Smart Recommendations
            </h2>
            <div className="space-y-4">
              {smartSuggestions.map((s, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-blue-800"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}