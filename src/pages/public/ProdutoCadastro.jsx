import { useState } from "react";
import PublicLayout from "../../layouts/PublicLayout";
import NavBar from "../../components/NavBar/NavBar";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import "../../styles/Account.css";
import Footer from "../../components/Footer/Footer";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";
import Select from "../../components/Select/Select";
import ImageUpload from "../../components/Inputs/InputFile";
import TextArea from "../../components/Inputs/TextArea";
import { cadastrarProduto } from "../../services/produtoService";

export default function ProdutoCadastro() {
  const [form, setForm] = useState({
    nome: "",
    altura: "",
    largura: "",
    profundidade: "",
    quantidadeEstoque: "",
    volumeSuportado: "",
    idTipoPapelao: "",
    cor: "",
    valorCompra: "",
    valorVenda: "",
    nomeProjeto: "",
    descricaoProjeto: "",
    imagem: null,
    tipoImagem: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.split(",")[1]; // remove "data:image/...;base64,"
      handleChange("imagem", base64String);
      handleChange("tipoImagem", file.type);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const result = await cadastrarProduto(form, token);
      console.log("Produto cadastrado:", result);
      alert("Produto cadastrado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar produto.");
    }
  };

  return (
    <PublicLayout>
      <ErrorBoundary>
        <NavBar />
      </ErrorBoundary>
      <main className="account">
        <h2>Cadastro de Produto</h2>
        <form className="dados_pessoais" onSubmit={handleSubmit}>
          <Input type="text" text_label="Nome" onChange={(e) => handleChange("nome", e.target.value)} />
          <Input type="number" text_label="Altura" onChange={(e) => handleChange("altura", e.target.value)} />
          <Input type="number" text_label="Largura" onChange={(e) => handleChange("largura", e.target.value)} />
          <Input type="number" text_label="Profundidade" onChange={(e) => handleChange("profundidade", e.target.value)} />
          <Input type="number" text_label="Quantidade em estoque" onChange={(e) => handleChange("quantidadeEstoque", e.target.value)} />
          <Input type="number" text_label="Volume suportado" onChange={(e) => handleChange("volumeSuportado", e.target.value)} />
          <Select label="Tipo de papelão" onChange={(value) => handleChange("idTipoPapelao", value)} />
          <Input type="text" text_label="Cor" onChange={(e) => handleChange("cor", e.target.value)} />
          <Input type="number" text_label="Valor de compra" onChange={(e) => handleChange("valorCompra", e.target.value)} />
          <Input type="number" text_label="Valor de venda" onChange={(e) => handleChange("valorVenda", e.target.value)} />
          <Input type="text" text_label="Nome do projeto" onChange={(e) => handleChange("nomeProjeto", e.target.value)} />
          <TextArea text_label="Descrição do projeto" onChange={(e) => handleChange("descricaoProjeto", e.target.value)} />
          <ImageUpload onChange={handleImageUpload} />
          <Button text="Cadastrar" />
        </form>
      </main>
      <Footer />
    </PublicLayout>
  );
}
