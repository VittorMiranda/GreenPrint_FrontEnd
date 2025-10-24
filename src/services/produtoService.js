const API_URL = "http://localhost:8080";

export async function cadastrarProduto(dados, token) {
  const response = await fetch(`${API_URL}/produtos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dados),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro ${response.status}: ${errorText}`);
  }
  return response.json();
}

export async function getProdutos() {
  const response = await fetch(`${API_URL}/produtos`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar produtos");
  }
  return await response.json();
}

// Função GET para pegar um produto específico pelo ID (rota aberta)
export async function getProdutoPorId(id) {
  const response = await fetch(`${API_URL}/produtos/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar produto");
  }
  return await response.json();
}