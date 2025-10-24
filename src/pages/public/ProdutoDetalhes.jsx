import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import Navbar from "../../components/NavBar/NavBar";
import PublicLayout from "../../layouts/PublicLayout";
import "../../styles/ProdutoDetalhe.css";
import CarouselPequeno from "../../components/Carrossel/CarrouselPequeno";
import ProductCarousel from "../../components/Carrossel/ProductCarousel";
import { getProdutoPorId, getProdutos } from "../../services/produtoService";

export default function ProdutoDetalhes() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [produtosRelacionados, setProdutosRelacionados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduto() {
      try {
        const token = localStorage.getItem("token");

        // Busca o produto específico
        const response = await getProdutoPorId(id, token);

        // Ajusta o formato para front
        const produtoFormatado = {
          ...response,
          images: response.imagens?.map((img) => img.imagemCompleta) || [],
        };
        setProduto(produtoFormatado);
        setMainImage(produtoFormatado.images?.[0] || null);

        // Buscar outros produtos para carrossel
        const allProdutos = await getProdutos(token);
        const produtosFormatados = allProdutos.content.map((p) => ({
          ...p,
          images: p.imagens?.map((img) => img.imagemCompleta) || [],
        }));
        setProdutosRelacionados(produtosFormatados);
      } catch (err) {
        console.error("Erro ao buscar produto:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduto();
  }, [id]);

  if (loading) return <p>Carregando produto...</p>;

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
        <div className="produto_detalhes_container">
          <div className="produto_detalhes_dados">
            <h2>{produto.nome}</h2>
            <p className="descricao">{produto.projetoPrincipalDescricao || "Sem descrição"}</p>

            <ul>
              <li>
                <strong>Cor:</strong> {produto.cor}
              </li>
              <li>
                <strong>Dimensões:</strong> {produto.altura}x{produto.largura}x{produto.profundidade} cm
              </li>
              <li>
                <strong>Volume:</strong> {produto.volumeSuportado} L
              </li>
            </ul>
          </div>

          {/* === Lado Direito: Imagem principal === */}
          <div className="produto_detalhes_imagens">
            {mainImage && <img src={mainImage} alt={produto.nome} className="imagem_principal" />}
            <CarouselPequeno images={produto.images} onSelectImage={setMainImage} />
          </div>
        </div>

        <div className="produtos">
          <ProductCarousel products={produtosRelacionados} />
        </div>
      </main>
    </PublicLayout>
  );
}
