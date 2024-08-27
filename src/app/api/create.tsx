import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const { title, content, type, image } = req.body
    try {
        console.log(">>>>CREATE....")
    } catch (error) {
        console.log(">>>>ERROR CREATE....")
    }
}