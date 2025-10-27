import { Link, useNavigate } from "react-router-dom";
import "./Card.css";
import img1 from "../../assets/15-peças-de-design-feitas-com-caixas-de-papelão-dezeen-05.png";
import updateIcon from "../../assets/edit_square.svg";
import deleteIcon from "../../assets/delete.svg";
import { getUsuario } from "../../services/authService";
import { deleteProduto } from "../../services/produtoService";

export default function Card({ product }) {
   const usuario = getUsuario();
   const navigate = useNavigate();

  // Verifica se o usuário tem permissão para editar/deletar
  const canEdit =
    usuario && (usuario.papel === "FUNCIONARIO" || usuario.papel === "ADMINISTRADOR");

  const handleEdit = (e) => {
    e.preventDefault(); // evita que o link do card seja acionado
    navigate(`/produto_cadastro/${product.id}`);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;

    try {
      const token = localStorage.getItem("token");
      await deleteProduto(product.id, token);
      alert("Produto excluído com sucesso!");
      // atualizar lista ou recarregar página
      window.location.reload(); 
    } catch (err) {
      console.error("Erro ao excluir produto:", err);
      alert("Não foi possível excluir o produto.");
    }
  };

   return (
    <div className="product-card">
      {/* Torna apenas esta parte clicável para ver o produto */}
      <Link to={`/produto/${product.id}`} className="product-link">
        <div className="image-container" key={product.id}>
          <img
            src={product.images?.[0] || img1}
            alt={product.nome}
            className="product-image"
          />
        </div>

        <div className="product-info">
          <h3>{product.nome}</h3>
          <p>
            <strong>Cor:</strong> {product.color}
          </p>
          <p>
            <strong>Dimensões:</strong> {product.altura}x{product.largura}x{product.profundidade} cm
          </p>
          {product.volume && (
            <p>
              <strong>Volume:</strong> {product.volume} L
            </p>
          )}
        </div>
      </Link>

      {/* Botões separados do link */}
      {canEdit && (
        <div className="action-icons">
          <img
            src={updateIcon}
            alt="Botão de editar"
            className="update"
            onClick={handleEdit}
          />
          <img
            src={deleteIcon}
            alt="Botão de deletar"
            className="deletar"
            onClick={handleDelete}
          />
        </div>
      )}
    </div>
  );
}
