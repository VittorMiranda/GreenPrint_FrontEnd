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
const produtos = [
  {
    id:1,
    name: "Caixa Verde Padrão",
    color: "Verde Escuro",
    height: 30,
    width: 40,
    depth: 25,
    volume: 30,
    images:img1, 
  },
  {
    id:2,
    name: "Caixa Azul Média",
    color: "Azul Claro",
    height: 25,
    width: 35,
    depth: 20,
    volume: 25,
    images: img2,
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
            {produtos.map((produto, index) => (<Card key={index} product={produto} />))}   
          </div>            
        </main>
        <Footer/>
    </PublicLayout>
  );
}
