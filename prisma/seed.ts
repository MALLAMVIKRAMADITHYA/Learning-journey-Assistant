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
  await prisma.recommendation.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.assessment.deleteMany();
  await prisma.enrollment.deleteMany();
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
      description: "Covers networks, threats, vulnerabilities, and web security.",
    },
  });

  const subject2 = await prisma.subject.create({
    data: {
      code: "CSE3BD",
      name: "Big Data Analytics",
      description: "Covers distributed data processing and analytics techniques.",
    },
  });

  const subject3 = await prisma.subject.create({
    data: {
      code: "CSE3DB",
      name: "Database Systems",
      description: "Covers database design, SQL, normalization, and data modeling.",
    },
  });

  const subject4 = await prisma.subject.create({
    data: {
      code: "CSE3SE",
      name: "Software Engineering",
      description: "Covers software lifecycle, requirements, design, testing, and teamwork.",
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

    await prisma.assessment.createMany({
      data: [
        {
          title: "Assignment 1",
          type: "Assignment",
          score: 55 + ((i * 3) % 35),
          maxScore: 100,
          feedback: "Needs better justification and stronger concept understanding in security topics.",
          dueDate: "2026-03-20",
          studentId: student.id,
          subjectId: subject1.id,
        },
        {
          title: "Lab Portfolio",
          type: "Portfolio",
          score: 60 + ((i * 4) % 30),
          maxScore: 100,
          feedback: "Good structure, but critical analysis and reflection depth can be improved.",
          dueDate: "2026-04-10",
          studentId: student.id,
          subjectId: subject1.id,
        },
        {
          title: "Spark SQL Task",
          type: "Assignment",
          score: 58 + ((i * 5) % 32),
          maxScore: 100,
          feedback: "Logic is mostly correct, but sorting, joins, and formatting need more accuracy.",
          dueDate: "2026-03-25",
          studentId: student.id,
          subjectId: subject2.id,
        },
        {
          title: "Big Data Report",
          type: "Report",
          score: 62 + ((i * 2) % 28),
          maxScore: 100,
          feedback: "Report is clear, but discussion and technical interpretation need strengthening.",
          dueDate: "2026-04-05",
          studentId: student.id,
          subjectId: subject2.id,
        },
        {
          title: "SQL Assignment",
          type: "Assignment",
          score: 57 + ((i * 4) % 34),
          maxScore: 100,
          feedback: "SQL query design is acceptable, but normalization and joins need more practice.",
          dueDate: "2026-03-28",
          studentId: student.id,
          subjectId: subject3.id,
        },
        {
          title: "Database Design Task",
          type: "Project",
          score: 61 + ((i * 3) % 30),
          maxScore: 100,
          feedback: "Schema design is reasonable, but relationships and constraints can be improved.",
          dueDate: "2026-04-12",
          studentId: student.id,
          subjectId: subject3.id,
        },
        {
          title: "Requirements Analysis",
          type: "Assignment",
          score: 59 + ((i * 5) % 33),
          maxScore: 100,
          feedback: "Requirements are identified, but documentation and clarity can be improved.",
          dueDate: "2026-03-22",
          studentId: student.id,
          subjectId: subject4.id,
        },
        {
          title: "Software Project Report",
          type: "Report",
          score: 64 + ((i * 2) % 26),
          maxScore: 100,
          feedback: "Teamwork and structure are good, but testing discussion needs more detail.",
          dueDate: "2026-04-15",
          studentId: student.id,
          subjectId: subject4.id,
        },
      ],
    });

    await prisma.quiz.createMany({
      data: [
        {
          title: "Quiz 1",
          topic: "Threat Modelling",
          score: 50 + ((i * 3) % 40),
          maxScore: 100,
          studentId: student.id,
          subjectId: subject1.id,
        },
        {
          title: "Quiz 2",
          topic: "Web Vulnerabilities",
          score: 54 + ((i * 4) % 36),
          maxScore: 100,
          studentId: student.id,
          subjectId: subject1.id,
        },
        {
          title: "Quiz 1",
          topic: "Spark Transformations",
          score: 56 + ((i * 5) % 34),
          maxScore: 100,
          studentId: student.id,
          subjectId: subject2.id,
        },
        {
          title: "Quiz 2",
          topic: "Distributed Processing",
          score: 58 + ((i * 3) % 32),
          maxScore: 100,
          studentId: student.id,
          subjectId: subject2.id,
        },
        {
          title: "Quiz 1",
          topic: "Normalization",
          score: 52 + ((i * 4) % 38),
          maxScore: 100,
          studentId: student.id,
          subjectId: subject3.id,
        },
        {
          title: "Quiz 2",
          topic: "SQL Joins",
          score: 55 + ((i * 2) % 35),
          maxScore: 100,
          studentId: student.id,
          subjectId: subject3.id,
        },
        {
          title: "Quiz 1",
          topic: "SDLC",
          score: 57 + ((i * 3) % 33),
          maxScore: 100,
          studentId: student.id,
          subjectId: subject4.id,
        },
        {
          title: "Quiz 2",
          topic: "Software Testing",
          score: 53 + ((i * 5) % 37),
          maxScore: 100,
          studentId: student.id,
          subjectId: subject4.id,
        },
      ],
    });

    await prisma.recommendation.createMany({
      data: [
        {
          type: "Study Plan",
          content: `Revise weak concepts in all enrolled subjects and spend extra time on practice-based learning for ${s.name}.`,
          studentId: student.id,
        },
        {
          type: "Quiz Suggestion",
          content: `Attempt adaptive quizzes in weak topics to improve subject mastery for ${s.name}.`,
          studentId: student.id,
        },
        {
          type: "Improvement Tip",
          content: `Focus on feedback comments, revise theory, and practice more problem-solving questions.`,
          studentId: student.id,
        },
      ],
    });
  }

  console.log("✅ 10 students with 4 common subjects seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });