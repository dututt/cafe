'use server'
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        console.log("order-list request")
        const result = await sql`SELECT o.id, o.table_num, o.price, o.created_at, COUNT(*) as count_items FROM orders as o INNER JOIN order_items as oi ON o.id = oi.order_id GROUP BY o.id, o.table_num`;
        return NextResponse.json(result.rows, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}
