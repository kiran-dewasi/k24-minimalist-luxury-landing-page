import { db } from "@/db";
import { leads } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, mobile, businessType, source, city } = body;

    if (!mobile) {
      return NextResponse.json(
        { error: "Mobile number is required" },
        { status: 400 }
      );
    }

    const newLead = await db.insert(leads).values({
      id: crypto.randomUUID(),
      name: name || null,
      mobile: mobile,
      businessType: businessType || null,
      source: source || "unknown",
      city: city || null,
    }).returning();

    return NextResponse.json({ success: true, lead: newLead[0] });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
