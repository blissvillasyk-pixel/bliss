import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { seedRoot } from "@/service/server-action";

const baseSchema = {
  icon: z.string().trim().min(1, "Icon harus diisi").max(100),
  title: z.string().trim().min(1, "Title harus diisi").max(300),
  description: z.string().trim().min(1, "Deskripsi harus diisi").max(5000),
  servicesSectionId: z.string().optional(),
};

const createSchema = z.object({ ...baseSchema });
const updateSchema = z.object({ id: z.string(), ...baseSchema });
const deleteSchema = z.object({ id: z.string() });

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const parsedUpdate = updateSchema.safeParse(body);
    const parsedCreate = createSchema.safeParse(body);

    let root = await db.root.findFirst();
    if (!root) root = await seedRoot();

    const servicesSec = await db.servicesSection.findUnique({
      where: { rootId: root.id },
      select: { id: true },
    });
    if (!servicesSec) {
      return NextResponse.json(
        { message: "Services section tidak ditemukan" },
        { status: 404 }
      );
    }

    if (parsedUpdate.success) {
      const { id, icon, title, description, servicesSectionId } =
        parsedUpdate.data;
      const updated = await db.serviceData.update({
        where: { id },
        data: {
          icon,
          title,
          description,
          servicesSectionId: servicesSectionId ?? servicesSec.id,
        },
      });
      return NextResponse.json({
        message: "Berhasil mengubah ServiceData",
        data: updated,
      });
    }

    if (parsedCreate.success) {
      const { icon, title, description, servicesSectionId } = parsedCreate.data;
      const created = await db.serviceData.create({
        data: {
          icon,
          title,
          description,
          servicesSectionId: servicesSectionId ?? servicesSec.id,
        },
      });
      return NextResponse.json({
        message: "Berhasil menambah ServiceData",
        data: created,
      });
    }

    return NextResponse.json(
      { message: "Harap lengkapi form dengan benar" },
      { status: 400 }
    );
  } catch (e) {
    console.error("[ADMIN_SERVICE_DATA_POST]", e);
    return NextResponse.json(
      { message: "Gagal menyimpan ServiceData" },
      { status: 500 }
    );
  }
};

// NOTE: gunakan PATCH untuk delete (karena DELETE tanpa body merepotkan di beberapa lingkungan)
export const PATCH = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsed = deleteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
    }

    const deleted = await db.serviceData.delete({
      where: { id: parsed.data.id },
    });
    return NextResponse.json({
      message: "Berhasil menghapus ServiceData",
      data: deleted,
    });
  } catch (e) {
    console.error("[ADMIN_SERVICE_DATA_PATCH_DELETE]", e);
    return NextResponse.json(
      { message: "Gagal menghapus ServiceData" },
      { status: 500 }
    );
  }
};
