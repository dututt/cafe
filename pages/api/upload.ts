import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === "POST") {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const form = new IncomingForm({
      uploadDir,
      keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.status(500).json({ message: "File upload failed" });
        return;
      }
      const file = files.file as unknown as formidable.File;
      const filePath = path.join(uploadDir, file.newFilename ?? "");
      fs.renameSync(file.filepath, filePath);

      res.status(200).json({
        message: "File uploaded successfully",
        fileName: file.newFilename,
      });
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
