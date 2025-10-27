import { Link } from "react-router-dom";
import "./CardPessoa.css";
import Select from "../Select/Select";
import { getUsuario } from "../../services/authService";
import imgAcount from "../../assets/acount.svg"
import imgLinkedin from "../../assets/linkedin.svg"
import imgGithub from "../../assets/github.svg"

export default function CardPessoa({ pessoa, mostrarSelect }) {
    const usuario = getUsuario();
    const isAdmin = usuario && usuario.papel === "ADMINISTRADOR";
  
    // Regra final:
    // - Se o prop "mostrarSelect" for informado, usa ele (true/false)
    // - Se não for informado, usa o padrão (só admin pode ver)
    const podeMostrarSelect =
      typeof mostrarSelect === "boolean" ? mostrarSelect : isAdmin;
  
    const nome = pessoa?.nome || "Integrante";
    const foto = pessoa?.foto || imgAcount;
    const linkedin = pessoa?.linkedin;
    const github = pessoa?.github;
  
    const conteudoCard = (
      <>
        <div className="foto-container">
          <img src={foto} alt={nome} className="foto-pessoa" />
        </div>
  
        <div className="pessoa-info">
          <h3>{nome}</h3>
  
          {(linkedin || github) && (
            <div className="pessoa-links">
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noreferrer">
                  <img src={imgLinkedin} alt="LinkedIn" />
                  LinkedIn
                </a>
              )}
              {github && (
                <a href={github} target="_blank" rel="noreferrer">
                  <img src={imgGithub} alt="GitHub" />
                  GitHub
                </a>
              )}
            </div>
          )}
        </div>
      </>
    );
  
    return (
      <div className="pessoa-card">
        {pessoa?.id ? (
          <Link to={`/pessoa/${pessoa.id}`} className="pessoa-link">
            {conteudoCard}
          </Link>
        ) : (
          conteudoCard
        )}
  
        {podeMostrarSelect && (
          <div className="pessoa-select">
            <Select />
          </div>
        )}
      </div>
    );
  }