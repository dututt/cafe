'use server'
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const result = await sql`SELECT * FROM users`;

        return NextResponse.json(result.rows, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }
}
