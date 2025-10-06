import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ product }) {
  return (
    <Link to={`/produto/${product.id}`} className="product-link">
        <div className="product-card">
        {/* Imagem principal do produto */}
        <div className="image-container">
            <img
            src={product.images} 
            alt={product.name}
            className="product-image"
            />
        </div>

        {/* Informações do produto */}
        <div className="product-info">
            <h3>{product.name}</h3>
            <p>
            <strong>Cor:</strong> {product.color}
            </p>
            <p>
            <strong>Dimensões:</strong> {product.height}x{product.width}x{product.depth} cm
            </p>
            {product.volume && (
            <p>
                <strong>Volume:</strong> {product.volume} L
            </p>
            )}
        </div>
        </div>
    </Link>

  );
}
