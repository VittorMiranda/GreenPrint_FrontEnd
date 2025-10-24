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

