import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { seedRoot } from "@/service/server-action";

const postSchema = z.object({
  title: z.string().trim().min(1, "Title harus diisi").max(300),
  subtitle: z.string().trim().min(1, "Subtitle harus diisi").max(5000),
  ctaTitle: z.string().trim().min(1, "CTA Title harus diisi").max(300),
  ctaSubtitle: z.string().trim().min(1, "CTA Subtitle harus diisi").max(5000),
  ctaButtonText: z
    .string()
    .trim()
    .min(1, "CTA Button Text harus diisi")
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

    const saved = await db.propertyPageSection.upsert({
      where: { rootId: root.id },
      update: parsed.data,
      create: { ...parsed.data, root: { connect: { id: root.id } } },
    });

    return NextResponse.json({
      message: "Berhasil menyimpan Property Page",
      data: saved,
    });
  } catch (e) {
    console.error("[ADMIN_PROPERTY_PAGE_POST]", e);
    return NextResponse.json(
      { message: "Gagal menyimpan Property Page" },
      { status: 500 }
    );
  }
};
