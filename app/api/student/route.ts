import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prism";
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("studentId");

    if (!studentId) {
      return NextResponse.json(
        { success: false, message: "Student ID is required" },
        { status: 400 }
      );
    }

    const student = await prisma.student.findUnique({
      where: {
        id: Number(studentId),
      },
      include: {
        university: true,
        feedbacks: true,

        enrollments: {
          include: {
            subject: {
              include: {
                modules: true,
                learningOutcomes: true,
              },
            },
          },
        },

        assessments: {
          include: {
            subject: true,
          },
        },

        quizzes: {
          include: {
            subject: true,
          },
        },

        recommendations: true,
      },
    });

    if (!student) {
      return NextResponse.json(
        { success: false, message: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      student,
    });
  } catch (error) {
    console.error("Student API error:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}