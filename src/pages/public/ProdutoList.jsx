import PublicLayout from "../../layouts/PublicLayout";
import NavBar from "../../components/NavBar/NavBar";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import Card from "../../components/Card/Card";
import img1 from "../../assets/15-peças-de-design-feitas-com-caixas-de-papelão-dezeen-05.png";
import img2 from "../../assets/15-peças-de-design-feitas-com-caixas-de-papelão-dezeen-06.png";
import img3 from "../../assets/moveis-de-papelao-02.png";
import "../../styles/ProdutoList.css";
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
  {
    id:3,
    name: "Caixa Verde Padrão",
    color: "Verde Escuro",
    height: 30,
    width: 40,
    depth: 25,
    volume: 30,
    images:img1, 
  },
  {
    id:4,
    name: "Caixa Azul Média",
    color: "Azul Claro",
    height: 25,
    width: 35,
    depth: 20,
    volume: 25,
    images: img2,
  },
];

export default function ProdutoList() {
  return (
    <PublicLayout>
        <ErrorBoundary>
          <NavBar/>
        </ErrorBoundary>
        
        <main className="list">
          <div className="produtos">
            {produtos.map((produto, index) => (<Card key={index} product={produto} />))}   
          </div>            
        </main>
        <Footer/>
    </PublicLayout>
  );
}
