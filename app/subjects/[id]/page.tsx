"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { questionBank, MCQ } from "../../../lib/questionBank";
import Chatbot from "../../../components/Chatbot";

type SubjectModule = {
  id: number;
  title: string;
  description: string;
};

type LearningOutcome = {
  id: number;
  code: string;
  description: string;
};

type Subject = {
  id: number;
  code: string;
  name: string;
  description: string;
  modules?: SubjectModule[];
  learningOutcomes?: LearningOutcome[];
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

function getPerformance(score: number) {
  if (score < 60) {
    return {
      label: "Weak",
      text: "text-red-700",
      badge: "bg-red-100 text-red-700 border-red-200",
      box: "border-red-200 bg-red-50",
    };
  }
  if (score < 75) {
    return {
      label: "Average",
      text: "text-amber-700",
      badge: "bg-amber-100 text-amber-700 border-amber-200",
      box: "border-amber-200 bg-amber-50",
    };
  }
  return {
    label: "Strong",
    text: "text-emerald-700",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    box: "border-emerald-200 bg-emerald-50",
  };
}

export default function SubjectDetailsPage() {
  const params = useParams();
  const subjectId = Number(params.id);

  const [subject, setSubject] = useState<Subject | null>(null);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  const [generatedQuizKey, setGeneratedQuizKey] = useState<string | null>(null);
  const [generatedQuestions, setGeneratedQuestions] = useState<MCQ[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>(
    {}
  );
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  useEffect(() => {
    const studentId = localStorage.getItem("studentId");

    if (!studentId || !subjectId) {
      setLoading(false);
      return;
    }

    const fetchStudentData = async () => {
      const res = await fetch(`/api/student?studentId=${studentId}`);
      const data = await res.json();

      if (data.success) {
        const foundSubject = data.student.enrollments.find(
          (enrollment: { subject: Subject }) =>
            enrollment.subject.id === subjectId
        )?.subject;

        const filteredAssessments = data.student.assessments.filter(
          (assessment: Assessment) => assessment.subject.id === subjectId
        );

        const filteredQuizzes = data.student.quizzes.filter(
          (quiz: Quiz) => quiz.subject.id === subjectId
        );

        setSubject(foundSubject || null);
        setAssessments(filteredAssessments);
        setQuizzes(filteredQuizzes);
        setRecommendations(data.student.recommendations);
      }

      setLoading(false);
    };

    fetchStudentData();
  }, [subjectId]);

  const generateWeakAreaQuiz = (topic: string) => {
    const questions = questionBank[topic] || questionBank.default;
    setGeneratedQuizKey(topic);
    setGeneratedQuestions(questions);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
  };

  const handleAnswerChange = (questionIndex: number, option: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const handleSubmitQuiz = () => {
    let correct = 0;

    generatedQuestions.forEach((q, index) => {
      if (selectedAnswers[index] === q.answer) {
        correct += 1;
      }
    });

    setQuizScore(correct);
    setQuizSubmitted(true);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="rounded-2xl bg-white px-6 py-4 shadow-lg">
          Loading subject details...
        </div>
      </main>
    );
  }

  if (!subject) {
    return (
      <main className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="rounded-2xl bg-white px-6 py-4 shadow-lg">
          Subject not found.
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-blue-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="rounded-xl bg-white px-4 py-2 text-blue-700 shadow border border-slate-200 hover:bg-slate-50"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="rounded-3xl bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 p-8 text-white shadow-2xl">
          <div className="inline-flex rounded-full bg-white/10 px-4 py-1 text-xs font-semibold tracking-[0.2em] uppercase text-blue-100">
            Subject Detail
          </div>
          <h1 className="text-4xl font-bold mt-4">
            {subject.code} - {subject.name}
          </h1>
          <p className="text-blue-100 mt-3 text-lg">{subject.description}</p>
          <p className="mt-4 inline-block rounded-full bg-blue-500/20 px-4 py-2 text-sm text-blue-100 border border-blue-300/20">
            Insight: This subject requires focused learning based on your recent
            performance.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-lg border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Subject Modules
            </h2>

            {subject.modules && subject.modules.length > 0 ? (
              <div className="space-y-4">
                {subject.modules.map((module) => (
                  <div
                    key={module.id}
                    className="rounded-2xl border border-blue-100 bg-blue-50 p-4"
                  >
                    <h3 className="font-bold text-blue-800">{module.title}</h3>
                    <p className="text-blue-700 mt-1">{module.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-600">
                No modules available for this subject.
              </div>
            )}
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              SILOs / Learning Outcomes
            </h2>

            {subject.learningOutcomes && subject.learningOutcomes.length > 0 ? (
              <div className="space-y-4">
                {subject.learningOutcomes.map((outcome) => (
                  <div
                    key={outcome.id}
                    className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4"
                  >
                    <h3 className="font-bold text-indigo-800">
                      {outcome.code}
                    </h3>
                    <p className="text-indigo-700 mt-1">
                      {outcome.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-600">
                No learning outcomes available for this subject.
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-lg border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Assessments</h2>
            <div className="space-y-4">
              {assessments.map((assessment) => {
                const perf = getPerformance(assessment.score);
                const weakTopic =
                  assessment.subject.name === "Network Systems and Web Security"
                    ? "Threat Modelling"
                    : assessment.subject.name === "Big Data Analytics"
                    ? "Spark Transformations"
                    : assessment.subject.name === "Database Systems"
                    ? "SQL Joins"
                    : assessment.subject.name === "Software Engineering"
                    ? "SDLC"
                    : "default";

                return (
                  <div
                    key={assessment.id}
                    className={`rounded-2xl border p-5 ${perf.box}`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="font-bold text-slate-900 text-lg">
                        {assessment.title}
                      </h3>
                      <span
                        className={`rounded-full border px-3 py-1 text-sm font-semibold ${perf.badge}`}
                      >
                        {perf.label}
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 mt-2">
                      Type: {assessment.type}
                    </p>
                    <p className="mt-2 font-medium text-slate-800">
                      Score: {assessment.score}/{assessment.maxScore}
                    </p>
                    <p className="mt-3 text-slate-700">{assessment.feedback}</p>

                    {assessment.score < 60 && (
                      <>
                        <div className="mt-4 rounded-xl bg-white/70 p-3 text-red-700 border border-red-200">
                          ⚠️ You need improvement in this area. Focus on concepts
                          and practice more.
                        </div>

                        <button
                          onClick={() => generateWeakAreaQuiz(weakTopic)}
                          className="mt-4 rounded-xl bg-red-600 px-4 py-2 font-semibold text-white shadow hover:bg-red-700"
                        >
                          Generate Quiz
                        </button>
                      </>
                    )}

                    {assessment.score >= 60 && assessment.score < 75 && (
                      <div className="mt-4 rounded-xl bg-white/70 p-3 text-amber-700 border border-amber-200">
                        You are doing okay, but there is room to improve with more
                        revision and practice.
                      </div>
                    )}

                    {assessment.score >= 75 && (
                      <div className="mt-4 rounded-xl bg-white/70 p-3 text-emerald-700 border border-emerald-200">
                        Good performance. Keep maintaining this level.
                      </div>
                    )}

                    <p className="mt-3 text-sm text-slate-500">
                      Due Date: {assessment.dueDate}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Quizzes</h2>
            <div className="space-y-4">
              {quizzes.map((quiz) => {
                const perf = getPerformance(quiz.score);

                return (
                  <div
                    key={quiz.id}
                    className={`rounded-2xl border p-5 ${perf.box}`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="font-bold text-slate-900 text-lg">
                        {quiz.title}
                      </h3>
                      <span
                        className={`rounded-full border px-3 py-1 text-sm font-semibold ${perf.badge}`}
                      >
                        {perf.label}
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 mt-2">
                      Topic: {quiz.topic}
                    </p>
                    <p className="mt-2 font-medium text-slate-800">
                      Score: {quiz.score}/{quiz.maxScore}
                    </p>

                    {quiz.score < 60 && (
                      <>
                        <div className="mt-4 rounded-xl bg-white/70 p-3 text-red-700 border border-red-200">
                          Recommended action: revise this topic and attempt extra
                          practice questions.
                        </div>

                        <button
                          onClick={() => generateWeakAreaQuiz(quiz.topic)}
                          className="mt-4 rounded-xl bg-red-600 px-4 py-2 font-semibold text-white shadow hover:bg-red-700"
                        >
                          Generate Quiz
                        </button>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {generatedQuestions.length > 0 && (
          <div className="rounded-2xl bg-white p-6 shadow-lg border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Generated Quiz: {generatedQuizKey}
            </h2>
            <p className="text-slate-500 mb-6">
              Answer the following MCQs to improve this weak area.
            </p>

            <div className="space-y-6">
              {generatedQuestions.map((q, qIndex) => (
                <div
                  key={qIndex}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <p className="font-semibold text-slate-900 mb-4">
                    {qIndex + 1}. {q.question}
                  </p>

                  <div className="space-y-3">
                    {q.options.map((option, optIndex) => (
                      <label
                        key={optIndex}
                        className={`flex cursor-pointer items-center rounded-xl border px-4 py-3 transition ${
                          selectedAnswers[qIndex] === option
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 bg-white hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${qIndex}`}
                          value={option}
                          checked={selectedAnswers[qIndex] === option}
                          onChange={() => handleAnswerChange(qIndex, option)}
                          className="mr-3"
                        />
                        {option}
                      </label>
                    ))}
                  </div>

                  {quizSubmitted && (
                    <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-emerald-700">
                      Correct Answer:{" "}
                      <span className="font-semibold">{q.answer}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={handleSubmitQuiz}
              className="mt-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 font-semibold text-white shadow-lg hover:shadow-xl"
            >
              Submit Quiz
            </button>

            {quizSubmitted && quizScore !== null && (
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xl font-bold text-slate-900">
                  Your Score: {quizScore} / {generatedQuestions.length}
                </p>
                <p className="text-slate-600 mt-2">
                  {quizScore === generatedQuestions.length
                    ? "Excellent work. You have a strong understanding of this topic."
                    : quizScore >= 2
                    ? "Good attempt. Review the incorrect answers and practice again."
                    : "You need more revision in this weak area. Revisit the topic and try again."}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="rounded-2xl bg-white p-6 shadow-lg border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Suggestions</h2>
          <div className="space-y-4">
            {recommendations.map((rec) => (
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
      </div>
      <Chatbot />
    </main>
  );
}