import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { seedRoot } from "@/service/server-action";

const postSchema = z.object({
  title: z.string().trim().min(1, "Title harus diisi").max(300),
  subtitle: z.string().trim().min(1, "Subtitle harus diisi").max(5000),
  primaryButtonText: z
    .string()
    .trim()
    .min(1, "Tombol utama harus diisi")
    .max(200),
  secondaryButtonText: z
    .string()
    .trim()
    .min(1, "Tombol sekunder harus diisi")
    .max(200),
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

    const saved = await db.finalCtaSection.upsert({
      where: { rootId: root.id },
      update: parsed.data,
      create: { ...parsed.data, root: { connect: { id: root.id } } },
    });

    return NextResponse.json({
      message: "Berhasil menyimpan Final CTA",
      data: saved,
    });
  } catch (e) {
    console.error("[ADMIN_FINAL_CTA_POST]", e);
    return NextResponse.json(
      { message: "Gagal menyimpan Final CTA" },
      { status: 500 }
    );
  }
};
