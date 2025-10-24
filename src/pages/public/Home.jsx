import { useEffect, useState } from "react";
import PublicLayout from "../../layouts/PublicLayout";
import NavBar from "../../components/NavBar/NavBar";
import Button from "../../components/Buttons/Button";
import Carousel from "../../components/Carrossel/Carousel";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import Card from "../../components/Card/Card";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import ProductCarousel from "../../components/Carrossel/ProductCarousel";

export default function Home() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await fetch("http://localhost:8080/produtos"); // ajuste a URL se necessário
        const data = await response.json();
        setProdutos(data.content || []); // se estiver usando Page do Spring
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }

    fetchProdutos();
  }, []);

  return (
    <PublicLayout>
        <ErrorBoundary>
          <NavBar/>
        </ErrorBoundary>
        
        <main className="home">
          <Carousel/>
          <h1>Sustentabilidade Criativa</h1>
          <div className="dados_reciclagem">
            <article>
              <h3>Recuperação de Papel</h3>
              <p>O Brasil tem um índice de recuperação (reciclagem) de papel de aproximadamente <Link className="referencia" to="https://www.creditodelogisticareversa.com.br/post/taxas-de-reciclagem-no-brasil">66,9%</Link>, o que é superior à média mundial estimada de 65%. Já papelão ondulado, o índice de reciclagem é ainda maior, chegando a cerca de <Link className="referencia" to="https://www.creditodelogisticareversa.com.br/post/taxas-de-reciclagem-no-brasil">91,4%</Link>.</p>
            </article>
            <article>
              <h3>Limitação do Papel Reciclado</h3>
              <p>O papel pode ser reciclado até <Link className="referencia" to="https://www.reciclasampa.com.br/artigo/saiba-tudo-sobre-a-reciclagem-do-papel">cinco</Link> vezes. O produto final da reciclagem é útil para quase todos os fins, exceto para o armazenamento de alimentos e bebidas, que geralmente exige papel virgem.</p>
            </article>
          </div>
          <div className="mapa_sinir">
            <iframe
              title="Mapa SINIR - Gestão de Resíduos Sólidos"
              src="https://sinir.gov.br/mapas/gestao-residuos-solidos/" 
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
            <Link className="referencia_map" to="https://sinir.gov.br/mapas/">REFERÊNCIA: Mapa Gestão de Resíduos Sólidos</Link>
          </div>
          <div className="produtos">
            {produtos.length > 0 && <ProductCarousel products={produtos} />}
            <Button to="/produto_list" text="Ver mais" />
          </div>

        </main>
        <Footer/>
    </PublicLayout>
  );
}
