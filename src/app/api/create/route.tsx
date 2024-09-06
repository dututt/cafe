'use server'
import pool from "@/components/db"
import { sql } from "@vercel/postgres"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest, res: NextResponse) {

    const { title, content, type, image, price } = await req.json()
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const insertItemText = `INSERT INTO Item(Title, Content, Type, Image) VALUES($1, $2, $3, $4) RETURNING id`;
        const insertItemValues = [title, content, type, image];
        const itemResult = await client.query(insertItemText, insertItemValues);
        const itemId = itemResult.rows[0].id;

        const insertPriceText = `INSERT INTO price(content, price, item_id) VALUES($1, $2, $3)`;
        const insertPriceValues = ["def", price, itemId];
        await client.query(insertPriceText, insertPriceValues);

        await client.query('COMMIT');

        return NextResponse.json({ res }, { status: 200 })
    } catch (error) {
        await client.query('ROLLBACK');
        return NextResponse.json({ error: 'Database error' }, { status: 500 })
    } finally {
        client.release();
    }
}