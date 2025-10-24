import { useEffect, useState } from "react";
import PublicLayout from "../../layouts/PublicLayout";
import NavBar from "../../components/NavBar/NavBar";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import Card from "../../components/Card/Card";
import Footer from "../../components/Footer/Footer";
import "../../styles/ProdutoList.css";
import { getProdutos } from "../../services/produtoService"; // criar função de fetch

export default function ProdutoList() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const token = localStorage.getItem("token");
        const response = await getProdutos(token); // aqui você chama a API
        // Map para ajustar nomes e imagens se necessário
        const produtosFormatados = response.content.map((p) => ({
          id: p.id,
          nome: p.nome,
          color: p.cor,
          altura: p.altura,
          largura: p.largura,
          profundidade: p.profundidade,
          volume: p.volume,
          // pega a primeira imagem ou deixa vazio
          images: p.imagens?.map(img => img.imagemCompleta) || [],
        }));
        setProdutos(produtosFormatados);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProdutos();
  }, []);

  if (loading) return <p>Carregando produtos...</p>;

  return (
    <PublicLayout>
      <ErrorBoundary>
        <NavBar />
      </ErrorBoundary>

      <main className="list">
        <div className="produtos">
          {produtos.map((produto) => (
            <Card key={produto.id} product={produto} />
          ))}
        </div>
      </main>

      <Footer />
    </PublicLayout>
  );
}
