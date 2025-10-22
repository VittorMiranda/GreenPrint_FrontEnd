import { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import logo from "../../assets/GreenPrint_Logo.svg";
import acount from "../../assets/acount.svg";
import menu from "../../assets/menu.svg";
import close from "../../assets/close.svg";

export default function Navbar({ user }) {
  
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo GreenPrint" />
        <span>GreenPrint</span>
      </div>

      <div className="menu_account">
        {user ? (
          <Link to="/account">
            <img src={acount} alt={user.name} className="icon-account" />
          </Link>
        ) : (
          <Link to="/login"><img src={acount} alt="" className="icon-account" /></Link>
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
        <Link to="/sobre" onClick={() => setMenuOpen(false)}>Sobre</Link>
        <Link to="/contato" onClick={() => setMenuOpen(false)}>Contato</Link>
      </div>
    </nav>
  );
}
