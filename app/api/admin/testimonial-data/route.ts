import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { seedRoot } from "@/service/server-action";

const baseSchema = {
  name: z.string().trim().min(1, "Nama harus diisi").max(200),
  role: z.string().trim().min(1, "Role harus diisi").max(200),
  image: z.string().url().optional().nullable(),
  rating: z.coerce.number().min(1).max(5),
  content: z.string().trim().min(1, "Konten harus diisi").max(8000),
  urlVideo: z
    .string()
    .optional()
    .nullable()
    .transform((v) => (typeof v === "string" ? v.trim() || null : null)),
  testimonialSectionId: z.string().optional(),
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

    const sec = await db.testimonialSection.findUnique({
      where: { rootId: root.id },
      select: { id: true },
    });
    if (!sec) {
      return NextResponse.json(
        { message: "Testimonial section tidak ditemukan" },
        { status: 404 }
      );
    }

    if (parsedUpdate.success) {
      const {
        id,
        name,
        role,
        image,
        rating,
        content,
        urlVideo,
        testimonialSectionId,
      } = parsedUpdate.data;
      const updated = await db.testimonialData.update({
        where: { id },
        data: {
          name,
          role,
          image,
          rating,
          content,
          urlVideo,
          testimonialSectionId: testimonialSectionId ?? sec.id,
        },
      });
      return NextResponse.json({
        message: "Berhasil mengubah TestimonialData",
        data: updated,
      });
    }

    if (parsedCreate.success) {
      const {
        name,
        role,
        image,
        rating,
        content,
        urlVideo,
        testimonialSectionId,
      } = parsedCreate.data;
      const created = await db.testimonialData.create({
        data: {
          name,
          role,
          image,
          rating,
          content,
          urlVideo,
          testimonialSectionId: testimonialSectionId ?? sec.id,
        },
      });
      return NextResponse.json({
        message: "Berhasil menambah TestimonialData",
        data: created,
      });
    }

    return NextResponse.json(
      { message: "Harap lengkapi form dengan benar" },
      { status: 400 }
    );
  } catch (e) {
    console.error("[ADMIN_TESTIMONIAL_DATA_POST]", e);
    return NextResponse.json(
      { message: "Gagal menyimpan TestimonialData" },
      { status: 500 }
    );
  }
};

// gunakan PATCH untuk delete
export const PATCH = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsed = deleteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
    }

    const deleted = await db.testimonialData.delete({
      where: { id: parsed.data.id },
    });
    return NextResponse.json({
      message: "Berhasil menghapus TestimonialData",
      data: deleted,
    });
  } catch (e) {
    console.error("[ADMIN_TESTIMONIAL_DATA_PATCH_DELETE]", e);
    return NextResponse.json(
      { message: "Gagal menghapus TestimonialData" },
      { status: 500 }
    );
  }
};
