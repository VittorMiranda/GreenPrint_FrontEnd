import React from "react";
import "./ButtonWpp.css";
import { FaWhatsapp } from "react-icons/fa";

export default function ButtonWpp({ phoneNumber, message, text, floating }) {
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <button
      className={`whatsapp-button ${floating ? "floating" : ""}`}
      onClick={handleClick}
    >
      <FaWhatsapp size={22} />
      {!floating && (text || "Falar no WhatsApp")}
    </button>
  );
}
