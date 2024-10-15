"use client";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

const ImageList = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then((data) => setImages(data.images));
  }, []);

  return (
    <div>
      <h2>Uploaded Images</h2>
      <ul>
        {images.map((image, index) => (
          <Card.Img
            key={index}
            variant="top"
            style={{ height: "8rem" }}
            className="card-img-top fixed-size-m p-1"
            src={`/uploads/${image}`}
          />
        ))}
      </ul>
    </div>
  );
};

export default ImageList;
