import { NextResponse } from "next/server";
import { findRoot, seedRoot, seedUser } from "@/service/server-action";
import { revalidateTag } from "next/cache";

export const revalidate = 300; // 5 minutes
export const dynamic = "force-dynamic"; // allow ISR while enabling tag revalidation if used elsewhere

export const GET = async () => {
  try {
    // Fetch existing root data
    let root = await findRoot();

    // Only seed if absolutely necessary (cold start / empty DB)
    if (!root) {
      root = await seedRoot();
      await seedUser();
      // If consumers opt-in to tag-based revalidation later
      try { revalidateTag("root"); } catch {}
    }

    return NextResponse.json(root, {
      headers: {
        // Let browsers/proxies cache briefly to reduce network chattiness
        // Server-side ISR is governed by `export const revalidate`
        "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Error seeding data:", error);
    return NextResponse.json({ error: "Failed to seed data" }, { status: 500 });
  }
};

export type RootData = Awaited<ReturnType<typeof findRoot>>;
