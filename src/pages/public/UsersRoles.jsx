import { useEffect, useState } from "react";
import PublicLayout from "../../layouts/PublicLayout";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import CardPessoa from "../../components/Card/CardPessoa";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import { listarUsuarios } from "../../services/authService";
import "../../styles/Sobre.css";

export default function UserRoles() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  // Função para buscar usuários do backend
  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const dados = await listarUsuarios();
      setUsuarios(dados);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setErro("Falha ao carregar usuários.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <PublicLayout>
      <ErrorBoundary>
        <NavBar />
      </ErrorBoundary>

      <main className="main">
        <section className="membros">
          {loading && <p>Carregando usuários...</p>}
          {erro && <p style={{ color: "red" }}>{erro}</p>}
          {!loading && !erro && usuarios.length === 0 && (
            <p>Nenhum usuário encontrado.</p>
          )}

          {!loading &&
            !erro &&
            usuarios.map((usuario) => (
              <CardPessoa
                key={usuario.id}
                pessoa={usuario}
                mostrarSelect={true} // força mostrar select apenas no card de admin
              />
            ))}
        </section>
      </main>

      <Footer />
    </PublicLayout>
  );
}
