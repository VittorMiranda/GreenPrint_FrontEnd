import PublicLayout from "../../layouts/PublicLayout";
import NavBar from "../../components/NavBar/NavBar";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import "../../styles/Sobre.css";
import Footer from "../../components/Footer/Footer";
import CardPessoa from "../../components/Card/CardPessoa";
import vitor from "../../assets/vitor.png"

export default function UserRoles() {
  return (
    <PublicLayout>
        <ErrorBoundary>
          <NavBar/>
        </ErrorBoundary>
        <main className="main">
            <section className="membros">                
                <CardPessoa pessoa={{
                    nome: "Vitor Miranda",
                    foto: vitor,
                    }} 
                />
            </section>            
        </main>
        <Footer/>
    </PublicLayout>
  );
}
