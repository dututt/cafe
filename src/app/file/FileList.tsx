"use client";
import { useEffect, useState } from "react";

const FileList = () => {
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/files")
      .then((res) => res.json())
      .then((data) => setFiles(data.files));
  }, []);

  return (
    <div>
      <h2>Uploaded Files</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <a
              href={`/uploads/${file}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {file}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
