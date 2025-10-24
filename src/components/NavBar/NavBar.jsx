import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsuario, isAuthenticated } from "../../services/authService";
import "./NavBar.css";
import logo from "../../assets/GreenPrint_Logo.svg";
import acount from "../../assets/acount.svg";
import menu from "../../assets/menu.svg";
import close from "../../assets/close.svg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

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
          <div className="account-logged">
            <Link to="/account">
              <img src={acount} alt={user.nome} className="icon-account" />
            </Link>
            <span className="user-name">{user.nome}</span>
          </div>
        ) : (
          <Link to="/user_login">
            <img src={acount} alt="Login" className="icon-account" />
          </Link>
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
        <Link to="/produto_cadastro" onClick={() => setMenuOpen(false)}>Cadastro Produtos</Link>
        <Link to="/contato" onClick={() => setMenuOpen(false)}>Contato</Link>
      </div>
    </nav>
  );
}
