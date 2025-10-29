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
      id: decoded.id,
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

// === LISTAR USUÁRIOS ===
export async function listarUsuarios() {
  const token = getToken();
  try {
    const response = await fetch(`${API_URL}/usuarios`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao listar usuários");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
}


export async function atualizarPapelUsuario(id, papel) {
  const token = getToken();
  try {
    const response = await fetch(`${API_URL}/usuarios/papel`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, papel }),
    });

    if (!response.ok) {
      const erro = await response.text();
      throw new Error(erro || "Erro ao atualizar papel");
    }

    return await response.text(); // Mensagem de sucesso
  } catch (error) {
    console.error("Erro ao atualizar papel:", error);
    throw error;
  }
}

export async function buscarUsuarioAtual() {
  const usuario = getUsuario();
  if (!usuario) throw new Error("Usuário não autenticado");

  const token = getToken();
  try {
    const response = await fetch(`${API_URL}/usuarios/${usuario.id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar dados do usuário");
    }

    return await response.json(); // retorna DadosDetalheUsuario
  } catch (error) {
    console.error("Erro ao buscar usuário atual:", error);
    throw error;
  }
}

export async function atualizarUsuario(dados) {

  const token = getToken();
  try {
    const response = await fetch(`${API_URL}/usuarios`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      const erro = await response.text();
      throw new Error(erro || "Erro ao atualizar usuário");
    }

    return await response.json(); // retorna DadosDetalheUsuario atualizado
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw error;
  }
}

export async function atualizarSenha(senhaAtual, novaSenha) {
  const token = getToken();
  const response = await fetch(`${API_URL}/usuarios/senha`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ senhaAtual, novaSenha }),
  });

  if (!response.ok) {
    const erro = await response.text();
    throw new Error(erro || "Erro ao atualizar senha");
  }

  return await response.text(); // retorna mensagem de sucesso
}

