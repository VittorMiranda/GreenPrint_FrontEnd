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
export default function ProdutoCadastro() {
  return (
    <PublicLayout>
        <ErrorBoundary>
          <NavBar/>
        </ErrorBoundary>
        <main className="account">
            <h2>Cadastro de Produto</h2>
            <form className="dados_pessoais">
                <Input type="text" text_label="Nome"/>
                <Input type="number" text_label="Altura"/>
                <Input type="number" text_label="Largura"/>
                <Input type="number" text_label="Profundidade"/>
                <Input type="number" text_label="Quantidade"/>
                <Select label="Tipo de papelão"/>
                <Input type="text" text_label="Cor"/>
                <Input type="number" text_label="Altura"/>
                <Input type="text" text_label="Nome do projeto"/>
                <TextArea text_label="Descrição do projeto"/>
                <ImageUpload />
                <Button text="Cadastrar"/>
            </form>                    
        </main>
        <Footer/>
    </PublicLayout>
  );
}
