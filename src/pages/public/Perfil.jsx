import PublicLayout from "../../layouts/PublicLayout";
import NavBar from "../../components/NavBar/NavBar";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import "../../styles/Account.css";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Input from "../../components/Inputs/Input";
import InputPassword from "../../components/Inputs/InpuPassword";
import acount from "../../assets/acount.svg";
import Button from "../../components/Buttons/Button";
export default function Perfil() {
  return (
    <PublicLayout>
        <ErrorBoundary>
          <NavBar/>
        </ErrorBoundary>
        <main className="account">
            <img className="imagem_perfil" src={acount} alt="" />    
            <h2>Vitor Hugo</h2>
            <form className="dados_pessoais">
                <h3>Dados Pessoais</h3>
                <Input type="text" text_label="Nome"/>
                <Input type="email" text_label="E-mail"/>
                <Input type="text" text_label="Telefone"/>
                <Button text="Atualizar"/>
            </form>           
            <form className="dados_pessoais">
                <h3>Trocar Senha</h3>
                <InputPassword type="password" text_label="Senha Atual"/>
                <InputPassword type="password" text_label="Nova Senha"/>
                <Button text="Alterar senha"/>
            </form>
            

        </main>
        <Footer/>
    </PublicLayout>
  );
}
