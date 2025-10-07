import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>GreenPrint</h3>
          <p>Soluções sustentáveis em papelão e reciclagem inteligente.</p>
        </div>

        <div className="footer-section">
          <h4>Links úteis</h4>
          <ul>
            <li><a href="/">Início</a></li>
            <li><a href="/sobre">Sobre</a></li>
            <li><a href="/contato">Contato</a></li>
            <li><a href="/produto">Produtos</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Conecte-se</h4>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">🌿</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">📸</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">💼</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} GreenPrint • Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
