import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest, res: NextResponse) {
    console.log(">>>>>>>>>>>>>>>>>>>>>>{ 111numTable, total, selects }: ")

    const { numTable, total, selects } = await req.json()
    console.log(">>>>>>>>>>>>>>>>>>>>>>{ 222numTable, total, selects }: ", { numTable, total, selects })
    const result = await fetch('http://localhost:3001/api/create-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ numTable, total, selects }),
    });
    console.log(">>>>>>>>>>>>>>>>>>>>>>END 3000{ 222numTable, total, selects }", result)
    return NextResponse.json({ result }, { status: 200 })
}
