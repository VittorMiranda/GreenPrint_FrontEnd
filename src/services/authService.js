import jwt_decode from "jwt-decode";

const API_URL = "http://localhost:8080"; // ajuste para sua API real

export async function login(email, senha) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
      throw new Error("Falha no login. Verifique suas credenciais.");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token); // salva token
    return data;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
}

export function logout() {
  localStorage.removeItem("token");
}

export function getToken() {
  return localStorage.getItem("token");
}

export function isAuthenticated() {
  return !!getToken();
}

// === NOVA FUNÇÃO PARA DECODIFICAR O TOKEN E PEGAR DADOS DO USUÁRIO ===
export function getUsuario() {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwt_decode(token);

    return {
      nome: decoded.nome,
      papel: decoded.papel,
      email: decoded.sub, // 'sub' vem do JWT
    };
  } catch (err) {
    console.error("Erro ao decodificar token:", err);
    return null;
  }
}

export async function cadastrarUsuario(usuario) {
  try {
    const response = await fetch(`${API_URL}/usuarios/cadastro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      const erroTexto = await response.text(); // pega a mensagem de erro do backend
      throw new Error(erroTexto || "Erro no cadastro");
    }

    return await response.text(); // pega a mensagem de sucesso
  } catch (error) {
    console.error("Erro no cadastro:", error);
    throw error;
  }
}


