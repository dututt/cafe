import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch('https://api-cafe-three.vercel.app/api/food-beverage');
        // const response = await fetch('http://localhost:3001/api/food-beverage');
        const data = await response.json();

        return NextResponse.json(data, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }
}
