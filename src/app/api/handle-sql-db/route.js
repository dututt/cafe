import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // TABLE item--------------

        // const result = await sql`CREATE TABLE item (
        //     id SERIAL PRIMARY KEY,
        //     title varchar(30), 
        //     content varchar(50), 
        //     type INTEGER, 
        //     image varchar(200) NULL,
        //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        // );`;

        // const result = await sql`drop table if exists item`;


        // TABLE users---------------

        // const result = await sql`CREATE TABLE users (
        //     id SERIAL PRIMARY KEY,
        //     username VARCHAR(50) NOT NULL,
        //     email VARCHAR(100) NOT NULL UNIQUE,
        //     password VARCHAR(255) NOT NULL,
        //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        // );`;

        // const result = await sql`drop table if exists users`;

        // const result = await sql`INSERT INTO users(username,email,password) VALUES('dutu','tvdutt2024@gmail.com', '@12345@');`;


        // TABLE Price------------------
        // const result = await sql`
        //     CREATE TABLE Price (
        //         id SERIAL PRIMARY KEY,
        //         content TEXT NOT NULL,
        //         price DECIMAL(10, 2) NOT NULL,
        //         item_id INTEGER REFERENCES item(id),
        //         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        //     );
        // `;
        // const result = await sql`UPDATE users SET password='@qweasd@' where id=1;`;

        // Insert All IDs into the price Table-----------
        // const result = await sql`INSERT INTO Price(item_id, price, content)
        //     SELECT id, 0.00, 'def' FROM Item;
        // `;

        // TABLE OrderItems
        // const result = await sql`
        //     CREATE TABLE order_items (
        //         id SERIAL PRIMARY KEY,
        //         order_id INTEGER REFERENCES Orders(id),
        //         item_id INTEGER REFERENCES item(id)
        //     );
        // `;

        // ALTER Table OrderItems
        // const result = await sql`
        //     ALTER TABLE order_items
        //     ADD COLUMN item_num INTEGER
        // `

        // TABLE Order
        // const result = await sql`
        //     CREATE TABLE Orders (
        //         id SERIAL PRIMARY KEY,
        //         table_num INTEGER,
        //         price DECIMAL(10,2),
        //         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        //     );
        // `;

        // ALTER Table OrderItems
        const result = await sql`
        ALTER TABLE orders
        ADD COLUMN status VARCHAR(15)
        `

        // const result = await sql`drop table if exists Orders`;

        return NextResponse.json({ result }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}