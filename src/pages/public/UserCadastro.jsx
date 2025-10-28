import { useState, useEffect } from "react";
import PublicLayout from "../../layouts/PublicLayout";
import NavBar from "../../components/NavBar/NavBar";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import "../../styles/Account.css";
import Footer from "../../components/Footer/Footer";
import Input from "../../components/Inputs/Input";
import PasswordInput from "../../components/Inputs/InpuPassword";
import Button from "../../components/Buttons/Button";
import { cadastrarUsuario } from "../../services/authService";

export default function UserCadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const [senhaValida, setSenhaValida] = useState({
    comprimentoMin: false,
    comprimentoMax: true,
    numero: false,
    especial: false,
  });

  const [senhaCoincide, setSenhaCoincide] = useState(null);
  const [telefoneValido, setTelefoneValido] = useState(true);

  // Validação da senha em tempo real
  useEffect(() => {
    setSenhaValida({
      comprimentoMin: senha.length >= 8,
      comprimentoMax: senha.length <= 12,
      numero: /[0-9]/.test(senha),
      especial: /[!@#$%^&*(),.?":{}|<>]/.test(senha),
    });
  }, [senha]);

  // Validação de confirmação
  useEffect(() => {
    if (!confirmarSenha) setSenhaCoincide(null);
    else setSenhaCoincide(senha === confirmarSenha);
  }, [senha, confirmarSenha]);

  // Validação de telefone
  function validarTelefone(value) {
    setTelefone(value);
    const somenteNumeros = value.replace(/\D/g, "");
    const valido = somenteNumeros.length >= 10 && somenteNumeros.length <= 11;
    setTelefoneValido(valido);
  }

  async function handleCadastro(e) {
    e.preventDefault();
    setMensagem("");

    if (
      !senhaValida.comprimentoMin ||
      !senhaValida.comprimentoMax ||
      !senhaValida.numero ||
      !senhaValida.especial
    ) {
      setMensagem("A senha não atende aos requisitos mínimos.");
      return;
    }

    if (senha !== confirmarSenha) {
      setMensagem("As senhas não coincidem.");
      return;
    }

    if (!telefoneValido) {
      setMensagem("Número de telefone inválido. Use apenas números (10 ou 11 dígitos).");
      return;
    }

    try {
      const resposta = await cadastrarUsuario({
        nome,
        email,
        senha,
        telefone,
        papel: "CLIENTE",
      });
      setMensagem(resposta);
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

          {/* Telefone */}
          <Input
            type="tel"
            text_label="Telefone"
            value={telefone}
            onChange={(value) => validarTelefone(value)}
          />
          {!telefoneValido && (
            <p className="erro">
              O número deve conter apenas dígitos e ter entre 10 e 11 caracteres.
            </p>
          )}

          {/* Senha */}
          <PasswordInput
            text_label="Senha"
            value={senha}
            onChange={(value) => setSenha(value)}
          />

          {/* Requisitos visuais */}
          <ul className="senha-requisitos">
            <li className={senhaValida.comprimentoMin ? "ok" : "erro"}>
              {senhaValida.comprimentoMin ? "✅" : "❌"} Mínimo de 8 caracteres
            </li>
            <li className={senhaValida.comprimentoMax ? "ok" : "erro"}>
              {senhaValida.comprimentoMax ? "✅" : "❌"} Máximo de 12 caracteres
            </li>
            <li className={senhaValida.numero ? "ok" : "erro"}>
              {senhaValida.numero ? "✅" : "❌"} Contém ao menos um número
            </li>
            <li className={senhaValida.especial ? "ok" : "erro"}>
              {senhaValida.especial ? "✅" : "❌"} Contém caractere especial
            </li>
          </ul>

          {/* Confirmar senha */}
          <PasswordInput
            text_label="Confirmar senha"
            value={confirmarSenha}
            onChange={(value) => setConfirmarSenha(value)}
          />
          {senhaCoincide !== null && (
            <p className={senhaCoincide ? "ok" : "erro"}>
              {senhaCoincide ? "✅ As senhas coincidem" : "❌ As senhas não coincidem"}
            </p>
          )}

          {mensagem && <p className="erro">{mensagem}</p>}

          <Button text="Cadastrar" type="submit" />
        </form>
      </main>

      <Footer />
    </PublicLayout>
  );
}
