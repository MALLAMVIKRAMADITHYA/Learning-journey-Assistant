import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaBetterSqlite3({ url });
const prisma = new PrismaClient({ adapter });

const students = [
  {
    name: "Vikram Adithya",
    email: "student1@latrobe.edu.au",
    password: "123456",
    overallPerformance: 68,
  },
  {
    name: "Rahul Kumar",
    email: "student2@latrobe.edu.au",
    password: "123456",
    overallPerformance: 74,
  },
  {
    name: "Sneha Reddy",
    email: "student3@latrobe.edu.au",
    password: "123456",
    overallPerformance: 59,
  },
  {
    name: "Aarav Sharma",
    email: "student4@latrobe.edu.au",
    password: "123456",
    overallPerformance: 81,
  },
  {
    name: "Priya Nair",
    email: "student5@latrobe.edu.au",
    password: "123456",
    overallPerformance: 72,
  },
  {
    name: "Kiran Patel",
    email: "student6@latrobe.edu.au",
    password: "123456",
    overallPerformance: 63,
  },
  {
    name: "Ananya Gupta",
    email: "student7@latrobe.edu.au",
    password: "123456",
    overallPerformance: 77,
  },
  {
    name: "Rohit Verma",
    email: "student8@latrobe.edu.au",
    password: "123456",
    overallPerformance: 55,
  },
  {
    name: "Meera Joshi",
    email: "student9@latrobe.edu.au",
    password: "123456",
    overallPerformance: 84,
  },
  {
    name: "Arjun Singh",
    email: "student10@latrobe.edu.au",
    password: "123456",
    overallPerformance: 69,
  },
];

