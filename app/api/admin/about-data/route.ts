import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { seedRoot } from "@/service/server-action";

const baseSchema = {
  label: z.string().trim().min(1, "Label harus diisi").max(200),
  value: z.string().trim().min(1, "Value harus diisi").max(300),
  aboutId: z.string().optional(), // jika tidak dikirim, akan diisi otomatis dari root
};

const createSchema = z.object({
  ...baseSchema,
});

const updateSchema = z.object({
  id: z.string(),
  ...baseSchema,
});

const deleteSchema = z.object({
  id: z.string().uuid(),
});

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const parsedCreate = createSchema.safeParse(body);
    const parsedUpdate = updateSchema.safeParse(body);

    let root = await db.root.findFirst();
    if (!root) root = await seedRoot();

    // pastikan kita punya aboutId default (punya root sekarang)
    const aboutSection = await db.aboutSection.findUnique({
      where: { rootId: root.id },
      select: { id: true },
    });

    if (!aboutSection) {
      return NextResponse.json(
        { message: "About section tidak ditemukan untuk root ini" },
        { status: 404 }
      );
    }

    if (parsedUpdate.success) {
      const { id, label, value, aboutId } = parsedUpdate.data;
      const updated = await db.aboutData.update({
        where: { id },
        data: {
          label,
          value,
          aboutId: aboutId ?? aboutSection.id,
        },
      });
      return NextResponse.json({
        message: "Berhasil memperbarui AboutData",
        data: updated,
      });
    }

    if (parsedCreate.success) {
      const { label, value, aboutId } = parsedCreate.data;
      const created = await db.aboutData.create({
        data: {
          label,
          value,
          aboutId: aboutId ?? aboutSection.id,
        },
      });
      return NextResponse.json({
        message: "Berhasil menambah AboutData",
        data: created,
      });
    }

    return NextResponse.json(
      { message: "Harap lengkapi form dengan benar" },
      { status: 400 }
    );
  } catch (err) {
    console.error("[ADMIN_ABOUT_DATA_POST]", err);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat menyimpan AboutData" },
      { status: 500 }
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsed = deleteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
    }

    const deleted = await db.aboutData.delete({
      where: { id: parsed.data.id },
    });

    return NextResponse.json({
      message: "Berhasil menghapus AboutData",
      data: deleted,
    });
  } catch (err) {
    console.error("[ADMIN_ABOUT_DATA_DELETE]", err);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat menghapus AboutData" },
      { status: 500 }
    );
  }
};
