import { useState } from "react";
import "./NavBar.css";
import logo from "../../assets/GreenPrint_Logo.svg";
import acount from "../../assets/acount.svg";
import menu from "../../assets/menu.svg";
import close from "../../assets/close.svg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo GreenPrint" />
        <span>GreenPrint</span>
      </div>

      <div className="menu_acount">
        <img src={acount} alt="Conta" className="icon-acount" />
        <img
          src={menuOpen ? close : menu}
          alt="Menu"
          className="icon-menu"
          onClick={toggleMenu}
        />
      </div>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a href="#home">Início</a>
        <a href="#produtos">Produtos</a>
        <a href="#sobre">Sobre</a>
        <a href="#contato">Contato</a>
      </div>
    </nav>
  );
}
