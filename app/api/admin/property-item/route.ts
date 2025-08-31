// /app/api/admin/property-item/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { seedRoot } from "@/service/server-action";
import { PropertyType } from "@prisma/client";

/** Validasi untuk create/update (upsert) */
const upsertSchema = z.object({
  id: z.string().optional(),

  name: z.string().trim().min(1, "Nama harus diisi"),
  pdf: z.string().url("Harus mengupload katalog berupa file PDF"),
  images: z.array(z.string().url()).min(1, "Minimal 1 gambar"),
  address: z.string().trim().min(1, "Alamat harus diisi"),
  type: z.enum(Object.values(PropertyType)),
  room: z.coerce
    .number("Total kamar harus berupa angka")
    .min(1, "Minimal memiliki 1 kamar"),
  bath: z.coerce
    .number("Total kamar mandi harus berupa angka")
    .min(1, "Minimal memiliki 1 kamar mandi"),
  sqft: z.coerce
    .number("Luas harus berupa angka")
    .min(1, "Minimal memiliki luas 1 m²"),
  price: z.coerce.number("Harga harus berupa angka").min(1, "Harga minimal 1"),
  rating: z.coerce
    .number("Rating harus berupa angka")
    .min(0, "Rating minimal 0")
    .max(5, "Rating maksimal 5")
    .refine((v) => !isNaN(v), "Rating harus berupa angka"),
  description: z.string().trim().min(1, "Deskripsi harus diisi"),
  features: z.array(z.string()).min(1, "Minimal 1 fitur"),

  isAvailable: z.boolean(),
});

/** Validasi untuk delete (via PATCH) */
const deleteSchema = z.object({
  id: z.string(),
});

/** POST: create / update (upsert) */
export const POST = async (req: NextRequest) => {
  try {
    const json = await req.json();
    const parsed = upsertSchema.safeParse(json);

    if (!parsed.success) {
      let message = "";
      try {
        message = JSON.parse(parsed.error.message)?.[0]?.message;
      } catch (error) {
        console.log(error);
        message = "Mohon lengkapi form dengan benar";
      }
      return NextResponse.json(
        {
          message,
          error: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const payload = parsed.data;

    // pastikan root ada
    let root = await db.root.findFirst();
    if (!root) root = await seedRoot();

    // normalisasi & deduplikasi array
    const images = Array.from(new Set(payload.images.map((s) => s.trim())));
    const features = Array.from(
      new Set((payload.features ?? []).map((s) => s.trim()))
    );

    if (payload.id) {
      // update
      const existing = await db.property.findUnique({
        where: { id: payload.id },
        select: { id: true, rootId: true },
      });

      if (!existing || existing.rootId !== root.id) {
        return NextResponse.json(
          { message: "Data properti tidak ditemukan" },
          { status: 404 }
        );
      }

      await db.property.update({
        where: { id: payload.id },
        data: {
          name: payload.name,
          images,
          address: payload.address,
          type: payload.type,
          room: payload.room,
          bath: payload.bath,
          sqft: payload.sqft,
          price: payload.price,
          rating: payload.rating,
          description: payload.description,
          features,
          isAvailable: payload.isAvailable,
        },
      });

      return NextResponse.json({ message: "Berhasil mengubah properti" });
    } else {
      // create
      await db.property.create({
        data: {
          rootId: root.id,
          name: payload.name,
          images,
          address: payload.address,
          type: payload.type,
          room: payload.room,
          bath: payload.bath,
          sqft: payload.sqft,
          price: payload.price,
          rating: payload.rating,
          description: payload.description,
          features,
          isAvailable: payload.isAvailable,
          pdf: payload.pdf,
        },
      });

      return NextResponse.json({ message: "Berhasil menambah properti" });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
};

/** PATCH: delete (karena DELETE tidak menerima body) */
export const PATCH = async (req: NextRequest) => {
  try {
    const json = await req.json();
    const parsed = deleteSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "ID tidak valid", error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // pastikan root ada
    let root = await db.root.findFirst();
    if (!root) root = await seedRoot();

    const prop = await db.property.findUnique({
      where: { id: parsed.data.id },
      select: { id: true, rootId: true },
    });

    if (!prop || prop.rootId !== root.id) {
      return NextResponse.json(
        { message: "Data properti tidak ditemukan" },
        { status: 404 }
      );
    }

    await db.property.delete({ where: { id: parsed.data.id } });
    return NextResponse.json({ message: "Berhasil menghapus properti" });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
};
