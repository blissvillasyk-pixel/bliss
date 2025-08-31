import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { seedRoot } from "@/service/server-action";

const postSchema = z.object({
  title: z.string().trim().min(1, "Title harus diisi").max(300),
  subtitle: z.string().trim().min(1, "Subtitle harus diisi").max(5000),
  image: z
    .string()
    .url()
    .optional()
    .nullable()

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

    const updated = await db.whySection.update({
      where: { rootId: root.id },
      data: parsed.data,
    });

    return NextResponse.json({
      message: "Berhasil mengubah Why section",
      data: updated,
    });
  } catch (err) {
    console.error("[ADMIN_WHY_POST]", err);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat menyimpan Why section" },
      { status: 500 }
    );
  }
};
