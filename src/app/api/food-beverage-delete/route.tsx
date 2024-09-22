import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        console.log(">>>>>>>>>>>>>>>DELETE INternal")
        const { id } = await req.json()
        console.log(">>>>>>>>>>>>>>>11DELETE INternal: ", id)
        const result = await fetch('https://api-cafe-three.vercel.app/api/food-beverage-delete',
            // const result = await fetch('http://localhost:3001/api/food-beverage-delete',
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            }
        )
        return NextResponse.json(result, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Database error' }, { status: 500 })
    } finally {
        revalidatePath("/api/food-beverage")
    }

}