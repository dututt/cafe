'use server'
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(res: NextRequest) {
    const { searchParams } = new URL(res.url);
    const order_id = searchParams.get('id');
    try {
        const result = await sql`SELECT i.title, i.image FROM order_items as oi INNER JOIN item as i ON oi.item_id = i.id WHERE oi.order_id = ${order_id}`;
        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
