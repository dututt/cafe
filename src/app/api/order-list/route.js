import { NextResponse } from "next/server";

export async function GET() {
    try {
        console.log(">>>>>>>>>>>>>>>>>revalidate checking...")
        const response = await fetch('https://api-cafe-three.vercel.app/api/orders');
        const data = await response.json();

        return NextResponse.json(data, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}
