const API_URL = "http://localhost:8080";

export async function cadastrarProduto(produto, token) {
  const response = await fetch(`${API_URL}/produtos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(produto),
  });

  if (!response.ok) throw new Error("Erro ao cadastrar produto");

  return response.json();
}