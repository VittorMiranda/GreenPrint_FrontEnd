import PublicLayout from "../../layouts/PublicLayout";
import NavBar from "../../components/NavBar/NavBar";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import "../../styles/Account.css";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Input from "../../components/Inputs/Input";
import acount from "../../assets/acount.svg";
import Button from "../../components/Buttons/Button";
import Select from "../../components/Select/Select";
import ImageUpload from "../../components/Inputs/InputFile";
import TextArea from "../../components/Inputs/TextArea";
export default function CategoriaCadastro() {
  return (
    <PublicLayout>
        <ErrorBoundary>
          <NavBar/>
        </ErrorBoundary>
        <main className="account">
            <h2>Cadastro Categorias de Papelão</h2>
            <form className="dados_pessoais">
                <Input type="text" text_label="Nome"/>
                <TextArea  text_label="Descrição"/>
                <Button text="Cadastrar"/>
            </form>                    
        </main>
        <Footer/>
    </PublicLayout>
  );
}
