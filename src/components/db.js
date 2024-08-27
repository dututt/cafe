import { sql } from "@vercel/postgres"

export const query = async (queryText, params) => {
    try {
        console.log(">>>>query....")
        const result = await sql.query(queryText, params);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}