import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@/constants";

export const GET = async (req: NextRequest) => {
  try {
    const auth =
      req.headers.get("authorization") || req.headers.get("Authorization");
    if (!auth || !auth.toLowerCase().startsWith("bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = auth.split(" ")[1]?.trim();
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let payload: JwtPayload & { sub?: string; email?: string; role?: string };
    try {
      payload = jwt.verify(token, JWT_SECRET) as JwtPayload & {
        sub?: string;
        email?: string;
        role?: string;
      };
    } catch (error) {
      const err = error as Error;
      const msg =
        err?.name === "TokenExpiredError" ? "Token expired" : "Token invalid";
      return NextResponse.json({ message: msg }, { status: 401 });
    }

    return NextResponse.json(
      { ok: true, user: payload },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (e) {
    console.error("check-auth error:", e);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
