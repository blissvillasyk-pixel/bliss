import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { seedRoot } from "@/service/server-action";

const baseSchema = {
  icon: z.string().trim().min(1, "Icon harus diisi").max(100),
  title: z.string().trim().min(1, "Title harus diisi").max(300),
  description: z.string().trim().min(1, "Deskripsi harus diisi").max(5000),
  whyId: z.string().optional(),
};

const createSchema = z.object({ ...baseSchema });
const updateSchema = z.object({ id: z.string(), ...baseSchema });
const deleteSchema = z.object({ id: z.string() });

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsedCreate = createSchema.safeParse(body);
    const parsedUpdate = updateSchema.safeParse(body);

    let root = await db.root.findFirst();
    if (!root) root = await seedRoot();

    // pastikan punya whyId default dari root
    const whySection = await db.whySection.findUnique({
      where: { rootId: root.id },
      select: { id: true },
    });

    if (!whySection) {
      return NextResponse.json(
        { message: "Why section tidak ditemukan untuk root ini" },
        { status: 404 }
      );
    }

    if (parsedUpdate.success) {
      const { id, icon, title, description, whyId } = parsedUpdate.data;
      const updated = await db.whyData.update({
        where: { id },
        data: {
          icon,
          title,
          description,
          whyId: whyId ?? whySection.id,
        },
      });
      return NextResponse.json({
        message: "Berhasil memperbarui WhyData",
        data: updated,
      });
    }

    if (parsedCreate.success) {
      const { icon, title, description, whyId } = parsedCreate.data;
      const created = await db.whyData.create({
        data: {
          icon,
          title,
          description,
          whyId: whyId ?? whySection.id,
        },
      });
      return NextResponse.json({
        message: "Berhasil menambah WhyData",
        data: created,
      });
    }

    return NextResponse.json(
      { message: "Harap lengkapi form dengan benar" },
      { status: 400 }
    );
  } catch (err) {
    console.error("[ADMIN_WHY_DATA_POST]", err);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat menyimpan WhyData" },
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

    const deleted = await db.whyData.delete({
      where: { id: parsed.data.id },
    });

    return NextResponse.json({
      message: "Berhasil menghapus WhyData",
      data: deleted,
    });
  } catch (err) {
    console.error("[ADMIN_WHY_DATA_DELETE]", err);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat menghapus WhyData" },
      { status: 500 }
    );
  }
};
