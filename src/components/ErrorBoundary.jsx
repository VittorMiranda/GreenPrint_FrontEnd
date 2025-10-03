import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Atualiza o estado para mostrar UI de fallback
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Aqui você pode logar o erro em um serviço externo
    console.error("ErrorBoundary capturou um erro:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2>Algo deu errado neste componente.</h2>
          <p>Estamos trabalhando para corrigir o problema.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
