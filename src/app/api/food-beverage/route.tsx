import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/food-beverage');
        const data = await response.json();

        return NextResponse.json(data, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }
}
