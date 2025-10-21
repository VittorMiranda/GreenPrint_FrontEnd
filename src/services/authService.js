const API_URL = "http://localhost:8080"; // ajuste para sua API real

export async function login(email, senha) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
      throw new Error("Falha no login. Verifique suas credenciais.");
    }

    const data = await response.json();

    // supondo que o token venha em data.token
    localStorage.setItem("token", data.token);

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
