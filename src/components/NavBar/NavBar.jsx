import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsuario, isAuthenticated, logout } from "../../services/authService";
import "./NavBar.css";
import logo from "../../assets/GreenPrint_Logo.svg";
import account from "../../assets/acount.svg";
import menu from "../../assets/menu.svg";
import close from "../../assets/close.svg";
import logoutIcon from "../../assets/logout.svg"; 

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/home");
  };

  useEffect(() => {
    if (isAuthenticated()) {
      const usuario = getUsuario();
      setUser(usuario);
    }
  }, [navigate]);

  return (
    <nav className="navbar">
      <Link className="logo" to="/home">
        <img src={logo} alt="Logo GreenPrint" />
        <span>GreenPrint</span>
      </Link>

      <div className="menu_account">
        {user ? (
          <div className="user">
            <img src={account} alt="" />
            <div className="account-logged">
              <Link to="/perfil" className="user-name-link" state={{ usuario: user }}>{user.nome}</Link>
              <img
                src={logoutIcon}
                alt="Sair"
                className="icon-logout"
                onClick={handleLogout}
              />
            </div>
          </div>
        ) : (
          <div className="user">
            <img src={account} alt="" />
            <div className="account-guest">
              <Link to="/user_login" className="login-link">Login</Link>
              <Link to="/user_cadastro" className="cadastro-link">Cadastro</Link>
            </div>
          </div>
        )}

        <img
          src={menuOpen ? close : menu}
          alt="Menu"
          className="icon-menu"
          onClick={toggleMenu}
        />
      </div>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Início</Link>
        <Link to="/produto_list" onClick={() => setMenuOpen(false)}>Produtos</Link>
        <Link to="/contato" onClick={() => setMenuOpen(false)}>Contato</Link>
        <Link to="/sobre" onClick={() => setMenuOpen(false)}>Sobre</Link>
        {/* Exibe apenas para funcionários e admins */}
        {user && (user.papel === "FUNCIONARIO" || user.papel === "ADMINISTRADOR") && (
          <Link to="/produto_cadastro" onClick={() => setMenuOpen(false)}>
            Cadastro Produtos
          </Link>
        )}

        {/* Exibe apenas para admins */}
        {user && user.papel === "ADMINISTRADOR" && (
          <Link to="/adm_roles" onClick={() => setMenuOpen(false)}>
            Administração de Acesso 
          </Link>
        )}
        {!user && (
          <>
            <Link to="/user_login" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/user_cadastro" onClick={() => setMenuOpen(false)}>Cadastro</Link>
          </>
        )}
      </div>
    </nav>
  );
}
