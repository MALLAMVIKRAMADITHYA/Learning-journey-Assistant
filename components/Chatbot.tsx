"use client";

import { useEffect, useState } from "react";

type Message = {
  sender: "user" | "bot";
  text: string;
};

type Subject = {
  id: number;
  code: string;
  name: string;
  description: string;
};

type Assessment = {
  id: number;
  title: string;
  type: string;
  score: number;
  maxScore: number;
  feedback: string;
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

type StudentFeedback = {
  id: number;
  summary: string;
  strengths: string;
  weaknesses: string;
  nextSteps: string;
};

type StudentData = {
  id: number;
  name: string;
  email: string;
  overallPerformance: number;
  assessments: Assessment[];
  quizzes: Quiz[];
  feedbacks?: StudentFeedback[];
};

function BotLogo({ small = false }: { small?: boolean }) {
  return (
    <div
      className={`relative flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 shadow-lg ${
        small ? "h-9 w-9" : "h-14 w-14"
      }`}
    >
      <div
        className={`relative rounded-xl bg-white ${
          small ? "h-5 w-6" : "h-8 w-9"
        }`}
      >
        <div
          className={`absolute left-1/2 -translate-x-1/2 rounded-t-full bg-white ${
            small ? "-top-2 h-2 w-1" : "-top-3 h-3 w-1.5"
          }`}
        />

        <div
          className={`absolute rounded-full bg-blue-500 ${
            small ? "left-1.5 top-2 h-1 w-1" : "left-2 top-3 h-1.5 w-1.5"
          }`}
        />

        <div
          className={`absolute rounded-full bg-blue-500 ${
            small ? "right-1.5 top-2 h-1 w-1" : "right-2 top-3 h-1.5 w-1.5"
          }`}
        />

        <div
          className={`absolute left-1/2 -translate-x-1/2 rounded-full bg-blue-200 ${
            small ? "bottom-1 h-0.5 w-3" : "bottom-1.5 h-1 w-5"
          }`}
        />
      </div>

      <div
        className={`absolute rounded-full border-2 border-white bg-emerald-400 ${
          small
            ? "-right-0.5 -bottom-0.5 h-3 w-3"
            : "-right-1 -bottom-1 h-4 w-4"
        }`}
      />

      {!small && <div className="absolute -top-2 text-lg">🎓</div>}
    </div>
  );
}

function getStatus(score: number) {
  if (score < 60) return "Needs Support";
  if (score < 75) return "Improving";
  return "Strong";
}

function buildOpeningFeedback(student: StudentData | null) {
  if (!student) {
    return "Hi! I am your Learning AI Assistant.";
  }

  const weakAssessments = student.assessments.filter((a) => a.score < 60);

  const weakQuizzes = student.quizzes.filter((q) => q.score < 60);

  const feedback = student.feedbacks?.[0];

  const weakItems = [
    ...weakAssessments.map((a) => `${a.subject.name} - ${a.title}`),
    ...weakQuizzes.map((q) => `${q.subject.name} - ${q.topic}`),
  ];

  return `Hi ${student.name}! 👋

Your overall performance is ${
    student.overallPerformance
  }% (${getStatus(student.overallPerformance)}).

${
  feedback
    ? `Feedback Summary: ${feedback.summary}

Strengths: ${feedback.strengths}

Weaknesses: ${feedback.weaknesses}

Next Steps: ${feedback.nextSteps}`
    : "I can help explain your performance and learning progress."
}

${
  weakItems.length > 0
    ? `Your main weak areas are: ${weakItems.join(", ")}`
    : "No major weak areas identified."
}

Ask me anything about your subjects, quizzes, feedback, recommendations, or study improvement.`;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);

  const [input, setInput] = useState("");

  const [student, setStudent] = useState<StudentData | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);

  const [thinking, setThinking] = useState(false);

  useEffect(() => {
    const studentId = localStorage.getItem("studentId");

    if (!studentId) return;

    const fetchStudent = async () => {
      try {
        const res = await fetch(`/api/student?studentId=${studentId}`);

        const data = await res.json();

        if (data.success) {
          setStudent(data.student);

          setMessages([
            {
              sender: "bot",
              text: buildOpeningFeedback(data.student),
            },
          ]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudent();
  }, []);

  const sendQuickMessage = async (question: string) => {
    if (thinking) return;

    const userMessage: Message = {
      sender: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    setThinking(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: question,
          studentData: student,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply || "I could not generate a response.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "I could not connect to the assistant service.",
        },
      ]);
    } finally {
      setThinking(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || thinking) return;

    const currentInput = input;

    const userMessage: Message = {
      sender: "user",
      text: currentInput,
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    setThinking(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentInput,
          studentData: student,
        }),
      });

      const data = await res.json();

      const botMessage: Message = {
        sender: "bot",
        text:
          data.reply ||
          "I could not generate a response. Please try again.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            "I could not connect to the assistant service.",
        },
      ]);
    } finally {
      setThinking(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 text-white shadow-2xl transition hover:scale-105"
      >
        <BotLogo small />
        <span className="font-semibold">
          Learning AI Assistant
        </span>
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[420px] max-w-[92vw] rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-violet-600 p-5 text-white">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <BotLogo />

                <div>
                  <h2 className="font-bold text-xl">
                    Learning AI Assistant
                  </h2>

                  <p className="text-sm text-blue-100">
                    Your personalized learning companion
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="text-3xl leading-none text-white hover:text-blue-100"
              >
                ×
              </button>
            </div>
          </div>

          <div className="h-96 overflow-y-auto p-5 space-y-4 bg-white">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {msg.sender === "bot" && <BotLogo small />}

                <div
                  className={`whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white max-w-[78%]"
                      : "bg-slate-50 border border-slate-200 text-slate-800 max-w-[82%]"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {thinking && (
              <div className="flex gap-3 justify-start">
                <BotLogo small />

                <div className="rounded-2xl px-4 py-3 text-sm bg-slate-50 border border-slate-200 text-slate-600 shadow-sm">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 border-t border-slate-200 bg-white p-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              className="flex-1 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ask anything about your learning..."
            />

            <button
              onClick={sendMessage}
              disabled={thinking}
              className="rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-3 text-sm font-semibold text-white shadow hover:shadow-lg disabled:opacity-60"
            >
              Send
            </button>
          </div>

          <div className="border-t border-slate-200 bg-slate-50 px-4 py-3">
            <p className="mb-2 text-xs text-slate-500">
              Quick actions:
            </p>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() =>
                  sendQuickMessage("What are my weak areas?")
                }
                className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-200"
              >
                Weak Areas
              </button>

              <button
                onClick={() =>
                  sendQuickMessage("Show my subjects")
                }
                className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 hover:bg-indigo-200"
              >
                Subjects
              </button>

              <button
                onClick={() =>
                  sendQuickMessage(
                    "Give me recommendations"
                  )
                }
                className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-200"
              >
                Recommendations
              </button>

              <button
                onClick={() =>
                  sendQuickMessage(
                    "Create a study plan for me"
                  )
                }
                className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 hover:bg-violet-200"
              >
                Study Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}