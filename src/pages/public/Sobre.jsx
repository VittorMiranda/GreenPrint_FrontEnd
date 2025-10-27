import PublicLayout from "../../layouts/PublicLayout";
import NavBar from "../../components/NavBar/NavBar";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import "../../styles/Sobre.css";
import Footer from "../../components/Footer/Footer";
import CardPessoa from "../../components/Card/CardPessoa";
import vitor from "../../assets/vitor.png"
import caio from "../../assets/caio.png"
import lori from "../../assets/lori.png"
import gustavo from "../../assets/gustavo.png"

export default function Sobre() {
  return (
    <PublicLayout>
        <ErrorBoundary>
          <NavBar/>
        </ErrorBoundary>
        <main className="main">
            <section className="sobre">
            <h1>Sobre o GreenPrint</h1>
            <p>
                O <strong>GreenPrint</strong> foi desenvolvido com o propósito de gerar um impacto
                positivo no meio ambiente e na sociedade. 
            </p>
            <p>
                No aspecto ambiental, o projeto incentiva o reaproveitamento do papelão,
                transformando resíduos em produtos úteis e sustentáveis. Cada peça criada representa
                uma nova vida para um material que seria descartado, contribuindo diretamente para a
                redução do lixo e fortalecendo a economia circular.
            </p>
            <p>
                No campo social, o GreenPrint busca conscientizar e conectar pessoas em torno do
                consumo responsável. A plataforma cria oportunidades para artesãos e pequenas
                empresas que trabalham com materiais reciclados, além de promover a educação
                ambiental por meio de conteúdo acessível e interativo.
            </p>
            <p>
                O impacto tecnológico surge com o uso de ferramentas modernas, como{" "}
                <strong>React</strong> e <strong>Spring Boot</strong>, mostrando que a tecnologia pode ser
                usada para resolver problemas ambientais de forma inovadora, eficiente e escalável.
            </p>
            <p>
                Quanto ao design, toda a identidade visual foi pensada para refletir a essência
                ecológica do projeto. As cores verde claro, verde escuro e branco remetem à natureza e
                ao papel reciclado, enquanto a interface limpa e responsiva garante uma navegação
                simples e agradável.
            </p>
            <p>
                O design não é apenas estético — ele também educa, inspira e reforça o propósito
                sustentável do GreenPrint: <strong>unir tecnologia, consciência ambiental e design
                inteligente</strong> para gerar impacto positivo.
            </p>
            </section>
            <section className="membros">                
                <CardPessoa pessoa={{
                    nome: "Caio Reis Barroso",
                    foto: caio,
                    linkedin: "linkedin.com/in/caio-reis-barroso-38a9ba22a",
                    github: "https://github.com"
                    }} mostrarSelect={false}
                />
                <CardPessoa pessoa={{
                    nome: "Lori Prado",
                    foto: lori,
                    linkedin: "linkedin.com/in/lori-prado",
                    github: "https://github.com"
                    }} mostrarSelect={false}
                />
                <CardPessoa pessoa={{
                    nome: "Gustavo Rosendo",
                    foto: gustavo,
                    linkedin: "linkedin.com/in/gustavo-rosendo-aa8489234",
                    github: "https://github.com"
                    }} mostrarSelect={false}
                />
                <CardPessoa pessoa={{
                    nome: "Vitor Miranda",
                    foto: vitor,
                    linkedin: "https://linkedin.com/in/vitor-miranda",
                    github: "https://github.com/vitormiranda"
                    }} mostrarSelect={false}
                />
            </section>
            
        </main>
        <Footer/>
    </PublicLayout>
  );
}
