import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { numTable, total, selects, status } = await req.json()
        const result = await fetch('https://api-cafe-three.vercel.app/api/create-order', {
            // const result = await fetch('http://localhost:3001/api/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ numTable, total, selects, status })
        });
        return NextResponse.json({ result }, { status: 200 })
    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
}
