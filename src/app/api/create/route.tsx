'use server'
import { sql } from "@vercel/postgres"
import { error } from "console"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const { title, content, type, image } = await req.json()
    try {
        const result = await sql`INSERT INTO Item(Title, Content, Type, Image) 
        VALUES(${title}, ${content}, ${type},${image});`
        return NextResponse.json({ result }, { status: 200 })
    }
    catch (error) {
        return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }
}