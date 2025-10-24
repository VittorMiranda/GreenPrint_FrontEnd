import { Link } from "react-router-dom";
import "./Card.css";
import img1 from "../../assets/15-peças-de-design-feitas-com-caixas-de-papelão-dezeen-05.png";
export default function Card({ product }) {
  return (
    <Link to={`/produto/${product.id}`} className="product-link">
        <div className="product-card">
        {/* Imagem principal do produto */}
        <div className="image-container">
            <img
            src={product.images?.[0] || img1}
            alt={product.nome}
            className="product-image"
            />
        </div>

        {/* Informações do produto */}
        <div className="product-info">
            <h3>{product.nome}</h3>
            <p>
            <strong>Cor:</strong> {product.color}
            </p>
            <p>
            <strong>Dimensões:</strong> {product.altura}x{product.largura}x{product.profundidade} cm
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
