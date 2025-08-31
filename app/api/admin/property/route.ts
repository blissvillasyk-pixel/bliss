import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { seedRoot } from "@/service/server-action";

const postSchema = z.object({
  title: z.string().trim().min(1, "Title harus diisi").max(300),
  subtitle: z.string().trim().min(1, "Subtitle harus diisi").max(5000),
  buttonText: z.string().trim().min(1, "Button text harus diisi").max(200),
});

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsed = postSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.message,
          message: "Harap mengisi form dengan benar",
        },
        { status: 400 }
      );
    }

    let root = await db.root.findFirst();
    if (!root) root = await seedRoot();

    const updated = await db.propertySection.update({
      where: { rootId: root.id },
      data: parsed.data,
    });

    return NextResponse.json({
      message: "Berhasil mengubah Property section",
      data: updated,
    });
  } catch (err) {
    console.error("[ADMIN_PROPERTY_POST]", err);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat menyimpan Property section" },
      { status: 500 }
    );
  }
};
