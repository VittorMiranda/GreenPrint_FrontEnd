import PublicLayout from "../../layouts/PublicLayout";
import NavBar from "../../components/NavBar/NavBar";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import "../../styles/Sobre.css";
import Footer from "../../components/Footer/Footer";
import ButtonWpp from "../../components/Buttons/ButtonWpp.jsx";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaInstagram } from "react-icons/fa";
import "../../styles/Contato.css"
export default function Contato() {
  return (
    <PublicLayout>
        <ErrorBoundary>
          <NavBar/>
        </ErrorBoundary>
        <main className="main">
        <section className="contato-section">
          <h1>Entre em Contato</h1>
          <p>
            Ficaremos felizes em te atender!  
            Use um dos canais abaixo ou envie uma mensagem diretamente pelo WhatsApp.
          </p>

          <div className="contato-info">
            <div className="contato-item">
              <FaPhoneAlt className="contato-icon" />
              <span>(19) 99999-9999</span>
            </div>

            <div className="contato-item">
              <FaEnvelope className="contato-icon" />
              <span>contato@greenprint.com</span>
            </div>

            <div className="contato-item">
              <FaMapMarkerAlt className="contato-icon" />
              <span>Rua Exemplo, 123 - Campinas/SP</span>
            </div>

            <div className="contato-item">
              <FaInstagram className="contato-icon" />
              <a
                href="https://www.instagram.com/seu_perfil"
                target="_blank"
                rel="noopener noreferrer"
              >
                @seu_perfil
              </a>
            </div>
          </div>
        </section>
           <ButtonWpp
                phoneNumber="551999999999"
                message="Olá! Gostaria de conhecer os valores sobre o produto."
                floating={true}
            />
            
        </main>
        <Footer/>
    </PublicLayout>
  );
}
