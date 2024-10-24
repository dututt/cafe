import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(res: NextRequest) {
  const { searchParams } = res.nextUrl;
  const order_id = searchParams.get("id");
  try {
    const result = await sql`
        SELECT i.title, i.image, oi.item_num 
        FROM order_items as oi 
        INNER JOIN item as i ON oi.item_id = i.id 
        WHERE oi.order_id IN (
            SELECT id 
            FROM orders 
            WHERE status = 'Mixed' 
            AND table_num IN (
                SELECT table_num 
                FROM orders 
                WHERE id = ${order_id}
            )
            UNION ALL
            SELECT ${order_id}
    )`;
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
