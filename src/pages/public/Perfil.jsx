import { useState, useEffect } from "react";
import PublicLayout from "../../layouts/PublicLayout";
import NavBar from "../../components/NavBar/NavBar";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import "../../styles/Account.css";
import Footer from "../../components/Footer/Footer";
import Input from "../../components/Inputs/Input";
import InputPassword from "../../components/Inputs/InpuPassword";
import acount from "../../assets/acount.svg";
import Button from "../../components/Buttons/Button";
import { buscarUsuarioAtual, atualizarUsuario, alterarSenha } from "../../services/authService";

export default function Perfil() {
  const [usuario, setUsuario] = useState({
    id: "",
    nome: "",
    email: "",
    telefone: "",
  });
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [loading, setLoading] = useState(true);

  // Buscar dados do usuário ao carregar a página
  useEffect(() => {
    async function carregarUsuario() {
      try {
        const dados = await buscarUsuarioAtual();
        setUsuario({
          id: dados.id,
          nome: dados.nome,
          email: dados.email,
          telefone: dados.telefone || "",
        });
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarUsuario();
  }, []);

  // Atualiza campos de texto do perfil
  const handleInputChange = (name, value) => {
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  // Atualiza apenas dados pessoais
  const handleAtualizarPerfil = async (e) => {
    e.preventDefault();
    try {
      const dadosAtualizados = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone,
      };
      const atualizado = await atualizarUsuario(dadosAtualizados);
      setUsuario({
        id: atualizado.id,
        nome: atualizado.nome,
        email: atualizado.email,
        telefone: atualizado.telefone || "",
      });
      alert("Dados pessoais atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert("Falha ao atualizar dados pessoais: " + error.message);
    }
  };

  async function handleAtualizarSenha(e) {
    e.preventDefault();
    try {
      const mensagem = await alterarSenha(senhaAtual, novaSenha);
      alert(mensagem);
      setSenhaAtual("");
      setNovaSenha("");
    } catch (error) {
      alert(error.message);
    }
  }

  if (loading) return <p>Carregando...</p>;

  return (
    <PublicLayout>
      <ErrorBoundary>
        <NavBar />
      </ErrorBoundary>

      <main className="account">
        <img className="imagem_perfil" src={acount} alt="Foto do usuário" />
        <h2>{usuario.nome || "Usuário"}</h2>

        {/* Formulário de Dados Pessoais */}
        <form className="dados_pessoais" onSubmit={handleAtualizarPerfil}>
          <h3>Dados Pessoais</h3>
          <Input
            type="text"
            text_label="Nome"
            name="nome"
            value={usuario.nome}
            onChange={(value) => handleInputChange("nome", value)}
          />
          <Input
            type="email"
            text_label="E-mail"
            name="email"
            value={usuario.email}
            onChange={(value) => handleInputChange("email", value)}
          />
          <Input
            type="text"
            text_label="Telefone"
            name="telefone"
            value={usuario.telefone}
            onChange={(value) => handleInputChange("telefone", value)}
          />
          <Button text="Atualizar Dados" type={"submit"}/>
        </form>

        {/* Formulário de Senha */}
        <form className="senha_form" onSubmit={handleAtualizarSenha}>
          <h3>Alterar Senha</h3>
          <InputPassword
            type="password"
            text_label="Senha Atual"
            name="senhaAtual"
            value={senhaAtual}
            onChange={(e) => setSenhaAtual(e.target.value)}
          />
          <InputPassword
            type="password"
            text_label="Nova Senha"
            name="novaSenha"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
          />
          <Button text="Alterar Senha" type={"submit"}/>
        </form>
      </main>

      <Footer />
    </PublicLayout>
  );
}
