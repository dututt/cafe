import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // const result = await sql`CREATE TABLE item (
        //     id SERIAL PRIMARY KEY,
        //     title varchar(30), 
        //     content varchar(50), 
        //     type INTEGER, 
        //     image varchar(200) NULL,
        //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        // );`;

        // const result = await sql`drop table if exists item`;


        // const result = await sql`CREATE TABLE users (
        //     id SERIAL PRIMARY KEY,
        //     username VARCHAR(50) NOT NULL,
        //     email VARCHAR(100) NOT NULL UNIQUE,
        //     password VARCHAR(255) NOT NULL,
        //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        // );`;

        // const result = await sql`drop table if exists users`;

        // const result = await sql`INSERT INTO users(username,email,password) VALUES('dutu','tvdutt2024@gmail.com', '@12345@');`;

        const result = await sql`UPDATE users SET password='@qweasd@' where id=1;`;
        return NextResponse.json({ result }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}