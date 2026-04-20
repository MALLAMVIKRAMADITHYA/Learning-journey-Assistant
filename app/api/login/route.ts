import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prism";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { university, email, password } = body;

    const student = await prisma.student.findFirst({
      where: {
        email,
        password,
        university: {
          name: university,
        },
      },
      include: {
        university: true,
      },
    });

    if (!student) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
        university: student.university.name,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}