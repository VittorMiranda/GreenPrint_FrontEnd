import { useEffect, useState } from "react";
import "./ProductCarousel.css";
import Card from "../Card/Card";

export default function ProductCarousel({ products = [] }) {
  const [current, setCurrent] = useState(0);

  // Avança automaticamente a cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <div className="product-carousel">
      <button className="carousel-btn left" onClick={prevSlide}>❮</button>

      <div
        className="carousel-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {products.map((product, index) => (
          <div className="carousel-slide" key={`${product.id}-${index}`}>
            <Card
              key={`${product.id}-${index}`}
              product={{
                ...product,
                images: product.imagens?.map((img) => img.imagemCompleta) || [],
              }}
            />
            
          </div>
        ))}
      </div>

      <button className="carousel-btn right" onClick={nextSlide}>❯</button>

      <div className="carousel-dots">
        {products.map((_, index) => (
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
