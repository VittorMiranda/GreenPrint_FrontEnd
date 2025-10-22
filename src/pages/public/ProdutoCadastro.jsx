import { useEffect, useState } from "react";
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
import { getTiposPapelao } from "../../services/tipoPapelaoService";

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

  const handleImageUpload = (fileData) => {
    if (!fileData) return;
    handleChange("imagem", fileData.base64);
    handleChange("tipoImagem", fileData.tipo);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
  
      const payload = {
        ...form,
        imagens: form.imagem
          ? [
              {
                arquivoImagem: form.imagem,
                tipoImagem: form.tipoImagem,
              },
            ]
          : [],
      };
  
      delete payload.imagem;
      delete payload.tipoImagem;
  
      const result = await cadastrarProduto(payload, token);
      console.log("Produto cadastrado:", result);
      alert("Produto cadastrado com sucesso!");
    } catch (err) {
      console.error("Erro ao cadastrar:", err);
      alert("Erro ao cadastrar produto.");
    }
  };

  const [tiposPapelao, setTiposPapelao] = useState([]);
  const [selectedTipo, setSelectedTipo] = useState("");

  useEffect(() => {
    async function carregarTipos() {
      const token = localStorage.getItem("token");
      const tipos = await getTiposPapelao(token);
      setTiposPapelao(tipos);
    }
    carregarTipos();
  }, []);

  return (
    <PublicLayout>
      <ErrorBoundary>
        <NavBar />
      </ErrorBoundary>
      <main className="account">
        <h2>Cadastro de Produto</h2>
        <form className="dados_pessoais" onSubmit={handleSubmit}>
          <Input type="text" text_label="Nome" value={form.nome} onChange={(value) => handleChange("nome", value)} />
          <Input type="number" text_label="Altura" value={form.altura} onChange={(value) => handleChange("altura", value)} />
          <Input type="number" text_label="Largura" value={form.largura} onChange={(value) => handleChange("largura", value)} />
          <Input type="number" text_label="Profundidade" value={form.profundidade} onChange={(value) => handleChange("profundidade", value)} />
          <Input type="number" text_label="Quantidade em estoque" value={form.quantidadeEstoque} onChange={(value) => handleChange("quantidadeEstoque", value)} />
          <Input type="number" text_label="Volume suportado" value={form.volumeSuportado} onChange={(value) => handleChange("volumeSuportado", value)} />
          <Select
            label="Tipo de papelão"
            options={tiposPapelao.map((tipo) => ({
              value: String(tipo.id),
              label: tipo.nome,
            }))}
            value={selectedTipo ? String(selectedTipo) : ""}
            onChange={(val) => {
              setSelectedTipo(val);
              handleChange("idTipoPapelao", Number(val)); // mantém o form coerente
            }}
          />

          <Input type="text" text_label="Cor" value={form.cor} onChange={(value) => handleChange("cor", value)} />
          <Input type="number" text_label="Valor de compra" value={form.valorCompra} onChange={(value) => handleChange("valorCompra", value)} />
          <Input type="number" text_label="Valor de venda" value={form.valorVenda} onChange={(value) => handleChange("valorVenda", value)} />
          <Input type="text" text_label="Nome do projeto" value={form.nomeProjeto} onChange={(value) => handleChange("nomeProjeto", value)} />
          <TextArea text_label="Descrição do projeto" value={form.descricaoProjeto} onChange={(value) => handleChange("descricaoProjeto", value)} />
          <ImageUpload
            value={form.imagem ? [form.imagem] : []}
            onChange={(files) => handleImageUpload(files)}
          />

          <Button text="Cadastrar"  type="submit"/>
        </form>
      </main>
      <Footer />
    </PublicLayout>
  );
}
