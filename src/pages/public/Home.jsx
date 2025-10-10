import PublicLayout from "../../layouts/PublicLayout";
import NavBar from "../../components/NavBar/NavBar";
import Button from "../../components/Buttons/Button";
import Input from "../../components/Inputs/Input";
import Carousel from "../../components/Carrossel/Carousel";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import Card from "../../components/Card/Card";
import img1 from "../../assets/15-peças-de-design-feitas-com-caixas-de-papelão-dezeen-05.png";
import img2 from "../../assets/15-peças-de-design-feitas-com-caixas-de-papelão-dezeen-06.png";
import img3 from "../../assets/moveis-de-papelao-02.png";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import ProductCarousel from "../../components/Carrossel/ProductCarousel";
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

export default function Home() {
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
            <ProductCarousel products={produtos}/>   
          </div>            
        </main>
        <Footer/>
    </PublicLayout>
  );
}
