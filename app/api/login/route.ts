import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";
import { JWT_SECRET } from "@/constants";

const TOKEN_TTL = "1h";

const loginSchema = z.object({
  email: z.string().email("Email tidak valid").max(255),
  password: z.string().min(6, "Kata sandi minimal 6 karakter").max(100),
});

export const POST = async (req: NextRequest) => {
  try {
    const json = await req.json().catch(() => null);
    const parsed = loginSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: parsed.error.issues?.[0]?.message || "Input tidak valid.",
        },
        { status: 400 }
      );
    }

    const email = parsed.data.email.trim().toLowerCase();
    const password = parsed.data.password;

    const user = await db.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { message: "Email atau kata sandi salah." },
        { status: 400 }
      );
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return NextResponse.json(
        { message: "Email atau kata sandi salah." },
        { status: 400 }
      );
    }

    const accessToken = jwt.sign(
      {
        sub: user.id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: TOKEN_TTL }
    );

    return NextResponse.json(
      { accessToken },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
};
