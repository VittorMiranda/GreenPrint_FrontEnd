import { useEffect, useState } from "react";
import { useNavigate,  useParams  } from "react-router-dom";
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
import { cadastrarProduto, atualizarProduto, getProdutoPorId } from "../../services/produtoService";
import { getTiposPapelao } from "../../services/tipoPapelaoService";

export default function ProdutoCadastro() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: null,
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
    imagens: [],
  });

  const [previews, setPreviews] = useState([]);
  const [tiposPapelao, setTiposPapelao] = useState([]);
  const [selectedTipo, setSelectedTipo] = useState("");

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (imagens) => {
  if (!imagens || imagens.length === 0) return;

  console.log("Imagens recebidas:", imagens);

  // salva todas as imagens no estado
  handleChange("imagens", imagens.map(img => ({
    arquivoImagem: img.base64,
    tipoImagem: img.tipo,
  })));
  setPreviews(imagens.map(img => img.preview));
};

    useEffect(() => {
    async function carregarProduto() {
      if (id) {
        const produto = await getProdutoPorId(id);
        setForm({
          id: produto.id,
          nome: produto.nome,
          altura: produto.altura,
          largura: produto.largura,
          profundidade: produto.profundidade,
          quantidadeEstoque: produto.quantidadeEstoque,
          volumeSuportado: produto.volume,
          idTipoPapelao: produto.idTipoPapelao,
          cor: produto.cor,
          valorCompra: produto.valorCompra,
          valorVenda: produto.valorVenda,
          nomeProjeto: produto.nomeProjeto,
          descricaoProjeto: produto.descricaoProjeto,
          imagens: produto.imagens || [],
        });
        setSelectedTipo(String(produto.idTipoPapelao));
        setPreviews((produto.imagens || []).map(img => img.imagemCompleta || ""));
      }
    }
    carregarProduto();
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
  
      const payload = {
        ...form,
        imagens: form.imagens || [],
      };
  
      delete payload.imagem;
      delete payload.tipoImagem;

      if (id) {
        await atualizarProduto(payload, token);
        alert("Produto atualizado com sucesso!");
      } else {
        await cadastrarProduto(payload, token);
        alert("Produto cadastrado com sucesso!");
      }
      navigate("/produto_list");

    } catch (err) {
      console.error("Erro ao salvar", err);
      alert("Erro ao cadastrar produto.");
    }
  };

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
            value={previews || []} // só para exibir previews
            onChange={handleImageUpload}
          />

          <Button text={id ? "Salvar alterações" : "Cadastrar"}  type="submit"/>
        </form>
      </main>
      <Footer />
    </PublicLayout>
  );
}