async function main() {
  await prisma.studentFeedback.deleteMany();
  await prisma.recommendation.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.assessment.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.learningOutcome.deleteMany();
  await prisma.subjectModule.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.student.deleteMany();
  await prisma.university.deleteMany();

  const university = await prisma.university.create({
    data: {
      name: "La Trobe University",
    },
  });

  const subject1 = await prisma.subject.create({
    data: {
      code: "CSE3NW",
      name: "Network Systems and Web Security",
      description:
        "Covers networks, threats, vulnerabilities, and web security principles.",
      modules: {
        create: [
          {
            title: "Module 1: Network Fundamentals",
            description: "Introduction to network layers, protocols, and traffic flow.",
          },
          {
            title: "Module 2: Web Vulnerabilities",
            description: "Common vulnerabilities such as SQL injection and XSS.",
          },
          {
            title: "Module 3: Threat Modelling",
            description: "Identifying threats and applying security risk analysis.",
          },
          {
            title: "Module 4: Secure Coding",
            description: "Secure development practices and defensive programming.",
          },
        ],
      },
      learningOutcomes: {
        create: [
          {
            code: "SILO 1",
            description: "Explain core network and web security concepts.",
          },
          {
            code: "SILO 2",
            description: "Identify common vulnerabilities and security threats.",
          },
          {
            code: "SILO 3",
            description: "Apply threat modelling to real-world scenarios.",
          },
        ],
      },
    },
  });

  const subject2 = await prisma.subject.create({
    data: {
      code: "CSE3BD",
      name: "Big Data Analytics",
      description:
        "Covers distributed data processing, Spark SQL, and analytics techniques.",
      modules: {
        create: [
          {
            title: "Module 1: Big Data Fundamentals",
            description: "Introduction to big data concepts, volume, velocity, and variety.",
          },
          {
            title: "Module 2: Spark Transformations",
            description: "Using map, filter, reduce, and transformations in Spark.",
          },
          {
            title: "Module 3: Spark SQL",
            description: "Querying structured data using Spark SQL.",
          },
          {
            title: "Module 4: Distributed Processing",
            description: "Understanding distributed computing and cluster processing.",
          },
        ],
      },
      learningOutcomes: {
        create: [
          {
            code: "SILO 1",
            description: "Explain big data processing concepts and frameworks.",
          },
          {
            code: "SILO 2",
            description: "Apply Spark transformations and actions correctly.",
          },
          {
            code: "SILO 3",
            description: "Analyse large datasets using distributed processing tools.",
          },
        ],
      },
    },
  });

  const subject3 = await prisma.subject.create({
    data: {
      code: "CSE3DB",
      name: "Database Systems",
      description:
        "Covers database design, SQL, normalization, relationships, and data modelling.",
      modules: {
        create: [
          {
            title: "Module 1: ER Modelling",
            description: "Designing entities, attributes, and relationships.",
          },
          {
            title: "Module 2: SQL Queries",
            description: "Writing SELECT, JOIN, GROUP BY, and nested SQL queries.",
          },
          {
            title: "Module 3: Normalization",
            description: "Reducing redundancy using normal forms.",
          },
          {
            title: "Module 4: Constraints and Relationships",
            description: "Using primary keys, foreign keys, and relational constraints.",
          },
        ],
      },
      learningOutcomes: {
        create: [
          {
            code: "SILO 1",
            description: "Design relational database schemas using ER models.",
          },
          {
            code: "SILO 2",
            description: "Write SQL queries to retrieve and manipulate data.",
          },
          {
            code: "SILO 3",
            description: "Apply normalization to improve database structure.",
          },
        ],
      },
    },
  });

  const subject4 = await prisma.subject.create({
    data: {
      code: "CSE3SE",
      name: "Software Engineering",
      description:
        "Covers software lifecycle, requirements, design, testing, and teamwork.",
      modules: {
        create: [
          {
            title: "Module 1: Software Development Life Cycle",
            description: "Understanding planning, design, development, testing, and deployment.",
          },
          {
            title: "Module 2: Requirements Analysis",
            description: "Gathering and documenting functional and non-functional requirements.",
          },
          {
            title: "Module 3: Software Design",
            description: "Design principles, architecture, and modular development.",
          },
          {
            title: "Module 4: Software Testing",
            description: "Testing strategies, unit testing, and regression testing.",
          },
        ],
      },
      learningOutcomes: {
        create: [
          {
            code: "SILO 1",
            description: "Explain the software development lifecycle.",
          },
          {
            code: "SILO 2",
            description: "Analyse and document software requirements.",
          },
          {
            code: "SILO 3",
            description: "Apply testing methods to improve software quality.",
          },
        ],
      },
    },
  });

  const allSubjects = [subject1, subject2, subject3, subject4];

  for (let i = 0; i < students.length; i++) {
    const s = students[i];

    const student = await prisma.student.create({
      data: {
        name: s.name,
        email: s.email,
        password: s.password,
        overallPerformance: s.overallPerformance,
        universityId: university.id,
      },
    });

    await prisma.enrollment.createMany({
      data: allSubjects.map((subject) => ({
        studentId: student.id,
        subjectId: subject.id,
      })),
    });

    for (const subject of allSubjects) {
      const base = s.overallPerformance;
      const offset = i % 5;

      await prisma.assessment.createMany({
        data: [
          {
            title: "Assignment 1",
            type: "Assignment",
            score: Math.max(45, Math.min(92, base - 8 + offset)),
            maxScore: 100,
            feedback:
              "Good attempt, but more depth and stronger explanation are needed to improve the final answer.",
            dueDate: "2026-03-20",
            studentId: student.id,
            subjectId: subject.id,
          },
          {
            title: "Assignment 2",
            type: "Report",
            score: Math.max(45, Math.min(94, base - 2 + offset)),
            maxScore: 100,
            feedback:
              "The work is well structured, but analysis and connection to learning outcomes can be improved.",
            dueDate: "2026-04-10",
            studentId: student.id,
            subjectId: subject.id,
          },
          {
            title: "Practical Task",
            type: "Practical",
            score: Math.max(45, Math.min(95, base + 4 - offset)),
            maxScore: 100,
            feedback:
              "Practical implementation is acceptable, but accuracy and explanation should be strengthened.",
            dueDate: "2026-04-24",
            studentId: student.id,
            subjectId: subject.id,
          },
        ],
      });

      await prisma.quiz.createMany({
        data: [
          {
            title: "Quiz 1",
            topic:
              subject.name === "Network Systems and Web Security"
                ? "Threat Modelling"
                : subject.name === "Big Data Analytics"
                ? "Spark Transformations"
                : subject.name === "Database Systems"
                ? "SQL Joins"
                : "SDLC",
            score: Math.max(40, Math.min(90, base - 10 + offset)),
            maxScore: 100,
            studentId: student.id,
            subjectId: subject.id,
          },
          {
            title: "Quiz 2",
            topic:
              subject.name === "Network Systems and Web Security"
                ? "Web Vulnerabilities"
                : subject.name === "Big Data Analytics"
                ? "Distributed Processing"
                : subject.name === "Database Systems"
                ? "Normalization"
                : "Software Testing",
            score: Math.max(40, Math.min(92, base - 4 - offset)),
            maxScore: 100,
            studentId: student.id,
            subjectId: subject.id,
          },
        ],
      });
    }

    await prisma.studentFeedback.create({
      data: {
        summary: `${s.name} is currently performing at ${s.overallPerformance}%. The student has shown progress across enrolled subjects but still needs targeted improvement in weaker SILO areas.`,
        strengths:
          s.overallPerformance >= 75
            ? "Strong understanding of core concepts, consistent performance, and good application of practical skills."
            : "Shows good effort and basic understanding of subject concepts, with potential to improve through structured revision.",
        weaknesses:
          s.overallPerformance < 60
            ? "Needs improvement in multiple SILOs, especially concept application, quiz performance, and detailed explanation."
            : "Requires more practice in selected weak topics and deeper connection between answers and learning outcomes.",
        nextSteps:
          "Revise weak modules, review feedback, attempt adaptive quizzes, and focus on SILOs linked to low assessment and quiz scores.",
        studentId: student.id,
      },
    });

    await prisma.recommendation.createMany({
      data: [
        {
          type: "Study Plan",
          content: `Revise weak SILOs and subject modules for ${s.name}. Focus on practice-based learning and weekly revision.`,
          studentId: student.id,
        },
        {
          type: "Quiz Suggestion",
          content: `Attempt adaptive quizzes connected to weak topics and learning outcomes.`,
          studentId: student.id,
        },
        {
          type: "Improvement Tip",
          content:
            "Use assessment feedback to identify gaps, revise relevant modules, and practice similar questions.",
          studentId: student.id,
        },
      ],
    });
  }

  console.log(
    "✅ Seed completed: 10 students, 4 subjects, modules, SILOs, feedback, assessments, quizzes."
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });