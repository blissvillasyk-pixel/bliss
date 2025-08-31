import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { seedRoot } from "@/service/server-action";

const postSchema = z.object({
  title: z.string().min(1, "Judul harus diisi"),
  subtitle: z.string().min(1, "Subtitle harus diisi"),
  description: z.string().min(1, "Deskripsi harus diisi"),
  image: z.string().optional().nullable(),
});

export const POST = async (req: NextRequest) => {
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
  if (!root) {
    root = await seedRoot();
  }

  await db.aboutSection.update({
    where: {
      rootId: root.id,
    },
    data: parsed.data,
  });

  return NextResponse.json({ message: "Berhasil mengubah data" });
};
