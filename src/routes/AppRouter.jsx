import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/public/Home";
import Dashboard from "../pages/private/Dashboard";
import PrivateLayout from "../layouts/PrivateLayout";
import Account from "../pages/private/Account";

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
