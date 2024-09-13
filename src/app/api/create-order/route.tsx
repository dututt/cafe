import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest, res: NextResponse) {

    const { numTable, total, selects } = await req.json()
    console.log(">>>>>>>>>>>>>>>>>>>>>>{ numTable, total, selects }: ", { numTable, total, selects })
    const result = await fetch('https://api-cafe-three.vercel.app/api/create-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ numTable, total, selects }),
    });
    return NextResponse.json({ result }, { status: 200 })
}
