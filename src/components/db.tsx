import { sql } from "@vercel/postgres"

export const query = async (queryText: any, params: any) => {
    try {
        console.log(">>>>query....")
        const result = await sql.query(queryText, params);
        return result;
    } catch (error: any) {
        throw new Error(error.message);
    }
}