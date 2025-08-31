import { NextResponse } from "next/server";
import { findRoot, seedRoot, seedUser } from "@/service/server-action";

export const GET = async () => {
  try {
    let root = await findRoot();

    if (!root) {
      root = await seedRoot();
    }

    await seedUser();

    return NextResponse.json(root);
  } catch (error) {
    console.error("Error seeding data:", error);
    return NextResponse.json({ error: "Failed to seed data" }, { status: 500 });
  }
};

export type RootData = Awaited<ReturnType<typeof findRoot>>;
