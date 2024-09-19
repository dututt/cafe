import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch('https://api-cafe-three.vercel.app/api/orders');
        // const response = await fetch('http://localhost:3001/api/orders');
        const data = await response.json();
        console.log(">>>>>>>>>>>>>>Internal API orders: ", data)
        return NextResponse.json(data, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}
