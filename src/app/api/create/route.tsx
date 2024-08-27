'use server'
import { sql } from "@vercel/postgres"

export async function POST(title: string, content: string, type: number, image: string) {

    try {
        await sql`INSERT INTO Item(Title, Content, Type, Image) VALUES(
                ${title}, 
                ${content}, 
                ${type},
                ${image});`
        console.log(">>> Handle submit Success data.....")
    }
    catch (e) {
        console.log(">>> Handle submit Failed data: ", e)
    }
}