import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { seedRoot } from "@/service/server-action";

const postSchema = z.object({
  address: z.string().trim().min(1, "Alamat harus diisi").max(5000),
  phone: z.string().trim().min(1, "Nomor telepon harus diisi").max(200),
  email: z.string().trim().email("Email tidak valid").max(320),
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

    const saved = await db.contactInformation.upsert({
      where: { rootId: root.id },
      update: parsed.data,
      create: { ...parsed.data, root: { connect: { id: root.id } } },
    });

    return NextResponse.json({
      message: "Berhasil menyimpan Contact",
      data: saved,
    });
  } catch (e) {
    console.error("[ADMIN_CONTACT_POST]", e);
    return NextResponse.json(
      { message: "Gagal menyimpan Contact" },
      { status: 500 }
    );
  }
};
