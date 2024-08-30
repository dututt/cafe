'use server'
import pool from "@/components/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json()
    try {
        // const result = email === "tvdutt2024@gmail.com" && password === "@12345@"
        const result = await pool.query('SELECT * FROM users WHERE email=$1 and password=`$1` RETURNING *',
            [email, password]
        )
        console.log(">>>>>result Login successful", result.rows[0])
        if (result) {
            console.log(">>>>>Login successful")
        }
        NextResponse.json(result.rows[0], { status: 200 })
    } catch (error) {
        console.log(">>>>>Login error", error)
        NextResponse.json({ error }, { status: 500 })
    }
}