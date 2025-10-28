import { useState } from "react";
import PublicLayout from "../../layouts/PublicLayout";
import NavBar from "../../components/NavBar/NavBar";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import "../../styles/Account.css";
import Footer from "../../components/Footer/Footer";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";
import { cadastrarUsuario } from "../../services/authService"; // importe a função de cadastro

export default function UserCadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function handleCadastro(e) {
    e.preventDefault();
    try {
      const resposta = await cadastrarUsuario({
        nome,
        email,
        senha,
        telefone,
        papel: "CLIENTE",
      });
      setMensagem(resposta); // mostra a mensagem do backend
    } catch (err) {
      setMensagem(err.message);
    }
  }


  return (
    <PublicLayout>
      <ErrorBoundary>
        <NavBar />
      </ErrorBoundary>

      <main className="account">
        <h2>Cadastro de usuário</h2>

        <form className="dados_pessoais" onSubmit={handleCadastro}>
          <Input
            type="text"
            text_label="Nome"
            value={nome}
            onChange={(value) => setNome(value)}
          />
          <Input
            type="email"
            text_label="E-mail"
            value={email}
            onChange={(value) => setEmail(value)}
          />
          <Input
            type="number"
            text_label="Telefone"
            value={telefone}
            onChange={(value) => setTelefone(value)}
          />
          <Input
            type="password"
            text_label="Senha"
            value={senha}
            onChange={(value) => setSenha(value)}
          />
          <Input
            type="password"
            text_label="Confirmar senha"
            value={confirmarSenha}
            onChange={(value) => setConfirmarSenha(value)}
          />

          {mensagem && <p className="erro">{mensagem}</p>}

          <Button text="Cadastrar" type="submit" />
        </form>
      </main>

      <Footer />
    </PublicLayout>
  );
}
