import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const getProperty = async (id: string) => {
  const property = await db.property.findUnique({
    where: { id },
  });
  return property;
};

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  const property = await getProperty(id);
  if (!property) {
    return NextResponse.json({ message: "Tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json(property);
};

export type PropertyResponse = Awaited<ReturnType<typeof getProperty>>;
