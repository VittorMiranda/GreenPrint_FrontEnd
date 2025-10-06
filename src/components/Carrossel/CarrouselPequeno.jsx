import { useState } from "react";
import "./Carousel.css";

export default function CarouselPequeno({ images = [], onSelectImage }) {
  const [current, setCurrent] = useState(0);

  const updateCurrent = (index) => {
    setCurrent(index);
    if (onSelectImage) onSelectImage(images[index]);
  };
 
  return (
    <div className="carousel-pequeno">
      <div className="carousel-thumbnails">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            onClick={() => updateCurrent(index)}
            className={index === current ? "active" : ""}
          />
        ))}
      </div>
    </div>
  );
}

