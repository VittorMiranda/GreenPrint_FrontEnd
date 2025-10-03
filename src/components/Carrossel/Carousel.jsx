import { useEffect, useState } from "react";
import "./Carousel.css";

import img1 from "../../assets/15-peças-de-design-feitas-com-caixas-de-papelão-dezeen-05.png";
import img2 from "../../assets/15-peças-de-design-feitas-com-caixas-de-papelão-dezeen-06.png";
import img3 from "../../assets/moveis-de-papelao-02.png";

export default function Carousel({ images = [img1, img2, img3] }) {
  const [current, setCurrent] = useState(0);

  // Avança automaticamente a cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 3000); // 3000ms = 3s

    // Limpa o intervalo quando o componente desmonta
    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrent(prev => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent(prev => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel">
      <button className="carousel-btn left" onClick={prevSlide}>❮</button>

      <div
        className="carousel-images"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, index) => (
          <img key={index} src={img} alt={`Slide ${index}`} />
        ))}
      </div>

      <button className="carousel-btn right" onClick={nextSlide}>❯</button>

      <div className="carousel-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? "active" : ""}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
}