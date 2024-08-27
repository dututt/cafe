import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const result = await sql`CREATE TABLE item (
            id SERIAL PRIMARY KEY,
            title varchar(30), 
            content varchar(50), 
            type INTEGER, 
            image varchar(200) NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`;
        // const result = await sql`drop table if exists item`;
        return NextResponse.json({ result }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}