import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { seedRoot } from "@/service/server-action";

const postSchema = z.object({
  name: z.string().trim().min(1, "Name harus diisi").max(200),
  logo: z.string().trim().min(1, "Logo URL harus diisi"),
  alt: z.string().trim().min(1, "Alt harus diisi").max(300),
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

    const saved = await db.logoInformation.upsert({
      where: { rootId: root.id },
      update: parsed.data,
      create: { ...parsed.data, root: { connect: { id: root.id } } },
    });

    return NextResponse.json({
      message: "Berhasil menyimpan Logo",
      data: saved,
    });
  } catch (e) {
    console.error("[ADMIN_LOGO_POST]", e);
    return NextResponse.json(
      { message: "Gagal menyimpan Logo" },
      { status: 500 }
    );
  }
};
