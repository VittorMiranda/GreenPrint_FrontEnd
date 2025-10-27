import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/public/Home";
import Dashboard from "../pages/private/Dashboard";
import PrivateLayout from "../layouts/PrivateLayout";
import Account from "../pages/private/Account";
import ProdutoDetalhes from "../pages/public/ProdutoDetalhes";
import ProdutoList from "../pages/public/ProdutoList";
import Perfil from "../pages/public/Perfil";
import ProdutoCadastro from "../pages/public/ProdutoCadastro";
import CategoriaCadastro from "../pages/public/CategoriaCadastro";
import UserCadastro from "../pages/public/UserCadastro";
import UserLogin from "../pages/public/UserLogin";

// Componente para rotas privadas
function PrivateRoute({ user, children }) {
  return user ? children : <Navigate to="/" />;
}

export default function AppRouter() {
  const user = {
    name: "Vitor",
    avatar: "/assets/acount.svg",
    role: "admin",
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública */}
        <Route path="/" element={<Home />} />
        <Route path="/produto_list" element={<ProdutoList />} />
        <Route path="/produto_cadastro/:id" element={<ProdutoCadastro />} />
        <Route path="/produto_cadastro" element={<ProdutoCadastro />} />
        <Route path="/categoria_cadastro" element={<CategoriaCadastro />} />
        <Route path="/user_cadastro" element={<UserCadastro />} />
        <Route path="/user_login" element={<UserLogin />} />
        <Route path="/perfil" element={<Perfil />} />
        {/* Rota de produto com parâmetro dinâmico */}
        <Route path="/produto/:id" element={<ProdutoDetalhes />} />

        {/* Rotas privadas */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute user={user}>
              <PrivateLayout user={user}>
                <Dashboard />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/account"
          element={
            <PrivateRoute user={user}>
              <PrivateLayout user={user}>
                <Account />
              </PrivateLayout>
            </PrivateRoute>
          }
        />

        {/* Redirecionamento para home se nenhuma rota bater */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

    </BrowserRouter>
  );
}
