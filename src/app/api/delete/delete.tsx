import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';


export default async function deleteItem(id: number) {
    try {
        const result = await sql`DELETE FROM Item WHERE id = ${id}`;
        revalidatePath("/")
        NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        NextResponse.json({ error }, { status: 200 });
    }

}
