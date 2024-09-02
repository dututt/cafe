import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const result = await sql`SELECT i.id,i.title,i.content,i.type,i.image,p.price FROM Item as i INNER JOIN price as p ON i.id=p.item_id`;

        return NextResponse.json({ result }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }
}
