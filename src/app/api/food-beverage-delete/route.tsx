import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    const result = await fetch(
      "https://api-cafe-three.vercel.app/api/food-beverage-delete",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  } finally {
    revalidatePath("/api/food-beverage");
  }
}
