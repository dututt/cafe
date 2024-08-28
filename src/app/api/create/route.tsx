'use server'
import { sql } from "@vercel/postgres"
import { error } from "console"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const { title, content, type, image } = await req.json()
    console.log(">>> Submit data: ", { title, content, type, image })
    try {
        const result = await sql`INSERT INTO Item(Title, Content, Type, Image) 
        VALUES(${title}, ${content}, ${type},${image});`
        console.log(">>> Handle submit Success data.....")
        return NextResponse.json({ result }, { status: 200 })
    }
    catch (e) {
        console.log(">>> Handle submit Failed data: ", e)
        return NextResponse.json({ error }, { status: 500 })
    }
}