import { NextResponse } from "next/server";

function normalize(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/gi, "");
}

function hasAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

function getStatus(score: number) {
  if (score < 60) return "Needs Support";
  if (score < 75) return "Improving";
  return "Strong";
}

function getStudentSummary(studentData: any) {
  if (!studentData) {
    return {
      subjects: [],
      assessments: [],
      quizzes: [],
      weakAssessments: [],
      weakQuizzes: [],
      feedback: null,
      overall: 0,
      status: "Unknown",
    };
  }

  const assessments = studentData.assessments || [];
  const quizzes = studentData.quizzes || [];
  const subjects =
    studentData.enrollments?.map((e: any) => e.subject) || [];

  const weakAssessments = assessments.filter((a: any) => a.score < 60);
  const weakQuizzes = quizzes.filter((q: any) => q.score < 60);

  return {
    subjects,
    assessments,
    quizzes,
    weakAssessments,
    weakQuizzes,
    feedback: studentData.feedbacks?.[0] || null,
    overall: studentData.overallPerformance || 0,
    status: getStatus(studentData.overallPerformance || 0),
  };
}

function findSubject(text: string, subjects: any[]) {
  return subjects.find((s: any) => {
    const name = normalize(s.name);
    const code = normalize(s.code);
    return (
      text.includes(name) ||
      text.includes(code) ||
      name.split(" ").some((word: string) => word.length > 4 && text.includes(word))
    );
  });
}

