// pages/api/images.ts
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const dirPath = path.join(process.cwd(), "public", "uploads");
  const files = fs.readdirSync(dirPath);
  res.status(200).json({ images: files });
};

export default handler;
