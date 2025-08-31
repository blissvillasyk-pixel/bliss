import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { seedRoot } from "@/service/server-action";
import { SocialMediaIcon } from "@prisma/client";

const baseSchema = {
  icon: z.enum(Object.values(SocialMediaIcon)),
  label: z.string().trim().min(1, "Label harus diisi").max(200),
  href: z.string().trim().url().min(1, "URL harus diisi"),
  rootId: z.string().optional(), // akan diisi otomatis jika kosong
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

    if (parsedUpdate.success) {
      const { id, icon, label, href, rootId } = parsedUpdate.data;
      const updated = await db.socialMediaInformation.update({
        where: { id },
        data: {
          icon,
          label,
          href,
          rootId: rootId ?? root.id,
        },
      });
      return NextResponse.json({
        message: "Berhasil mengubah Social link",
        data: updated,
      });
    }

    if (parsedCreate.success) {
      const { icon, label, href, rootId } = parsedCreate.data;
      const created = await db.socialMediaInformation.create({
        data: {
          icon,
          label,
          href,
          rootId: rootId ?? root.id,
        },
      });
      return NextResponse.json({
        message: "Berhasil menambah Social link",
        data: created,
      });
    }

    return NextResponse.json(
      { message: "Harap lengkapi form dengan benar" },
      { status: 400 }
    );
  } catch (e) {
    console.error("[ADMIN_SOCIAL_POST]", e);
    return NextResponse.json(
      { message: "Gagal menyimpan Social link" },
      { status: 500 }
    );
  }
};

// gunakan PATCH untuk delete (body: { id })
export const PATCH = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsed = deleteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
    }

    const deleted = await db.socialMediaInformation.delete({
      where: { id: parsed.data.id },
    });

    return NextResponse.json({
      message: "Berhasil menghapus Social link",
      data: deleted,
    });
  } catch (e) {
    console.error("[ADMIN_SOCIAL_PATCH_DELETE]", e);
    return NextResponse.json(
      { message: "Gagal menghapus Social link" },
      { status: 500 }
    );
  }
};
