import pool from '@/components/db';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
    console.log(">>>>>>>>>>>>>>>>>>>>>>{ 111numTable, total, selects }: ")

    const { numTable, total, selects } = await req.json()
    console.log(">>>>>>>>>>>>>>>>>>>>>>{ 222numTable, total, selects }: ")
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const insertOrderText = `INSERT INTO orders(table_num, price) VALUES($1, $2) RETURNING id`;
        const insertOrderValues = [numTable, total];
        const orderResult = await client.query(insertOrderText, insertOrderValues);
        const orderId = orderResult.rows[0].id;

        const insertOrderItemText = `INSERT INTO order_items(order_id, item_id, item_num) VALUES($1, $2, $3)`;
        for (const item of selects) {
            const insertOrderItemValues = [orderId, item.item.id, item.amount];
            await client.query(insertOrderItemText, insertOrderItemValues);
        }
        await client.query('COMMIT');
        revalidatePath("/")
        return NextResponse.json({ res }, { status: 200 })
    } catch (error) {
        await client.query('ROLLBACK');
        return NextResponse.json({ error: 'Database error' }, { status: 500 })
    } finally {
        client.release();
    }
}
