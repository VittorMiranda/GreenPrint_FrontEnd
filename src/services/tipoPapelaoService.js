const API_URL = "http://localhost:8080/tipo_papelao";

export async function getTiposPapelao(token) {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar tipos de papelão: ${response.status}`);
    }

    const data = await response.json();
    return data.content || data; // compatível com paginação do Spring
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getProdutos() {
    const response = await fetch(`${BASE_URL}/produtos`, {
      method: "GET",
    });
  
    if (!response.ok) {
      throw new Error("Erro ao buscar produtos");
    }
    return await response.json();
  }
  
  // Função GET para pegar um produto específico pelo ID (rota aberta)
  export async function getProdutoPorId(id) {
    const response = await fetch(`${BASE_URL}/produtos/${id}`, {
      method: "GET",
    });
  
    if (!response.ok) {
      throw new Error("Erro ao buscar produto");
    }
    return await response.json();
  }