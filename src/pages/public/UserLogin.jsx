import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";
import NavBar from "../../components/NavBar/NavBar";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import "../../styles/Account.css";
import Footer from "../../components/Footer/Footer";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";
import { login } from "../../services/authService";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setErro("");

    try {
      await login(email, senha);
      navigate("/"); // redireciona para área logada
    } catch (err) {
      setErro("E-mail ou senha inválidos. Tente novamente.");
    }
  }

  return (
    <PublicLayout>
      <ErrorBoundary>
        <NavBar />
      </ErrorBoundary>

      <main className="account">
        <h2>Login</h2>

        <form className="dados_pessoais" onSubmit={handleLogin}>
          <Input
            type="email"
            text_label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
          />
          <Input
            type="password"
            text_label="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
          />

          {erro && <p className="erro">{erro}</p>}

          <Link to="#" className="link_esqueci">
            Esqueci a senha
          </Link>

          <Button text="Entrar" type="submit" />
        </form>
      </main>

      <Footer />
    </PublicLayout>
  );
}