export async function POST(req: Request) {
  try {
    const { message, studentData } = await req.json();

    const msg = normalize(message);
    const summary = getStudentSummary(studentData);
    const matchedSubject = findSubject(msg, summary.subjects);

    let reply = "";

    // GREETINGS
    if (hasAny(msg, ["hello", "hi", "hey", "how are you", "good morning", "good evening"])) {
      reply = `Hello ${studentData?.name || "student"} 👋

I am your Learning AI Assistant. I can use your dashboard data to help with your subjects, performance, weak areas, feedback, quizzes, recommendations, modules, SILOs, and study improvement.

Your current overall performance is ${summary.overall}% (${summary.status}).`;
    }

    // WHAT CAN YOU DO
    else if (hasAny(msg, ["what can you do", "help me", "how can you help", "features"])) {
      reply = `I can help you with:

• Explaining your enrolled subjects
• Showing weak areas and skill gaps
• Explaining your overall performance
• Giving personalized study recommendations
• Explaining quizzes, assessments, modules, and SILOs
• Suggesting external learning resources
• Explaining application technologies like Prisma, SQLite, Next.js, and dashboard analytics`;
    }

    // SUBJECT-SPECIFIC QUESTIONS
    else if (matchedSubject) {
      const subjectAssessments = summary.assessments.filter(
        (a: any) => a.subject.id === matchedSubject.id
      );
      const subjectQuizzes = summary.quizzes.filter(
        (q: any) => q.subject.id === matchedSubject.id
      );

      const avgAssessment =
        subjectAssessments.length > 0
          ? (
              subjectAssessments.reduce((sum: number, a: any) => sum + a.score, 0) /
              subjectAssessments.length
            ).toFixed(1)
          : "0";

      const avgQuiz =
        subjectQuizzes.length > 0
          ? (
              subjectQuizzes.reduce((sum: number, q: any) => sum + q.score, 0) /
              subjectQuizzes.length
            ).toFixed(1)
          : "0";

      reply = `${matchedSubject.code} - ${matchedSubject.name}

${matchedSubject.description}

Your performance in this subject:
• Average assessment score: ${avgAssessment}%
• Average quiz score: ${avgQuiz}%

Assessments:
${subjectAssessments
  .map((a: any) => `• ${a.title}: ${a.score}/${a.maxScore} - ${a.feedback}`)
  .join("\n") || "No assessments found."}

Quizzes:
${subjectQuizzes
  .map((q: any) => `• ${q.title} (${q.topic}): ${q.score}/${q.maxScore}`)
  .join("\n") || "No quizzes found."}

Recommendation:
Focus on the lowest-scoring assessment or quiz topic first, revise the related module, and attempt adaptive quiz practice.`;
    }

    // SUBJECTS LIST
    else if (hasAny(msg, ["subject", "subjects", "course", "courses", "enrolled"])) {
      reply = `You are enrolled in these subjects:

${summary.subjects
  .map((s: any) => `• ${s.code} - ${s.name}: ${s.description}`)
  .join("\n")}

You can open each subject card to view modules, SILOs, assessments, quizzes, and weak-area support.`;
    }

    // WEAK AREAS / SKILL GAPS
    else if (hasAny(msg, ["weak", "skill gap", "gap", "low marks", "poor", "struggling", "improve first"])) {
      const weakItems = [
        ...summary.weakAssessments.map(
          (a: any) => `• ${a.subject.name} - ${a.title}: ${a.score}/${a.maxScore}`
        ),
        ...summary.weakQuizzes.map(
          (q: any) => `• ${q.subject.name} - ${q.topic}: ${q.score}/${q.maxScore}`
        ),
      ];

      reply =
        weakItems.length > 0
          ? `Based on your application data, your main weak areas are:

${weakItems.join("\n")}

Personalized advice:
Start with the lowest score first. Revise the related module, review your feedback, then attempt adaptive quizzes for that topic.`
          : `No major weak areas are currently identified. Your overall performance is ${summary.overall}% (${summary.status}). Keep maintaining consistency.`;
    }

    // FEEDBACK
    else if (hasAny(msg, ["feedback", "strength", "weakness", "next step", "next steps"])) {
      reply = summary.feedback
        ? `Your overall feedback:

Summary:
${summary.feedback.summary}

Strengths:
${summary.feedback.strengths}

Weaknesses:
${summary.feedback.weaknesses}

Next Steps:
${summary.feedback.nextSteps}`
        : "No detailed feedback is currently stored, but feedback usually explains strengths, weaknesses, and next improvement steps.";
    }

    // PERFORMANCE
    else if (hasAny(msg, ["performance", "marks", "score", "status", "progress", "analytics"])) {
      reply = `Your current overall performance is ${summary.overall}% (${summary.status}).

Dashboard analytics are calculated using your assessment scores, quiz scores, weak areas, and subject progress.

${summary.status === "Needs Support"
  ? "You should focus on weak topics and attempt more adaptive quizzes."
  : summary.status === "Improving"
  ? "You are improving, but should revise weak topics and connect answers with SILOs."
  : "You are performing strongly. Keep consistency and attempt advanced practice questions."
}`;
    }

    // QUIZZES
    else if (hasAny(msg, ["quiz", "quizzes", "mcq", "adaptive quiz", "practice"])) {
      reply = `Your quizzes are:

${summary.quizzes
  .map((q: any) => `• ${q.subject.name} - ${q.title} (${q.topic}): ${q.score}/${q.maxScore}`)
  .join("\n")}

Adaptive quizzes are generated from weak topics so you can practice areas where your score is low.`;
    }

    // ASSESSMENTS
    else if (hasAny(msg, ["assessment", "assessments", "assignment", "assignments", "report", "practical"])) {
      reply = `Your assessments are:

${summary.assessments
  .map((a: any) => `• ${a.subject.name} - ${a.title}: ${a.score}/${a.maxScore}. Feedback: ${a.feedback}`)
  .join("\n")}

Use assessment feedback to understand what concepts need improvement.`;
    }

    // STUDY PLAN / RECOMMENDATIONS
    else if (hasAny(msg, ["recommend", "suggest", "advice", "study plan", "study", "revise", "resources", "external", "website"])) {
      reply = `Personalized recommendation:

1. Start with your weakest assessment or quiz topic.
2. Review the related subject module.
3. Read your feedback and identify missing concepts.
4. Attempt adaptive quizzes.
5. Use external resources for practice.

Recommended external resources:
• SQL / Database: SQLBolt, W3Schools SQL, PostgreSQL tutorials
• Web Security: OWASP Top 10, PortSwigger Web Security Academy
• Big Data: Apache Spark documentation, Databricks tutorials
• Software Engineering: Atlassian Agile guides, Scrum.org resources`;
    }

    // TECHNOLOGIES / APPLICATION
    else if (hasAny(msg, ["application", "project", "system", "dashboard", "technology", "tech stack", "nextjs", "react", "frontend", "backend", "api", "prisma", "sqlite", "database"])) {
      reply = `Application explanation:

Learning Journey Assistant is built using:
• Next.js and React for frontend
• Tailwind CSS for styling
• Next.js API routes for backend
• Prisma ORM for database access
• SQLite for storing student data
• Dashboard analytics for performance tracking
• Chatbot API route for assistant responses

The frontend sends requests to backend API routes, and Prisma retrieves student, subject, assessment, quiz, module, SILO, feedback, and recommendation data from the database.`;
    }

    // SUBJECT CONCEPTS
    else if (hasAny(msg, ["sql join", "joins", "normalization", "primary key", "foreign key"])) {
      reply = `Database concept explanation:

SQL joins combine data from multiple tables.
• INNER JOIN returns matching records from both tables.
• LEFT JOIN returns all records from the left table and matching records from the right table.
• Primary key uniquely identifies each row.
• Foreign key links one table to another.
• Normalization reduces duplicate data and improves database design.`;
    }

    else if (hasAny(msg, ["threat", "xss", "sql injection", "phishing", "cybersecurity", "web security"])) {
      reply = `Web Security explanation:

This area covers threats such as SQL injection, XSS, phishing, authentication weaknesses, and poor access control.

To improve, study OWASP Top 10, learn common attack examples, and understand mitigation strategies such as input validation, secure authentication, least privilege, and secure coding.`;
    }

    else if (hasAny(msg, ["spark", "big data", "dataframe", "distributed", "map reduce"])) {
      reply = `Big Data explanation:

Apache Spark is used for large-scale distributed data processing. It supports DataFrames, Spark SQL, transformations, and actions.

Important ideas include lazy evaluation, distributed computing, transformations like map/filter, and actions that trigger execution.`;
    }

    else if (hasAny(msg, ["sdlc", "agile", "scrum", "testing", "requirements"])) {
      reply = `Software Engineering explanation:

Software Engineering covers SDLC, requirements, design, testing, Agile, Scrum, documentation, and teamwork.

To improve, understand each SDLC phase, practice writing requirements, and learn testing types such as unit testing, integration testing, and user acceptance testing.`;
    }

    // FALLBACK
    else {
      reply = `I understood your question, but I need a little more context.

I can answer questions about:
• Your subjects
• Weak areas and skill gaps
• Feedback and recommendations
• Assessments and quizzes
• Dashboard analytics
• Modules and SILOs
• Prisma, SQLite, Next.js, and app architecture
• External study resources

Try asking: “What are my weak areas?”, “Explain my subjects”, or “Give me recommendations”.`;
    }

    return NextResponse.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("Chatbot route error:", error);

    return NextResponse.json({
      success: true,
      reply:
        "Learning AI Assistant is running in offline mode. Please ask about subjects, weak areas, feedback, quizzes, recommendations, or application details.",
    });
  }
}