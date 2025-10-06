import { useState } from "react";
import { useParams } from "react-router-dom";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import Navbar from "../../components/NavBar/NavBar";
import PublicLayout from "../../layouts/PublicLayout";
import "../../styles/ProdutoHome.css";

import img1 from "../../assets/15-peças-de-design-feitas-com-caixas-de-papelão-dezeen-05.png";
import img2 from "../../assets/15-peças-de-design-feitas-com-caixas-de-papelão-dezeen-06.png";
import img3 from "../../assets/moveis-de-papelao-02.png";
import CarouselPequeno from "../../components/Carrossel/CarrouselPequeno";

// ⚙️ Simulação temporária (depois substitui por fetch da API)
const produtos = [
  {
    id: 1,
    name: "Caixa Casa de Gato",
    color: "Azul",
    height: 2,
    width: 3,
    depth: 6,
    volume: 36,
    description:
      "Uma charmosa casa de gato feita em papelão reforçado e sustentável, perfeita para pets pequenos.",
    images: [img1, img2, img3],
  },
  {
    id: 2,
    name: "Caixa Multiuso",
    color: "Marrom",
    height: 10,
    width: 15,
    depth: 20,
    volume: 300,
    description:
      "Caixa resistente e versátil, ideal para armazenamento e organização de objetos.",
    images: [img2, img3, img1],
  },
];

export default function Produto() {
  const { id } = useParams();
  const produto = produtos.find((p) => p.id === parseInt(id));

  const [mainImage, setMainImage] = useState(produto?.images[0]);

  if (!produto) {
    return (
      <PublicLayout>
        <Navbar />
        <main className="produto_nao_encontrado">
          <h2>Produto não encontrado 😕</h2>
          <p>Verifique se o link está correto.</p>
        </main>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <ErrorBoundary>
        <Navbar />
      </ErrorBoundary>

      <main className="produto_detalhes">
        {/* === Lado Esquerdo: Dados === */}
        <div className="produto_detalhes_dados">
          <h2>{produto.name}</h2>
          <p className="descricao">{produto.description}</p>

          <ul>
            <li>
              <strong>Cor:</strong> {produto.color}
            </li>
            <li>
              <strong>Dimensões:</strong> {produto.height}x{produto.width}x{produto.depth} cm
            </li>
            <li>
              <strong>Volume:</strong> {produto.volume} L
            </li>
          </ul>

          {/* 🧩 Mini carrossel controlando imagem principal */}
          <CarouselPequeno images={produto.images} onSelectImage={setMainImage} />
        </div>

        {/* === Lado Direito: Imagem principal === */}
        <div className="produto_detalhes_imagens">
          <img src={mainImage} alt={produto.name} className="imagem_principal" />
        </div>
      </main>
    </PublicLayout>
  );
}
