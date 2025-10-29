import { useState } from "react";
import { Link } from "react-router-dom";
import "./CardPessoa.css";
import Select from "../Select/Select";
import { getUsuario, atualizarPapelUsuario } from "../../services/authService";
import imgAcount from "../../assets/acount.svg";
import imgLinkedin from "../../assets/linkedin.svg";
import imgGithub from "../../assets/github.svg";
import imgEmail from "../../assets/mail.svg";

export default function CardPessoa({ pessoa, mostrarSelect }) {
  const usuarioLogado = getUsuario();
  const isAdmin = usuarioLogado && usuarioLogado.papel === "ADMINISTRADOR";

  // Determina se o select será mostrado
  const podeMostrarSelect =
    typeof mostrarSelect === "boolean" ? mostrarSelect : isAdmin;

  const nome = pessoa?.nome || "Integrante";
  const foto = pessoa?.foto || imgAcount;
  const linkedin = pessoa?.linkedin;
  const github = pessoa?.github;
  const email = pessoa?.email;

  // Estado local para o papel selecionado
  const [papelAtual, setPapelAtual] = useState(pessoa?.papel || "");

  // Função que chama a API para atualizar o papel
  const handleChangePapel = async (novoPapel) => {
    try {
      await atualizarPapelUsuario(pessoa.id, novoPapel);
      setPapelAtual(novoPapel);
      alert(`Papel do usuário atualizado para ${novoPapel}`);
    } catch (error) {
      console.error("Erro ao atualizar papel:", error);
      alert("Falha ao atualizar papel do usuário.");
    }
  };

  const conteudoCard = (
    <>
      <div className="foto-container">
        <img src={foto} alt={nome} className="foto-pessoa" />
      </div>

      <div className="pessoa-info">
        <h3>{nome}</h3>

        {(linkedin || github || email) && (
          <div className="pessoa-links">
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noreferrer">
                <img src={imgLinkedin} alt="LinkedIn" /> LinkedIn
              </a>
            )}
            {github && (
              <a href={github} target="_blank" rel="noreferrer">
                <img src={imgGithub} alt="GitHub" /> GitHub
              </a>
            )}
            {email && (
              <a href={email} target="_blank" rel="noreferrer">
                <img src={imgEmail} alt="E-mail" /> {email}
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
          <Select
            value={papelAtual}
            onChange={handleChangePapel}
            options={[
              { label: "Usuário", value: "CLIENTE" },
              { label: "Funcionario", value: "FUNCIONARIO" },
              { label: "Administrador", value: "ADMINISTRADOR" },
            ]}
          />
        </div>
      )}
    </div>
  );
}
