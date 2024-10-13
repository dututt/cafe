import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { id, numTable } = await req.json();
    const result = await fetch(
      "https://api-cafe-three.vercel.app/api/update-order-num-table",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, numTable }),
      }
    );
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  } finally {
    revalidatePath("/api/order-list");
  }
}
