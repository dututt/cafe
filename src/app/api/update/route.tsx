import pool from "@/components/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    const { id, title, content, type, image, price } = await req.json()
    try {
        let result = await pool.query('UPDATE Item SET title=$1, content=$2, type=$3, image=$4 WHERE id=$5 RETURNING *',
            [title, content, type, image, id]
        )
        result = await pool.query('UPDATE price SET price=$1 WHERE item_id=$2 RETURNING *',
            [price, id]
        )
        return NextResponse.json(result.rows[0], { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }
}