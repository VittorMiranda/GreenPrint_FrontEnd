import "./NavBar.css"
import logo from "../../assets/GreenPrint_Logo.svg"
import acount from "../../assets/acount.svg"
import menu from "../../assets/menu.svg"
import close from "../../assets/close.svg"

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="" />
        <span>GreenPrint</span>
      </div>
      <div className="menu_aconut">
        <img src={acount} alt="" />
        <img src={menu} alt="" />
      </div>   
    </nav>
  );
}
